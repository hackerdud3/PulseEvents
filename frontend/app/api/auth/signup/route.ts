import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const userdata = await req.json();

  try {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });
    if (response.ok) {
      return NextResponse.json(
        { message: 'Sign Up successful!' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Sign Up failed' },
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
