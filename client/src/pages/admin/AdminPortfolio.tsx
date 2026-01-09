import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Upload,
  X,
  Image as ImageIcon,
  Save,
  ChevronDown,
  Loader2,
  CheckCircle
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  description: string;
  featured: boolean;
  status: 'published' | 'draft';
}


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const categories = [
  'Perceelafpaling',
  'Topografie',
  'Bouwmeting',
  '3D Scanning',
  'Plaatsbeschrijving',
  'Juridisch'
];

// Mock data - replace with API calls
const initialPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Perceelafpaling Villa Damme',
    category: 'Perceelafpaling',
    location: 'Damme',
    date: '2024-12-15',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    description: 'Volledige perceelafpaling met plaatsing van 8 grenspalen.',
    featured: true,
    status: 'published'
  },
  {
    id: '2',
    title: '3D Scan Industrieel Pand',
    category: '3D Scanning',
    location: 'Zeebrugge',
    date: '2024-12-10',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400',
    description: 'Complete 3D scan voor BIM-model renovatieproject.',
    featured: false,
    status: 'published'
  },
  {
    id: '3',
    title: 'Topografische Opmeting Bouwgrond',
    category: 'Topografie',
    location: 'Knokke-Heist',
    date: '2024-12-05',
    image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=400',
    description: 'Gedetailleerde terreinopmeting voor nieuwbouwproject.',
    featured: true,
    status: 'draft'
  },
];

export default function AdminPortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredPortfolio = portfolio.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSave = (item: PortfolioItem) => {
    if (editingItem) {
      setPortfolio(prev => prev.map(p => p.id === item.id ? item : p));
    } else {
      setPortfolio(prev => [...prev, { ...item, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Beheer</h1>
          <p className="text-gray-500 mt-1">Beheer uw projecten en afbeeldingen</p>
        </div>
        <button
          onClick={() => { setEditingItem(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nieuw Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek op titel of locatie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
            >
              <option value="all">Alle categorieën</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolio.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative aspect-video">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Bewerken"
                >
                  <Edit className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Bekijken"
                >
                  <Eye className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(item.id)}
                  className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                  title="Verwijderen"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
              {item.featured && (
                <span className="absolute top-2 left-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
                  Uitgelicht
                </span>
              )}
              <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                item.status === 'published' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status === 'published' ? 'Gepubliceerd' : 'Concept'}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category} • {item.location}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.date).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredPortfolio.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Geen projecten gevonden</p>
          <button
            onClick={() => { setEditingItem(null); setShowModal(true); }}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            + Voeg uw eerste project toe
          </button>
        </div>
      )}

      {/* Edit/Create Modal */}
      {showModal && (
        <PortfolioModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingItem(null); }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Verwijderen?</h3>
            <p className="text-gray-600 mb-6">
              Weet u zeker dat u dit project wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onSave: (item: PortfolioItem) => void;
  onClose: () => void;
}

function PortfolioModal({ item, onSave, onClose }: PortfolioModalProps) {
  const [formData, setFormData] = useState<Partial<PortfolioItem>>(
    item || {
      title: '',
      category: categories[0],
      location: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      description: '',
      featured: false,
      status: 'draft'
    }
  );
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      formDataUpload.append('category', 'portfolio');

      const response = await fetch(`${API_BASE}/api/upload/image`, {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Upload mislukt');
      }

      const data = await response.json();
      
      setFormData(prev => ({
        ...prev,
        image: `${API_BASE}${data.url}`
      }));
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Afbeelding uploaden mislukt. Probeer opnieuw.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setUploadError('Voeg een afbeelding toe');
      return;
    }
    onSave(formData as PortfolioItem);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {item ? 'Project Bewerken' : 'Nieuw Project'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Afbeelding *
            </label>
            
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  WebP • Geoptimaliseerd
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); handleImageUpload(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-primary-500 mx-auto mb-3 animate-spin" />
                    <p className="text-sm text-gray-600 font-medium">Afbeelding wordt verwerkt...</p>
                    <p className="text-xs text-gray-400 mt-1">Converteren naar WebP formaat</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">
                      <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
                        Klik om te uploaden
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,image/tiff"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                      {' '}of sleep een bestand hierheen
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      JPG, PNG, WebP, GIF of TIFF tot 15MB
                    </p>
                    <p className="text-xs text-primary-500 mt-1">
                      Wordt automatisch geconverteerd naar WebP
                    </p>
                  </>
                )}
              </div>
            )}

            {uploadSuccess && (
              <div className="flex items-center gap-2 mt-3 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Afbeelding succesvol geüpload en geoptimaliseerd</span>
              </div>
            )}

            {uploadError && (
              <p className="text-red-500 text-sm mt-2">{uploadError}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titel *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Bijv. Perceelafpaling Villa Damme"
            />
          </div>

          {/* Category & Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categorie *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Locatie *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Bijv. Brugge"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Datum
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschrijving
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Beschrijf het project..."
            />
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Uitgelicht project</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'published'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'published' : 'draft' }))}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Direct publiceren</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              {item ? 'Opslaan' : 'Toevoegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
