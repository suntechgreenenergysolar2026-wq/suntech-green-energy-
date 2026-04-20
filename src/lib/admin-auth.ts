import type { AdminSessionResponse } from "@/lib/api";

const STORAGE_KEY = "suntek.admin.session";

export const loadAdminSession = (): AdminSessionResponse | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AdminSessionResponse;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const saveAdminSession = (session: AdminSessionResponse) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const clearAdminSession = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

export const getAdminToken = () => loadAdminSession()?.token ?? "";
