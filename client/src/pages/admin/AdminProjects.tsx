import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  User,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  FileText,
  Phone,
  Mail,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  projectNumber: string;
  title: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  service: string;
  location: string;
  address: string;
  status: 'new' | 'scheduled' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  scheduledDate?: string;
  deadline?: string;
  assignedTo?: string;
  description: string;
  notes?: string;
  quotedAmount?: number;
  invoicedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: 'new', label: 'Nieuw', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  { value: 'scheduled', label: 'Ingepland', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  { value: 'in_progress', label: 'In uitvoering', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  { value: 'completed', label: 'Afgerond', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  { value: 'invoiced', label: 'Gefactureerd', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  { value: 'cancelled', label: 'Geannuleerd', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
];

const priorityOptions = [
  { value: 'low', label: 'Laag', color: 'text-gray-500' },
  { value: 'normal', label: 'Normaal', color: 'text-blue-600' },
  { value: 'high', label: 'Hoog', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
];

const serviceTypes = [
  'Perceelafpaling',
  'Topografie',
  'Bouwmeting',
  'As-built opmeting',
  '3D Scanning',
  'Plaatsbeschrijving',
  'Juridisch advies',
  'Splitsingsplan',
  'Verkavelingsplan'
];

const teamMembers = [
  'Jan Huyghe',
  'Pieter Vermeersch',
  'Koen Declercq'
];

// Mock data
const initialProjects: Project[] = [
  {
    id: '1',
    projectNumber: 'BH-2024-001',
    title: 'Perceelafpaling Damme',
    client: { name: 'Jan Peeters', email: 'jan.peeters@email.be', phone: '+32 477 12 34 56' },
    service: 'Perceelafpaling',
    location: 'Damme',
    address: 'Kerkstraat 15, 8340 Damme',
    status: 'scheduled',
    priority: 'normal',
    scheduledDate: '2024-01-15',
    deadline: '2024-01-20',
    assignedTo: 'Jan Huyghe',
    description: 'Afpaling bouwgrond 800m², 6 grenspalen plaatsen',
    quotedAmount: 850,
    createdAt: '2024-01-08T10:30:00',
    updatedAt: '2024-01-10T14:00:00'
  },
  {
    id: '2',
    projectNumber: 'BH-2024-002',
    title: '3D Scan Industrieel Pand',
    client: { name: 'Marie Claes', email: 'marie.claes@bedrijf.be', phone: '+32 478 98 76 54' },
    service: '3D Scanning',
    location: 'Zeebrugge',
    address: 'Havenstraat 42, 8380 Zeebrugge',
    status: 'in_progress',
    priority: 'high',
    scheduledDate: '2024-01-12',
    deadline: '2024-01-25',
    assignedTo: 'Pieter Vermeersch',
    description: 'Complete 3D scan voor BIM-model renovatieproject. Oppervlakte: 2500m²',
    notes: 'Toegang via achterkant gebouw. Contact: Tom (0475 11 22 33)',
    quotedAmount: 2400,
    createdAt: '2024-01-05T08:15:00',
    updatedAt: '2024-01-12T09:00:00'
  },
  {
    id: '3',
    projectNumber: 'BH-2024-003',
    title: 'Topografische Opmeting Knokke',
    client: { name: 'Bouwgroep Vandenberghe', email: 'info@bouwgroepvdb.be', phone: '+32 50 12 34 56' },
    service: 'Topografie',
    location: 'Knokke-Heist',
    address: 'Duinbergen 88, 8301 Knokke-Heist',
    status: 'completed',
    priority: 'normal',
    scheduledDate: '2024-01-08',
    deadline: '2024-01-12',
    assignedTo: 'Jan Huyghe',
    description: 'Gedetailleerde terreinopmeting voor nieuwbouwproject villa',
    quotedAmount: 1200,
    invoicedAmount: 1200,
    createdAt: '2024-01-02T11:00:00',
    updatedAt: '2024-01-10T16:30:00'
  },
  {
    id: '4',
    projectNumber: 'BH-2024-004',
    title: 'Plaatsbeschrijving Huurpand',
    client: { name: 'Immo Brugge', email: 'verhuur@immobrugge.be', phone: '+32 50 33 44 55' },
    service: 'Plaatsbeschrijving',
    location: 'Brugge',
    address: 'Langestraat 120, 8000 Brugge',
    status: 'new',
    priority: 'urgent',
    deadline: '2024-01-18',
    description: 'Intredende plaatsbeschrijving appartement 2de verdieping',
    quotedAmount: 350,
    createdAt: '2024-01-11T09:00:00',
    updatedAt: '2024-01-11T09:00:00'
  }
];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesService = serviceFilter === 'all' || project.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  // Stats
  const stats = {
    total: projects.length,
    new: projects.filter(p => p.status === 'new').length,
    inProgress: projects.filter(p => p.status === 'in_progress' || p.status === 'scheduled').length,
    completed: projects.filter(p => p.status === 'completed').length,
    urgent: projects.filter(p => p.priority === 'urgent' || p.priority === 'high').length,
  };

  const getStatusBadge = (status: Project['status']) => {
    const option = statusOptions.find(s => s.value === status);
    return option ? (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${option.color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${option.dot}`} />
        {option.label}
      </span>
    ) : null;
  };

  const getPriorityIndicator = (priority: Project['priority']) => {
    const option = priorityOptions.find(p => p.value === priority);
    if (priority === 'urgent' || priority === 'high') {
      return (
        <span className={`flex items-center gap-1 text-xs font-medium ${option?.color}`}>
          <AlertCircle className="w-3.5 h-3.5" />
          {option?.label}
        </span>
      );
    }
    return null;
  };

  const handleStatusChange = (projectId: string, newStatus: Project['status']) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p
    ));
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Weet u zeker dat u dit project wilt verwijderen?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      setSelectedProject(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projecten</h1>
          <p className="text-gray-500 mt-1">Beheer alle lopende en afgeronde projecten</p>
        </div>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="inline-flex items-center gap-2 bg-accent-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-accent-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nieuw Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Totaal</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Nieuw</p>
          <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">In uitvoering</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Afgerond</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Prioriteit</p>
          <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek op project, klant, locatie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="all">Alle statussen</option>
                {statusOptions.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dienst</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="all">Alle diensten</option>
                {serviceTypes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Klant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Locatie</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Deadline</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{project.title}</p>
                        {getPriorityIndicator(project.priority)}
                      </div>
                      <p className="text-sm text-gray-500">{project.projectNumber} • {project.service}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <p className="text-sm text-gray-900">{project.client.name}</p>
                    <p className="text-xs text-gray-500">{project.client.phone}</p>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {project.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(project.status)}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {project.deadline ? (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(project.deadline).toLocaleDateString('nl-BE')}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Bekijken"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedProject(project); setIsEditing(true); }}
                        className="p-2 text-gray-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                        title="Bewerken"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Geen projecten gevonden</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && !isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                <p className="text-sm text-gray-500">{selectedProject.projectNumber}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Priority */}
              <div className="flex flex-wrap items-center gap-3">
                {getStatusBadge(selectedProject.status)}
                {getPriorityIndicator(selectedProject.priority)}
              </div>

              {/* Quick Status Change */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status wijzigen</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(status => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(selectedProject.id, status.value as Project['status'])}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedProject.status === status.value
                          ? status.color
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Klantgegevens
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">{selectedProject.client.name}</p>
                  <a href={`mailto:${selectedProject.client.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent-600">
                    <Mail className="w-4 h-4" />
                    {selectedProject.client.email}
                  </a>
                  <a href={`tel:${selectedProject.client.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent-600">
                    <Phone className="w-4 h-4" />
                    {selectedProject.client.phone}
                  </a>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Dienst</p>
                  <p className="font-medium text-gray-900">{selectedProject.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toegewezen aan</p>
                  <p className="font-medium text-gray-900">{selectedProject.assignedTo || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ingepland</p>
                  <p className="font-medium text-gray-900">
                    {selectedProject.scheduledDate 
                      ? new Date(selectedProject.scheduledDate).toLocaleDateString('nl-BE')
                      : '-'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium text-gray-900">
                    {selectedProject.deadline 
                      ? new Date(selectedProject.deadline).toLocaleDateString('nl-BE')
                      : '-'
                    }
                  </p>
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Locatie</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-gray-900">{selectedProject.address}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Omschrijving</p>
                <p className="text-gray-900">{selectedProject.description}</p>
              </div>

              {/* Notes */}
              {selectedProject.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-yellow-800 mb-1">Notities</p>
                  <p className="text-yellow-900">{selectedProject.notes}</p>
                </div>
              )}

              {/* Financial */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Financieel</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Offertebedrag</p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedProject.quotedAmount 
                        ? `€${selectedProject.quotedAmount.toLocaleString('nl-BE')}`
                        : '-'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gefactureerd</p>
                    <p className="text-xl font-bold text-green-600">
                      {selectedProject.invoicedAmount 
                        ? `€${selectedProject.invoicedAmount.toLocaleString('nl-BE')}`
                        : '-'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-accent-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Bewerken
                </button>
                <button
                  onClick={() => handleDeleteProject(selectedProject.id)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New/Edit Project Modal */}
      {(showNewProjectModal || isEditing) && (
        <ProjectFormModal
          project={isEditing ? selectedProject : null}
          onClose={() => {
            setShowNewProjectModal(false);
            setIsEditing(false);
          }}
          onSave={(project) => {
            if (isEditing && selectedProject) {
              setProjects(prev => prev.map(p => p.id === selectedProject.id ? { ...project, id: selectedProject.id } : p));
              setSelectedProject({ ...project, id: selectedProject.id });
            } else {
              const newProject = {
                ...project,
                id: Date.now().toString(),
                projectNumber: `BH-2024-${(projects.length + 1).toString().padStart(3, '0')}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              setProjects(prev => [newProject, ...prev]);
            }
            setShowNewProjectModal(false);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

interface ProjectFormModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

function ProjectFormModal({ project, onClose, onSave }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>(project || {
    title: '',
    client: { name: '', email: '', phone: '' },
    service: serviceTypes[0],
    location: '',
    address: '',
    status: 'new',
    priority: 'normal',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Project);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {project ? 'Project bewerken' : 'Nieuw project'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Projectnaam *</label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="bv. Perceelafpaling Villa Damme"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dienst *</label>
              <select
                required
                value={formData.service || ''}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                {serviceTypes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioriteit</label>
              <select
                value={formData.priority || 'normal'}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Project['priority'] })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                {priorityOptions.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Client Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Klantgegevens</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                <input
                  type="text"
                  required
                  value={formData.client?.name || ''}
                  onChange={(e) => setFormData({ ...formData, client: { ...formData.client!, name: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.client?.email || ''}
                  onChange={(e) => setFormData({ ...formData, client: { ...formData.client!, email: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                <input
                  type="tel"
                  value={formData.client?.phone || ''}
                  onChange={(e) => setFormData({ ...formData, client: { ...formData.client!, phone: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Locatie</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gemeente *</label>
                <input
                  type="text"
                  required
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="bv. Damme"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volledig adres</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="bv. Kerkstraat 15, 8340 Damme"
                />
              </div>
            </div>
          </div>

          {/* Planning */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Planning</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingepland op</label>
                <input
                  type="date"
                  value={formData.scheduledDate || ''}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Toegewezen aan</label>
                <select
                  value={formData.assignedTo || ''}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="">Selecteer...</option>
                  {teamMembers.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Omschrijving</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Beschrijf het project..."
            />
          </div>

          {/* Financial */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Financieel</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offertebedrag (€)</label>
                <input
                  type="number"
                  value={formData.quotedAmount || ''}
                  onChange={(e) => setFormData({ ...formData, quotedAmount: parseFloat(e.target.value) || undefined })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gefactureerd (€)</label>
                <input
                  type="number"
                  value={formData.invoicedAmount || ''}
                  onChange={(e) => setFormData({ ...formData, invoicedAmount: parseFloat(e.target.value) || undefined })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notities (intern)</label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Interne notities..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-accent-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-accent-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              {project ? 'Opslaan' : 'Project aanmaken'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
