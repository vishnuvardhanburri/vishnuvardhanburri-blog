import { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.vishnuvardhanburri.in';

    // Base routes
    const routes = [
        '',
        '/about',
        '/experience',
        '/projects',
        '/skills',
        '/achievements',
        '/gallery',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic project routes
    const projectRoutes = portfolioData.projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...projectRoutes];
}
