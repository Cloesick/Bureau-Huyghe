import { useState } from 'react';
import { MapPin, Ruler, Compass, FileCheck, Clock, Calculator, ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Before/After project examples
const projectExamples = [
  {
    id: 1,
    title: 'Perceelafpaling Villa Damme',
    category: 'Perceelafpaling',
    before: {
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
      description: 'Onduidelijke perceelgrenzen, geen zichtbare afbakening'
    },
    after: {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      description: 'Duidelijke grenspalen, officieel proces-verbaal opgemaakt'
    },
    details: {
      oppervlakte: '1.250 m²',
      doorlooptijd: '3 dagen',
      grenspalen: '8 stuks'
    }
  },
  {
    id: 2,
    title: 'Topografische Opmeting Bouwproject Brugge',
    category: 'Topografie',
    before: {
      image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800&h=500&fit=crop',
      description: 'Onbebouwd terrein zonder hoogte-informatie'
    },
    after: {
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop',
      description: 'Volledig 3D terreinmodel met hoogtekaart'
    },
    details: {
      oppervlakte: '5.000 m²',
      doorlooptijd: '5 dagen',
      meetpunten: '2.500+'
    }
  },
  {
    id: 3,
    title: 'GPS Meting Landbouwperceel Knokke',
    category: 'GPS Meting',
    before: {
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop',
      description: 'Grote oppervlakte zonder nauwkeurige grenzen'
    },
    after: {
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop',
      description: 'Exacte coördinaten en digitale perceelkaart'
    },
    details: {
      oppervlakte: '12 ha',
      doorlooptijd: '2 dagen',
      nauwkeurigheid: '±2 cm'
    }
  }
];

// Pricing indicators
const pricingIndicators = [
  {
    service: 'Perceelafpaling',
    startPrice: 350,
    description: 'Inclusief grenspalen, proces-verbaal en digitaal plan',
    factors: ['Oppervlakte perceel', 'Aantal grenzen/buren', 'Toegankelijkheid terrein']
  },
  {
    service: 'Topografische Opmeting',
    startPrice: 450,
    description: 'Inclusief hoogtekaart, situatieplan en digitale bestanden',
    factors: ['Oppervlakte terrein', 'Complexiteit (bebouwing, vegetatie)', 'Gewenste detaillering']
  },
  {
    service: 'GPS Meting',
    startPrice: 275,
    description: 'Inclusief coördinatenlijst en digitale kaart',
    factors: ['Aantal meetpunten', 'Oppervlakte gebied', 'Vereiste nauwkeurigheid']
  }
];

export default function LandmetingPage() {
  const [activeExample, setActiveExample] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const services = [
    {
      icon: MapPin,
      title: 'Perceelafpaling',
      description: 'Nauwkeurige afbakening van uw perceel met officiële grensmarkeringen en gedetailleerd proces-verbaal.',
      features: [
        'Plaatsing van grenspalen',
        'Gedetailleerde opmeting',
        'Officieel proces-verbaal',
        'Digitaal plan'
      ]
    },
    {
      icon: Ruler,
      title: 'Topografische Opmeting',
      description: 'Complete terreinopmeting met hoogtegegevens, gebouwen, en terreindetails voor een volledig inzicht.',
      features: [
        'Hoogtemetingen',
        '3D terreinmodel',
        'Gebouwcontouren',
        'Technische detaillering'
      ]
    },
    {
      icon: Compass,
      title: 'GPS Metingen',
      description: 'Hoogprecisie GPS-metingen voor exacte plaatsbepaling en coördinaatbepaling.',
      features: [
        'RTK GPS technologie',
        'Millimeter precisie',
        'Snelle uitvoering',
        'Digitale kaarten'
      ]
    }
  ];

  const process = [
    {
      title: 'Aanvraag & Planning',
      description: 'Bespreek uw project en ontvang een gedetailleerde offerte binnen 24 uur.'
    },
    {
      title: 'Vooronderzoek',
      description: 'We analyseren bestaande plannen en kadastrale gegevens.'
    },
    {
      title: 'Terreinwerk',
      description: 'Uitvoering van de metingen met state-of-the-art apparatuur.'
    },
    {
      title: 'Verwerking & Rapport',
      description: 'Oplevering van gedetailleerde plannen en officiële documenten.'
    }
  ];

  const faqs = [
    {
      question: 'Hoe lang duurt een perceelafpaling?',
      answer: 'Een standaard perceelafpaling duurt gemiddeld 2-4 uur, afhankelijk van de grootte en complexiteit van het terrein.'
    },
    {
      question: 'Wat kost een landmeting?',
      answer: 'De prijs varieert op basis van verschillende factoren. Neem contact op voor een gedetailleerde offerte op maat.'
    },
    {
      question: 'Zijn de metingen officieel erkend?',
      answer: 'Ja, als beëdigd landmeter-expert zijn al onze metingen en documenten officieel erkend.'
    },
    {
      question: 'Hoe snel kan ik een afspraak krijgen?',
      answer: 'We streven ernaar binnen 5 werkdagen een afspraak in te plannen.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professionele Landmeting
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Nauwkeurige metingen en duidelijke documentatie voor al uw landmeetkundige projecten.
              Met meer dan 25 jaar ervaring als beëdigd landmeter-expert.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/offerte"
                className="bg-accent-400 text-white px-6 py-3 rounded font-bold hover:bg-accent-500 transition-colors"
              >
                Offerte Aanvragen
              </Link>
              <a
                href="#diensten"
                className="bg-white text-primary-500 px-6 py-3 rounded font-bold hover:bg-primary-50 transition-colors"
              >
                Onze Diensten
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="diensten" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Onze Landmeetkundige Diensten
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
              Projectvoorbeelden
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bekijk hoe wij uw project van begin tot eind begeleiden
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
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={showAfter ? projectExamples[activeExample].after.image : projectExamples[activeExample].before.image}
                    alt={showAfter ? 'Na' : 'Voor'}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowAfter(!showAfter)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-3 hover:bg-white transition-colors"
                  >
                    <span className={`font-medium ${!showAfter ? 'text-primary-600' : 'text-gray-400'}`}>Voor</span>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                      <div className={`absolute top-1 w-4 h-4 bg-primary-500 rounded-full transition-all ${showAfter ? 'left-7' : 'left-1'}`} />
                    </div>
                    <span className={`font-medium ${showAfter ? 'text-primary-600' : 'text-gray-400'}`}>Na</span>
                  </button>
                  {/* Label */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${showAfter ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                    {showAfter ? 'NA' : 'VOOR'}
                  </div>
                </div>

                {/* Info Panel */}
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

            {/* Navigation Arrows */}
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
              Transparante Prijzen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Indicatieve startprijzen voor onze diensten. Vraag een offerte aan voor een exacte prijs op maat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingIndicators.map((pricing) => (
              <div key={pricing.service} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-primary-500 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">{pricing.service}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm">Vanaf</span>
                    <span className="text-4xl font-bold">€{pricing.startPrice}</span>
                    <span className="text-primary-200">excl. BTW</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{pricing.description}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Prijsbepalende factoren:</p>
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
                    Bereken Prijs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              * Prijzen zijn indicatief. De exacte prijs wordt bepaald na een gratis terreinbezoek of telefonisch gesprek.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Ons Werkproces
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Veelgestelde Vragen
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
            Klaar om uw project te bespreken?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Neem contact op voor een vrijblijvende offerte of stel uw vragen.
            We reageren binnen 24 uur.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/offerte"
              className="bg-accent-400 text-white px-8 py-4 rounded-lg font-bold hover:bg-accent-500 transition-colors"
            >
              Offerte Aanvragen
            </Link>
            <Link
              to="/contact"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors"
            >
              Contact Opnemen
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">25+ Jaar Ervaring</h3>
              <p className="text-gray-600">Expertise in landmeting en technische documentatie</p>
            </div>
            <div>
              <FileCheck className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beëdigd Expert</h3>
              <p className="text-gray-600">Officieel erkend landmeter-expert</p>
            </div>
            <div>
              <Calculator className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparante Prijzen</h3>
              <p className="text-gray-600">Duidelijke offertes zonder verborgen kosten</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
