import type { Metadata } from 'next';
import { ReduxProvider } from '@/reduxProvider';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
