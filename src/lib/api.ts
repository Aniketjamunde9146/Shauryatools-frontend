/**
 * Base URL of the AI backend. In development it falls back to localhost; in production it must be set
 * (NEXT_PUBLIC_API_URL), otherwise requests fail with a clear message instead of calling localhost from a visitor's browser.
 * Read on each call so the value can be checked in tests.
 */
export function getApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  const url = configured || (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");
  return url.replace(/\/+$/, "");
}

function requireApiUrl(): string {
  const url = getApiUrl();
  if (!url) throw new Error("We're investing in our servers right now. Please try again after some time.");
  return url;
}

const REQUEST_TIMEOUT = 60000;
const MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

/** Shape of the JSON the backend returns; tools read whatever fields they need from it. */
export interface AIResponse {
  success?: boolean;
  error?: string;
  message?: string;
  [key: string]: any;
}

const wait = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

/** A server that answered recently (free hosts stay awake ~15 min after a request) needs no new ping. */
const WAKE_WINDOW_MS = 10 * 60 * 1000;
let warmUpInFlight: Promise<boolean> | null = null;
let lastWokeAt = 0;

/**
 * Sends ONE lightweight request to /health to wake a sleeping backend (free hosts spin down when idle).
 * Requests made while that ping is still running share it, and once it succeeds, nothing else is sent
 * for the next 10 minutes. A failed ping is not remembered, so the next request tries again.
 */
export function warmUpBackend(): Promise<boolean> {
  const url = getApiUrl();
  if (!url) return Promise.resolve(false);
  if (warmUpInFlight) return warmUpInFlight;
  if (Date.now() - lastWokeAt < WAKE_WINDOW_MS) return Promise.resolve(true);

  const ping: Promise<boolean> = fetch(`${url}/health`, { cache: "no-store", signal: AbortSignal.timeout(90000) })
    .then((response) => response.ok)
    .catch(() => false)
    .then((ok) => {
      if (ok) lastWokeAt = Date.now();
      if (warmUpInFlight === ping) warmUpInFlight = null;
      return ok;
    });

  warmUpInFlight = ping;
  return ping;
}

function normalizeInput(tool: string, input: unknown): string {
  if (!/^[A-Za-z0-9_-]+$/.test(tool)) {
    throw new Error("Invalid AI tool name.");
  }

  if (typeof input === "string" && input.trim()) return input.trim();

  if (input && typeof input === "object") {
    return `Generate a professional ${tool} result.

User requirements:
${JSON.stringify(input, null, 2)}

Return only the final result. Do not explain your process.`;
  }

  throw new Error("Please provide complete instructions for the AI tool.");
}

async function request(url: string, options: RequestInit): Promise<Response> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < MAX_RETRIES) {
        await wait(500 * (attempt + 1));
        continue;
      }
      return response;
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        if ((error as Error).name === "AbortError") {
          throw new Error("We're investing in our servers right now. Please try again after some time.");
        }
        throw new Error("We're investing in our servers right now. Please try again after some time.");
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }
  // Unreachable: the last attempt always returns or throws. Keeps the return type honest.
  throw new Error("We're investing in our servers right now. Please try again after some time.");
}

async function parseResponse(response: Response): Promise<AIResponse> {
  const payload: AIResponse = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.error || "We're investing in our servers right now. Please try again after some time.");
  }
  return payload;
}

export const generateAI = async (tool: string, input: unknown): Promise<{ data: AIResponse }> => {
  const completeInput = normalizeInput(tool, input);
  // Make sure the server is awake first, so the real request does not run into a cold start.
  await warmUpBackend();
  const response = await request(`${requireApiUrl()}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool, input: completeInput }),
  });

  return { data: await parseResponse(response) };
};

export async function streamLandingPage(input: unknown, onChunk: (html: string) => void): Promise<string> {
  await warmUpBackend();
  const response = await request(`${requireApiUrl()}/api/ai/landing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: JSON.stringify(input) }),
  });

  if (!response.ok) {
    const payload: AIResponse = await response.json().catch(() => ({}));
    throw new Error(payload.error || "We're investing in our servers right now. Please try again after some time.");
  }

  if (!response.body) throw new Error("We're investing in our servers right now. Please try again after some time.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let html = "";

  const processLine = (line: string): boolean => {
    if (!line.startsWith("data:")) return false;

    const data = line.replace(/^data:\s*/, "");
    if (data === "[DONE]") return true;

    let payload: any;
    try {
      payload = JSON.parse(data);
    } catch {
      return false;
    }
    if (payload.error) throw new Error(payload.error);

    const delta: string = payload.choices?.[0]?.delta?.content || "";
    if (delta) {
      html += delta;
      onChunk(html);
    }
    return false;
  };

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (processLine(line.trim())) {
        if (!html) throw new Error("We're investing in our servers right now. Please try again after some time.");
        return html;
      }
    }
    if (done) break;
  }

  if (buffer.trim()) processLine(buffer.trim());
  if (!html) throw new Error("We're investing in our servers right now. Please try again after some time.");
  return html;
}