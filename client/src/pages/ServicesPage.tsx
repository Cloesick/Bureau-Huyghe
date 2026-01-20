import { Link } from 'react-router-dom';
import { MapPin, Building2, FileText, Scale } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import Header from '../components/Header';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'property',
      title: t.pages.services.landmeting,
      icon: MapPin,
      path: '/services/property-survey',
      description: t.pages.services.landmetingDesc
    },
    {
      id: 'construction',
      title: t.pages.services.bouwmeting,
      icon: Building2,
      path: '/services/construction-survey',
      description: t.pages.services.bouwmetingDesc
    },
    {
      id: 'technical',
      title: t.pages.services.technisch,
      icon: FileText,
      path: '/services/technical-documentation',
      description: t.pages.services.technischDesc
    },
    {
      id: 'legal',
      title: t.pages.services.juridisch,
      icon: Scale,
      path: '/services/legal-services',
      description: t.pages.services.juridischDesc
    }
  ];

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 
        data-test="services-title"
        className="text-3xl font-bold text-center mb-12"
      >
        {t.pages.services.title}
      </h1>

      <div 
        data-test="services-grid"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {services.map((service) => (
          <Link
            key={service.id}
            to={service.path}
            data-test={`service-card-${service.id}`}
            className="group p-6 rounded-xl border border-gray-200 hover:border-primary-500 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-primary-600 group-hover:text-primary-700 font-medium">
                {t.pages.services.moreInfo} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div 
        data-test="services-cta"
        className="mt-12 text-center"
      >
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-400 hover:bg-accent-500 transition-colors"
        >
          {t.requestQuote}
        </Link>
      </div>
      </div>
    </div>
  );
}
