"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/lib/utils";

interface MainGalleryProps {
  images: string[];
  rabbitName: string;
}

export function MainGallery({ images, rabbitName }: MainGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = () => {
    setLightboxIndex(selectedIndex);
    setLightboxOpen(true);
  };

  const slides = images.map((src) => ({ src, alt: rabbitName }));

  return (
    <div className="bg-stone-100 p-1 rounded-l-2xl md:rounded-l-2xl md:rounded-r-none h-full flex flex-col">
      <div
        className="aspect-square relative overflow-hidden rounded-xl cursor-zoom-in group"
        onClick={handleImageClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[selectedIndex]}
          alt={rabbitName}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            查看大圖
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden transition-all",
                selectedIndex === idx
                  ? "border-orange-500 ring-2 ring-orange-200"
                  : "border-transparent hover:border-orange-300"
              )}
              onMouseEnter={() => setSelectedIndex(idx)}
              onClick={() => setSelectedIndex(idx)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${rabbitName} ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </div>
  );
}
