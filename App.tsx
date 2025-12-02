
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowDown, Instagram, Twitter, Maximize2 } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import TrackCard from './components/TrackCard';
import { GalleryItem, Release } from './types';
import { GALLERY_ITEMS, LATEST_TRACKS } from './data';

// Preloader Component
const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121110]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0, rotate: 45, opacity: 0 }}
        animate={{ 
          scale: [0, 1, 1, 100], 
          rotate: [45, 0, 0, 0],
          opacity: [0, 1, 1, 0] // Fade out as it expands to prevent harsh flash
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.4, 0.7, 1],
          ease: [0.76, 0, 0.24, 1] // Custom cubic bezier for smooth "pop"
        }}
        onAnimationComplete={onComplete}
        className="text-[#EAE9E5]"
      >
        {/* Custom 4-Point Star SVG */}
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
           <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen text-[#EAE9E5] selection:bg-[#7D8A74] selection:text-white overflow-x-hidden bg-[#121110]">
      <FluidBackground />
      
      {/* Preloader Overlay */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {/* 
        STICKY NAVIGATION WITH 3-SHADE BACKGROUND 
      */}
      <nav className="fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-500">
        {/* Background Layer - Flex layout for animating widths */}
        <div className="absolute inset-0 flex h-full pointer-events-none">
          {/* Left Shade: Dark Mocha 
              Behavior: Reduces width by approx half (33% -> 16.66%) on scroll 
          */}
          <motion.div 
            className="bg-[#2A2420] border-r border-white/5 h-full"
            animate={{ width: isScrolled ? '16.666%' : '33.333%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
          
          {/* Middle Shade: Medium Clay 
              Behavior: Expands to fill space (33% -> 66.66%) but fades out to create the "disappear" effect
          */}
          <motion.div 
            className="bg-[#3D3630] border-r border-white/5 h-full"
            animate={{ 
              width: isScrolled ? '66.666%' : '33.333%',
              opacity: isScrolled ? 0 : 1 
            }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
          
          {/* Right Shade: Light Walnut
              Behavior: Reduces width by approx half (33% -> 16.66%) on scroll
          */}
          <motion.div 
            className="bg-[#524840] h-full"
            animate={{ width: isScrolled ? '16.666%' : '33.333%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        {/* Content Layer - Grid to match original alignment */}
        <div className="relative z-10 h-full grid grid-cols-3 pointer-events-none">
          
          {/* LEFT: LOGO */}
          <div className="flex items-center px-6 md:px-12 h-full pointer-events-auto">
            <div 
              className="font-heading text-lg font-bold tracking-[0.2em] text-[#EAE9E5] cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              TEJIRI SONICS
            </div>
          </div>

          {/* MIDDLE: LINKS (Disappears on Scroll) */}
          <div className="flex items-center justify-center h-full pointer-events-auto">
            <motion.div 
              className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase"
              animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -20 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
            >
              {['Gallery', 'Releases', 'About'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-[#A68A64] transition-colors text-[#EAE9E5] cursor-pointer bg-transparent border-none"
                  data-hover="true"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: HAMBURGER / CTA */}
          <div className="flex items-center justify-end px-6 md:px-12 h-full pointer-events-auto">
            <AnimatePresence mode="wait">
              {!isScrolled && !mobileMenuOpen ? (
                 /* Initial State: Contact/Booking Text (Desktop) */
                <motion.div
                  key="contact-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden md:block"
                >
                   <button 
                    onClick={() => scrollToSection('about')}
                    className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#A68A64] transition-colors"
                   >
                     Bookings
                   </button>
                </motion.div>
              ) : (
                /* Scrolled State or Mobile: Hamburger Icon */
                <motion.button 
                  key="menu-icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[#EAE9E5] w-10 h-10 flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                   {mobileMenuOpen ? <X /> : <Menu />}
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Always show hamburger on mobile regardless of scroll state if not caught above */}
            <div className="md:hidden absolute right-6">
                <button 
                  className={`text-[#EAE9E5] w-10 h-10 flex items-center justify-center ${isScrolled ? 'hidden' : 'block'}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                   {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-30 bg-[#121110] flex flex-col items-center justify-center gap-10"
          >
            {['Gallery', 'Releases', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-5xl font-heading font-bold text-[#EAE9E5] hover:text-[#A68A64] transition-colors uppercase bg-transparent border-none tracking-tighter"
              >
                {item}
              </button>
            ))}
            
            <div className="absolute bottom-12 flex gap-8">
               <Instagram className="text-[#EAE9E5]/50 hover:text-[#EAE9E5]" />
               <Twitter className="text-[#EAE9E5]/50 hover:text-[#EAE9E5]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full"
        >
          {/* Main Title */}
          <div className="relative">
             <GradientText 
              text="TEJIRI SONICS" 
              as="h1" 
              className="text-[10vw] md:text-[11vw] leading-[0.8] font-black tracking-tighter text-center mix-blend-overlay opacity-90 whitespace-nowrap" 
            />
             {/* Overlay Text for sharpness */}
             <h1 className="absolute inset-0 text-[10vw] md:text-[11vw] leading-[0.8] font-black tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-b from-[#EAE9E5] to-transparent opacity-20 pointer-events-none whitespace-nowrap">
               TEJIRI SONICS
             </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-12"
          >
            <div className="h-px w-12 bg-[#A68A64]" />
            <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-[#A68A64]">
              LOVE CHANGES...RIGHT
            </p>
            <div className="h-px w-12 bg-[#A68A64]" />
          </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#EAE9E5]/40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </header>

      {/* GALLERY SECTION (Formerly Albums/Music) */}
      <section id="gallery" className="relative z-10 py-24 md:py-32 px-4 md:px-12 bg-[#121110]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 px-2 border-b border-[#EAE9E5]/10 pb-8">
             <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-none">
              Visual <br/> 
              <span className="text-[#7D8A74]">Diary</span>
            </h2>
            <p className="mt-6 md:mt-0 max-w-sm text-gray-400 text-sm leading-relaxed text-right">
              A curated selection of moments and texturesfrom the sonic journey.
            </p>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {GALLERY_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                className={`group relative overflow-hidden bg-[#1a1917] cursor-pointer ${item.span || 'col-span-1 row-span-1'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedImage(item)}
              >
                {/* 
                   Display Image
                */}
                <img 
                  src={item.src} 
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                   <p className="text-xs font-mono uppercase tracking-widest text-[#A68A64] mb-1">Image</p>
                   <p className="text-sm font-bold uppercase text-[#EAE9E5]">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST RELEASES */}
      <section id="releases" className="relative z-10 py-24 md:py-32 bg-[#161513]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="mb-16 flex items-center gap-6">
             <div className="w-3 h-3 bg-[#BF6849] rounded-full animate-pulse" />
             <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight text-[#EAE9E5]">
               Selected Works
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {LATEST_TRACKS.map((track, i) => (
              <TrackCard key={i} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Editorial */}
      <section id="about" className="relative z-10 py-24 md:py-40 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1 }}
                 className="aspect-[3/4] overflow-hidden"
               >
                 <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tejiri Sonics Portrait" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
               </motion.div>
               
               {/* Decorative elements */}
               <div className="absolute -top-12 -left-12 text-[#EAE9E5]/10 text-9xl font-heading font-bold z-[-1]">01</div>
            </div>

            <div className="space-y-8">
               <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-[1.1]">
                 The <span className="text-[#A68A64]">Organic</span> <br/>
                 Algorithm
               </h2>
               <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                 <p>
                   Tejiri Sonics exists at the intersection of the natural world and digital synthesis. Drawing inspiration from the chaotic patterns of nature—fractals in ferns, the rhythm of tides, the texture of stone—Tejiri Sonics translates these organic phenomena into auditory experiences.
                 </p>
                 <p>
                   Using a blend of field recordings taken from the world's most remote locations and modular synthesis, the sound is both primal and futuristic. It is music for the head and the heart.
                 </p>
               </div>
               
               <div className="pt-8">
                 <button 
                  className="group flex items-center gap-4 text-[#EAE9E5] hover:text-[#BF6849] transition-colors"
                  data-hover="true"
                 >
                   <span className="text-sm font-bold uppercase tracking-[0.3em]">Read Full Bio</span>
                   <div className="h-px w-12 bg-current group-hover:w-20 transition-all" />
                 </button>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#EAE9E5]/10 py-16 md:py-24 bg-[#0f0e0d]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6">
             <div className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-[#EAE9E5]">TEJIRI SONICS</div>
             <div className="flex flex-col gap-2 text-sm text-gray-500 font-mono">
               <a href="mailto:booking@tejirisonics.com" className="hover:text-[#A68A64] transition-colors" data-hover="true">booking@tejirisonics.com</a>
               <a href="mailto:mgmt@tejirisonics.com" className="hover:text-[#A68A64] transition-colors" data-hover="true">mgmt@tejirisonics.com</a>
             </div>
          </div>
          
          <div className="flex flex-col justify-between items-start md:items-end gap-8">
            <div className="flex gap-8">
              {['Spotify', 'Apple Music', 'SoundCloud', 'Instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-[#BF6849] font-bold uppercase text-xs tracking-[0.2em] transition-colors"
                  data-hover="true"
                >
                  {social}
                </a>
              ))}
            </div>
            <div className="text-[#EAE9E5]/20 text-xs font-mono uppercase tracking-widest">
              © 2025 Tejiri Sonics. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 text-[#EAE9E5] hover:text-[#BF6849] transition-colors bg-black/50 rounded-full"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative w-full h-full overflow-hidden rounded-lg flex items-center justify-center bg-black">
                   <img 
                      src={selectedImage.src} 
                      alt={selectedImage.alt}
                      className="w-full h-full max-h-[80vh] object-contain"
                   />
              </div>

              <div className="mt-6 text-center">
                 <h3 className="text-2xl font-heading font-bold text-[#EAE9E5] uppercase">{selectedImage.caption}</h3>
                 <p className="text-[#A68A64] font-mono text-xs tracking-widest mt-2">{selectedImage.alt}</p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
