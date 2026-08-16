export function unwrapEntities<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response.map((item) => {
      if (item && typeof item === "object" && "item" in item) {
        return (item as { item: T }).item;
      }

      return item as T;
    });
  }

  if (response && typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data;

    if (Array.isArray(data)) {
      return unwrapEntities<T>(data);
    }

    if (data && typeof data === "object" && "items" in data) {
      return unwrapEntities<T>(data);
    }
  }

  if (response && typeof response === "object" && "items" in response) {
    const items = (response as { items?: unknown }).items;

    if (Array.isArray(items)) {
      return unwrapEntities<T>(items);
    }
  }

  return [];
}
