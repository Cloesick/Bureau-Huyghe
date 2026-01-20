import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-primary-500 text-white fixed w-full top-0 z-50" data-test="header">
      {/* Top bar with contact info */}
      <div className="bg-primary-600 border-b border-primary-400">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@bureau-huyghe.be"
              className="text-primary-100 hover:text-accent-300 transition-colors"
              data-test="header-email"
            >
              info@bureau-huyghe.be
            </a>
            <a href="tel:+3250000000" className="sm:hidden text-primary-100 hover:text-accent-300 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <span className="hidden sm:inline text-primary-300">|</span>
            <span className="hidden sm:inline text-primary-100" data-test="header-phone">{t.phone}</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline text-primary-200">Straat 123, 8200 Brugge</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 -mt-2">
            <img src="/logo Bureau Huyghe.png" alt="Bureau Huyghe - Logo" className="h-20 w-auto" />
          </Link>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4" data-test="desktop-nav">
            <Link to="/" className="nav-link text-primary-100 hover:text-accent-400" data-test="nav-home">Home</Link>
            <a href="/#diensten" className="nav-link text-primary-100 hover:text-accent-400" data-test="nav-services">Diensten</a>
            <Link to="/contact" className="nav-link text-primary-100 hover:text-accent-400" data-test="nav-contact">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link
              to="/offerte"
              className="hidden md:inline-flex bg-accent-400 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-accent-500 transition-colors"
              data-test="cta-button"
            >
              {t.requestQuote}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-800 transition-colors"
              aria-label={t.openMenu}
              data-test="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={`md:hidden bg-primary-500 border-t border-primary-400 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[calc(100vh-8rem)] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
            <nav className="flex flex-col px-4 py-4 space-y-4" data-test="mobile-nav">
              <Link 
                to="/" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="/#diensten"
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Diensten
              </a>
              <Link 
                to="/contact" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/offerte"
                className="mt-2 bg-accent-400 text-white px-4 py-3 rounded-lg font-bold text-center hover:bg-accent-500 transition-colors shadow-lg hover:shadow-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.requestQuote}
              </Link>
            </nav>
          </div>
      </div>
    </header>
  );
}
