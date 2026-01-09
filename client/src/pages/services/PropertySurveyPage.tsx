import { MapPin, Ruler, FileText, Scale } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Link } from 'react-router-dom';

export default function PropertySurveyPage() {
  useLanguage();

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 mb-12">
        <h1 className="text-3xl font-bold mb-4">Landmeten & Afpaling</h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Professionele landmeetkundige diensten met de nieuwste technologie en juridische expertise.
          Van perceelafbakening tot topografische opmetingen.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
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
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
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
      <div className="bg-blue-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Klaar om te starten?</h2>
          <p className="text-blue-100">Contacteer ons voor een vrijblijvende offerte of afspraak.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link to="/contact" className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Offerte Aanvragen
          </Link>
          <Link to="/appointments" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Afspraak Maken
          </Link>
        </div>
      </div>
    </div>
  );
}
