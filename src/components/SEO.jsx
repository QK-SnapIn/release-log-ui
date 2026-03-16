import { Helmet } from 'react-helmet-async';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://releaslyy.com';

export default function SEO({
  title,
  description,
  keywords,
  ogImage = '/OG-image.png',
  ogType = 'website',
  canonical,
  children,
}) {
  const fullTitle = `${title} | Releaslyy`;
  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage}`;
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  return (
    <Helmet>
      <title>{fullTitle}</title>

      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Releaslyy" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {children}
    </Helmet>
  );
}
