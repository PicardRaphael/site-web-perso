import type { Metadata } from 'next';
import { Providers } from './providers';
import '@src/interface/styles/globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <div>
            <ul>
              <Link href={'/dashboard'}>Dashboard</Link>
            </ul>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}