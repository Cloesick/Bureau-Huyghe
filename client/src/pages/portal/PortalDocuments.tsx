import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Upload,
  Filter,
  ChevronDown,
  FolderOpen,
  Eye,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Document {
  id: string;
  name: string;
  type: 'received' | 'uploaded';
  category: string;
  projectId?: string;
  projectName?: string;
  date: string;
  size: string;
  fileType: string;
}

const categoryLabels: Record<string, string> = {
  'proces-verbaal': 'Proces-verbaal',
  'plan': 'Plan / Tekening',
  'foto': 'Foto',
  'akte': 'Akte / Contract',
  'factuur': 'Factuur',
  'overig': 'Overig'
};

// Mock data
const mockDocuments: Document[] = [
  { 
    id: '1', 
    name: 'Proces-verbaal afpaling.pdf', 
    type: 'received', 
    category: 'proces-verbaal',
    projectId: '1',
    projectName: 'Perceelafpaling Damme',
    date: '2024-01-12', 
    size: '1.2 MB',
    fileType: 'pdf'
  },
  { 
    id: '2', 
    name: 'Topografisch plan.dwg', 
    type: 'received', 
    category: 'plan',
    projectId: '2',
    projectName: 'Topografische Opmeting',
    date: '2024-01-10', 
    size: '3.4 MB',
    fileType: 'dwg'
  },
  { 
    id: '3', 
    name: 'Grondplan perceel.pdf', 
    type: 'received', 
    category: 'plan',
    projectId: '1',
    projectName: 'Perceelafpaling Damme',
    date: '2024-01-12', 
    size: '2.1 MB',
    fileType: 'pdf'
  },
  { 
    id: '4', 
    name: 'Eigendomsakte.pdf', 
    type: 'uploaded', 
    category: 'akte',
    projectId: '1',
    projectName: 'Perceelafpaling Damme',
    date: '2024-01-10', 
    size: '856 KB',
    fileType: 'pdf'
  },
  { 
    id: '5', 
    name: 'Foto terrein voorzijde.jpg', 
    type: 'uploaded', 
    category: 'foto',
    projectId: '1',
    projectName: 'Perceelafpaling Damme',
    date: '2024-01-08', 
    size: '2.3 MB',
    fileType: 'jpg'
  },
  { 
    id: '6', 
    name: 'Factuur BH-2024-001.pdf', 
    type: 'received', 
    category: 'factuur',
    projectId: '2',
    projectName: 'Topografische Opmeting',
    date: '2024-01-15', 
    size: '124 KB',
    fileType: 'pdf'
  },
];

export default function PortalDocuments() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.projectName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const receivedDocs = filteredDocuments.filter(d => d.type === 'received');
  const uploadedDocs = filteredDocuments.filter(d => d.type === 'uploaded');

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'dwg': return '📐';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      default: return '📁';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documenten</h1>
          <p className="text-gray-500 mt-1">Bekijk en download al uw projectdocumenten</p>
        </div>
        <Link
          to="/portal/upload"
          className="inline-flex items-center gap-2 bg-accent-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-accent-600 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Document Uploaden
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek op documentnaam of project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
              showFilters ? 'bg-gray-100 border-gray-300' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Alle documenten</option>
                <option value="received">Ontvangen van Bureau Huyghe</option>
                <option value="uploaded">Door mij geüpload</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Alle categorieën</option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Received Documents */}
      {receivedDocs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Ontvangen van Bureau Huyghe ({receivedDocs.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {receivedDocs.map((doc) => (
              <DocumentRow key={doc.id} document={doc} getFileIcon={getFileIcon} />
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Documents */}
      {uploadedDocs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Upload className="w-5 h-5 text-accent-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Mijn Uploads ({uploadedDocs.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {uploadedDocs.map((doc) => (
              <DocumentRow key={doc.id} document={doc} getFileIcon={getFileIcon} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Geen documenten gevonden</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || typeFilter !== 'all' || categoryFilter !== 'all'
              ? 'Probeer andere zoektermen of filters'
              : 'Er zijn nog geen documenten beschikbaar'}
          </p>
          <Link
            to="/portal/upload"
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            <Upload className="w-4 h-4" />
            Document uploaden
          </Link>
        </div>
      )}
    </div>
  );
}

function DocumentRow({ 
  document, 
  getFileIcon 
}: { 
  document: Document; 
  getFileIcon: (type: string) => string;
}) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
          document.type === 'received' ? 'bg-primary-100' : 'bg-accent-100'
        }`}>
          {getFileIcon(document.fileType)}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{document.name}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            {document.projectName && (
              <span className="flex items-center gap-1">
                <FolderOpen className="w-3.5 h-3.5" />
                {document.projectName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(document.date).toLocaleDateString('nl-BE')}
            </span>
            <span>{document.size}</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
              {categoryLabels[document.category]}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button 
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Bekijken"
        >
          <Eye className="w-5 h-5" />
        </button>
        <button 
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          title="Downloaden"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
