import { FileText, Database, Code2, Layers, Ruler, Calculator, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function TechnischeDocumentatiePage() {
  const services = [
    {
      icon: Database,
      title: 'BIM Modellering',
      description: 'Gedetailleerde 3D-modellen voor bouwprojecten met volledige BIM-integratie.',
      features: [
        'IFC compatibel',
        'Clash detectie',
        'Hoeveelheidsstaten',
        'Revit/ArchiCAD support'
      ]
    },
    {
      icon: Code2,
      title: 'GIS Mapping',
      description: 'Professionele GIS-kaarten en analyses voor ruimtelijke planning en beheer.',
      features: [
        'QGIS/ArcGIS',
        'Thematische kaarten',
        'Ruimtelijke analyses',
        'Geodatabases'
      ]
    },
    {
      icon: Layers,
      title: '2D/3D CAD',
      description: 'Technische tekeningen en 3D-modellen voor bouw en industrie.',
      features: [
        'AutoCAD/MicroStation',
        'As-built tekeningen',
        'Detailtekeningen',
        'Constructieplannen'
      ]
    }
  ];

  const process = [
    {
      title: 'Inventarisatie',
      description: 'Analyse van bestaande documentatie en projectvereisten.'
    },
    {
      title: 'Opmeting & Scanning',
      description: 'Digitale opmeting en/of 3D scanning van de bestaande situatie.'
    },
    {
      title: 'Verwerking',
      description: 'Omzetting van ruwe data naar bruikbare modellen en tekeningen.'
    },
    {
      title: 'Kwaliteitscontrole',
      description: 'Grondige controle en validatie van alle deliverables.'
    }
  ];

  const deliverables = [
    {
      title: 'BIM Modellen',
      formats: ['IFC', 'RVT', 'PLN'],
      description: 'Volledig geïntegreerde BIM-modellen met alle relevante informatie en parameters.'
    },
    {
      title: 'CAD Tekeningen',
      formats: ['DWG', 'DXF', 'DGN'],
      description: '2D en 3D CAD-tekeningen volgens de geldende normen en standaarden.'
    },
    {
      title: 'GIS Data',
      formats: ['SHP', 'GeoJSON', 'KML'],
      description: 'GIS-bestanden met alle geografische data en attributen.'
    },
    {
      title: 'Rapporten',
      formats: ['PDF', 'XLSX', 'DOCX'],
      description: 'Gedetailleerde technische rapporten, metingstaten en analyses.'
    }
  ];

  const faqs = [
    {
      question: 'Welke bestandsformaten worden ondersteund?',
      answer: 'We ondersteunen alle gangbare formaten zoals IFC, DWG, RVT, SHP en meer. Specifieke formaten op aanvraag.'
    },
    {
      question: 'Hoe lang duurt een gemiddeld project?',
      answer: 'De doorlooptijd varieert van enkele dagen tot weken, afhankelijk van de complexiteit en omvang.'
    },
    {
      question: 'Is de data BIM-compatibel?',
      answer: 'Ja, al onze modellen voldoen aan de BIM-standaarden en zijn direct bruikbaar in BIM-workflows.'
    },
    {
      question: 'Kan bestaande documentatie geïntegreerd worden?',
      answer: 'Ja, we kunnen bestaande plannen en modellen integreren in nieuwe documentatie.'
    }
  ];

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technische Documentatie
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Van BIM-modellen tot GIS-kaarten: professionele technische documentatie
              voor uw projecten, met de nieuwste technologie en expertise.
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
            Onze Documentatie Diensten
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
                        <FileText className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
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

      {/* Deliverables Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Deliverables & Formaten
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {deliverables.map((deliverable) => (
              <div key={deliverable.title} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{deliverable.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {deliverable.formats.map((format) => (
                    <span
                      key={format}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{deliverable.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Scan className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Moderne Technologie</h3>
              <p className="text-gray-600">State-of-the-art hardware en software</p>
            </div>
            <div>
              <Ruler className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hoge Precisie</h3>
              <p className="text-gray-600">Nauwkeurige documentatie en modellen</p>
            </div>
            <div>
              <Calculator className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparante Prijzen</h3>
              <p className="text-gray-600">Duidelijke offertes zonder verrassingen</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
