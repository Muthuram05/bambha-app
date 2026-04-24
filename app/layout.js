import './globals.css';
import { Darker_Grotesque } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-darker-grotesque',
});

export const metadata = {
  title: 'BamBha - Naturally Sweet, Zero Sugar Pure Health',
  description: 'BamBha is an Indian wellness brand specializing in natural, zero-calorie sugar alternatives, primarily Monkfruit Sweetener.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={darkerGrotesque.variable}>
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
