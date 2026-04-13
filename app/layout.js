import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'BamBha - Naturally Sweet, Zero Sugar Pure Health',
  description: 'BamBha is an Indian wellness brand specializing in natural, zero-calorie sugar alternatives, primarily Monkfruit Sweetener.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
