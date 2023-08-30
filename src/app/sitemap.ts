import { type MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gaievskyi.com",
      lastModified: new Date(),
    },
    {
      url: "https://gaievskyi.com/projects",
      lastModified: new Date(),
    },
    {
      url: "https://gaievskyi.com/contact",
      lastModified: new Date(),
    },
  ]
}
