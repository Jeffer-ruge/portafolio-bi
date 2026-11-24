export function sitePath(path: `/${string}`) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export function siteUrl(path: `/${string}`, origin: string) {
  return new URL(sitePath(path), origin).href;
}
