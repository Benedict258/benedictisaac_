import { useEffect } from "react";
import { SITE_URL, site } from "@/data/site";

type SeoProps = {
  title: string;
  description: string;
  /** Path such as "/projects". Used for the canonical URL and og:url. */
  path?: string;
  image?: string;
  noindex?: boolean;
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const removeMeta = (attr: "name" | "property", key: string) => {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
};

/** Sets the document title and meta tags. Runs in the browser and during prerendering. */
export function Seo({ title, description, path = "/", image = "/og-image.png", noindex }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "" : path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    if (noindex) setMeta("name", "robots", "noindex, nofollow");
    else removeMeta("name", "robots");
  }, [title, description, path, image, noindex]);

  return null;
}

export const defaultTitle = `${site.name}, ${site.title}`;
