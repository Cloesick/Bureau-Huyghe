import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Facebook, Linkedin, Instagram, Twitter, Youtube, Phone, Calendar } from 'lucide-react';
import { LanguageSwitcher } from '../i18n/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const social = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/bureauhuyghe' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/bureau-huyghe' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/bureauhuyghe' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/bureauhuyghe' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/c/bureauhuyghe' },
    { name: 'Website', icon: Youtube, url: 'https://bureau-huyghe.be' }
  ];

  return (
    <header className="bg-primary-500 text-white fixed w-full top-0 z-50" data-test="header">
      {/* Top bar with contact info */}
      <div className="bg-primary-600 border-b border-primary-400">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:info@bureau-huyghe.be" className="text-primary-100 hover:text-accent-300 transition-colors">
              info@bureau-huyghe.be
            </a>
            <a href="tel:+3250000000" className="sm:hidden text-primary-100 hover:text-accent-300 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <span className="hidden sm:inline text-primary-300">|</span>
            <span className="hidden sm:inline text-primary-100">T. +32 (0)50 00 00 00</span>
            <span className="text-primary-300">|</span>
            <Link to="/contact#afspraak" className="flex items-center gap-1.5 text-accent-300 hover:text-accent-200 transition-colors font-medium">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Maak afspraak</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline text-primary-200">Straat 123, 8200 Brugge</span>
            <span className="hidden md:inline text-primary-300">|</span>
            <div className="flex items-center gap-2 sm:gap-3">
              {social.slice(0, 3).map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-100 hover:text-accent-300 transition-colors"
                    aria-label={platform.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
              <LanguageSwitcher />
            </div>
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
            <Link to="/landmeting" className="nav-link" data-test="nav-link">Landmeting</Link>
            <Link to="/bouwmeting" className="nav-link" data-test="nav-link">Bouwmeting</Link>
            <Link to="/technische-documentatie" className="nav-link" data-test="nav-link">Technische Documentatie</Link>
            <Link to="/juridisch" className="nav-link" data-test="nav-link">Juridisch</Link>
            <Link to="/portfolio" className="nav-link" data-test="nav-link">Portfolio</Link>
            <Link to="/contact" className="nav-link" data-test="nav-link">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link
              to="/offerte"
              className="hidden md:inline-flex bg-accent-400 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-accent-500 transition-colors"
              data-test="cta-button"
            >
              Offerte Aanvragen
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-800 transition-colors"
              aria-label="Menu openen"
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
            <nav className="flex flex-col px-4 py-4 space-y-4">
              <Link 
                to="/landmeting" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Landmeting
              </Link>
              <Link 
                to="/bouwmeting" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bouwmeting
              </Link>
              <Link 
                to="/technische-documentatie" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Technische Documentatie
              </Link>
              <Link 
                to="/juridisch" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Juridisch
              </Link>
              <Link 
                to="/portfolio" 
                className="px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
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
                Offerte Aanvragen
              </Link>
            </nav>
          </div>
      </div>
    </header>
  );
}
