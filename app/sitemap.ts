import { getAllServices } from '@/lib/data';

const BASE_URL = 'http://smoothspray.co.uk';

// Add this interface to define the shape of a service
interface Service {
  slug: string;
  // Add other properties if needed
}

export default async function sitemap() {
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
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const servicePages = services.map((service: Service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const locationPages = services.flatMap((service: Service) =>
    locations.map(location => ({
      url: `${BASE_URL}/services/${service.slug}/${location}`,
      lastModified: new Date().toISOString(),
    }))
  );

  return [...staticPages, ...servicePages, ...locationPages];
}