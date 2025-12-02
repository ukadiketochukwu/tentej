
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  year: string;
  images: string[];
  spotifySrc: string;
}

interface TrackCardProps {
  track: Track;
  index: number;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slideshow
  useEffect(() => {
    if (isHovered) return; // Pause on hover to let user look or control

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % track.images.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [track.images.length, isHovered]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % track.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + track.images.length) % track.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#121110] rounded-xl overflow-hidden border border-[#EAE9E5]/5 hover:border-[#A68A64]/30 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={track.images[currentImageIndex]}
            alt={`${track.title} visual ${currentImageIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }} // Keep opacity low as per original design (0.6)
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-90" />

        {/* Navigation Controls (Visible on Hover) */}
        <div className="absolute inset-0 flex justify-between items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <button 
                onClick={prevImage}
                className="pointer-events-auto p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-sm transition-all transform -translate-x-4 group-hover:translate-x-0 cursor-pointer"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={nextImage}
                className="pointer-events-auto p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-sm transition-all transform translate-x-4 group-hover:translate-x-0 cursor-pointer"
            >
                <ChevronRight size={20} />
            </button>
        </div>

        {/* Indicators */}
        <div className="absolute top-4 right-4 flex gap-1 z-20">
            {track.images.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'w-6 bg-[#A68A64]' : 'w-2 bg-white/20'}`}
                />
            ))}
        </div>

        {/* Track Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
          <h3 className="text-2xl font-heading font-bold uppercase text-[#EAE9E5] mb-1">{track.title}</h3>
          <p className="text-[#A68A64] font-mono text-xs uppercase tracking-[0.15em]">{track.artist} • {track.year}</p>
        </div>
      </div>

      {/* Spotify Embed Section */}
      <div className="p-4 bg-[#1a1917] relative z-20">
        <iframe
          style={{ borderRadius: '12px' }}
          src={track.spotifySrc}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="shadow-lg"
        />
      </div>
    </motion.div>
  );
};

export default TrackCard;
