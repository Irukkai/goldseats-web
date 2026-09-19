import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError, apiFetch, getApiHealth } from "@/lib/api";

function mockFetch(response: Partial<Response> & { json?: () => unknown }) {
  const spy = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
    ...response,
  });
  vi.stubGlobal("fetch", spy);
  return spy;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiFetch", () => {
  it("prefixes the configured API base URL", async () => {
    const fetchSpy = mockFetch({ json: async () => ({ ok: true }) });

    await apiFetch("/api/v1/health");

    expect(fetchSpy.mock.calls[0][0]).toBe("http://localhost:8000/api/v1/health");
  });

  it("tolerates a path without a leading slash", async () => {
    const fetchSpy = mockFetch({ json: async () => ({}) });

    await apiFetch("api/v1/health");

    expect(fetchSpy.mock.calls[0][0]).toBe("http://localhost:8000/api/v1/health");
  });

  it("throws ApiError carrying the status and path", async () => {
    mockFetch({ ok: false, status: 503 });

    await expect(apiFetch("/api/v1/ready")).rejects.toMatchObject({
      name: "ApiError",
      status: 503,
      path: "/api/v1/ready",
    });
  });

  it("opts out of caching unless a revalidate window is given", async () => {
    const fetchSpy = mockFetch({ json: async () => ({}) });

    await apiFetch("/api/v1/health");
    expect(fetchSpy.mock.calls[0][1]).toMatchObject({ next: { revalidate: 0 } });

    await apiFetch("/api/v1/health", { revalidate: 60 });
    expect(fetchSpy.mock.calls[1][1]).toMatchObject({ next: { revalidate: 60 } });
  });
});

describe("getApiHealth", () => {
  it("returns the payload when the API is up", async () => {
    mockFetch({
      json: async () => ({ status: "ok", environment: "local", version: "0.1.0" }),
    });

    await expect(getApiHealth()).resolves.toEqual({
      status: "ok",
      environment: "local",
      version: "0.1.0",
    });
  });

  it("returns null rather than throwing when the API is down", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));

    await expect(getApiHealth()).resolves.toBeNull();
  });
});

describe("ApiError", () => {
  it("is an Error subclass", () => {
    expect(new ApiError(500, "/x", "boom")).toBeInstanceOf(Error);
  });
});
