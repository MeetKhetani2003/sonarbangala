import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USER || 'admingoa';
const ADMIN_PASS = process.env.ADMIN_PASS || 'Shonarbangla2026';
const COOKIE_NAME = 'sonarbangla_admin_token';
const AUTH_TOKEN = 'authenticated_sb_admin_session_token_2026';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, AUTH_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({
        success: true,
        user: { username: ADMIN_USER, role: 'Hotel Administrator' },
        message: 'Authentication successful',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token === AUTH_TOKEN) {
      return NextResponse.json({
        authenticated: true,
        user: { username: ADMIN_USER, role: 'Hotel Administrator' },
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

