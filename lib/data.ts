import locationsData from '@/data/locations.json';
import servicesData from '@/data/services.json';
import serviceLocationsData from '@/data/service-locations.json';

export function getAllServices() {
  return servicesData;
}

export function getLocations() {
  return locationsData;
}

export function getServiceData(slug: string) {
  return servicesData.find(service => service.slug === slug);
}

export function getLocationData(slug: string) {
  return locationsData.find(location => location.slug === slug);
}

export function getServiceLocationData(serviceSlug: string, locationSlug: string) {
  const service = serviceLocationsData[serviceSlug as keyof typeof serviceLocationsData];
  if (service) {
    return service.locations.find(location => location.slug === locationSlug);
  }
  return null;
}

export function getAllServiceLocationSlugs() {
  const slugs: { service: string; location: string }[] = [];
  Object.entries(serviceLocationsData).forEach(([serviceSlug, serviceData]) => {
    serviceData.locations.forEach(location => {
      slugs.push({ service: serviceSlug, location: location.slug });
    });
  });
  return slugs;
}