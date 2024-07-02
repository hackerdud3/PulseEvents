import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const { token, ...user } = await response.json();

      const res = NextResponse.json(user, { status: 200 });

      // Set cookies
      cookies().set('user', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      });
      cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      });

      return res;
    } else {
      return NextResponse.json(
        { message: 'Login failed' },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
