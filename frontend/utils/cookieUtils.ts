import { cookies } from 'next/headers';

export function getUserCookie(): string | null {
  const cookieStore = cookies();
  return cookieStore.get('user')?.value || null;
}
