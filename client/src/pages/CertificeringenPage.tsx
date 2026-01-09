import { Award, CheckCircle, FileCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

interface Certification {
  id: string;
  title: string;
  organization: string;
  description: string;
  validUntil: string;
  icon: typeof Award | typeof Shield | typeof FileCheck;
}

export default function CertificeringenPage() {
  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Beëdigd Landmeter-Expert',
      organization: 'Federale Overheidsdienst Economie',
      description: 'Officiële erkenning als beëdigd landmeter-expert, conform de Belgische wetgeving. Bevoegd voor het uitvoeren van alle landmeetkundige werkzaamheden en het opstellen van officiële documenten.',
      validUntil: '2027',
      icon: Shield
    },
    {
      id: '2',
      title: 'ISO 9001:2015 Certificering',
      organization: 'Bureau Veritas',
      description: 'Certificering voor kwaliteitsmanagement, garanderend dat onze diensten voldoen aan de hoogste kwaliteitsnormen en klanteisen.',
      validUntil: '2026',
      icon: Award
    },
    {
      id: '3',
      title: 'BIM Level 2 Certificering',
      organization: 'Building Smart International',
      description: 'Erkenning van onze expertise in Building Information Modeling (BIM) en digitale bouwprocessen. Garandeert onze bekwaamheid in moderne 3D-modelleringstechnieken.',
      validUntil: '2026',
      icon: FileCheck
    }
  ];

  const features = [
    {
      title: 'Kwaliteitsgarantie',
      description: 'Al onze metingen en documenten voldoen aan de strengste kwaliteitseisen en worden regelmatig gecontroleerd.'
    },
    {
      title: 'Juridische Zekerheid',
      description: 'Als beëdigd landmeter-expert kunnen wij officiële documenten opstellen die rechtsgeldig zijn.'
    },
    {
      title: 'Moderne Technologie',
      description: 'Onze certificeringen garanderen expertise in de nieuwste technologieën en methoden.'
    },
    {
      title: 'Continue Bijscholing',
      description: 'Regelmatige bijscholing en hercertificering zorgen ervoor dat onze kennis actueel blijft.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Certificeringen & Erkenningen
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Onze expertise wordt ondersteund door officiële certificeringen en erkenningen.
              Ontdek waarom u met vertrouwen een beroep kunt doen op onze diensten.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-primary-600 font-medium mb-4">
                        {cert.organization} • Geldig tot {cert.validUntil}
                      </p>
                      <p className="text-gray-600">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Wat betekent dit voor u?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Klaar om samen te werken?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Neem contact op voor een vrijblijvende offerte of stel uw vragen.
            We helpen u graag verder.
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
    </Layout>
  );
}
