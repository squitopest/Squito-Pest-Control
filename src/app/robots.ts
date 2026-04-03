import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success'],
    },
    sitemap: 'https://getsquito.com/sitemap.xml',
  }
}
