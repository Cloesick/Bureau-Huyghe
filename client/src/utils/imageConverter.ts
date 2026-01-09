export async function convertToWebP(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      // Convert to WebP
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Could not convert to WebP'));
          return;
        }
        
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, 'image/webp', 0.9);
    };
    
    img.onerror = () => {
      reject(new Error('Could not load image'));
    };
    
    img.src = imageUrl;
  });
}
