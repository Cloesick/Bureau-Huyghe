import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowRight,
  FileText,
  ChevronDown
} from 'lucide-react';

interface Project {
  id: string;
  projectNumber: string;
  title: string;
  service: string;
  status: 'new' | 'scheduled' | 'in_progress' | 'completed' | 'invoiced';
  location: string;
  address: string;
  scheduledDate?: string;
  completedDate?: string;
  description: string;
  documentsCount: number;
  updatedAt: string;
}

const statusConfig = {
  new: { label: 'Nieuw', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  scheduled: { label: 'Ingepland', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  in_progress: { label: 'In uitvoering', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  completed: { label: 'Afgerond', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  invoiced: { label: 'Gefactureerd', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
};

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    projectNumber: 'BH-2024-001',
    title: 'Perceelafpaling Damme',
    service: 'Perceelafpaling',
    status: 'in_progress',
    location: 'Damme',
    address: 'Kerkstraat 15, 8340 Damme',
    scheduledDate: '2024-01-15',
    description: 'Afpaling bouwgrond 800m², 6 grenspalen plaatsen',
    documentsCount: 3,
    updatedAt: '2024-01-12T10:00:00'
  },
  {
    id: '2',
    projectNumber: 'BH-2024-003',
    title: 'Topografische Opmeting',
    service: 'Topografie',
    status: 'completed',
    location: 'Knokke-Heist',
    address: 'Duinbergen 88, 8301 Knokke-Heist',
    scheduledDate: '2024-01-08',
    completedDate: '2024-01-10',
    description: 'Gedetailleerde terreinopmeting voor nieuwbouwproject villa',
    documentsCount: 5,
    updatedAt: '2024-01-10T16:30:00'
  },
  {
    id: '3',
    projectNumber: 'BH-2023-045',
    title: 'Plaatsbeschrijving Appartement',
    service: 'Plaatsbeschrijving',
    status: 'invoiced',
    location: 'Brugge',
    address: 'Langestraat 120, 8000 Brugge',
    completedDate: '2023-12-15',
    description: 'Intredende plaatsbeschrijving appartement 2de verdieping',
    documentsCount: 2,
    updatedAt: '2023-12-20T09:00:00'
  }
];

export default function PortalProjects() {
  const [projects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeProjects = filteredProjects.filter(p => !['completed', 'invoiced'].includes(p.status));
  const completedProjects = filteredProjects.filter(p => ['completed', 'invoiced'].includes(p.status));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mijn Projecten</h1>
        <p className="text-gray-500 mt-1">Bekijk de status en documenten van al uw projecten</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek op project, nummer of locatie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="all">Alle statussen</option>
              <option value="new">Nieuw</option>
              <option value="scheduled">Ingepland</option>
              <option value="in_progress">In uitvoering</option>
              <option value="completed">Afgerond</option>
              <option value="invoiced">Gefactureerd</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            Lopende Projecten ({activeProjects.length})
          </h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Afgeronde Projecten ({completedProjects.length})
          </h2>
          <div className="space-y-4">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Geen projecten gevonden</h3>
          <p className="text-gray-500">
            {searchQuery || statusFilter !== 'all' 
              ? 'Probeer andere zoektermen of filters'
              : 'U heeft nog geen projecten bij Bureau Huyghe'}
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <Link
      to={`/portal/projects/${project.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FolderOpen className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{project.title}</h3>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{project.projectNumber} • {project.service}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.location}
              </span>
              {project.scheduledDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.scheduledDate).toLocaleDateString('nl-BE')}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {project.documentsCount} documenten
              </span>
            </div>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 hidden sm:block" />
      </div>
    </Link>
  );
}
