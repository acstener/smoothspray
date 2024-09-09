import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getServices() {
  const response = await client.getEntries({ content_type: 'service' });
  return response.items.map(item => ({
    slug: item.fields.slug,
    name: item.fields.name,
    description: item.fields.description,
  }));
}

export async function getLocations() {
  const response = await client.getEntries({ content_type: 'location' });
  return response.items.map(item => ({
    slug: item.fields.slug,
    name: item.fields.name,
  }));
}

export async function getServiceData(slug: string) {
  const response = await client.getEntries({ content_type: 'service', 'fields.slug': slug });
  return response.items[0].fields;
}

export async function getLocationData(slug: string) {
  const response = await client.getEntries({ content_type: 'location', 'fields.slug': slug });
  return response.items[0].fields;
}