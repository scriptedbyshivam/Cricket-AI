type Entry = { value: string; expiresAt: number };

const cache = new Map<string, Entry>();
const ttl = 5 * 60 * 1000;

export function getCached(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCached(key: string, value: string) {
  cache.set(key, { value, expiresAt: Date.now() + ttl });
}
