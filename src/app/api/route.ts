import { NextResponse } from 'next/server';

export interface HomeRouteInterface {
  message: string;
  version: number;
  owner: string;
}

export function GET(): NextResponse<HomeRouteInterface> {
  return NextResponse.json({
    message: 'Hello World',
    version: 1,
    owner: 'Piñata',
  });
}
