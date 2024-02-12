export const decode = (s: string) => {
  return decodeURIComponent(s)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
};
