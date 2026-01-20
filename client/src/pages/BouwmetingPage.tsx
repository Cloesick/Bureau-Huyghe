import { useState } from 'react';
import { Building2, Ruler, Box, FileCheck, Clock, Calculator, Scan, ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';

// Before/After project examples for construction
const projectExamples = [
  {
    id: 1,
    title: 'Nieuwbouw Appartementen Oostende',
    category: 'Uitzetting',
    before: {
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop',
      description: 'Bouwterrein voor aanvang werkzaamheden'
    },
    after: {
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop',
      description: 'Nauwkeurige uitzetting van funderingen en bouwlijnen'
    },
    details: {
      type: 'Meergezinswoning',
      oppervlakte: '2.500 m²',
      doorlooptijd: '2 dagen'
    }
  },
  {
    id: 2,
    title: '3D Scan Industrieel Pand Zeebrugge',
    category: '3D Scanning',
    before: {
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=500&fit=crop',
      description: 'Bestaand industrieel gebouw zonder digitale documentatie'
    },
    after: {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      description: 'Volledig 3D model met point cloud data'
    },
    details: {
      scanpunten: '45 posities',
      nauwkeurigheid: '±3mm',
      output: 'IFC + DWG'
    }
  },
  {
    id: 3,
    title: 'As-Built Renovatie Villa Knokke',
    category: 'Maatvoering',
    before: {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
      description: 'Bestaande villa voor renovatie'
    },
    after: {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
      description: 'Complete as-built documentatie voor architect'
    },
    details: {
      type: 'Renovatie',
      kamers: '12 ruimtes',
      output: 'BIM model'
    }
  }
];

// Pricing indicators for construction services
const pricingIndicators = [
  {
    service: 'Bouwplaats Uitzetting',
    startPrice: 275,
    description: 'Inclusief referentiepunten, hoogtepeil en meetrapport',
    factors: ['Type project', 'Aantal uitzettingen', 'Complexiteit bouwplan']
  },
  {
    service: '3D Scanning',
    startPrice: 650,
    description: 'Inclusief point cloud, 3D model en BIM-export',
    factors: ['Oppervlakte/volume', 'Aantal scanposities', 'Gewenste detaillering']
  },
  {
    service: 'Maatvoering',
    startPrice: 350,
    description: 'Inclusief digitale meetplannen en controle',
    factors: ['Oppervlakte gebouw', 'Aantal ruimtes', 'Gewenste output formaat']
  }
];

export default function BouwmetingPage() {
  const { t } = useLanguage();
  const [activeExample, setActiveExample] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const services = [
    {
      icon: Building2,
      title: t.pages.bouwmeting.uitzetting,
      description: t.pages.bouwmeting.uitzettingDesc,
      features: t.pages.bouwmeting.uitzettingFeatures
    },
    {
      icon: Scan,
      title: t.pages.bouwmeting.scanning,
      description: t.pages.bouwmeting.scanningDesc,
      features: t.pages.bouwmeting.scanningFeatures
    },
    {
      icon: Box,
      title: t.pages.bouwmeting.maatvoering,
      description: t.pages.bouwmeting.maatvoeringDesc,
      features: t.pages.bouwmeting.maatvoeringFeatures
    }
  ];

  const process = [
    {
      title: t.pages.bouwmeting.step1Title,
      description: t.pages.bouwmeting.step1Desc
    },
    {
      title: t.pages.bouwmeting.step2Title,
      description: t.pages.bouwmeting.step2Desc
    },
    {
      title: t.pages.bouwmeting.step3Title,
      description: t.pages.bouwmeting.step3Desc
    },
    {
      title: t.pages.bouwmeting.step4Title,
      description: t.pages.bouwmeting.step4Desc
    }
  ];

  const faqs = [
    {
      question: t.pages.bouwmeting.faq1Q,
      answer: t.pages.bouwmeting.faq1A
    },
    {
      question: t.pages.bouwmeting.faq2Q,
      answer: t.pages.bouwmeting.faq2A
    },
    {
      question: t.pages.bouwmeting.faq3Q,
      answer: t.pages.bouwmeting.faq3A
    },
    {
      question: t.pages.bouwmeting.faq4Q,
      answer: t.pages.bouwmeting.faq4A
    }
  ];

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.pages.bouwmeting.title}
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              {t.pages.bouwmeting.heroText}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/offerte"
                className="bg-accent-400 text-white px-6 py-3 rounded font-bold hover:bg-accent-500 transition-colors"
              >
                {t.requestQuote}
              </Link>
              <a
                href="#diensten"
                className="bg-white text-primary-500 px-6 py-3 rounded font-bold hover:bg-primary-50 transition-colors"
              >
                {t.pages.landmeting.ourServices}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="diensten" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.pages.bouwmeting.servicesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700">
                        <FileCheck className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.pages.landmeting.projectExamples}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.pages.bouwmeting.projectExamplesText}
            </p>
          </div>

          {/* Example Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {projectExamples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => { setActiveExample(index); setShowAfter(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeExample === index
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-primary-50'
                }`}
              >
                {example.category}
              </button>
            ))}
          </div>

          {/* Before/After Display */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={showAfter ? projectExamples[activeExample].after.image : projectExamples[activeExample].before.image}
                    alt={showAfter ? 'Na' : 'Voor'}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <button
                    onClick={() => setShowAfter(!showAfter)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-3 hover:bg-white transition-colors"
                  >
                    <span className={`font-medium ${!showAfter ? 'text-primary-600' : 'text-gray-400'}`}>{t.pages.landmeting.before}</span>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                      <div className={`absolute top-1 w-4 h-4 bg-primary-500 rounded-full transition-all ${showAfter ? 'left-7' : 'left-1'}`} />
                    </div>
                    <span className={`font-medium ${showAfter ? 'text-primary-600' : 'text-gray-400'}`}>{t.pages.landmeting.after}</span>
                  </button>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${showAfter ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                    {showAfter ? 'NA' : 'VOOR'}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {projectExamples[activeExample].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {showAfter 
                      ? projectExamples[activeExample].after.description 
                      : projectExamples[activeExample].before.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(projectExamples[activeExample].details).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 px-4 py-2 rounded-lg">
                        <span className="text-xs text-gray-500 capitalize">{key}</span>
                        <p className="font-semibold text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => { setActiveExample(prev => prev === 0 ? projectExamples.length - 1 : prev - 1); setShowAfter(false); }}
                className="p-3 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                {projectExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => { setActiveExample(index); setShowAfter(false); }}
                    className={`w-2 h-2 rounded-full transition-all ${activeExample === index ? 'bg-primary-500 w-6' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => { setActiveExample(prev => prev === projectExamples.length - 1 ? 0 : prev + 1); setShowAfter(false); }}
                className="p-3 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.pages.landmeting.transparentPricing}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.pages.bouwmeting.transparentPricingText}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingIndicators.map((pricing) => (
              <div key={pricing.service} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-primary-500 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">{pricing.service}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm">{t.pages.landmeting.from}</span>
                    <span className="text-4xl font-bold">€{pricing.startPrice}</span>
                    <span className="text-primary-200">{t.pages.landmeting.exclVat}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{pricing.description}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">{t.pages.landmeting.pricingFactors}</p>
                    <ul className="space-y-2">
                      {pricing.factors.map((factor) => (
                        <li key={factor} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-primary-500" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to="/offerte#calculator"
                    className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                  >
                    {t.pages.landmeting.calculatePrice}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {t.pages.bouwmeting.pricingDisclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.pages.landmeting.workProcess}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-xl shadow p-6 h-full">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-primary-100 -z-10 transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.pages.bouwmeting.equipmentTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.pages.bouwmeting.laserScanner}</h3>
              <p className="text-gray-600 mb-4">
                {t.pages.bouwmeting.laserScannerDesc}
              </p>
              <ul className="space-y-2">
                {t.pages.bouwmeting.laserScannerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FileCheck className="w-5 h-5 text-primary-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.pages.bouwmeting.totalStation}</h3>
              <p className="text-gray-600 mb-4">
                {t.pages.bouwmeting.totalStationDesc}
              </p>
              <ul className="space-y-2">
                {t.pages.bouwmeting.totalStationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FileCheck className="w-5 h-5 text-primary-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.pages.landmeting.faqTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t.pages.bouwmeting.ctaTitle}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t.pages.landmeting.ctaText}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/offerte"
              className="bg-accent-400 text-white px-8 py-4 rounded-lg font-bold hover:bg-accent-500 transition-colors"
            >
              {t.requestQuote}
            </Link>
            <Link
              to="/contact"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors"
            >
              {t.pages.landmeting.contactUs}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pages.bouwmeting.fastService}</h3>
              <p className="text-gray-600">{t.pages.bouwmeting.fastServiceText}</p>
            </div>
            <div>
              <Ruler className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pages.bouwmeting.millimeterPrecision}</h3>
              <p className="text-gray-600">{t.pages.bouwmeting.millimeterPrecisionText}</p>
            </div>
            <div>
              <Calculator className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pages.bouwmeting.clearPricing}</h3>
              <p className="text-gray-600">{t.pages.bouwmeting.clearPricingText}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
