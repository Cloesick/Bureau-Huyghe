import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Trash2, Eye } from 'lucide-react';

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export default function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocs = acceptedFiles.map((file): Document => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleDelete = useCallback((doc: Document) => {
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    if (previewDocument?.id === doc.id) {
      setPreviewDocument(null);
    }
  }, [previewDocument]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'
        }`}
      >
        <input {...getInputProps()} data-test="file-input" />
        <div className="space-y-2">
          <p className="text-gray-600">
            Sleep bestanden hierheen of klik om te uploaden
          </p>
          <p className="text-sm text-gray-500">
            PDF, JPG, PNG, CSV tot 10MB
          </p>
        </div>
      </div>


      {/* Document List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <FileText className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                <p className="text-sm text-gray-500">
                  {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewDocument(doc)}
                className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                title="Preview"
                data-test="preview-button"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(doc)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Delete"
                data-test="delete-button"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {previewDocument.name}
              </h3>
              <button
                onClick={() => setPreviewDocument(null)}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100"
                data-test="close-preview"
              >
                Close
              </button>
            </div>
            <div className="p-4 overflow-auto">
              {previewDocument.type.startsWith('image/') ? (
                <img
                  src={previewDocument.url}
                  alt={previewDocument.name}
                  className="max-w-full h-auto"
                />
              ) : (
                <iframe
                  src={previewDocument.url}
                  title={previewDocument.name}
                  className="w-full h-[70vh]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
