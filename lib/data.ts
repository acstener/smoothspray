import { promises as fs } from 'fs';
import path from 'path';

const servicesPath = path.join(process.cwd(), 'data/services.json');
const servicesDirectory = path.join(process.cwd(), 'data/services');

export async function getAllServices() {
  try {
    const content = await fs.readFile(servicesPath, 'utf8');
    const services = JSON.parse(content);
    return services;
  } catch (error) {
    console.error("Error in getAllServices:", error);
    return [];
  }
}

export async function getServiceData(slug: string) {
  try {
    const filePath = path.join(servicesDirectory, `${slug}.json`);
    console.log("Attempting to read file:", filePath);
    const content = await fs.readFile(filePath, 'utf8');
    console.log("File content:", content);
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error getting service data for ${slug}:`, error);
    // Return a default structure if the file doesn't exist
    return {
      slug: slug,
      locations: []
    };
  }
}

export async function getServiceLocationData(serviceSlug: string, locationSlug: string) {
  const serviceData = await getServiceData(serviceSlug);
  return serviceData.locations.find(location => location.slug === locationSlug);
}

export async function getAllServiceLocationSlugs() {
  const serviceFiles = await fs.readdir(servicesDirectory);
  const slugs = [];
  
  for (const file of serviceFiles) {
    const content = await fs.readFile(path.join(servicesDirectory, file), 'utf8');
    const service = JSON.parse(content);
    
    for (const location of service.locations) {
      slugs.push({
        service: service.slug,
        location: location.slug
      });
    }
  }
  
  return slugs;
}

export async function getLocations() {
  const content = await fs.readFile(locationsPath, 'utf8');
  return JSON.parse(content);
}

export async function getLocationData(slug: string) {
  const locations = await getLocations();
  return locations.find(location => location.slug === slug);
}