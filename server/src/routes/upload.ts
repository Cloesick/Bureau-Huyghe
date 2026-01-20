import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads/contact-files'));
  },
  filename: (_req, file, cb) => {
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueId}${extension}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb: FileFilterCallback) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Handle file upload
router.post('/upload', upload.single('file'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const fileId = path.basename(req.file.filename, path.extname(req.file.filename));
  const response = {
    fileId,
    fileName: req.file.originalname,
    url: `/uploads/contact-files/${req.file.filename}`,
    uploadedAt: new Date().toISOString()
  };

  res.json(response);
});

// Image upload configuration for portfolio/content images
const imageStorage = multer.memoryStorage();

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit for raw images
  },
  fileFilter: (_req, file, cb: FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image type. Allowed: JPEG, PNG, WebP, GIF, TIFF'));
    }
  }
});

// Ensure upload directories exist
const ensureUploadDirs = () => {
  const dirs = [
    path.join(process.cwd(), 'uploads/images'),
    path.join(process.cwd(), 'uploads/images/portfolio'),
    path.join(process.cwd(), 'uploads/images/content'),
  ];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

ensureUploadDirs();

// Image upload with WebP conversion and optimization
router.post('/image', imageUpload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }

    const category = (req.body.category as string) || 'portfolio';
    const uniqueId = uuidv4();
    const filename = `${uniqueId}.webp`;
    const outputDir = path.join(process.cwd(), 'uploads/images', category);
    const outputPath = path.join(outputDir, filename);

    // Ensure category directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process image with sharp
    const processedImage = await sharp(req.file.buffer)
      .resize({
        width: 1920,
        height: 1080,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
        effort: 4,
      })
      .toFile(outputPath);

    // Get file stats
    const stats = fs.statSync(outputPath);

    const response = {
      success: true,
      id: uniqueId,
      filename,
      originalName: req.file.originalname,
      url: `/uploads/images/${category}/${filename}`,
      width: processedImage.width,
      height: processedImage.height,
      size: stats.size,
      format: 'webp',
      uploadedAt: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    console.error('Image processing failed:', error);
    res.status(500).json({ error: 'Image processing failed' });
  }
});

// Delete an uploaded image
router.delete('/image/:category/:filename', async (req: Request, res: Response) => {
  try {
    const { category, filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads/images', category, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'Image deleted' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Image deletion failed:', error);
    res.status(500).json({ error: 'Image deletion failed' });
  }
});

export default router;
