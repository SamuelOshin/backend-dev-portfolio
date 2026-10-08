declare module 'next/dist/lib/metadata/types/metadata-interface.js' {
  export type ResolvingMetadata = Promise<import('next').Metadata>;
  export type ResolvingViewport = Promise<import('next').Viewport>;
}

declare module 'next/server.js' {
  export type NextRequest = import('next/server').NextRequest;
  export type NextResponse = import('next/server').NextResponse;
}
