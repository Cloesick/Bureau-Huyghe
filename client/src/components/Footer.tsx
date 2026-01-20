import { Link } from 'react-router-dom';
import { Award, Users, Calendar, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  const company = [
    { name: 'Home', path: '/', icon: Users },
    { name: 'Diensten', path: '/#diensten', icon: Award },
    { name: 'Contact', path: '/contact', icon: Globe },
    { name: 'Offerte', path: '/offerte', icon: Calendar },
  ];

  const legal = [
    { name: t.footer.terms, path: '/voorwaarden' },
    { name: t.footer.privacy, path: '/privacy' },
    { name: t.footer.cookies, path: '/cookies' },
  ];

  return (
    <footer className="bg-primary-950" data-test="footer">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo Bureau Huyghe.png"
                alt="Bureau Huyghe - Logo"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-primary-200 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2">
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group flex items-center gap-2 text-primary-200 hover:text-accent-400 transition-colors"
                      data-test="footer-link"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-700 border-t border-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p>&copy; 2025 Bureau Huyghe. {t.footer.rights}</p>
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              {legal.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-primary-200 hover:text-accent-400 hover:translate-y-px transition-all duration-300"
                    data-test="footer-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-primary-600 border-t border-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <a href="mailto:info@bureau-huyghe.be" className="text-primary-100 hover:text-accent-300 transition-colors text-xs sm:text-sm">
              info@bureau-huyghe.be
            </a>
            <span className="text-primary-300">|</span>
            <a href="tel:+3250000000" className="text-primary-100 hover:text-accent-300 transition-colors text-xs sm:text-sm">
              T. +32 (0)50 00 00 00
            </a>
          </div>
          <div className="text-primary-200 text-xs sm:text-sm">
            <span className="hidden sm:inline">Straat 123, 8200 Brugge</span>
            <span className="sm:hidden">Brugge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
