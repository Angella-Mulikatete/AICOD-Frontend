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
    logo: PlaceHolderImages.find(p => p.id === 'Land.png')!,
    website: '#',
  },
  {
    name: 'SUNMAKERS',
    logo: PlaceHolderImages.find(p => p.id === 'Sunmaker.jpg')!,
    website: '#',
  },
  {
    name: 'Environmental Defenders',
    logo: PlaceHolderImages.find(p => p.id === 'environmental.svg')!,
    website: '#',
  },
  {
    name: 'TERRA FM 95.0 FM',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-4')!,
    website: '#',
  },
  {
    name: 'ACCU',
    logo: PlaceHolderImages.find(p => p.id === 'ACCU_web_logo2.jpg')!,
    website: '#',
  },
  {
    name: 'MIRAC',
    logo: PlaceHolderImages.find(p => p.id === 'partner-logo-6')!,
    website: '#',
  },
];
