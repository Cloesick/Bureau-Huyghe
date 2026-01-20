import { FileText, Database, Code2, Layers, Ruler, Calculator, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';

export default function TechnischeDocumentatiePage() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Database,
      title: t.pages.technischeDocumentatie.bim,
      description: t.pages.technischeDocumentatie.bimDesc,
      features: t.pages.technischeDocumentatie.bimFeatures
    },
    {
      icon: Code2,
      title: t.pages.technischeDocumentatie.gis,
      description: t.pages.technischeDocumentatie.gisDesc,
      features: t.pages.technischeDocumentatie.gisFeatures
    },
    {
      icon: Layers,
      title: t.pages.technischeDocumentatie.cad,
      description: t.pages.technischeDocumentatie.cadDesc,
      features: t.pages.technischeDocumentatie.cadFeatures
    }
  ];

  const process = [
    {
      title: t.pages.technischeDocumentatie.step1Title,
      description: t.pages.technischeDocumentatie.step1Desc
    },
    {
      title: t.pages.technischeDocumentatie.step2Title,
      description: t.pages.technischeDocumentatie.step2Desc
    },
    {
      title: t.pages.technischeDocumentatie.step3Title,
      description: t.pages.technischeDocumentatie.step3Desc
    },
    {
      title: t.pages.technischeDocumentatie.step4Title,
      description: t.pages.technischeDocumentatie.step4Desc
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
      question: t.pages.technischeDocumentatie.faq1Q,
      answer: t.pages.technischeDocumentatie.faq1A
    },
    {
      question: t.pages.technischeDocumentatie.faq2Q,
      answer: t.pages.technischeDocumentatie.faq2A
    },
    {
      question: t.pages.technischeDocumentatie.faq3Q,
      answer: t.pages.technischeDocumentatie.faq3A
    },
    {
      question: t.pages.technischeDocumentatie.faq4Q,
      answer: t.pages.technischeDocumentatie.faq4A
    }
  ];

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.pages.technischeDocumentatie.title}
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              {t.pages.technischeDocumentatie.heroText}
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
            {t.pages.technischeDocumentatie.servicesTitle}
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

      {/* Deliverables Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.pages.technischeDocumentatie.deliverablesTitle}
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
            {t.pages.landmeting.ctaTitle}
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
              <Scan className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pages.technischeDocumentatie.modernTechnology}</h3>
              <p className="text-gray-600">{t.pages.technischeDocumentatie.modernTechnologyText}</p>
            </div>
            <div>
              <Ruler className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pages.technischeDocumentatie.highPrecision}</h3>
              <p className="text-gray-600">{t.pages.technischeDocumentatie.highPrecisionText}</p>
            </div>
            <div>
              <Calculator className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pages.landmeting.transparentPrices}</h3>
              <p className="text-gray-600">{t.pages.landmeting.transparentPricesText}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
