export function privateHead(title: string, description: string, path: string, image?: string) {
  const url = `https://adventureholiday.co.in${path}`;
  return { links: [{ rel: "canonical", href: url }], meta: [
    { title }, { name: "description", content: description }, { property: "og:title", content: title },
    { property: "og:description", content: description }, { property: "og:type", content: "website" },
    { property: "og:url", content: url }, { name: "twitter:card", content: "summary_large_image" },
    ...(image?.startsWith("https://") ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
  ] };
}