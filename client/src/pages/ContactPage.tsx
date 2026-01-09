import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import CalendlyBooking from '../components/CalendlyBooking';
import Layout from '../components/Layout';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Bezoekadres',
      content: 'Straat 123\n8200 Brugge',
      link: 'https://goo.gl/maps/your-address-here'
    },
    {
      icon: Phone,
      title: 'Telefoon',
      content: '+32 (0)50 00 00 00',
      link: 'tel:+3250000000'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@bureau-huyghe.be',
      link: 'mailto:info@bureau-huyghe.be'
    },
    {
      icon: Clock,
      title: 'Openingsuren',
      content: 'Maandag - Vrijdag\n9:00 - 17:00'
    }
  ];

  const social = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/bureauhuyghe'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/bureau-huyghe'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/bureauhuyghe'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Heeft u een vraag over onze diensten of wilt u een offerte aanvragen?
              Vul het onderstaande formulier in of neem rechtstreeks contact met ons op.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contactformulier</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Details */}
              <div className="bg-primary-900 text-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Contactgegevens</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-2 bg-primary-800/50 rounded-lg">
                          <Icon className="w-5 h-5 text-accent-400" />
                        </div>
                        <div>
                          {info.link ? (
                            <a
                              href={info.link}
                              target={info.link.startsWith('http') ? '_blank' : undefined}
                              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="group"
                            >
                              <h3 className="font-semibold mb-1 text-primary-100">{info.title}</h3>
                              <p className="text-primary-300 group-hover:text-accent-400 transition-colors whitespace-pre-line">
                                {info.content}
                              </p>
                            </a>
                          ) : (
                            <>
                              <h3 className="font-semibold mb-1 text-primary-100">{info.title}</h3>
                              <p className="text-primary-300 whitespace-pre-line">{info.content}</p>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-primary-800">
                  <h3 className="font-semibold text-primary-100 mb-4">Volg ons</h3>
                  <div className="flex gap-4">
                    {social.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-primary-800/50 text-primary-200 hover:bg-primary-800 hover:text-accent-400 transition-all duration-300"
                          aria-label={platform.name}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <iframe
                  className="w-full h-[300px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.9493796325766!2d3.2161439!3d51.2098789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c350d0c1a7d6ef%3A0x2a0c91b76f87c1b0!2sStraat%20123%2C%208200%20Brugge!5e0!3m2!1sen!2sbe!4v1640780000000!5m2!1sen!2sbe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="afspraak" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <CalendlyBooking variant="full" />
        </div>
      </section>
    </Layout>
  );
}
