/**
 * Validated environment access.
 *
 * Read config through this module rather than `process.env` directly so a
 * missing variable fails loudly at the edge instead of producing a request to
 * `undefined/api/v1/films`.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  /** Base URL of goldseats-api, no trailing slash. */
  apiBaseUrl: (
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"
  ).replace(/\/+$/, ""),

  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/+$/,
    "",
  ),
} as const;

export { required };
