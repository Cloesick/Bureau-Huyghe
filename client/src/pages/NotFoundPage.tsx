import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.pages.notFound.title}
          </h2>
          <p className="text-gray-600 mb-8">
            {t.pages.notFound.text}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t.pages.notFound.toHome}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.pages.notFound.goBack}
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-primary-950 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-primary-400">
          <p>&copy; 2025 Bureau Huyghe. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
