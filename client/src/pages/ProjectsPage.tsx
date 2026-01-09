import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { FolderOpen, FileText, Calendar } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  type: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  lastUpdated: string;
  documentCount: number;
  appointmentCount: number;
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchProjects();
  }, [isAuthenticated, navigate]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects', {
        headers: {
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'ACTIVE': return 'bg-primary-100 text-primary-800';
      case 'COMPLETED': return 'bg-accent-100 text-accent-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 
          data-test="projects-title"
          className="text-2xl font-bold flex items-center gap-2"
        >
          <FolderOpen className="w-6 h-6" />
          Projecten
        </h1>
      </div>

      {projects.length === 0 ? (
        <div 
          data-test="no-projects"
          className="text-center py-12 bg-gray-50 rounded-lg"
        >
          <FolderOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Geen projecten gevonden</p>
        </div>
      ) : (
        <div 
          data-test="projects-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              data-test={`project-${project.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary-500 transition-colors cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <span 
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(project.status)}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{project.type}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{project.documentCount} documenten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.appointmentCount} afspraken</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Laatst bijgewerkt: {new Date(project.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
