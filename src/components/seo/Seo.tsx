import { Helmet } from 'react-helmet-async';
import { site } from '@/config/site';
import { canonical } from '@/lib/seo';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  /** Relative or absolute OG image URL. Defaults to the brand card. */
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  /** Any number of JSON-LD schema objects to embed. */
  schemas?: Record<string, unknown>[];
  /** Article-specific metadata. */
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Single source of per-page head metadata: title, description, canonical,
 * Open Graph, Twitter cards, robots, and JSON-LD structured data.
 */
export function Seo({
  title,
  description = site.description,
  path = '/',
  image = site.logos.color,
  type = 'website',
  noindex = false,
  schemas = [],
  publishedTime,
  modifiedTime,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const url = canonical(path);
  const ogImage = image.startsWith('http') ? image : canonical(image);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={site.locale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
