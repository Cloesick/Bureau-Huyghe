import { ArrowRight, Mail, Phone } from 'lucide-react';
import Layout from '../components/Layout';

export default function OffertePage() {
  return (
    <Layout>
      <section className="bg-primary-500 text-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Offerte aanvragen</h1>
          <p className="text-xl text-primary-100 mb-8">
            Een offerte aanvragen gebeurt via mail. Beschrijf kort uw vraag en locatie, dan nemen we contact op.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:info@bureau-huyghe.be?subject=Vraag%20offerte%20aan"
              className="bg-accent-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-500 transition-colors inline-flex items-center gap-2"
            >
              Mail ons
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+3250000000"
              className="bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors border border-white/30 inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Bel ons
            </a>
          </div>

          <div className="mt-8 text-sm text-primary-200 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a className="underline" href="mailto:info@bureau-huyghe.be">info@bureau-huyghe.be</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a className="underline" href="tel:+3250000000">+32 (0)50 00 00 00</a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
