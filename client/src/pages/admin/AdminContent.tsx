import { useState } from 'react';
import { 
  Save, 
  Edit, 
  Eye,
  FileText,
  Home,
  Briefcase,
  Phone,
  Info,
  ChevronRight,
  Check,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface ContentSection {
  id: string;
  page: string;
  section: string;
  fields: ContentField[];
}

interface ContentField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'list';
  value: string | string[];
}

const contentSections: ContentSection[] = [
  {
    id: 'home-hero',
    page: 'Homepage',
    section: 'Hero Sectie',
    fields: [
      { id: 'hero-title', label: 'Titel', type: 'text', value: 'Uw Betrouwbare Partner in Landmeetkunde' },
      { id: 'hero-subtitle', label: 'Ondertitel', type: 'textarea', value: 'Professionele landmeetkundige diensten in West-Vlaanderen. Van perceelafpaling tot 3D-scanning, wij leveren nauwkeurig en betrouwbaar werk.' },
      { id: 'hero-cta', label: 'CTA Knop Tekst', type: 'text', value: 'Vraag Offerte Aan' },
    ]
  },
  {
    id: 'home-stats',
    page: 'Homepage',
    section: 'Statistieken',
    fields: [
      { id: 'stat-years', label: 'Jaren Ervaring', type: 'text', value: '25+' },
      { id: 'stat-projects', label: 'Projecten', type: 'text', value: '5000+' },
      { id: 'stat-satisfaction', label: 'Tevredenheid', type: 'text', value: '98%' },
      { id: 'stat-response', label: 'Responstijd', type: 'text', value: '48u' },
    ]
  },
  {
    id: 'contact-info',
    page: 'Contact',
    section: 'Contactgegevens',
    fields: [
      { id: 'contact-address', label: 'Adres', type: 'textarea', value: 'Straat 123\n8200 Brugge' },
      { id: 'contact-phone', label: 'Telefoon', type: 'text', value: '+32 (0)50 00 00 00' },
      { id: 'contact-email', label: 'Email', type: 'text', value: 'info@bureau-huyghe.be' },
      { id: 'contact-hours', label: 'Openingsuren', type: 'textarea', value: 'Maandag - Vrijdag\n9:00 - 17:00' },
    ]
  },
  {
    id: 'about-team',
    page: 'Over Ons',
    section: 'Team',
    fields: [
      { id: 'team-intro', label: 'Introductie', type: 'textarea', value: 'Ons team bestaat uit ervaren landmeters-experten met een passie voor precisie en klantenservice.' },
    ]
  },
  {
    id: 'pricing-landmeting',
    page: 'Landmeting',
    section: 'Prijzen',
    fields: [
      { id: 'price-afpaling', label: 'Perceelafpaling (vanaf)', type: 'text', value: '€350' },
      { id: 'price-topografie', label: 'Topografie (vanaf)', type: 'text', value: '€450' },
      { id: 'price-gps', label: 'GPS Meting (vanaf)', type: 'text', value: '€275' },
    ]
  },
];

const pages = [
  { id: 'all', label: 'Alle Pagina\'s', icon: FileText },
  { id: 'Homepage', label: 'Homepage', icon: Home },
  { id: 'Landmeting', label: 'Landmeting', icon: Briefcase },
  { id: 'Contact', label: 'Contact', icon: Phone },
  { id: 'Over Ons', label: 'Over Ons', icon: Info },
];

export default function AdminContent() {
  const [selectedPage, setSelectedPage] = useState('all');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [content, setContent] = useState(contentSections);
  const [savedMessage, setSavedMessage] = useState(false);

  const filteredSections = selectedPage === 'all' 
    ? content 
    : content.filter(s => s.page === selectedPage);

  const handleFieldChange = (sectionId: string, fieldId: string, value: string) => {
    setContent(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => 
            field.id === fieldId ? { ...field, value } : field
          )
        };
      }
      return section;
    }));
  };

  const handleSave = (sectionId: string) => {
    // In production, save to API
    console.log('Saving section:', sectionId);
    setEditingSection(null);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Beheer</h1>
          <p className="text-gray-500 mt-1">Bewerk teksten en afbeeldingen op uw website</p>
        </div>
        {savedMessage && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">Wijzigingen opgeslagen</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Page Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Pagina's</h3>
            <nav className="space-y-1">
              {pages.map(page => {
                const Icon = page.icon;
                const isActive = selectedPage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{page.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="lg:col-span-3 space-y-6">
          {filteredSections.map(section => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{section.section}</h3>
                  <p className="text-sm text-gray-500">{section.page}</p>
                </div>
                <div className="flex gap-2">
                  {editingSection === section.id ? (
                    <>
                      <button
                        onClick={() => setEditingSection(null)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        title="Annuleren"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSave(section.id)}
                        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Opslaan
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        title="Bekijken"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditingSection(section.id)}
                        className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Bewerken
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="grid gap-4">
                  {section.fields.map(field => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {editingSection === section.id ? (
                        field.type === 'textarea' ? (
                          <textarea
                            value={field.value as string}
                            onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : field.type === 'image' ? (
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                              Afbeelding wijzigen
                            </button>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={field.value as string}
                            onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        )
                      ) : (
                        <p className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg whitespace-pre-line">
                          {Array.isArray(field.value) ? field.value.join(', ') : field.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Geen content secties gevonden voor deze pagina</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
