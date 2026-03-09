'use client';

import { useState, useRef, useEffect } from 'react';
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageFile: File | null) => void;
  onSizeSuggestion?: (suggestedSize: string, aspectRatio: number) => void;
  projectTitle?: string;
  label?: string;
}

export default function ImageUpload({ currentImage, onImageChange, onSizeSuggestion, projectTitle, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [previewRatio, setPreviewRatio] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || null);
    if (currentImage) {
      const img = new window.Image();
      img.onload = () => setPreviewRatio(img.width / img.height);
      img.src = currentImage;
    } else {
      setPreviewRatio(null);
    }
  }, [currentImage]);

  // Smart size suggestion based on image aspect ratio
  const suggestTileSize = (aspectRatio: number): string => {
    // aspectRatio = width / height
    // Portrait: ratio < 0.77 (e.g., 3:4 = 0.75)
    // Square-ish: 0.77 <= ratio <= 1.3
    // Landscape: 1.3 < ratio <= 2
    // Wide: ratio > 2
    
    if (aspectRatio < 0.77) {
      // Tall portrait image
      return 'tall';
    } else if (aspectRatio < 1.1) {
      // Nearly square
      return 'square';
    } else if (aspectRatio < 1.6) {
      // Slightly wide - could be square or short depending on content
      return 'square';
    } else if (aspectRatio < 2.3) {
      // Wide landscape
      return 'wide';
    } else {
      // Panoramic
      return 'panoramic';
    }
  };

  const compressImage = (file: File, maxDimension: number = 2000, quality: number = 0.92): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const larger = Math.max(width, height);
          if (larger > maxDimension) {
            const scale = maxDimension / larger;
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Image compression failed'));
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Could not decode image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Could not read file'));
      reader.readAsDataURL(file);
    });
  };

  const isHeic = (file: File): boolean => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    return type === 'image/heic' || type === 'image/heif' || name.endsWith('.heic') || name.endsWith('.heif');
  };

  const convertHeicToJpeg = async (file: File): Promise<File> => {
    const heic2any = (await import('heic2any')).default;
    const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
    const result = Array.isArray(blob) ? blob[0] : blob;
    return new File([result], file.name.replace(/\.heic$/i, '.jpg').replace(/\.heif$/i, '.jpg'), {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  };

  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);

    const heicFile = isHeic(file);

    if (!file.type.startsWith('image/') && !heicFile) {
      setErrorMessage(`"${file.name}" is not a supported image format. Use PNG, JPG, GIF, or HEIC.`);
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      setErrorMessage(`File is ${sizeMB} MB — the limit is 10 MB. Try a smaller image.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStatus(heicFile ? 'Converting HEIC...' : 'Processing...');

    try {
      let processableFile = file;
      if (heicFile) {
        try {
          processableFile = await convertHeicToJpeg(file);
        } catch (heicError) {
          console.error('HEIC conversion failed:', heicError);
          throw new Error('Could not convert this HEIC file. Try converting it to JPG first (e.g. open in Photos and export as JPEG).');
        }
      }

      setUploadProgress(50);
      setUploadStatus('Compressing...');

      const compressedFile = await compressImage(processableFile, 2000, 0.92);
      setUploadProgress(80);
      setUploadStatus('Finalizing...');

      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(80 + (e.loaded / e.total) * 20);
        }
      };

      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageChange(compressedFile);

        const img = new window.Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          setPreviewRatio(aspectRatio);
          if (onSizeSuggestion) {
            const suggestedSize = suggestTileSize(aspectRatio);
            onSizeSuggestion(suggestedSize, aspectRatio);
          }
        };
        img.src = result;

        setIsUploading(false);
        setUploadProgress(0);
        setUploadStatus('');
      };

      reader.onerror = () => {
        setErrorMessage('Could not read the processed file. Please try again.');
        setIsUploading(false);
        setUploadProgress(0);
        setUploadStatus('');
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Image upload error:', error);
      const message = error instanceof Error ? error.message : 'Something went wrong processing this image. Please try a different file.';
      setErrorMessage(message);
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStatus('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setPreviewRatio(null);
    setErrorMessage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const isPortrait = previewRatio !== null && previewRatio < 0.9;

  return (
    <div className="w-full">
      {preview ? (
        <div className={`relative group ${isPortrait ? 'flex justify-center' : ''}`}>
          <div
            className={`relative rounded-lg overflow-hidden bg-gray-100 ${
              isPortrait ? 'max-w-sm w-full' : 'w-full'
            }`}
            style={{ aspectRatio: previewRatio ? `${previewRatio}` : '16/9' }}
          >
            <Image
              src={preview}
              alt={projectTitle || label || 'Uploaded image'}
              fill
              className={isPortrait ? 'object-contain' : 'object-cover'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={handleClick}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-white/30 transition-colors mr-2"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-red-500 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragOver
              ? 'border-purple bg-purple/10 scale-105 shadow-lg'
              : 'border-gray-300 hover:border-purple hover:bg-purple/5 hover:scale-102'
          } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-montserrat text-lg text-earle-black mb-2">
                {uploadStatus || 'Processing...'}
              </p>
              <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-purple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="font-raleway text-sm text-earle-black">
                {Math.round(uploadProgress)}% complete
              </p>
            </div>
          ) : (
            <>
              {isDragOver ? (
                <CloudArrowUpIcon className="h-12 w-12 text-purple mb-4 animate-bounce" />
              ) : (
                <PhotoIcon className="h-12 w-12 text-gray-400 mb-4" />
              )}
              <div className="text-center">
                <p className="font-montserrat text-lg text-earle-black mb-2">
                  {isDragOver ? 'Drop your image here' : label || 'Upload Image'}
                </p>
                <p className="font-raleway text-sm text-earle-black">
                  {isDragOver ? 'Release to upload' : 'Click to browse or drag and drop'}
                </p>
                <p className="font-raleway text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF, HEIC up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {errorMessage && (
        <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-500 flex-shrink-0 mt-0.5">&#9888;</span>
          <div className="flex-1 min-w-0">
            <p className="font-raleway text-sm text-red-700">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-red-600 flex-shrink-0 text-lg leading-none"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
