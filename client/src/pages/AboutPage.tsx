import { MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import Header from '../components/Header';

export default function AboutPage() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: 'Jan Huyghe',
      role: t.pages.about.teamRole,
      image: '/team/jan-huyghe.jpg',
      description: t.pages.about.teamDesc
    }
    // Add more team members as needed
  ];

  const values = [
    {
      title: t.pages.about.valueExpertise,
      description: t.pages.about.valueExpertiseDesc
    },
    {
      title: t.pages.about.valueAccuracy,
      description: t.pages.about.valueAccuracyDesc
    },
    {
      title: t.pages.about.valueReliability,
      description: t.pages.about.valueReliabilityDesc
    },
    {
      title: t.pages.about.valueInnovation,
      description: t.pages.about.valueInnovationDesc
    }
  ];

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section 
        data-test="about-hero"
        className="bg-blue-900 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.pages.about.title}
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl">
            {t.pages.about.heroText}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section 
        data-test="history-section"
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t.pages.about.historyTitle}</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              {t.pages.about.historyText1}
            </p>
            <p>
              {t.pages.about.historyText2}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        data-test="team-section"
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.pages.about.teamTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                data-test={`team-member-${member.name.toLowerCase().replace(' ', '-')}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        data-test="values-section"
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.pages.about.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div 
                key={value.title}
                data-test={`value-${value.title.toLowerCase()}`}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section 
        data-test="location-section"
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.pages.about.locationTitle}</h2>
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Bureau Huyghe</p>
                  <p>Koningin Astridlaan 134 bus 1</p>
                  <p>8200 Brugge</p>
                </div>
              </div>
              <p className="text-gray-600">
                {t.pages.about.locationText}
              </p>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.1025042422387!2d3.2161872!3d51.2098897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c350d0c1a7d6f9%3A0x9b6a5f5d5a5c5c5c!2sKoningin%20Astridlaan%20134%2C%208200%20Brugge!5e0!3m2!1sen!2sbe!4v1625581234567!5m2!1sen!2sbe"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
