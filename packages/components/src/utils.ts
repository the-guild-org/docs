export function withoutTrailingSlash(v: string) {
  if (v === '/') return v;
  if (v.endsWith('/')) return v.slice(0, v.length - 1);
  return v;
}

export function withStartingSlash(v: string) {
  if (v.startsWith('/')) return v;
  return `/${v}`;
}

export function withoutStartingSlash(v: string) {
  if (v === '/') return v;
  if (v.startsWith('/')) return v.slice(1, v.length);
  return v;
}
