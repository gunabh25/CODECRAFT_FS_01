// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateEmail(email: string, maxLength: number = 20): string {
  if (email.length <= maxLength) return email;
  const [localPart, domain] = email.split('@');
  const truncatedLocal = localPart.slice(0, maxLength - domain.length - 4);
  return `${truncatedLocal}...@${domain}`;
}