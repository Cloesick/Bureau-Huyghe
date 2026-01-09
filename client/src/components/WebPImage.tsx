import { useState, useEffect } from 'react';
import { convertToWebP } from '../utils/imageConverter';

interface WebPImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function WebPImage({ src, alt, className, style }: WebPImageProps) {
  const [webPUrl, setWebPUrl] = useState<string>(src);

  useEffect(() => {
    let isMounted = true;

    const convertImage = async () => {
      try {
        const webpUrl = await convertToWebP(src);
        if (isMounted) {
          setWebPUrl(webpUrl);
        }
      } catch (error) {
        console.error('Failed to convert image to WebP:', error);
      }
    };

    convertImage();

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={webPUrl}
      alt={alt}
      className={className}
      style={style}
    />
  );
}
