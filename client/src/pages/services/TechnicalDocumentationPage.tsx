import { FileText, Map, Database, FileCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechnicalDocumentationPage() {

  const services = [
    {
      icon: Map,
      title: 'Digitale Terreinmodellen',
      description: 'Gedetailleerde 3D modellen van terreinen met hoogtekaarten en analyses.'
    },
    {
      icon: Database,
      title: 'GIS Mapping',
      description: 'Geografische informatiesystemen voor ruimtelijke analyse en planning.'
    },
    {
      icon: FileText,
      title: 'Technische Tekeningen',
      description: 'Professionele CAD tekeningen en technische documentatie.'
    },
    {
      icon: FileCheck,
      title: 'Vergunningsaanvragen',
      description: 'Voorbereiding en begeleiding van technische dossiers voor vergunningen.'
    }
  ];

  const deliverables = [
    {
      icon: Download,
      title: 'Digitale Formaten',
      items: [
        'AutoCAD (.dwg, .dxf)',
        'GIS bestanden (.shp, .gdb)',
        'PDF documenten',
        '3D modellen (.obj, .ifc)'
      ]
    },
    {
      icon: FileText,
      title: 'Documentatie',
      items: [
        'Technische rapporten',
        'Meetstaten',
        'Analyserapporten',
        'Certificaten'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 mb-12">
        <h1 className="text-3xl font-bold mb-4">Technische Documentatie</h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Professionele technische documentatie en digitale modellen voor uw projecten.
          Van terreinmodellen tot vergunningsaanvragen.
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

      {/* Deliverables Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Leverbare Documenten</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {deliverables.map((deliverable, index) => {
            const Icon = deliverable.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-blue-900" />
                  <h3 className="text-xl font-semibold text-blue-900">{deliverable.title}</h3>
                </div>
                <ul className="space-y-2">
                  {deliverable.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Kwaliteitsgarantie</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Precisie</h3>
            <p className="text-gray-600">Nauwkeurige metingen en documentatie volgens industriestandaarden</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Compatibiliteit</h3>
            <p className="text-gray-600">Bestanden compatibel met alle gangbare software</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-gray-600">Technische ondersteuning en uitleg bij oplevering</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Vraag een Offerte Aan</h2>
          <p className="text-primary-100">Laat ons weten welke technische documentatie u nodig heeft.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link to="/contact" className="bg-accent-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-500 transition-colors">
            Offerte Aanvragen
          </Link>
          <Link to="/contact" className="bg-primary-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-800 transition-colors">
            Meer Informatie
          </Link>
        </div>
      </div>
    </div>
  );
}
