import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function useSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to get or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to get or create link tag
    const setLinkTag = (rel: string, href: string) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Metas
    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    
    // Robots
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // 3. OpenGraph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", window.location.href);
    
    const resolvedOgImage = ogImage || `${window.location.origin}/landing_hero.png`;
    setMetaTag("property", "og:image", resolvedOgImage);

    // 4. Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", resolvedOgImage);

    // 5. Canonical Link
    const currentCanonical = canonicalUrl || window.location.href;
    setLinkTag("canonical", currentCanonical);

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noindex]);
}
export default useSEO;
