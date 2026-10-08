"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-bold mb-3">Application Error</h2>
          <p className="text-sm text-white/60 mb-5">
            An unexpected error occurred.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
