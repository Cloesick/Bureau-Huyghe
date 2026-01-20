import { MapPin, Ruler, FileText, Scale } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function PropertySurveyPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: MapPin,
      title: 'Perceelafbakening',
      description: 'Nauwkeurige afbakening van perceelgrenzen met officiële markers en documentatie.'
    },
    {
      icon: Ruler,
      title: 'Topografische Opmeting',
      description: 'Gedetailleerde opmeting van terrein met hoogtelijnen en alle relevante elementen.'
    },
    {
      icon: FileText,
      title: 'Plannen & Documenten',
      description: 'Opstellen van officiële plannen en documenten voor notaris en kadaster.'
    },
    {
      icon: Scale,
      title: 'Expertise & Advies',
      description: 'Professioneel advies bij eigendomskwesties en grensgeschillen.'
    }
  ];

  const allServices = [
    { path: '/services/property-survey', key: 'property-survey', label: t.pages.services.landmeting },
    { path: '/services/construction-survey', key: 'construction-survey', label: t.pages.services.bouwmeting },
    { path: '/services/technical-documentation', key: 'technical-documentation', label: t.pages.services.technisch },
    { path: '/services/legal-services', key: 'legal-services', label: t.pages.services.juridisch },
  ];

  const related = allServices.filter((s) => s.key !== 'property-survey');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
      <nav className="mb-8" data-test="service-menu">
        <div className="flex flex-wrap gap-3">
          {allServices.map((s) => (
            <Link
              key={s.key}
              to={s.path}
              data-test={`nav-${s.key}`}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="bg-blue-900 text-white rounded-2xl p-8 mb-12" data-test="hero-section">
        <h1 className="text-3xl font-bold mb-4" data-test="hero-title">{t.pages.services.landmeting}</h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Professionele landmeetkundige diensten met de nieuwste technologie en juridische expertise.
          Van perceelafbakening tot topografische opmetingen.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12" data-test="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md" data-test="service-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12" data-test="benefits-section">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Ons Werkproces</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2">Eerste Contact</h3>
            <p className="text-gray-600">Bespreking van uw specifieke behoeften en situatie</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2">Terreinbezoek</h3>
            <p className="text-gray-600">Analyse ter plaatse en eerste metingen</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2">Uitvoering</h3>
            <p className="text-gray-600">Gedetailleerde opmeting en verwerking</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold mb-4">4</div>
            <h3 className="font-semibold mb-2">Aflevering</h3>
            <p className="text-gray-600">Officiële documenten en plannen</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between" data-test="cta-section">
        <div>
          <h2 className="text-2xl font-bold mb-2">Klaar om te starten?</h2>
          <p className="text-blue-100">Contacteer ons voor uw vraag.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link to="/contact" className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Contact
          </Link>
          <Link to="/offerte" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Vraag offerte aan
          </Link>
        </div>
      </div>

      <section className="mt-12" data-test="related-services">
        <div className="grid md:grid-cols-3 gap-4">
          {related.map((s) => (
            <Link
              key={s.key}
              to={s.path}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-primary-500 transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
    </Layout>
  );
}
