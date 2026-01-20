import { Building2, Ruler, ScanLine, FileCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function ConstructionSurveyPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: 'Bouwplaats Uitzetting',
      description: 'Nauwkeurige uitzetting van gebouwen, wegen en infrastructuur volgens bouwplannen.'
    },
    {
      icon: Ruler,
      title: 'Maatvoering',
      description: 'Gedetailleerde maatvoering voor constructie en renovatie projecten.'
    },
    {
      icon: ScanLine,
      title: '3D Scanning',
      description: 'Geavanceerde 3D laser scanning voor complexe structuren en as-built plannen.'
    },
    {
      icon: FileCheck,
      title: 'Conformiteitscontrole',
      description: 'Controle van uitgevoerde werken volgens plannen en specificaties.'
    }
  ];

  const benefits = [
    {
      title: 'Precisie',
      description: 'Millimeter-nauwkeurige metingen met state-of-the-art apparatuur'
    },
    {
      title: 'Efficiëntie',
      description: 'Snelle verwerking en directe beschikbaarheid van meetgegevens'
    },
    {
      title: 'Expertise',
      description: 'Jarenlange ervaring in complexe bouwprojecten'
    },
    {
      title: 'Flexibiliteit',
      description: 'Aanpasbaar aan verschillende projectgroottes en -types'
    }
  ];

  const allServices = [
    { path: '/services/property-survey', key: 'property-survey', label: t.pages.services.landmeting },
    { path: '/services/construction-survey', key: 'construction-survey', label: t.pages.services.bouwmeting },
    { path: '/services/technical-documentation', key: 'technical-documentation', label: t.pages.services.technisch },
    { path: '/services/legal-services', key: 'legal-services', label: t.pages.services.juridisch },
  ];

  const related = allServices.filter((s) => s.key !== 'construction-survey');

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
        <h1 className="text-3xl font-bold mb-4" data-test="hero-title">{t.pages.services.bouwmeting}</h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Professionele ondersteuning voor uw bouwproject met geavanceerde meetapparatuur en 
          expertise in bouwplaats uitzetting en maatvoering.
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

      {/* Benefits Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12" data-test="benefits-section">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Voordelen van Onze Aanpak</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12" data-test="equipment-section">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Onze Apparatuur</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Robotische Total Stations</h3>
            <p className="text-gray-600">Voor nauwkeurige metingen en uitzettingen</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3D Laser Scanners</h3>
            <p className="text-gray-600">Voor gedetailleerde 3D opmetingen</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">GNSS Ontvangers</h3>
            <p className="text-gray-600">Voor exacte positionering en coördinaten</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between" data-test="cta-section">
        <div>
          <h2 className="text-2xl font-bold mb-2">Start Uw Bouwproject</h2>
          <p className="text-blue-100">Laat ons uw project ondersteunen met professionele meetdiensten.</p>
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
