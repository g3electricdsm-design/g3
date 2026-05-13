'use client';

import { useState, useRef, useEffect } from 'react';
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageFile: File | null, dataUrl?: string) => void;
  onSizeSuggestion?: (suggestedSize: string, aspectRatio: number) => void;
  projectTitle?: string;
  label?: string;
  /**
   * Visual variant of the dropzone copy. Use "dark" when this component is
   * rendered on a dark surface (e.g. bg-earle-black panels) so the prompt
   * text and helper copy stay legible.
   */
  variant?: 'light' | 'dark';
}

export default function ImageUpload({ currentImage, onImageChange, onSizeSuggestion, projectTitle, label, variant = 'light' }: ImageUploadProps) {
  const isDark = variant === 'dark';
  const dropzoneIdleBorder = isDark
    ? 'border-white/30 hover:border-purple hover:bg-purple/10 hover:scale-102'
    : 'border-gray-300 hover:border-purple hover:bg-purple/5 hover:scale-102';
  const primaryTextClass = isDark ? 'text-white-smoke' : 'text-earle-black';
  const helperTextClass = isDark ? 'text-white-smoke/80' : 'text-earle-black';
  const mutedTextClass = isDark ? 'text-white-smoke/60' : 'text-gray-500';
  const idleIconClass = isDark ? 'text-white-smoke/70' : 'text-gray-400';
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

  // Server-side processing via sharp (handles HEIC, WebP, TIFF, etc.)
  const processServerSide = async (file: File): Promise<{ dataUrl: string; width: number; height: number }> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('maxDimension', '2000');
      form.append('quality', '85');

      const res = await fetch('/api/image/process', {
        method: 'POST',
        body: form,
        signal: controller.signal,
      });

      if (!res.ok) {
        let errorMsg = `Server returned ${res.status}`;
        try { const body = await res.json(); errorMsg = body.error || errorMsg; } catch { /* non-JSON response */ }
        throw new Error(errorMsg);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || 'Server processing failed');
      }

      return { dataUrl: json.dataUrl, width: json.width, height: json.height };
    } finally {
      clearTimeout(timeout);
    }
  };

  // Client-side fallback (canvas-based, for standard browser-decodable formats)
  const processClientSide = async (file: File): Promise<{ dataUrl: string; file: File }> => {
    const isHeicFile = isHeic(file);

    let processable = file;
    if (isHeicFile) {
      const heic2any = (await import('heic2any')).default;
      const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
      const result = Array.isArray(blob) ? blob[0] : blob;
      processable = new File([result], file.name.replace(/\.heic$/i, '.jpg').replace(/\.heif$/i, '.jpg'), {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const larger = Math.max(w, h);
          if (larger > 2000) { const s = 2000 / larger; w = Math.round(w * s); h = Math.round(h * s); }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
          canvas.toBlob(
            (blob) => {
              if (!blob) { reject(new Error('Compression failed')); return; }
              const out = new File([blob], processable.name, { type: 'image/jpeg', lastModified: Date.now() });
              const r2 = new FileReader();
              r2.onload = (ev) => resolve({ dataUrl: ev.target?.result as string, file: out });
              r2.onerror = () => reject(new Error('Could not read compressed file'));
              r2.readAsDataURL(blob);
            },
            'image/jpeg',
            0.92
          );
        };
        img.onerror = () => reject(new Error('Browser could not decode this image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Could not read file'));
      reader.readAsDataURL(processable);
    });
  };

  const isHeic = (file: File): boolean => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    return type === 'image/heic' || type === 'image/heif' || name.endsWith('.heic') || name.endsWith('.heif');
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
    setUploadStatus('Uploading...');

    try {
      let dataUrl: string;
      let width: number;
      let height: number;
      let outputFile: File;

      try {
        // Primary: server-side processing with sharp
        setUploadProgress(30);
        setUploadStatus(heicFile ? 'Converting HEIC...' : 'Processing...');
        const result = await processServerSide(file);
        dataUrl = result.dataUrl;
        width = result.width;
        height = result.height;

        const blob = await fetch(dataUrl).then(r => r.blob());
        outputFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      } catch (serverError) {
        // Fallback: client-side processing
        console.warn('Server processing unavailable, using client-side fallback:', serverError);
        setUploadStatus('Processing locally...');
        const fallback = await processClientSide(file);
        dataUrl = fallback.dataUrl;
        outputFile = fallback.file;

        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const i = new window.Image();
          i.onload = () => resolve(i);
          i.onerror = () => reject(new Error('Could not decode processed image'));
          i.src = dataUrl;
        });
        width = img.width;
        height = img.height;
      }

      setUploadProgress(90);
      setUploadStatus('Finalizing...');

      setPreview(dataUrl);
      onImageChange(outputFile, dataUrl);

      const aspectRatio = width / height;
      setPreviewRatio(aspectRatio);
      if (onSizeSuggestion) {
        onSizeSuggestion(suggestTileSize(aspectRatio), aspectRatio);
      }

      setIsUploading(false);
      setUploadProgress(0);
      setUploadStatus('');
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
              : dropzoneIdleBorder
          } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className={`font-montserrat text-lg mb-2 ${primaryTextClass}`}>
                {uploadStatus || 'Processing...'}
              </p>
              <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-purple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className={`font-raleway text-sm ${helperTextClass}`}>
                {Math.round(uploadProgress)}% complete
              </p>
            </div>
          ) : (
            <>
              {isDragOver ? (
                <CloudArrowUpIcon className="h-12 w-12 text-purple mb-4 animate-bounce" />
              ) : (
                <PhotoIcon className={`h-12 w-12 mb-4 ${idleIconClass}`} />
              )}
              <div className="text-center">
                <p className={`font-montserrat text-lg mb-2 ${primaryTextClass}`}>
                  {isDragOver ? 'Drop your image here' : label || 'Upload Image'}
                </p>
                <p className={`font-raleway text-sm ${helperTextClass}`}>
                  {isDragOver ? 'Release to upload' : 'Click to browse or drag and drop'}
                </p>
                <p className={`font-raleway text-xs mt-1 ${mutedTextClass}`}>
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
