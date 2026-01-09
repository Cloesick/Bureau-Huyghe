import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { QuoteCalculatorCompact } from '../components/QuoteCalculator';

const stats = [
  { value: '25+', label: 'Jaar ervaring' },
  { value: '5000+', label: 'Projecten voltooid' },
  { value: '98%', label: 'Tevreden klanten' },
  { value: '48u', label: 'Gemiddelde responstijd' }
];

export default function BureauHuyghePage() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white" aria-label="Hero">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professionele Landmeting &<br />
                <span className="text-accent-400">Technische Documentatie</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Van particuliere afpalingen tot complexe bouwprojecten, wij staan garant voor nauwkeurige metingen en duidelijke documentatie.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/offerte"
                  className="bg-accent-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-600 transition-colors flex items-center gap-2"
                  data-test="hero-cta"
                >
                  Offerte Aanvragen
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/portfolio"
                  data-test="hero-secondary"
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors border border-white/30"
                >
                  Bekijk Projecten
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-primary-200">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Erkend landmeter
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Gratis offerte
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <QuoteCalculatorCompact />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Waarom Bureau Huyghe?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Erkende expertise</h3>
                    <p className="text-gray-600">Beëdigd landmeter-expert met jarenlange ervaring in alle types projecten.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Kwaliteitsgarantie</h3>
                    <p className="text-gray-600">Nauwkeurige metingen met moderne apparatuur en duidelijke rapportage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Persoonlijke aanpak</h3>
                    <p className="text-gray-600">Direct contact met uw landmeter, geen callcenters of wachttijden.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">5.0 gemiddelde score</span>
              </div>
              <blockquote className="text-lg text-gray-700 mb-6">
                "Zeer professionele service. De afpaling werd snel en nauwkeurig uitgevoerd. 
                Duidelijke communicatie en correcte prijzen. Zeker aan te raden!"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">MV</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Marc Vandenberghe</p>
                  <p className="text-sm text-gray-500">Particuliere klant, Damme</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
