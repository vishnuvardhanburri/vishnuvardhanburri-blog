import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vishnu Vardhan Burri | Portfolio',
    short_name: 'Vishnu',
    description: 'Founder & CEO at XAVIRA Technologies | Principal Architect',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1117',
    theme_color: '#0d1117',
    icons: [
      {
        src: '/vishnuvardhanburri_dark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
