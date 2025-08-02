// utils/slugify.ts
export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    // replace spaces and non-alphanumerics with dashes
    .replace(/[^a-z0-9]+/g, '-')
    // collapse multiple dashes
    .replace(/-+/g, '-')
    // remove leading/trailing dash
    .replace(/(^-|-$)/g, '')