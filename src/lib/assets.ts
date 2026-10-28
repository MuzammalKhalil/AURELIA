/**
 * Resolves static assets (like 3D GLB models and fonts)
 * with seamless support for subpath hosting (such as GitHub Pages /AURELIA/)
 * as well as standard root hosting and local development.
 */
export function getAssetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
