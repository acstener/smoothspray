import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

const imageCache: Record<string, UnsplashImage | UnsplashImage[]> = {};

interface UnsplashImage {
  urls: {
    regular: string;
  };
  // Add other properties as needed
}

export async function getSpecificImage(imageId: string): Promise<UnsplashImage | null> {
  try {
    const result = await unsplash.photos.get({ photoId: imageId });
    if (result.type === 'success') {
      return result.response;
    } else {
      console.error('Error fetching specific image from Unsplash:', result.errors);
      return null;
    }
  } catch (error) {
    console.error('Error fetching specific image from Unsplash:', error);
    return null;
  }
}

export async function getRandomImage(query: string, count: number = 1): Promise<UnsplashImage | UnsplashImage[] | null> {
  const cacheKey = `${query}_${count}`;
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  try {
    console.log('Fetching image from Unsplash with query:', query);
    const result = await unsplash.photos.getRandom({
      query,
      count,
    });

    if (result.type === 'success') {
      console.log('Successfully fetched image from Unsplash');
      const response = count === 1 ? result.response as UnsplashImage : result.response as UnsplashImage[];
      imageCache[cacheKey] = response;
      return response;
    } else {
      console.error('Error fetching image from Unsplash:', result.errors);
      return null;
    }
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
}