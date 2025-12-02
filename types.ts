
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Release {
  id: string;
  title: string;
  type: 'Single' | 'EP' | 'Album';
  year: string;
  image: string;
  description: string;
  link?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string; // The main source (High res image or Video file path)
  thumbnail?: string; // Optional: Image to show in grid for videos
  alt: string;
  span?: string; // Tailwind grid span classes
  caption?: string;
}

export interface TourDate {
  id: string;
  city: string;
  venue: string;
  date: string;
  status: 'Available' | 'Sold Out' | 'Selling Fast';
}

export enum Section {
  HERO = 'hero',
  GALLERY = 'gallery',
  RELEASES = 'releases',
  ABOUT = 'about',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
