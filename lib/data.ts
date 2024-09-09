import servicesData from '@/data/services.json';
import locationsData from '@/data/locations.json';
import serviceLocationData from '@/data/serviceLocations.json';

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
  return serviceLocationData.find(
    item => item.serviceSlug === serviceSlug && item.locationSlug === locationSlug
  );
}

export function getAllServiceLocationSlugs() {
  return serviceLocationData.map(item => ({
    service: item.serviceSlug,
    location: item.locationSlug
  }));
}

export function getAllServicesAndLocations() {
  return { services: servicesData, locations: locationsData };
}

// Add any other necessary data fetching functions