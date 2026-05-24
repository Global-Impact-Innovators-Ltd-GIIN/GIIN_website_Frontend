"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Map, { Marker, NavigationControl, Popup, MapMouseEvent, ViewStateChangeEvent, MarkerEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sparkles, MapPin, Info } from "lucide-react";

// Innovation Hubs across Africa
const HUBS = [
  { id: 1, name: "Lagos Hub", city: "Lagos, Nigeria", coords: [3.3792, 6.5244], type: "Technology", impact: "High" },
  { id: 2, name: "Nairobi Hub", city: "Nairobi, Kenya", coords: [36.8219, -1.2921], type: "Leadership", impact: "High" },
  { id: 3, name: "Kigali Node", city: "Kigali, Rwanda", coords: [30.0619, -1.9441], type: "Research", impact: "Medium" },
  { id: 4, name: "Accra Matrix", city: "Accra, Ghana", coords: [-0.1870, 5.6037], type: "Multimedia", impact: "High" },
  { id: 5, name: "Cape Town SOC", city: "Cape Town, SA", coords: [18.4232, -33.9249], type: "Cyber Defense", impact: "High" },
  { id: 6, name: "Cairo Lab", city: "Cairo, Egypt", coords: [31.2357, 30.0444], type: "Innovation", impact: "Medium" },
  { id: 7, name: "Addis Nexus", city: "Addis Ababa, Ethiopia", coords: [38.7469, 9.0250], type: "Technology", impact: "Medium" },
  { id: 8, name: "Casablanca Base", city: "Casablanca, Morocco", coords: [-7.5898, 33.5731], type: "Leadership", impact: "Medium" },
];

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export function MapSection() {
  const [selectedHub, setSelectedHub] = useState<typeof HUBS[0] | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 17.5,
    latitude: 2.0,
    zoom: 2.8,
    pitch: 45,
    bearing: 0
  });

  return (
    <section className="relative w-full border-t border-border/50 bg-background py-32 overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 dark:bg-primary/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3 h-3" />
              Sovereign Footprint
            </div>
            <h2 className="mb-6 font-heading text-4xl font-black md:text-7xl text-foreground tracking-tighter">
              Innovation Map of <span className="text-primary italic">Africa</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light text-balance">
              Building a connected continental layer. Zoom in to explore our integrated nodes, hubs, and
              strategic infrastructure reaching every community.
            </p>
          </motion.div>
        </div>

        {/* Interactive Map Interface */}
        <motion.div
          className="relative mx-auto max-w-6xl aspect-[16/9] md:aspect-[21/9] rounded-[3.5rem] border border-border/20 bg-card/50 backdrop-blur-xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] group"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Map
            {...viewState}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            reuseMaps
          >
            <NavigationControl position="bottom-right" />

            {HUBS.map((hub) => (
              <Marker
                key={hub.id}
                longitude={hub.coords[0]}
                latitude={hub.coords[1]}
                anchor="bottom"
                onClick={(e: MarkerEvent<MouseEvent>) => {
                  if (e.originalEvent) e.originalEvent.stopPropagation();
                  setSelectedHub(hub);
                }}
              >
                <div className="cursor-pointer group/marker transform transition-transform hover:scale-125">
                  <div className="relative">
                    {/* Glowing outer ring */}
                    <div className="absolute -inset-2 bg-primary/30 rounded-full blur-md animate-pulse" />
                    {/* Inner core */}
                    <div className="relative w-4 h-4 rounded-full bg-primary border-2 border-white/20 shadow-[0_0_15px_rgba(127,76,165,0.8)]" />

                    {/* Label reveal on hover */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-3 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                      <div className="bg-background/90 backdrop-blur-md border border-border/30 px-3 py-1.5 rounded-lg shadow-xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{hub.name}</span>
                      </div>
                      <div className="w-0.5 h-2 bg-border/50 mx-auto" />
                    </div>
                  </div>
                </div>
              </Marker>
            ))}

            <AnimatePresence>
              {selectedHub && (
                <Popup
                  longitude={selectedHub.coords[0]}
                  latitude={selectedHub.coords[1]}
                  anchor="top"
                  onClose={() => setSelectedHub(null)}
                  closeButton={false}
                  maxWidth="320px"
                  className="custom-map-popup"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="p-5 rounded-3xl bg-card border border-border/10 shadow-3xl text-left"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground tracking-tight">{selectedHub.name}</h4>
                        <p className="text-xs text-muted-foreground">{selectedHub.city}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground uppercase tracking-widest font-bold">Specialization</span>
                        <span className="text-primary font-bold">{selectedHub.type}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground uppercase tracking-widest font-bold">Impact Level</span>
                        <div className="flex gap-1">
                          <span className="w-3 h-1 rounded-full bg-primary" />
                          <span className="w-3 h-1 rounded-full bg-primary" />
                          <span className={`w-3 h-1 rounded-full ${selectedHub.impact === 'High' ? 'bg-primary' : 'bg-muted'}`} />
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                      <Info className="w-3 h-3" />
                      Node Intelligence
                    </button>
                  </motion.div>
                </Popup>
              )}
            </AnimatePresence>
          </Map>

          {/* Map Overlay Stats */}
          <div className="absolute top-8 left-8 p-6 rounded-[2rem] border border-white/5 bg-background/40 backdrop-blur-md hidden md:block pointer-events-none">
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Active Nodes</div>
                <div className="text-3xl font-black text-foreground">582</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Connectivity</div>
                <div className="text-3xl font-black text-accent">99.4%</div>
              </div>
            </div>
          </div>

          {/* Map Controls Helper */}
          <div className="absolute bottom-8 left-8 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /> Established</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Emerging</span>
          </div>
        </motion.div>

        {/* Global Connectivity Note */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="w-1 h-1 rounded-full bg-primary" />
          Real-time node telemetry synchronized with GIIN Core
          <div className="w-1 h-1 rounded-full bg-primary" />
        </motion.div>
      </div>

      <style jsx global>{`
        .mapboxgl-popup {
          z-index: 100;
        }
        .mapboxgl-popup-content {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
          border-bottom-color: rgba(255, 255, 255, 0.05) !important;
        }
        .mapboxgl-ctrl-group {
          background: rgba(12, 12, 20, 0.5) !important;
          backdrop-filter: blur(10px);
          border: 1px border rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
        }
        .mapboxgl-ctrl-group button {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        .mapboxgl-ctrl-group button span {
          filter: invert(1);
        }
        .custom-map-popup .mapboxgl-popup-close-button {
          display: none;
        }
      `}</style>
    </section>
  );
}
