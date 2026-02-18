'use client';

import { useState, useRef, useEffect } from 'react';
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  onSizeSuggestion?: (suggestedSize: string, aspectRatio: number) => void;
  projectTitle?: string;
  label?: string;
}

export default function ImageUpload({ currentImage, onImageChange, onSizeSuggestion, projectTitle, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const suggestTileSize = (aspectRatio: number): string => {
    if (aspectRatio < 0.77) return 'tall';
    if (aspectRatio < 1.1) return 'square';
    if (aspectRatio < 1.6) return 'square';
    if (aspectRatio < 2.3) return 'wide';
    return 'panoramic';
  };

  const compressImage = (file: File, maxWidth: number = 2000, quality: number = 0.92): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                }));
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  async function uploadToStorage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }
    return result.url;
  }

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, GIF, etc.)');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(30);

    try {
      const compressedFile = await compressImage(file, 2000, 0.92);
      setUploadProgress(60);

      let imageUrl: string;
      try {
        imageUrl = await uploadToStorage(compressedFile);
      } catch {
        // Fallback to base64 if Supabase Storage isn't configured
        imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(compressedFile);
        });
      }

      setUploadProgress(90);
      setPreview(imageUrl);
      onImageChange(imageUrl);

      if (onSizeSuggestion) {
        const localUrl = URL.createObjectURL(compressedFile);
        const img = new window.Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          onSizeSuggestion(suggestTileSize(aspectRatio), aspectRatio);
          URL.revokeObjectURL(localUrl);
        };
        img.src = localUrl;
      }

      setUploadProgress(100);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClick = () => { fileInputRef.current?.click(); };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative group">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt={projectTitle || label || 'Uploaded image'}
              fill
              className="object-cover"
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
                Uploading Image...
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
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
