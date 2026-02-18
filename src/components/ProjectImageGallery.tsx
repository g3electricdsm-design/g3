'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectImageGalleryProps {
  mainImage: string;
  title: string;
  orientation?: 'portrait' | 'landscape';
  gallery?: string[];
}

export default function ProjectImageGallery({ mainImage, title, orientation, gallery }: ProjectImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <>
      <div className={`mb-2 ${orientation === 'portrait' ? 'flex justify-center' : ''}`}>
        {orientation === 'portrait' ? (
          <div className="relative inline-block max-w-md w-full rounded-lg overflow-hidden bg-earle-black">
            <Image
              src={activeImage}
              alt={title}
              width={800}
              height={1200}
              className="w-full h-auto object-contain transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 28rem"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={activeImage}
              alt={title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            />
          </div>
        )}
      </div>

      {gallery && gallery.length > 0 && (
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveImage(mainImage)}
              className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                activeImage === mainImage
                  ? 'ring-2 ring-purple ring-offset-2 ring-offset-earle-black'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={mainImage}
                alt={`${title} - Main`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
            {gallery.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(src)}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                  activeImage === src
                    ? 'ring-2 ring-purple ring-offset-2 ring-offset-earle-black'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} - Photo ${idx + 2}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {!gallery?.length && <div className="mb-6" />}
    </>
  );
}
