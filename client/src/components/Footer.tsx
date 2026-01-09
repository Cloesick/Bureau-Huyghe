import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Calendar, Send, Globe } from 'lucide-react';

export default function Footer() {
  const company = [
    { name: 'Over Ons', path: '/over-ons', icon: Users },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Nieuws', path: '/nieuws', icon: Calendar },
    { name: 'Contact', path: '/contact', icon: Globe },
    { name: 'Certificeringen', path: '/certificeringen', icon: Award },
  ];

  const legal = [
    { name: 'Algemene Voorwaarden', path: '/voorwaarden' },
    { name: 'Privacyverklaring', path: '/privacy' },
    { name: 'Cookies', path: '/cookies' },
    { name: 'Admin', path: '/admin' },
  ];

  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeStatus('success');
      setEmail('');
    } catch {
      setSubscribeStatus('error');
    }
  };

  return (
    <footer className="bg-primary-600" data-test="footer">
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
              Professionele landmeting en technische documentatie. Van particulier tot projectontwikkelaar,
              Bureau Huyghe staat garant voor nauwkeurige metingen en duidelijke documentatie.
            </p>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-4">Bureau Huyghe</h4>
            <ul className="space-y-2">
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group flex items-center gap-2 text-white hover:text-accent-300 transition-colors"
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
            <div>
              <h4 className="text-white font-bold mb-4">Nieuwsbrief</h4>
              <p className="text-white mb-4 text-sm sm:text-base">
                Schrijf u in voor onze nieuwsbrief en blijf op de hoogte van de laatste ontwikkelingen.
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Uw e-mailadres"
                  className="w-full px-4 py-3 pr-12 bg-primary-700/50 border border-primary-500 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:border-accent-300 transition-colors text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-accent-300 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              {subscribeStatus === 'success' && (
                <p className="mt-2 text-sm text-accent-300"> Bedankt voor uw inschrijving!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="mt-2 text-sm text-red-500">Er is iets misgegaan. Probeer het opnieuw.</p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-700 border-t border-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p>&copy; 2025 Bureau Huyghe. Alle rechten voorbehouden.</p>
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              {legal.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-accent-400 hover:translate-y-px transition-all duration-300"
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
              +32 (0)50 00 00 00
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
