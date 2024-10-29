"use client";

/**
 * Root layout component to wrap the application and provides global styles and the Event context.
 */

import "../app/globals.css";
import { EventProvider } from "../context/EventContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EventProvider>{children}</EventProvider>
      </body>
    </html>
  );
}
