import { Scale, FileText, Users, Search } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function LegalServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Scale,
      title: 'Juridische Expertise',
      description: 'Onafhankelijke expertise bij geschillen en rechtszaken rond eigendomsgrenzen.'
    },
    {
      icon: FileText,
      title: 'Plaatsbeschrijvingen',
      description: 'Gedetailleerde beschrijvingen voor verhuur, verkoop of bouwprojecten.'
    },
    {
      icon: Users,
      title: 'Bemiddeling',
      description: 'Professionele bemiddeling bij grensgeschillen tussen buren.'
    },
    {
      icon: Search,
      title: 'Due Diligence',
      description: 'Technisch onderzoek van vastgoed voor aankoop of verkoop.'
    }
  ];

  const expertise = [
    {
      title: 'Vastgoedtransacties',
      items: [
        'Technische due diligence',
        'Waardebepalingen',
        'Oppervlakteberekeningen',
        'Conformiteitscontroles'
      ]
    },
    {
      title: 'Juridische Ondersteuning',
      items: [
        'Expertiseverslagen',
        'Gerechtsdeskundige rapporten',
        'Technische adviezen',
        'Bemiddelingsdossiers'
      ]
    }
  ];

  const allServices = [
    { path: '/services/property-survey', key: 'property-survey', label: t.pages.services.landmeting },
    { path: '/services/construction-survey', key: 'construction-survey', label: t.pages.services.bouwmeting },
    { path: '/services/technical-documentation', key: 'technical-documentation', label: t.pages.services.technisch },
    { path: '/services/legal-services', key: 'legal-services', label: t.pages.services.juridisch },
  ];

  const related = allServices.filter((s) => s.key !== 'legal-services');

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
        <h1 className="text-3xl font-bold mb-4" data-test="hero-title">{t.pages.services.juridisch}</h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Professionele ondersteuning bij juridische en technische vastgoedkwesties.
          Van expertiseverslagen tot bemiddeling bij geschillen.
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

      {/* Expertise Areas */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12" data-test="expertise-section">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Expertise Domeinen</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {expertise.map((area, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">{area.title}</h3>
              <ul className="space-y-2">
                {area.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Credentials Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Onze Credentials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Beëdigd Landmeter-Expert</h3>
            <p className="text-gray-600">Officieel erkend door de Federale Raad van Landmeters-Experten</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Gerechtsdeskundige</h3>
            <p className="text-gray-600">Aangesteld door rechtbanken voor technische expertise</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Erkend Bemiddelaar</h3>
            <p className="text-gray-600">Gecertificeerd voor vastgoed- en grondbemiddeling</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between" data-test="cta-section">
        <div>
          <h2 className="text-2xl font-bold mb-2">Juridisch Advies Nodig?</h2>
          <p className="text-blue-100">Contacteer ons voor een eerste gesprek over uw situatie.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link to="/contact" className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Contact Opnemen
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
