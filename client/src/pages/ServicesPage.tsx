import { Link } from 'react-router-dom';
import { MapPin, Building2, FileText, Scale } from 'lucide-react';
export default function ServicesPage() {

  const services = [
    {
      id: 'property',
      title: 'Landmeting & Afpaling',
      icon: MapPin,
      path: '/services/property-survey',
      description: 'Professionele landmeting en afpaling voor uw eigendom'
    },
    {
      id: 'construction',
      title: 'Bouwmetingen',
      icon: Building2,
      path: '/services/construction-survey',
      description: 'Nauwkeurige bouwmetingen voor uw projecten'
    },
    {
      id: 'technical',
      title: 'Technische Documentatie',
      icon: FileText,
      path: '/services/technical-documentation',
      description: 'Gedetailleerde technische documentatie en plannen'
    },
    {
      id: 'legal',
      title: 'Juridische Diensten',
      icon: Scale,
      path: '/services/legal-services',
      description: 'Juridische ondersteuning bij vastgoedzaken'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 
        data-test="services-title"
        className="text-3xl font-bold text-center mb-12"
      >
        Onze Diensten
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
                Meer informatie →
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
          Offerte Aanvragen
        </Link>
      </div>
    </div>
  );
}
