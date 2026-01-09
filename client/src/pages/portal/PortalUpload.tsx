import { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  FolderOpen,
  ChevronDown
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  category?: string;
  projectId?: string;
}

const categories = [
  { value: 'akte', label: 'Akte / Contract' },
  { value: 'foto', label: 'Foto' },
  { value: 'plan', label: 'Plan / Tekening' },
  { value: 'factuur', label: 'Factuur' },
  { value: 'overig', label: 'Overig' },
];

// Mock projects
const projects = [
  { id: '1', name: 'Perceelafpaling Damme (BH-2024-001)' },
  { id: '2', name: 'Topografische Opmeting (BH-2024-003)' },
];

export default function PortalUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('overig');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = (newFiles: File[]) => {
    const uploadFiles: UploadedFile[] = newFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'uploading',
      progress: 0,
      category: selectedCategory,
      projectId: selectedProject,
    }));

    setFiles(prev => [...prev, ...uploadFiles]);

    // Simulate upload progress
    uploadFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'success', progress: 100 } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f
        ));
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const successfulUploads = files.filter(f => f.status === 'success').length;
  const pendingUploads = files.filter(f => f.status === 'uploading').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Document Uploaden</h1>
        <p className="text-gray-500 mt-1">Upload documenten voor uw project</p>
      </div>

      {/* Upload Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Instellingen</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project (optioneel)
            </label>
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full appearance-none pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">Geen project geselecteerd</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categorie
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Omschrijving (optioneel)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Voeg een korte omschrijving toe..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`bg-white rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-accent-500 bg-accent-50' 
            : 'border-gray-300 hover:border-accent-400 hover:bg-gray-50'
        }`}
      >
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isDragging ? 'bg-accent-100' : 'bg-gray-100'
        }`}>
          <Upload className={`w-8 h-8 ${isDragging ? 'text-accent-600' : 'text-gray-400'}`} />
        </div>
        <p className="text-lg font-medium text-gray-900 mb-1">
          Sleep bestanden hierheen
        </p>
        <p className="text-gray-500 mb-4">
          of <span className="text-accent-600 font-medium">klik om te bladeren</span>
        </p>
        <p className="text-sm text-gray-400">
          PDF, JPG, PNG, DWG tot 25MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.dwg,.doc,.docx,.xls,.xlsx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload Progress */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Uploads ({successfulUploads}/{files.length})
            </h2>
            {pendingUploads > 0 && (
              <span className="text-sm text-gray-500">
                {pendingUploads} bezig met uploaden...
              </span>
            )}
          </div>
          <div className="divide-y divide-gray-100">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  file.status === 'success' ? 'bg-green-100' :
                  file.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {file.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : file.status === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{file.size}</span>
                    {file.status === 'uploading' && (
                      <span className="text-accent-600">{Math.round(file.progress)}%</span>
                    )}
                    {file.status === 'success' && (
                      <span className="text-green-600">Geüpload</span>
                    )}
                    {file.status === 'error' && (
                      <span className="text-red-600">Fout bij uploaden</span>
                    )}
                  </div>
                  {file.status === 'uploading' && (
                    <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-500 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-medium text-blue-900 mb-2">Tips voor uploaden</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Gebruik duidelijke bestandsnamen (bv. "Eigendomsakte_Kerkstraat15.pdf")</li>
          <li>• Selecteer het juiste project zodat wij uw documenten snel kunnen terugvinden</li>
          <li>• Scan documenten in hoge kwaliteit voor optimale leesbaarheid</li>
          <li>• Foto's van het terrein zijn zeer nuttig voor onze landmeters</li>
        </ul>
      </div>
    </div>
  );
}
