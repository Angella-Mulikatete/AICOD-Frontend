
import placeholderData from './image-assets.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Type assertion with validation
const data = placeholderData as { placeholderImages: ImagePlaceholder[] };

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

// Helper function to find image by id with type safety
export function getPlaceholderImage(id: string): ImagePlaceholder | undefined {
  return PlaceHolderImages.find((img) => img.id === id);
}

// Helper function to get images by prefix
export function getPlaceholderImagesByPrefix(prefix: string): ImagePlaceholder[] {
  return PlaceHolderImages.filter((img) => img.id.startsWith(prefix));
}