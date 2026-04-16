import type { Metadata } from "next";

export const SITE_NAME = "Squito Pest Control";
export const SITE_URL = "https://squitopestcontrol.com";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  index?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  index = true,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
