"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface DailyPhoto {
  id: string;
  image_url: string;
  description?: string;
  taken_at?: string;
}

interface DailyPhotosGridProps {
  photos: DailyPhoto[];
}

export function DailyPhotosGrid({ photos }: DailyPhotosGridProps) {
  const [index, setIndex] = useState(-1);

  if (photos.length === 0) return null;

  const slides = photos.map((photo) => ({
    src: photo.image_url,
    description: photo.description,
    alt: photo.description || "Daily Photo",
  }));

  return (
    <div className="p-8 border-t border-stone-100 bg-stone-50/50">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-stone-800">
        <span className="text-2xl">📸</span> 生活照 ({photos.length})
      </h3>

      <div className="columns-2 md:columns-3 gap-6 space-y-6">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 group cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image_url}
                alt={photo.description || "Daily Photo"}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <span className="text-white text-sm font-bold tracking-wide">
                  點擊放大
                </span>
              </div>
            </div>
            {photo.description && (
              <p className="p-4 text-sm text-stone-600 leading-relaxed">
                {photo.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
