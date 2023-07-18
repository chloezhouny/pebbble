import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export const metadata = {
  title: 'Pebbble',
  description: 'Discover and connect with designers and talent around the globe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
          <Footer />
        </body>
    </html>
  )
}