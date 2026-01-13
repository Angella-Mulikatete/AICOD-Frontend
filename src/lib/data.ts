import type { ImagePlaceholder } from './image-assets';
import { PlaceHolderImages } from './image-assets';

export interface Partner {
  name: string;
  logo: ImagePlaceholder;
  website: string;
}

export const partners: Partner[] = [
  {
    name: 'Land is Life',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-1')!,
    website: '#',
  },
  {
    name: 'SUNMAKERS',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-2')!,
    website: '#',
  },
  {
    name: 'Environmental Defenders',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-3')!,
    website: '#',
  },
  {
    name: 'TERRA FM 95.0 FM',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-4')!,
    website: '#',
  },
  {
    name: 'ACCU',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-5')!,
    website: '#',
  },
  {
    name: 'MIRAC',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-6')!,
    website: '#',
  },
];
