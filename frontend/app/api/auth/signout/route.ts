import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const res = NextResponse.json('Successfully logged out', { status: 200 });

      // Delete cookies
      cookies().delete('user');
      cookies().delete('token');

      return res;
    }
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
