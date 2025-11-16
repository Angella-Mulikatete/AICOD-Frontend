import type { ImagePlaceholder } from './image-assets';
import { PlaceHolderImages } from './image-assets';

export interface Partner {
  name: string;
  logo: ImagePlaceholder;
  website: string;
}

export const partners: Partner[] = [
  {
    name: 'Global Wildlife Fund',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-1')!,
    website: '#',
  },
  {
    name: 'Humanity United',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-2')!,
    website: '#',
  },
  {
    name: 'Community Builders Co.',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-3')!,
    website: '#',
  },
  {
    name: 'Eco Warriors Initiative',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-4')!,
    website: '#',
  },
  {
    name: 'Justice For All',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-5')!,
    website: '#',
  },
  {
    name: 'Sustainable Futures Group',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-6')!,
    website: '#',
  },
];
