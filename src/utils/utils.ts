import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function getFileInfoFromUrls(urls: string[]): Promise<string> {
  const sizes = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url, { method: 'HEAD' });
      const size = res.headers.get('Content-Length');
      return size ? parseInt(size, 10) : 0;
    }),
  );

  const totalSizeMB = sizes.reduce((a, b) => a + b, 0) / (1024 * 1024);
  return `${urls.length} فایل - ${totalSizeMB.toFixed(2)} MB`;
}

export function getFileCategory(
  filePath: string,
): 'voice' | 'image' | 'video' | 'document' | 'other' {
  const extMatch = filePath.match(/\.([0-9a-zA-Z]+)(?:\?.*)?$/);
  if (!extMatch) return 'other';

  const ext = extMatch[1].toLowerCase();

  const images = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
  const videos = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  const voices = ['mp3', 'wav', 'ogg', 'm4a', 'flac'];
  const documents = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];

  if (images.includes(ext)) return 'image';
  if (videos.includes(ext)) return 'video';
  if (voices.includes(ext)) return 'voice';
  if (documents.includes(ext)) return 'document';

  return 'other';
}

export function toPercentage(value: number, max: number = 80): number {
  if (value <= 0) return 0;
  if (value >= max) return 100;
  return (value / max) * 100;
}

export function isColorDark(hex: string | undefined): boolean {
  if (hex) {
    const cleanedHex = hex.replace('#', '');
    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128;
  } else {
    return false;
  }
}

export function hexToRgba(hex: string | undefined, opacity: number): string {
  if (hex) {
    const clampedOpacity = Math.max(0, Math.min(opacity, 1));
    const cleanedHex = hex.replace('#', '');
    const fullHex =
      cleanedHex.length === 3
        ? cleanedHex
            .split('')
            .map((c) => c + c)
            .join('')
        : cleanedHex;
    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
  } else {
    return '#000000';
  }
}
