import { writable } from 'svelte/store';

export interface Advertisement {
  id: string;
  image: string;
  href: string;
  active: boolean;
}

export const ads: Advertisement[] = [
//   {
//     id: 'auth0-ad',
//     image: '/ad/auth0.png',
//     href: 'https://auth0.com',
//     active: true
//   },
//   {
//     id: 'vercel-ad',
//     image: '/ad/auth0.png',
//     href: 'https://auth0.com',
//     active: true
//   },
//   {
//     id: 'stripe-ad',
//     image: '/ad/auth0.png',
//     href: 'https://auth0.com',
//     active: true
//   }
];

export const adsStore = writable(ads);

// Helper function to get random active ad
export function getRandomAd(): Advertisement {
  const activeAds = ads.filter(ad => ad.active);
  const randomIndex = Math.floor(Math.random() * activeAds.length);
  return activeAds[randomIndex];
}