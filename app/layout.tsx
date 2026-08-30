import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ÁUREA Arquitectura & Interiores | Guadalajara',
  description: 'Arquitectura, interiorismo y remodelaciones contemporáneas en Guadalajara.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'ÁUREA Arquitectura & Interiores | Guadalajara',
    description: 'Arquitectura, interiorismo y remodelaciones contemporáneas en Guadalajara.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ÁUREA — Espacios que se sienten propios.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ÁUREA Arquitectura & Interiores | Guadalajara',
    description: 'Arquitectura, interiorismo y remodelaciones contemporáneas en Guadalajara.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}

