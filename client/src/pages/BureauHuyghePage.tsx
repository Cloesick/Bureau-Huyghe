import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BureauHuyghePage() {
  const [openService, setOpenService] = useState<number | null>(0);

  const services = [
    { title: 'Grensbepaling', description: '' },
    { title: 'Uitzetwerk', description: '' },
    { title: 'Plaatsbeschrijving', description: '' },
    { title: 'Schatting', description: '' },
    { title: 'Expertises', description: '' },
    { title: 'Omgevingsvergunning', description: '' },
    { title: 'Verkavelen', description: '' },
    { title: 'Volumeberekening', description: '' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white" aria-label="Hero" data-test="hero-section">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-test="hero-title">
                Bureau Huyghe<br />
                <span className="text-accent-400">Landmeten & meer</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8" data-test="hero-description">
                Sober, duidelijk en to the point. Neem gerust contact op voor uw vraag.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="mailto:info@bureau-huyghe.be?subject=Vraag%20offerte%20aan"
                  className="bg-accent-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-500 transition-colors flex items-center gap-2"
                  data-test="hero-cta"
                >
                  Vraag offerte aan
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#diensten"
                  data-test="hero-secondary"
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors border border-white/30"
                >
                  Diensten
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="diensten" className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Diensten</h2>
            <p className="text-lg text-gray-600">Een overzicht van activiteiten.</p>
          </div>

          <div className="space-y-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenService(openService === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{service.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openService === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openService === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{service.description || '—'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
