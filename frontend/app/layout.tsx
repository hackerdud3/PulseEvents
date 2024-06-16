import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import AuthProvider from '@/providers/auth-provider';
import { UIProvider } from '../providers/next-ui-provider';
import NavigationBar from '../components/NavigationBar';
import { SnackbarProvider } from '../providers/snackbar-provider';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pulse Events'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider>
          <AuthProvider>
            <UIProvider>
              <NavigationBar />
              <div className="flex min-h-[80vh] w-full max-w-[1024px] mx-auto items-center flex-col">
                {children}
              </div>
            </UIProvider>
          </AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
