import qs from 'qs';

const API_URL = process.env.STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI(endpoint: string, params = {}) {
  const mergedParams = {
    ...params,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(params);
  const requestUrl = `${API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedParams);
  const data = await response.json();
  return data;
}

export async function getAllServices() {
  const data = await fetchAPI('/api/services');
  return data.data;
}

export async function getLocations() {
  const data = await fetchAPI('/api/locations');
  return data.data;
}

export async function getServiceData(slug: string) {
  const data = await fetchAPI('/api/services', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
  return data.data[0];
}

export async function getLocationData(slug: string) {
  const data = await fetchAPI('/api/locations', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
  return data.data[0];
}

export async function getAllServicesAndLocations() {
  const services = await getAllServices();
  const locations = await getLocations();
  return { services, locations };
}