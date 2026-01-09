import { Calendar, ArrowRight, BookOpen, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

interface NewsArticle {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: 'wetgeving' | 'regio' | 'actueel';
  icon: typeof BookOpen | typeof MapPin | typeof FileText;
  link?: string;
}

export default function NieuwsPage() {
  const articles: NewsArticle[] = [
    {
      id: '1',
      date: '15 december 2025',
      title: 'Nieuwe wetgeving omtrent digitale opmeting van gebouwen',
      excerpt: 'Vanaf 1 januari 2026 worden nieuwe normen van kracht voor de digitale opmeting van gebouwen. Deze wetgeving heeft belangrijke implicaties voor landmeters en bouwprofessionals.',
      category: 'wetgeving',
      icon: BookOpen,
      link: 'https://www.ejustice.just.fgov.be/'
    },
    {
      id: '2',
      date: '10 december 2025',
      title: 'Grootschalig verkavelingproject Brugge Noord goedgekeurd',
      excerpt: 'De stad Brugge heeft groen licht gegeven voor een nieuw verkavelingproject in het noorden van de stad. Het project omvat 45 nieuwe kavels en zal in 2026 van start gaan.',
      category: 'regio',
      icon: MapPin
    },
    {
      id: '3',
      date: '5 december 2025',
      title: 'Update BIM-normen voor landmeters',
      excerpt: 'De Belgische BIM-normen voor landmeters zijn geüpdatet met nieuwe richtlijnen voor 3D-scanning en puntenwolkverwerking. Deze aanpassingen zijn cruciaal voor moderne bouwprojecten.',
      category: 'wetgeving',
      icon: BookOpen
    },
    {
      id: '4',
      date: '1 december 2025',
      title: 'Nieuwe technologie voor kadastrale metingen',
      excerpt: 'De FOD Financiën introduceert nieuwe richtlijnen voor het gebruik van drones en LiDAR-technologie bij kadastrale metingen. Deze innovatie verhoogt de nauwkeurigheid significant.',
      category: 'actueel',
      icon: FileText
    },
    {
      id: '5',
      date: '28 november 2025',
      title: 'Wijzigingen in de verkavelingswetgeving West-Vlaanderen',
      excerpt: 'De provincie West-Vlaanderen heeft belangrijke wijzigingen aangekondigd in de verkavelingswetgeving. Focus ligt op duurzaamheid en waterbeheersing.',
      category: 'wetgeving',
      icon: BookOpen
    }
  ];

  const categories = {
    wetgeving: { name: 'Wetgeving', color: 'bg-blue-100 text-blue-800' },
    regio: { name: 'Regionaal', color: 'bg-green-100 text-green-800' },
    actueel: { name: 'Actueel', color: 'bg-amber-100 text-amber-800' }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nieuws & Updates
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Blijf op de hoogte van de laatste ontwikkelingen in de landmeetkundige sector,
              regionale projecten en belangrijke wetswijzigingen.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8">
            {articles.map((article) => {
              const Icon = article.icon;
              const category = categories[article.category];
              
              return (
                <article 
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-6">
                    <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {article.date}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${category.color}`}>
                          {category.name}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {article.excerpt}
                      </p>
                      {article.link && (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Lees meer
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Blijf op de hoogte
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Schrijf u in voor onze nieuwsbrief en ontvang maandelijks updates over de laatste
            ontwikkelingen in de sector.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Inschrijven voor nieuwsbrief
          </Link>
        </div>
      </section>
    </Layout>
  );
}
