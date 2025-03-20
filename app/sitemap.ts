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
    '/blog',
    '/faq',
    '/get-a-quote'
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    // Each static page is its own canonical URL
    alternates: {
      canonical: `${BASE_URL}${route}`
    }
  }));

  const servicePages = services.map((service: Service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    // Service pages are their own canonical URLs
    alternates: {
      canonical: `${BASE_URL}/services/${service.slug}`
    }
  }));

  const locationPages = services.flatMap((service: Service) =>
    locations.map(location => ({
      url: `${BASE_URL}/services/${service.slug}/${location}`,
      lastModified: new Date().toISOString(),
      // Location pages have their parent service page as canonical URL
      alternates: {
        canonical: `${BASE_URL}/services/${service.slug}`
      }
    }))
  );

  return [...staticPages, ...servicePages, ...locationPages];
}