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
