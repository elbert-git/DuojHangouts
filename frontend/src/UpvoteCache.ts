interface UpvoteHistoryCache {
  data: Array<string>;
}

/**
 * Simple client‑side cache that stores up‑voted hangout IDs in
 * `localStorage`. The cache is kept in memory (`static cache`) for fast
 * look‑ups and persisted to `localStorage` on each change.
 */
export class UpvoteHistory {
  /** Key used for persisting the cache in localStorage */
  static localStorageKey = "upvoteCache";

  /** In‑memory representation of the cache */
  static cache: UpvoteHistoryCache = { data: [] };
  /** Maximum number of stored IDs to keep cache bounded */
  static MAX_ENTRIES = 200;

  /** Load the cache from localStorage (if present). */
  static init() {
    const raw = localStorage.getItem(this.localStorageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Keep only string entries – defensive programming.
          this.cache.data = parsed.filter(
            (v): v is string => typeof v === "string",
          );
        } else {
          this.cache.data = [];
        }
      } catch {
        this.cache.data = [];
      }
    } else {
      this.cache.data = [];
    }
  }

  /** Add an ID to the cache and persist it.
   * Duplicate IDs are ignored. The cache size is capped to avoid
   * unbounded growth (default 200 entries).
   */
  static saveId(id: string) {
    if (!this.isIDInHistory(id)) {
      this.cache.data.push(id);
       if (this.cache.data.length > this.MAX_ENTRIES) {
         this.cache.data = this.cache.data.slice(-this.MAX_ENTRIES);
       }
      try {
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify(this.cache.data),
        );
      } catch (e) {
        console.error("Failed to save upvote cache", e);
      }
    }
  }

  /** Return true if the given ID is already stored in the cache. */
  static isIDInHistory(id: string) {
    return this.cache.data.includes(id);
  }

  /** Get a copy of the stored IDs. */
  static getHistory() {
    return [...this.cache.data];
  }
}
