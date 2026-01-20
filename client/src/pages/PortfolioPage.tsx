import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Filter, X, ChevronLeft, ChevronRight, 
  Quote, ArrowRight, Plus, Upload, Trash2, Edit2, Image as ImageIcon
} from 'lucide-react';
import Layout from '../components/Layout';
import { useAuthStore } from '../stores/authStore';
import { 
  PortfolioProject, 
  PortfolioCategory, 
  portfolioCategories, 
  defaultPortfolioProjects 
} from '../types/portfolio';
import { useLanguage } from '../i18n/LanguageContext';

export default function PortfolioPage() {
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('bureau-huyghe');
  
  const [projects] = useState<PortfolioProject[]>(defaultPortfolioProjects);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

  const openLightbox = (project: PortfolioProject, imageIndex: number = 0) => {
    setSelectedProject(project);
    setLightboxIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setLightboxIndex((prev) => 
        prev < selectedProject.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setLightboxIndex((prev) => 
        prev > 0 ? prev - 1 : selectedProject.images.length - 1
      );
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {t.pages.portfolio.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              {t.pages.portfolio.heroText}
            </p>
            {isAdmin && (
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="inline-flex items-center gap-2 bg-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors"
              >
                <Upload className="w-4 h-4" />
                {t.pages.portfolio.manageProjects}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Admin Panel */}
      {isAdmin && showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      {/* Featured Projects */}
      {selectedCategory === 'all' && featuredProjects.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.pages.portfolio.featuredProjects}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.slice(0, 3).map((project) => (
                <FeaturedProjectCard 
                  key={project.id} 
                  project={project} 
                  onImageClick={() => openLightbox(project)}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">{t.pages.portfolio.filterByCategory}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            >
              {t.pages.portfolio.allProjects} ({projects.length})
            </FilterButton>
            {(Object.keys(portfolioCategories) as PortfolioCategory[]).map((cat) => {
              const count = projects.filter(p => p.category === cat).length;
              if (count === 0) return null;
              return (
                <FilterButton
                  key={cat}
                  active={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {portfolioCategories[cat].label} ({count})
                </FilterButton>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t.pages.portfolio.noProjectsFound}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onImageClick={() => openLightbox(project)}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.pages.portfolio.ctaTitle}
          </h2>
          <p className="text-primary-200 mb-8 text-lg">
            {t.pages.portfolio.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/offerte"
              className="inline-flex items-center justify-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-600 transition-colors"
            >
              {t.requestQuote}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors border border-primary-600"
            >
              {t.pages.landmeting.contactUs}
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <Lightbox
          project={selectedProject}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </Layout>
  );
}

function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'bg-primary-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function FeaturedProjectCard({ 
  project, 
  onImageClick,
  isAdmin
}: { 
  project: PortfolioProject; 
  onImageClick: () => void;
  isAdmin?: boolean;
}) {
  const mainImage = project.images.find(img => img.isMain) || project.images[0];
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={onImageClick}>
        <img
          src={mainImage?.url}
          alt={mainImage?.alt || project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded-full mb-2">
            {portfolioCategories[project.category].label}
          </span>
          <h3 className="text-white font-bold text-lg line-clamp-2">{project.title}</h3>
        </div>
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
              <Edit2 className="w-4 h-4 text-gray-700" />
            </button>
            <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{project.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(project.date).toLocaleDateString('nl-BE', { month: 'short', year: 'numeric' })}
          </span>
        </div>
        {project.testimonial && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-accent-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600 italic line-clamp-2">"{project.testimonial.quote}"</p>
                <p className="text-xs text-gray-500 mt-1">— {project.testimonial.author}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ 
  project, 
  onImageClick,
  isAdmin
}: { 
  project: PortfolioProject; 
  onImageClick: () => void;
  isAdmin?: boolean;
}) {
  const mainImage = project.images.find(img => img.isMain) || project.images[0];
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={onImageClick}>
        <img
          src={mainImage?.url}
          alt={mainImage?.alt || project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 text-xs font-medium rounded text-gray-700">
          {portfolioCategories[project.category].label}
        </span>
        {project.images.length > 1 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {project.images.length}
          </span>
        )}
        {isAdmin && (
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 bg-white/90 rounded hover:bg-white transition-colors">
              <Edit2 className="w-3 h-3 text-gray-700" />
            </button>
            <button className="p-1.5 bg-white/90 rounded hover:bg-white transition-colors">
              <Trash2 className="w-3 h-3 text-red-500" />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {project.location}
        </p>
      </div>
    </div>
  );
}

function Lightbox({
  project,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  project: PortfolioProject;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const currentImage = project.images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation */}
      {project.images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image */}
      <div className="max-w-5xl max-h-[80vh] px-16">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="max-w-full max-h-[70vh] object-contain mx-auto"
        />
      </div>

      {/* Info panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-white/80 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(project.date).toLocaleDateString('nl-BE', { month: 'long', year: 'numeric' })}
            </span>
            {project.images.length > 1 && (
              <span>
                Foto {currentIndex + 1} van {project.images.length}
              </span>
            )}
          </div>
          {currentImage.caption && (
            <p className="text-white/70 text-sm mt-2 italic">{currentImage.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload here
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
  };

  return (
    <section className="bg-accent-50 border-b border-accent-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Projecten Beheren</h2>
          <button onClick={onClose} className="p-1 hover:bg-accent-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add New Project */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-accent-500" />
              Nieuw Project Toevoegen
            </h3>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-accent-500 bg-accent-50' 
                  : 'border-gray-300 hover:border-accent-400'
              }`}
            >
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-accent-600">Klik om te uploaden</span> of sleep bestanden hierheen
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP tot 10MB</p>
              <input type="file" multiple accept="image/*" className="hidden" />
            </div>
            <button className="mt-4 w-full bg-accent-500 text-white py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors">
              Project Aanmaken
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Portfolio Statistieken</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-primary-600">{defaultPortfolioProjects.length}</p>
                <p className="text-sm text-gray-500">Totaal projecten</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-accent-600">
                  {defaultPortfolioProjects.filter(p => p.featured).length}
                </p>
                <p className="text-sm text-gray-500">Uitgelicht</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">
                  {defaultPortfolioProjects.reduce((sum, p) => sum + p.images.length, 0)}
                </p>
                <p className="text-sm text-gray-500">Totaal foto's</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">
                  {new Set(defaultPortfolioProjects.map(p => p.category)).size}
                </p>
                <p className="text-sm text-gray-500">Categorieën</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
