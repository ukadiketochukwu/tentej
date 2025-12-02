/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Release } from '../types';
import { Play } from 'lucide-react';

interface ReleaseCardProps {
  release: Release;
  onClick: () => void;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, onClick }) => {
  return (
    <motion.div
      className="group relative w-full aspect-square overflow-hidden bg-[#1a1917] cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.05 }
        }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <img 
          src={release.image} 
          alt={release.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          variants={{
            rest: { y: 10, opacity: 0.8 },
            hover: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A68A64] border border-[#A68A64]/30 px-2 py-1">
              {release.type}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
              {release.year}
            </span>
          </div>
          
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-[#EAE9E5] leading-none mb-1">
            {release.title}
          </h3>
          
          {/* Play Button Reveal */}
          <motion.div 
            className="h-0 overflow-hidden group-hover:h-8 transition-all duration-300 mt-0 group-hover:mt-4"
          >
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7D8A74]">
                <Play className="w-3 h-3 fill-current" /> Stream Now
             </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Border Lines */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-[#A68A64]/30 transition-colors duration-500" />
    </motion.div>
  );
};

export default ReleaseCard;