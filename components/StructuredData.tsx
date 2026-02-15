export default function StructuredData() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ramadan Meme Generator',
    alternateName: 'تم تعبئة الكرش بنجاح',
    url: 'https://ramadan-meme-generator.vercel.app',
    description: 'Free Ramadan meme generator and gallery',
    inLanguage: ['en', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ramadan-meme-generator.vercel.app/gallery?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ramadan Meme Generator',
    url: 'https://ramadan-meme-generator.vercel.app',
    description: 'Generate and share hilarious Ramadan-themed memes',
    applicationCategory: 'Entertainment',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Random meme generation',
      'Meme gallery',
      'Social sharing',
      'Mobile-friendly',
      'Free to use'
    ]
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ramadan Meme Generator',
    url: 'https://ramadan-meme-generator.vercel.app',
    logo: 'https://ramadan-meme-generator.vercel.app/logo.png',
    sameAs: []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
