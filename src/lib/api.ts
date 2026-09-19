/**
 * Thin client for goldseats-api.
 *
 * Feature modules add typed wrappers here (films in M3, showtimes in M4,
 * recommendations in M5) rather than calling `fetch` from components.
 */

import { env } from "@/lib/env";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly path: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = RequestInit & {
  /** Seconds to cache the response for. Omit to opt out of caching. */
  revalidate?: number;
};

export async function apiFetch<T>(
  path: string,
  { revalidate, ...init }: RequestOptions = {},
): Promise<T> {
  const url = `${env.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...init,
    headers: { Accept: "application/json", ...init.headers },
    next: revalidate === undefined ? { revalidate: 0 } : { revalidate },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      path,
      `Request to ${path} failed with ${response.status}`,
    );
  }

  return (await response.json()) as T;
}

export type ApiHealth = {
  status: string;
  environment: string;
  version: string;
};

/**
 * Returns null instead of throwing: the home page renders fine without the
 * API, it just shows the backend as unreachable.
 */
export async function getApiHealth(): Promise<ApiHealth | null> {
  try {
    return await apiFetch<ApiHealth>("/api/v1/health", { revalidate: 15 });
  } catch {
    return null;
  }
}
