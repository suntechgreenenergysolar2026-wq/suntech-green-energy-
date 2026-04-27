import { config } from "./config.js";

type OAuthTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleApiErrorResponse = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

type BusinessProfileAccount = {
  name: string;
  accountName?: string;
  type?: string;
};

type ListAccountsResponse = GoogleApiErrorResponse & {
  accounts?: BusinessProfileAccount[];
  nextPageToken?: string;
};

type BusinessProfileLocation = {
  name: string;
  title?: string;
  primaryPhone?: string;
  websiteUrl?: string;
  storefrontAddress?: {
    addressLines?: string[];
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
  };
};

type ListLocationsResponse = GoogleApiErrorResponse & {
  locations?: BusinessProfileLocation[];
  nextPageToken?: string;
};

type ListReviewsResponse = GoogleApiErrorResponse & {
  averageRating?: number;
  totalReviewCount?: number;
  reviews?: Array<{
    name?: string;
    comment?: string;
    starRating?: string;
    reviewer?: {
      displayName?: string;
    };
  }>;
};

const requiredKeys = [
  "GOOGLE_BUSINESS_PROFILE_CLIENT_ID",
  "GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET",
  "GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN",
] as const;

const missingRequiredKeys = requiredKeys.filter((key) => {
  switch (key) {
    case "GOOGLE_BUSINESS_PROFILE_CLIENT_ID":
      return !config.googleBusinessProfile.clientId;
    case "GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET":
      return !config.googleBusinessProfile.clientSecret;
    case "GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN":
      return !config.googleBusinessProfile.refreshToken;
    default:
      return true;
  }
});

const formatAddress = (location: BusinessProfileLocation) => {
  const address = location.storefrontAddress;

  if (!address) {
    return "No storefront address returned";
  }

  const parts = [
    ...(address.addressLines ?? []),
    address.locality,
    address.administrativeArea,
    address.postalCode,
  ].filter(Boolean);

  return parts.join(", ");
};

const googleFetchJson = async <T>(url: URL | string, accessToken: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = (await response.json()) as T & GoogleApiErrorResponse;

  if (!response.ok) {
    const message =
      payload.error?.message ||
      `Google API request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return payload;
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
    throw new Error(payload.error_description || payload.error || "Failed to refresh Google OAuth token.");
  }

  return payload.access_token;
};

const fetchAccounts = async (accessToken: string) => {
  const accounts: BusinessProfileAccount[] = [];
  let nextPageToken = "";

  do {
    const url = new URL("https://mybusinessaccountmanagement.googleapis.com/v1/accounts");
    if (nextPageToken) {
      url.searchParams.set("pageToken", nextPageToken);
    }

    const payload = await googleFetchJson<ListAccountsResponse>(url, accessToken);
    accounts.push(...(payload.accounts ?? []));
    nextPageToken = payload.nextPageToken ?? "";
  } while (nextPageToken);

  return accounts;
};

const fetchLocationsForAccount = async (accessToken: string, accountName: string) => {
  const locations: BusinessProfileLocation[] = [];
  let nextPageToken = "";

  do {
    const url = new URL(`https://mybusiness.googleapis.com/v4/${accountName}/locations`);
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("orderBy", "title");
    if (nextPageToken) {
      url.searchParams.set("pageToken", nextPageToken);
    }

    const payload = await googleFetchJson<ListLocationsResponse>(url, accessToken);
    locations.push(...(payload.locations ?? []));
    nextPageToken = payload.nextPageToken ?? "";
  } while (nextPageToken);

  return locations;
};

const fetchConfiguredLocationReviewSummary = async (accessToken: string, locationName: string) => {
  const url = new URL(`https://mybusiness.googleapis.com/v4/${locationName}/reviews`);
  url.searchParams.set("pageSize", "5");
  url.searchParams.set("orderBy", "updateTime desc");
  return googleFetchJson<ListReviewsResponse>(url, accessToken);
};

const main = async () => {
  if (missingRequiredKeys.length > 0) {
    console.error("Missing required Google review credentials in .env:");
    for (const key of missingRequiredKeys) {
      console.error(`- ${key}`);
    }
    console.error("");
    console.error("Add those values, then run `npm run google:reviews:setup` again.");
    process.exitCode = 1;
    return;
  }

  console.log("Checking Google Business Profile access...");
  const accessToken = await fetchAccessToken();
  console.log("OAuth refresh token worked.");

  const accounts = await fetchAccounts(accessToken);
  console.log(`Found ${accounts.length} accessible Business Profile account(s).`);

  if (accounts.length === 0) {
    console.log("No accessible Business Profile accounts were returned for this Google user.");
    return;
  }

  for (const account of accounts) {
    console.log("");
    console.log(`Account: ${account.accountName || "(no account name)"} [${account.type || "UNKNOWN"}]`);
    console.log(`Resource: ${account.name}`);

    const locations = await fetchLocationsForAccount(accessToken, account.name);

    if (locations.length === 0) {
      console.log("  No accessible locations in this account.");
      continue;
    }

    for (const location of locations) {
      console.log(`  - ${location.title || "(untitled location)"}`);
      console.log(`    GOOGLE_BUSINESS_PROFILE_LOCATION_NAME=${location.name}`);
      console.log(`    Address: ${formatAddress(location)}`);
      if (location.primaryPhone) {
        console.log(`    Phone: ${location.primaryPhone}`);
      }
      if (location.websiteUrl) {
        console.log(`    Website: ${location.websiteUrl}`);
      }
    }
  }

  if (config.googleBusinessProfile.locationName) {
    console.log("");
    console.log(`Checking configured review source: ${config.googleBusinessProfile.locationName}`);
    const summary = await fetchConfiguredLocationReviewSummary(accessToken, config.googleBusinessProfile.locationName);
    const total = summary.totalReviewCount ?? summary.reviews?.length ?? 0;
    const average = typeof summary.averageRating === "number" ? summary.averageRating.toFixed(1) : "n/a";
    console.log(`Configured location is reachable. Google reports ${total} review(s), average rating ${average}.`);

    const latestReview = summary.reviews?.[0];
    if (latestReview?.reviewer?.displayName) {
      console.log(
        `Latest returned review: ${latestReview.reviewer.displayName} (${latestReview.starRating || "unrated"})`,
      );
    }
  } else {
    console.log("");
    console.log("Next step:");
    console.log("1. Copy the correct GOOGLE_BUSINESS_PROFILE_LOCATION_NAME from the list above into `.env`.");
    console.log("2. Restart the backend.");
    console.log("3. Open /admin -> Testimonials CMS -> Sync Google Reviews Now.");
  }
};

main().catch((error) => {
  console.error("Google Business Profile setup check failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
