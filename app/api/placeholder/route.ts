import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get('text') || 'Placeholder';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150">
      <rect fill="#ddd" width="300" height="150"/>
      <text fill="rgba(0,0,0,0.5)" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%" y="50%" text-anchor="middle">${text}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}