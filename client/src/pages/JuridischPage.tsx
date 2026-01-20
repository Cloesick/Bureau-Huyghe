import { useState } from 'react';
import { Scale, FileCheck, FileSearch, FileWarning, ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';

// Case studies for legal services
const caseStudies = [
  {
    id: 1,
    title: 'Grensgeschil Opgelost - Blankenberge',
    category: 'Expertise',
    situation: 'Buren in conflict over perceelgrens na plaatsing nieuwe afsluiting',
    solution: 'Historisch onderzoek + terreinmeting + bemiddeling',
    result: 'Minnelijke schikking bereikt, nieuwe grenspalen geplaatst',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
    details: {
      doorlooptijd: '3 weken',
      type: 'Grensgeschil',
      uitkomst: 'Minnelijke schikking'
    }
  },
  {
    id: 2,
    title: 'Plaatsbeschrijving Huurpand - Gent',
    category: 'Plaatsbeschrijving',
    situation: 'Verhuurder en huurder oneens over staat bij uittrede',
    solution: 'Vergelijking intrede/uittrede plaatsbeschrijving met fotodocumentatie',
    result: 'Objectieve vaststelling schade, eerlijke verdeling waarborgsom',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    details: {
      doorlooptijd: '5 dagen',
      type: 'Huurgeschil',
      uitkomst: 'Objectief rapport'
    }
  },
  {
    id: 3,
    title: 'Erfdienstbaarheid Onderzoek - Brugge',
    category: 'Eigendomsonderzoek',
    situation: 'Onduidelijkheid over recht van doorgang bij verkoop eigendom',
    solution: 'Kadasteronderzoek + analyse historische aktes + terreinverificatie',
    result: 'Duidelijkheid over erfdienstbaarheden, vlotte verkoop mogelijk',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
    details: {
      doorlooptijd: '2 weken',
      type: 'Eigendomsonderzoek',
      uitkomst: 'Juridische duidelijkheid'
    }
  }
];

// Pricing for legal services
const pricingIndicators = [
  {
    service: 'Plaatsbeschrijving',
    startPrice: 400,
    description: 'Volledige documentatie met foto\'s en gedetailleerd rapport',
    factors: ['Type eigendom', 'Aantal ruimtes', 'Doel (huur/bouw/verkoop)']
  },
  {
    service: 'Expertise & Advies',
    startPrice: 500,
    description: 'Professioneel advies en technische expertise',
    factors: ['Complexiteit geschil', 'Onderzoeksomvang', 'Gerechtelijk/minnelijk']
  },
  {
    service: 'Eigendomsonderzoek',
    startPrice: 350,
    description: 'Grondig onderzoek met kadastrale opzoekingen',
    factors: ['Diepte onderzoek', 'Historische complexiteit', 'Aantal percelen']
  }
];

interface Service {
  id: string;
  title: string;
  description: string;
  icon: typeof Scale | typeof FileCheck | typeof FileSearch | typeof FileWarning;
  features: readonly string[];
}

export default function JuridischPage() {
  const { t } = useLanguage();
  const [activeCase, setActiveCase] = useState(0);

  const services: Service[] = [
    {
      id: '1',
      title: t.pages.juridisch.plaatsbeschrijving,
      description: t.pages.juridisch.plaatsbeschrijvingDesc,
      icon: FileCheck,
      features: t.pages.juridisch.plaatsbeschrijvingFeatures
    },
    {
      id: '2',
      title: t.pages.juridisch.expertise,
      description: t.pages.juridisch.expertiseDesc,
      icon: Scale,
      features: t.pages.juridisch.expertiseFeatures
    },
    {
      id: '3',
      title: t.pages.juridisch.eigendomsonderzoek,
      description: t.pages.juridisch.eigendomsonderzoekDesc,
      icon: FileSearch,
      features: t.pages.juridisch.eigendomsonderzoekFeatures
    },
    {
      id: '4',
      title: t.pages.juridisch.juridischeBijstand,
      description: t.pages.juridisch.juridischeBijstandDesc,
      icon: FileWarning,
      features: t.pages.juridisch.juridischeBijstandFeatures
    }
  ];

  const benefits = [
    {
      title: t.pages.juridisch.legalCertainty,
      description: t.pages.juridisch.legalCertaintyText
    },
    {
      title: t.pages.juridisch.recognizedExpertise,
      description: t.pages.juridisch.recognizedExpertiseText
    },
    {
      title: t.pages.juridisch.preventiveEffect,
      description: t.pages.juridisch.preventiveEffectText
    },
    {
      title: t.pages.juridisch.fastService,
      description: t.pages.juridisch.fastServiceText
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.pages.juridisch.title}
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              {t.pages.juridisch.heroText}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/offerte"
                className="bg-accent-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-accent-500 transition-colors"
              >
                {t.requestQuote}
              </Link>
              <Link
                to="/contact"
                className="bg-white text-primary-500 px-8 py-3 rounded-lg font-bold hover:bg-primary-50 transition-colors"
              >
                {t.pages.landmeting.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <ArrowRight className="w-4 h-4 text-primary-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.pages.juridisch.caseStudiesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.pages.juridisch.caseStudiesText}
            </p>
          </div>

          {/* Case Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveCase(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCase === index
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-primary-50'
                }`}
              >
                {study.category}
              </button>
            ))}
          </div>

          {/* Case Display */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto">
                  <img
                    src={caseStudies[activeCase].image}
                    alt={caseStudies[activeCase].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
                    {caseStudies[activeCase].category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {caseStudies[activeCase].title}
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-500">{t.pages.juridisch.situation}:</p>
                      <p className="text-gray-700">{caseStudies[activeCase].situation}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">{t.pages.juridisch.approach}:</p>
                      <p className="text-gray-700">{caseStudies[activeCase].solution}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">{t.pages.juridisch.result}:</p>
                      <p className="text-green-600 font-medium">{caseStudies[activeCase].result}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                    {Object.entries(caseStudies[activeCase].details).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-xs text-gray-500 capitalize">{key}</span>
                        <p className="font-semibold text-gray-900 text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveCase(prev => prev === 0 ? caseStudies.length - 1 : prev - 1)}
                className="p-3 bg-white rounded-full shadow hover:shadow-md transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCase(index)}
                    className={`w-2 h-2 rounded-full transition-all ${activeCase === index ? 'bg-primary-500 w-6' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveCase(prev => prev === caseStudies.length - 1 ? 0 : prev + 1)}
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
                    {t.requestQuote}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              * Prijzen zijn indicatief. De exacte prijs wordt bepaald na bespreking van uw situatie.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.pages.juridisch.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <Scale className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t.pages.juridisch.ctaTitle}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t.pages.juridisch.ctaText}
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
    </Layout>
  );
}
