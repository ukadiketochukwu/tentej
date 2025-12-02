
import { GalleryItem } from './types';

// ==================================================================================
// HOW TO CHANGE IMAGES:
// 1. Place your image files in your project's public/assets folder.
// 2. Change the 'src' or 'image' field below to match your filename.
//    Example: src: '/assets/my-cool-photo.jpg'
// ==================================================================================

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- FEATURED: "Uploaded" Green Shirt Vibe (Large) ---
  {
    id: '1',
    type: 'image',
    src: 'images/tej.jpeg', // <--- REPLACE THIS
    alt: 'Tejiri Portrait',
    span: 'md:col-span-2 md:row-span-2',
    caption: 'Tejiri Vision'
  },
  {
    id: '2',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Modular Synth Setup',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Eurorack Patching'
  },
  // --- FEATURED: "Uploaded" Denim Vibe (Tall) ---
  {
    id: '3',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Studio Flow',
    span: 'md:col-span-1 md:row-span-2',
    caption: 'The Process'
  },
  {
    id: '4',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Microphone Detail',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Vocal Chain'
  },
  {
    id: '5',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Studio Monitors',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Mixing "Canopy"'
  },
  // --- ROW 3 ---
  {
    id: '6',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Smoke and Light',
    span: 'md:col-span-2 md:row-span-1',
    caption: 'Visual R&D'
  },
  // --- REPEAT: Green Shirt Vibe (Different Size - Standard) ---
  {
    id: '7',
    type: 'image',
    src: 'images/tej.jpeg', 
    alt: 'Tejiri Portrait',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Focus'
  },
  {
    id: '8',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Synth Keys',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Late Night Keys'
  },
  // --- FEATURED: Close Up Vibe (Square) ---
  {
    id: '9',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Detail Shot',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Details'
  },
  {
    id: '10',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Mixing Desk',
    span: 'md:col-span-2 md:row-span-2',
    caption: 'The Lab'
  },
  {
    id: '11',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Festival Stage',
    span: 'md:col-span-1 md:row-span-2',
    caption: 'Soundcheck'
  },
  // --- REPEAT: Denim Vibe (Different Size - Wide) ---
  {
    id: '12',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Studio Flow',
    span: 'md:col-span-2 md:row-span-1',
    caption: 'Creative State'
  },
  {
    id: '13',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Abstract Art',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Cover Art Process'
  },
  {
    id: '14',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Notebook',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Notes & Lyrics'
  },
  {
    id: '15',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Dark Texture',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Mood Board'
  },
  // --- REPEAT: Green Vibe (Different Size - Standard) ---
  {
    id: '16',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Portrait',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Reflections'
  },
  {
    id: '17',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Camera Film',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Analog Memories'
  },
  {
    id: '18',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Concrete Texture',
    span: 'md:col-span-2 md:row-span-1',
    caption: 'Urban Decay'
  },
  {
    id: '19',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Headphones',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Reference Check'
  },
  // --- REPEAT: Close Up (Different Size) ---
  {
    id: '20',
    type: 'image',
    src: 'images/tej.jpeg',
    alt: 'Close Up',
    span: 'md:col-span-1 md:row-span-1',
    caption: 'Raw'
  }
];

export const LATEST_TRACKS = [
  {
    title: "Dim My Light",
    artist: "Chrissy Pratt",
    year: "2024",
    images: [
      "images/tej.jpeg",
      "images/girl.webp",
      "images/garden.jpg",
    ],
    spotifySrc: "https://open.spotify.com/embed/track/0mImoYj3hD2OhZLdWeUJmZ?utm_source=generator"
  },
  {
    title: "Garden",
    artist: "Qing Madi",
    year: "2024",
    images: [
      "images/tej.jpeg",
      "images/girl.webp",
      "images/garden.jpg",
    ],
    spotifySrc: "https://open.spotify.com/embed/track/12xtrMSwKrdTJfiX42hG6T?utm_source=generator"
  },
  {
    title: "Wait For U",
    artist: "Future, Drake & Tems",
    year: "2023",
    images: [
      "images/tej.jpeg",
      "images/girl.webp",
      "images/garden.jpg",
    ],
    spotifySrc: "https://open.spotify.com/embed/track/59nOXPmaKlBfGMDeOVGrIK?utm_source=generator"
  },
  {
    title: "Higher",
    artist: "Tems",
    year: "2023",
    images: [
      "images/tej.jpeg",
      "images/girl.webp",
      "images/garden.jpg",
    ],
    spotifySrc: "https://open.spotify.com/embed/track/2QdSb68BzZGMgCbsrFmSLc?utm_source=generator"
  },
  {
    title: "Maybe Baby",
    artist: "Tolani",
    year: "2023",
    images: [
      "images/tej.jpeg",
      "images/girl.webp",
      "images/garden.jpg",
    ],
    spotifySrc: "https://open.spotify.com/embed/track/0Geeg6BAKYv4NIvbN3kgEf?utm_source=generator" 
  },
  {
    title: "Love Me Down",
    artist: "Oddio Tribe & Tems",
    year: "2023",
    images: [
      "images/tej.jpeg",
      "images/girl.webp",
      "images/garden.jpg",
    ],
    spotifySrc: "https://open.spotify.com/embed/track/5AR6EhlAlatROLwOs0wKIg?utm_source=generator"
  }
];
