import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  FileText, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Upload,
  Download
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface Project {
  id: string;
  projectNumber: string;
  title: string;
  service: string;
  status: 'new' | 'scheduled' | 'in_progress' | 'completed' | 'invoiced';
  location: string;
  scheduledDate?: string;
  updatedAt: string;
}

interface Document {
  id: string;
  name: string;
  type: 'received' | 'uploaded';
  date: string;
  size: string;
  projectId?: string;
}

// Mock data - replace with API calls
const mockProjects: Project[] = [
  {
    id: '1',
    projectNumber: 'BH-2024-001',
    title: 'Perceelafpaling Damme',
    service: 'Perceelafpaling',
    status: 'in_progress',
    location: 'Damme',
    scheduledDate: '2024-01-15',
    updatedAt: '2024-01-12T10:00:00'
  },
  {
    id: '2',
    projectNumber: 'BH-2024-003',
    title: 'Topografische Opmeting',
    service: 'Topografie',
    status: 'completed',
    location: 'Knokke-Heist',
    updatedAt: '2024-01-10T16:30:00'
  }
];

const mockDocuments: Document[] = [
  { id: '1', name: 'Proces-verbaal afpaling.pdf', type: 'received', date: '12 jan 2024', size: '1.2 MB', projectId: '1' },
  { id: '2', name: 'Eigendomsakte.pdf', type: 'uploaded', date: '10 jan 2024', size: '856 KB', projectId: '1' },
  { id: '3', name: 'Topografisch plan.dwg', type: 'received', date: '10 jan 2024', size: '3.4 MB', projectId: '2' },
];

const statusConfig = {
  new: { label: 'Nieuw', color: 'bg-blue-100 text-blue-700', icon: Clock },
  scheduled: { label: 'Ingepland', color: 'bg-purple-100 text-purple-700', icon: Calendar },
  in_progress: { label: 'In uitvoering', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  completed: { label: 'Afgerond', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  invoiced: { label: 'Gefactureerd', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
};

export default function PortalOverview() {
  const { user } = useAuthStore();
  const [projects] = useState<Project[]>(mockProjects);
  const [documents] = useState<Document[]>(mockDocuments);

  const activeProjects = projects.filter(p => p.status !== 'completed' && p.status !== 'invoiced');
  const recentDocuments = documents.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welkom terug, {user?.firstName}!
        </h1>
        <p className="text-primary-100">
          Bekijk de status van uw projecten en beheer uw documenten.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              <p className="text-sm text-gray-500">Projecten</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeProjects.length}</p>
              <p className="text-sm text-gray-500">Lopend</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.type === 'received').length}</p>
              <p className="text-sm text-gray-500">Ontvangen</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.type === 'uploaded').length}</p>
              <p className="text-sm text-gray-500">Geüpload</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Lopende Projecten</h2>
          <Link to="/portal/projects" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            Alle projecten <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {activeProjects.length === 0 ? (
            <div className="p-8 text-center">
              <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Geen lopende projecten</p>
            </div>
          ) : (
            activeProjects.map((project) => {
              const status = statusConfig[project.status];
              const StatusIcon = status.icon;
              return (
                <Link
                  key={project.id}
                  to={`/portal/projects/${project.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{project.title}</p>
                      <p className="text-sm text-gray-500">{project.projectNumber} • {project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Received from Bureau Huyghe */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">Ontvangen Documenten</h2>
            </div>
            <Link to="/portal/documents" className="text-sm text-primary-600 hover:text-primary-700">
              Alles bekijken
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentDocuments.filter(d => d.type === 'received').map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded by Client */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-accent-600" />
              <h2 className="text-lg font-semibold text-gray-900">Mijn Uploads</h2>
            </div>
            <Link to="/portal/upload" className="text-sm text-accent-600 hover:text-accent-700">
              Nieuw uploaden
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentDocuments.filter(d => d.type === 'uploaded').length === 0 ? (
              <div className="p-8 text-center">
                <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-3">Nog geen documenten geüpload</p>
                <Link
                  to="/portal/upload"
                  className="inline-flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700 font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Document uploaden
                </Link>
              </div>
            ) : (
              recentDocuments.filter(d => d.type === 'uploaded').map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          to="/portal/upload"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow group"
        >
          <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent-500 transition-colors">
            <Upload className="w-5 h-5 text-accent-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Document Uploaden</h3>
          <p className="text-sm text-gray-500">Upload documenten voor uw project</p>
        </Link>
        <Link
          to="/portal/appointments"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
            <Calendar className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Afspraak Maken</h3>
          <p className="text-sm text-gray-500">Plan een afspraak met ons team</p>
        </Link>
        <Link
          to="/portal/messages"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow group"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
            <FileText className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Bericht Sturen</h3>
          <p className="text-sm text-gray-500">Stel een vraag over uw project</p>
        </Link>
      </div>
    </div>
  );
}
