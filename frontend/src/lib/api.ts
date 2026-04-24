const defaultApiBase = import.meta.env.DEV ? "" : "https://api.benedictisaac.dev";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? defaultApiBase).replace(/\/$/, "");

export const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
};
