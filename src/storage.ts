import { seedPlants } from './seed';
import type { Plant } from './types';

const KEY = 'living-library:plants';

export function loadPlants(): Plant[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Plant[];
  } catch {
    // corrupted data: fall through to seed
  }
  return seedPlants;
}

/** Returns false if the browser refused to store the data (e.g. quota exceeded). */
export function savePlants(plants: Plant[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(plants));
    return true;
  } catch {
    return false;
  }
}

/** Downscale an uploaded image to keep localStorage small. */
export function resizeImage(file: File, maxSize = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    image.src = url;
  });
}
