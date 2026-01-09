import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Site Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-[152px] md:pt-[180px] flex-grow">
        {fullWidth ? children : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
