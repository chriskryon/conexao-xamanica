import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://conexao-xamanica.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/onboarding', '/dashboard', '/historico', '/perfil'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
