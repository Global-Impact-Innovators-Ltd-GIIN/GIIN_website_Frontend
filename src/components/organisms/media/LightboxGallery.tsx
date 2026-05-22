"use client";

import { motion } from "framer-motion";
import { galleryData } from "@/data/media";
import { useState } from "react";

export function LightboxGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#050510] py-32 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl font-bold md:text-6xl text-white mb-6">Media Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Behind the scenes at GIIN summits, laboratories, and executive retreats.</p>
        </div>

        <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryData.map((bgClass, i) => {
            const height = i % 3 === 0 ? "h-64" : i % 2 === 0 ? "h-96" : "h-48";
            return (
              <motion.div
                key={i}
                className={`w-full ${height} rounded-2xl cursor-pointer bg-gradient-to-br ${bgClass} break-inside-avoid relative overflow-hidden group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedImage(bgClass)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-bold transition-opacity">View</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            className={`w-full max-w-5xl aspect-video rounded-3xl shadow-2xl bg-gradient-to-br ${selectedImage}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
