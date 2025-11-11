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

    if (cleanedHex === '548BF6') {
      return true;
    } else {
      const r = parseInt(cleanedHex.substring(0, 2), 16);
      const g = parseInt(cleanedHex.substring(2, 4), 16);
      const b = parseInt(cleanedHex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      return brightness < 128;
    }
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

export function fileFromPath(path: string): File {
  const name = path.split(/[/\\]/).pop() || 'unknown';
  return new File([path], name, { type: 'text/plain' });
}

export function formatFileSize(size: number): string {
  return `${Math.ceil(size / (1024 * 1024))} MB`;
}

const tailwind500Colors = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
];

export function getRandomTailwind500Color() {
  const randomIndex = Math.floor(Math.random() * tailwind500Colors.length);
  return tailwind500Colors[randomIndex];
}
