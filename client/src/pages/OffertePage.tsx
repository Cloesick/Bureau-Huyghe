import { FileText, Clock, Calculator as CalcIcon, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import QuoteCalculator from '../components/QuoteCalculator';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText | typeof Clock | typeof CalcIcon | typeof CheckCircle;
}

export default function OffertePage() {
  const steps: Step[] = [
    {
      id: '1',
      title: 'Vul het formulier in',
      description: 'Geef ons de nodige details over uw project. Hoe meer informatie, hoe accurater onze offerte.',
      icon: FileText
    },
    {
      id: '2',
      title: 'Snelle verwerking',
      description: 'We verwerken uw aanvraag binnen 24 uur op werkdagen.',
      icon: Clock
    },
    {
      id: '3',
      title: 'Gedetailleerde offerte',
      description: 'U ontvangt een heldere offerte met alle specificaties en prijzen.',
      icon: CalcIcon
    },
    {
      id: '4',
      title: 'Bevestiging & Planning',
      description: 'Na uw akkoord plannen we direct de uitvoering van de werkzaamheden.',
      icon: CheckCircle
    }
  ];

  const guarantees = [
    {
      title: 'Transparante prijzen',
      description: 'Geen verborgen kosten. Onze offertes zijn duidelijk en gedetailleerd.'
    },
    {
      title: 'Snelle respons',
      description: 'Binnen 24 uur reactie op werkdagen.'
    },
    {
      title: 'Vrijblijvend',
      description: 'De offerte is geheel vrijblijvend en zonder verplichtingen.'
    },
    {
      title: 'Maatwerk',
      description: 'Elke offerte wordt op maat gemaakt voor uw specifieke situatie.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Offerte Aanvragen
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Vraag vrijblijvend een offerte aan voor uw project. Wij maken een gedetailleerd
              voorstel op maat, met transparante prijzen en duidelijke voorwaarden.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hoe werkt het?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="text-center"
                >
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary-50 mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Calculator Section */}
      <section id="calculator" className="bg-accent-50 py-16 border-y border-accent-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Snelle Prijsindicatie
              </h2>
              <p className="text-gray-600 mb-6">
                Wilt u snel weten wat uw project ongeveer kost? Gebruik onze calculator 
                voor een directe indicatieve prijs. Geen verplichtingen, gewoon een 
                eerlijke schatting.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Direct resultaat in 30 seconden
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Gebaseerd op actuele tarieven
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Vrijblijvend en zonder registratie
                </li>
              </ul>
            </div>
            <QuoteCalculator />
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Liever een gedetailleerde offerte?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vul onderstaand formulier in voor een persoonlijke offerte op maat. 
              Wij nemen binnen 24 uur contact met u op.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Offerte aanvragen
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Guarantees */}
            <div className="lg:col-span-1">
              <div className="bg-primary-900 text-white rounded-xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">
                  Onze garanties
                </h3>
                <div className="space-y-6">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-accent-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary-100 mb-1">
                          {guarantee.title}
                        </h4>
                        <p className="text-primary-300">
                          {guarantee.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-primary-800">
                  <h4 className="font-semibold text-primary-100 mb-4">
                    Liever telefonisch contact?
                  </h4>
                  <a
                    href="tel:+3250000000"
                    className="flex items-center gap-3 text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    <Clock className="w-5 h-5" />
                    <span>+32 (0)50 00 00 00</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
