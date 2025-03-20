import { MetadataRoute } from 'next'
import { getAllServices } from '@/lib/data';

const BASE_URL = 'http://smoothspray.co.uk';

// Add this interface to define the shape of a service
interface Service {
  slug: string;
  // Add other properties if needed
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServices();
  const locations = [
    'bromley', 'beckenham', 'croydon', 'orpington', 'hayes', 'penge', 'sydenham',
    'crystal-palace', 'south-norwood', 'elmers-end', 'chislehurst', 'biggin-hill',
    'addington', 'shirley', 'coney-hall', 'shortlands', 'petts-wood', 'new-addington',
    'keston', 'downham', 'west-wickham'
  ];

  const staticPages = [
    '',
    '/services',
    '/about',
    '/blog',
    '/faq',
    '/get-a-quote'
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8
  }));

  const servicePages = services.map((service: Service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const locationPages = services.flatMap((service: Service) =>
    locations.map(location => ({
      url: `${BASE_URL}/services/${service.slug}/${location}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  );

  return [...staticPages, ...servicePages, ...locationPages];
}