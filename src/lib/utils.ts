import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export async function tryCatch<T>(
  fn: () => Promise<T>,
): Promise<[Error | null, T | null]> {
  try {
    const data = await fn()
    return [null, data]
  } catch (error) {
    return [error instanceof Error ? error : new Error('Unknown error'), null]
  }
}
