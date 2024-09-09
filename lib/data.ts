import { promises as fs } from 'fs';
import path from 'path';

const servicesDirectory = path.join(process.cwd(), 'data/services');
const servicesJsonPath = path.join(process.cwd(), 'data/services.json');

export async function getAllServices() {
  console.log("Fetching all services");
  try {
    const content = await fs.readFile(servicesJsonPath, 'utf8');
    const services = JSON.parse(content);
    console.log("Fetched services:", services);
    return services;
  } catch (error) {
    console.error("Error in getAllServices:", error);
    return [];
  }
}

interface ServiceLocation {
  slug?: string;
  title?: string;
  introduction?: string;
  localizedDescription?: string;
  whyChooseUs?: string[];
  recentProjects?: Array<{ title: string; description: string }>;
  testimonials?: Array<{ text: string; author: string }>;
  pricingInfo?: string;
  serviceAreas?: string[];
  faq?: Array<{ question: string; answer: string }>;
  aboutUs?: string;
  relatedServices?: string[];
}

interface ServiceData {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageId: string; // Add this line
  locations: ServiceLocation[];
  // Add other properties as needed
  subServices: string[];
  introduction: string;
  benefits: Array<{ title: string; description: string }>;
  whyChooseUs: Array<{ title: string; description: string }>;
  process: string[];
  materialsAndFinishes: Array<{ title: string; description: string }>;
  beforeAfterGallery: Array<{ before: string; after: string; description: string }>;
  faq: Array<{ question: string; answer: string }>;
  elementsWeSpray: Array<{ element: string; description: string }>;
  professionalBenefits: Array<{ benefit: string; description: string }>;
  maintenanceAndCare: { description: string; longevity: string };
  customerTestimonials: Array<{ quote: string; author: string }>;
  pricingInfo: string;
  environmentalCommitment: { ecoFriendlyOptions: string; wasteReduction: string };
}

export async function getServiceData(slug: string): Promise<ServiceData | null> {
  console.log("Fetching service data for slug:", slug);
  try {
    const filePath = path.join(servicesDirectory, `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf8');
    const service = JSON.parse(content);
    console.log("Found service data:", service);
    return service;
  } catch (error) {
    console.error(`Error fetching service data for ${slug}:`, error);
    return null;
  }
}

export async function getServiceLocationData(serviceSlug: string, locationSlug: string): Promise<ServiceLocation | null> {
  const serviceData = await getServiceData(serviceSlug);
  if (!serviceData || !serviceData.locations) {
    console.warn(`No locations found for service: ${serviceSlug}`);
    return null;
  }
  return serviceData.locations.find((location: ServiceLocation) => location.slug === locationSlug) || null;
}

export async function getAllServiceLocationSlugs() {
  const services = await getAllServices();
  const slugs = [];
  
  for (const service of services) {
    const serviceData = await getServiceData(service.slug);
    if (serviceData && serviceData.locations && Array.isArray(serviceData.locations)) {
      for (const location of serviceData.locations) {
        slugs.push({
          service: service.slug,
          location: location.slug
        });
      }
    } else {
      console.warn(`No valid location data found for service: ${service.slug}`);
    }
  }
  
  return slugs;
}