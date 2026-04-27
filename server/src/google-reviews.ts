import { config } from "./config.js";
import { getDb } from "./database.js";

type GoogleBusinessProfileReview = {
  name: string;
  comment?: string;
  starRating?: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "STAR_RATING_UNSPECIFIED";
  createTime?: string;
  updateTime?: string;
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
    isAnonymous?: boolean;
  };
  reviewReply?: {
    comment?: string;
    updateTime?: string;
  };
};

type ListReviewsResponse = {
  reviews?: GoogleBusinessProfileReview[];
  totalReviewCount?: number;
  nextPageToken?: string;
};

type OAuthTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
};

export type GoogleReviewSyncStatus = {
  configured: boolean;
  autoSync: boolean;
  locationName: string;
  totalSynced: number;
  lastSyncedAt: string | null;
  lastAttemptAt: string | null;
  lastError: string | null;
};

type GoogleReviewSyncResult = GoogleReviewSyncStatus & {
  syncedNow: number;
};

let syncPromise: Promise<GoogleReviewSyncResult> | null = null;
let lastAttemptAtMs = 0;
let lastError: string | null = null;

const isConfigured = () =>
  Boolean(
    config.googleBusinessProfile.locationName &&
      config.googleBusinessProfile.clientId &&
      config.googleBusinessProfile.clientSecret &&
      config.googleBusinessProfile.refreshToken,
  );

const starRatingToNumber = (rating: GoogleBusinessProfileReview["starRating"]) => {
  switch (rating) {
    case "ONE":
      return 1;
    case "TWO":
      return 2;
    case "THREE":
      return 3;
    case "FOUR":
      return 4;
    case "FIVE":
      return 5;
    default:
      return 5;
  }
};

const toDateOrNull = (value?: string) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const fetchAccessToken = async () => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.googleBusinessProfile.clientId,
      client_secret: config.googleBusinessProfile.clientSecret,
      refresh_token: config.googleBusinessProfile.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const payload = (await response.json()) as OAuthTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Failed to refresh Google Business Profile access token.");
  }

  return payload.access_token;
};

const fetchAllGoogleBusinessProfileReviews = async (accessToken: string) => {
  const allReviews: GoogleBusinessProfileReview[] = [];
  let nextPageToken = "";

  do {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/${config.googleBusinessProfile.locationName}/reviews`,
    );
    url.searchParams.set("pageSize", "50");
    url.searchParams.set("orderBy", "updateTime desc");

    if (nextPageToken) {
      url.searchParams.set("pageToken", nextPageToken);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const payload = (await response.json()) as ListReviewsResponse & { error?: { message?: string } };

    if (!response.ok) {
      throw new Error(payload.error?.message || "Failed to fetch Google Business Profile reviews.");
    }

    allReviews.push(...(payload.reviews ?? []));
    nextPageToken = payload.nextPageToken ?? "";
  } while (nextPageToken);

  return allReviews;
};

const readStatusFromDatabase = async (): Promise<Pick<GoogleReviewSyncStatus, "totalSynced" | "lastSyncedAt">> => {
  const db = getDb();
  const [rows] = await db.query<any[]>(
    "SELECT COUNT(*) AS totalSynced, MAX(synced_at) AS lastSyncedAt FROM google_reviews",
  );

  return {
    totalSynced: Number(rows[0]?.totalSynced ?? 0),
    lastSyncedAt: rows[0]?.lastSyncedAt ? new Date(rows[0].lastSyncedAt).toISOString() : null,
  };
};

const buildStatus = async (): Promise<GoogleReviewSyncStatus> => {
  const { totalSynced, lastSyncedAt } = await readStatusFromDatabase();

  return {
    configured: isConfigured(),
    autoSync: config.googleBusinessProfile.autoSync,
    locationName: config.googleBusinessProfile.locationName,
    totalSynced,
    lastSyncedAt,
    lastAttemptAt: lastAttemptAtMs ? new Date(lastAttemptAtMs).toISOString() : null,
    lastError,
  };
};

const upsertFetchedReviews = async (reviews: GoogleBusinessProfileReview[]) => {
  const db = getDb();
  const seenReviewNames: string[] = [];

  for (const review of reviews) {
    if (!review.name) {
      continue;
    }

    seenReviewNames.push(review.name);

    await db.execute(
      `INSERT INTO google_reviews
        (google_review_name, reviewer_name, reviewer_is_anonymous, reviewer_profile_photo_url, rating, comment, relative_time_label, review_create_time, review_update_time, review_reply_comment, review_reply_update_time, sort_order, is_published, synced_at)
       VALUES (?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, 0, 1, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE
        reviewer_name = VALUES(reviewer_name),
        reviewer_is_anonymous = VALUES(reviewer_is_anonymous),
        reviewer_profile_photo_url = VALUES(reviewer_profile_photo_url),
        rating = VALUES(rating),
        comment = VALUES(comment),
        relative_time_label = VALUES(relative_time_label),
        review_create_time = VALUES(review_create_time),
        review_update_time = VALUES(review_update_time),
        review_reply_comment = VALUES(review_reply_comment),
        review_reply_update_time = VALUES(review_reply_update_time),
        synced_at = CURRENT_TIMESTAMP`,
      [
        review.name,
        review.reviewer?.displayName?.trim() || "Google user",
        review.reviewer?.isAnonymous ? 1 : 0,
        review.reviewer?.profilePhotoUrl || null,
        starRatingToNumber(review.starRating),
        review.comment?.trim() || "",
        toDateOrNull(review.createTime),
        toDateOrNull(review.updateTime),
        review.reviewReply?.comment?.trim() || null,
        toDateOrNull(review.reviewReply?.updateTime),
      ],
    );
  }

  if (seenReviewNames.length === 0) {
    await db.execute("DELETE FROM google_reviews");
    return;
  }

  const placeholders = seenReviewNames.map(() => "?").join(", ");
  await db.execute(`DELETE FROM google_reviews WHERE google_review_name NOT IN (${placeholders})`, seenReviewNames);
};

export const getGoogleReviewSyncStatus = async () => buildStatus();

export const syncGoogleBusinessProfileReviews = async ({ force = false }: { force?: boolean } = {}) => {
  if (!isConfigured()) {
    return {
      ...(await buildStatus()),
      syncedNow: 0,
    };
  }

  if (syncPromise) {
    return syncPromise;
  }

  const now = Date.now();
  const syncIntervalMs = Math.max(5, config.googleBusinessProfile.syncIntervalMinutes) * 60_000;

  if (!force && lastAttemptAtMs && now - lastAttemptAtMs < syncIntervalMs) {
    return {
      ...(await buildStatus()),
      syncedNow: 0,
    };
  }

  lastAttemptAtMs = now;

  syncPromise = (async () => {
    const accessToken = await fetchAccessToken();
    const reviews = await fetchAllGoogleBusinessProfileReviews(accessToken);
    await upsertFetchedReviews(reviews);
    lastError = null;

    return {
      ...(await buildStatus()),
      syncedNow: reviews.length,
    };
  })()
    .catch(async (error) => {
      lastError = error instanceof Error ? error.message : "Google review sync failed.";

      return {
        ...(await buildStatus()),
        syncedNow: 0,
      };
    })
    .finally(() => {
      syncPromise = null;
    }) as Promise<GoogleReviewSyncResult>;

  return syncPromise;
};

export const maybeSyncGoogleBusinessProfileReviews = async () => {
  if (!isConfigured() || !config.googleBusinessProfile.autoSync) {
    return buildStatus();
  }

  return syncGoogleBusinessProfileReviews();
};
