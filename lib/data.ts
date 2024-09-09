import servicesData from '@/data/services.json';
import locationsData from '@/data/locations.json';
import serviceLocationData from '@/data/service-locations.json';

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
  const serviceData = serviceLocationData[serviceSlug];
  if (serviceData && serviceData.locations) {
    return serviceData.locations.find(location => location.slug === locationSlug);
  }
  return null;
}

export function getAllServiceLocationSlugs() {
  const slugs = [];
  for (const [serviceSlug, serviceData] of Object.entries(serviceLocationData)) {
    if (serviceData.locations) {
      for (const location of serviceData.locations) {
        slugs.push({
          service: serviceSlug,
          location: location.slug
        });
      }
    }
  }
  return slugs;
}

export function getAllServicesAndLocations() {
  return { services: servicesData, locations: locationsData };
}

// Add any other necessary data fetching functions