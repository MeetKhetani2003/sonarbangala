import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://www.hotelshonarbangla.in/sitemap.xml',
    host: 'https://www.hotelshonarbangla.in',
  }
}
