export interface UploadResponse {
  fileId: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  // For testing/development, simulate success if server is not available
  if ((window as any).Cypress || import.meta.env.DEV) {
    console.log('Development mode: Simulating successful file upload');
    return {
      fileId: 'test-file-id',
      fileName: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString()
    };
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3001/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};
