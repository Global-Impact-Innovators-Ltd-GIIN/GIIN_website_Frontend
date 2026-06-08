"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Map, { Marker, NavigationControl, Popup, MarkerEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sparkles, MapPin, Info, Network, Zap } from "lucide-react";

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

// Network connections for the high-tech mesh map
const CONNECTIONS = [
  [8, 6], // Casablanca - Cairo
  [6, 7], // Cairo - Addis Ababa
  [7, 2], // Addis Ababa - Nairobi
  [2, 3], // Nairobi - Kigali
  [3, 5], // Kigali - Cape Town
  [5, 1], // Cape Town - Lagos
  [1, 4], // Lagos - Accra
  [4, 8], // Accra - Casablanca
  [1, 3], // Lagos - Kigali
  [7, 3], // Addis - Kigali
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

  // Convert GPS coordinates to local SVG percentages for the fallback map
  const getSVGCoords = (lon: number, lat: number) => {
    // Range maps: Lon [-20, 55] -> X [0, 100], Lat [-38, 38] -> Y [100, 0]
    const x = ((lon - (-20)) / 75) * 100;
    const y = ((38 - lat) / 76) * 100;
    return { x: `${x}%`, y: `${y}%` };
  };

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3 h-3" />
              Sovereign Footprint
            </div>
            <h2 className="mb-4 font-heading text-3xl font-black md:text-5xl text-foreground tracking-tighter">
              Innovation Map of <span className="text-primary dark:text-secondary italic">Africa</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground font-light text-balance">
              Building a connected continental layer. Explore our integrated nodes, hubs, and
              strategic infrastructure reaching every community.
            </p>
          </motion.div>
        </div>

        {/* Interactive Map Interface */}
        <motion.div
          className="relative mx-auto max-w-6xl aspect-[16/9] md:aspect-[21/9] rounded-[3rem] border border-border/20 bg-card/50 backdrop-blur-xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] group"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {MAPBOX_TOKEN ? (
            <Map
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
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
          ) : (
            /* Interactive SVG fallback map */
            <div className="w-full h-full relative bg-[#030308] overflow-hidden flex items-center justify-center">
              {/* Mesh background */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "2.5rem 2.5rem"
                }}
              />

              {/* Grid outline map wrapper */}
              <div className="w-[85%] h-[85%] relative max-w-lg aspect-square">
                {/* Africa continent SVG path */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full text-primary/10 fill-current"
                  style={{ filter: "drop-shadow(0 0 20px rgba(127,76,165,0.05))" }}
                >
                  <path
                    d="M 18 12 C 26 7, 36 7, 44 7 C 54 7, 59 9, 64 12 C 69 17, 74 27, 79 34 C 82 38, 84 40, 86 42 C 84 47, 79 52, 74 62 C 69 72, 64 82, 51 96 C 49 94, 47 86, 45 81 C 41 71, 37 61, 35 56 C 33 51, 30 47, 25 44 C 19 41, 10 39, 2 39 C 5 31, 8 21, 18 12 Z"
                    className="stroke-primary/20 dark:stroke-secondary/20 stroke-[0.4]"
                    fill="url(#africa-gradient)"
                  />
                  <defs>
                    <radialGradient id="africa-gradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Connective overlay streams */}
                  {CONNECTIONS.map(([fromId, toId], idx) => {
                    const from = HUBS.find(h => h.id === fromId)!;
                    const to = HUBS.find(h => h.id === toId)!;
                    const fromCoords = getSVGCoords(from.coords[0], from.coords[1]);
                    const toCoords = getSVGCoords(to.coords[0], to.coords[1]);

                    const fromX = parseFloat(fromCoords.x);
                    const fromY = parseFloat(fromCoords.y);
                    const toX = parseFloat(toCoords.x);
                    const toY = parseFloat(toCoords.y);

                    return (
                      <g key={idx}>
                        <line
                          x1={fromX}
                          y1={fromY}
                          x2={toX}
                          y2={toY}
                          className="stroke-primary/20 dark:stroke-secondary/20 stroke-[0.2]"
                        />
                        <motion.line
                          x1={fromX}
                          y1={fromY}
                          x2={toX}
                          y2={toY}
                          className="stroke-primary/40 dark:stroke-secondary/50 stroke-[0.3]"
                          strokeDasharray="4, 12"
                          animate={{ strokeDashoffset: [0, -32] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hub node markers */}
                {HUBS.map((hub) => {
                  const coords = getSVGCoords(hub.coords[0], hub.coords[1]);
                  const isSelected = selectedHub?.id === hub.id;

                  return (
                    <div
                      key={hub.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group/node"
                      style={{ left: coords.x, top: coords.y }}
                      onClick={() => setSelectedHub(isSelected ? null : hub)}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Interactive trigger area */}
                        <div className="absolute w-8 h-8 rounded-full bg-transparent" />
                        
                        {/* Ripple animation */}
                        <div className="absolute w-6 h-6 rounded-full bg-primary/25 dark:bg-secondary/25 scale-75 animate-ping opacity-60" />
                        
                        {/* Glowing core */}
                        <div className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-300 ${isSelected ? 'bg-accent scale-125 shadow-[0_0_15px_var(--color-accent)]' : 'bg-primary dark:bg-secondary group-hover/node:bg-accent group-hover/node:shadow-[0_0_12px_rgba(245,158,11,0.8)] shadow-[0_0_8px_rgba(127,76,165,0.6)]'}`} />

                        {/* Label name tag */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 z-20">
                          <div className="bg-background/95 border border-border/20 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xl text-center whitespace-nowrap">
                            <span className="text-[9px] font-black uppercase tracking-widest text-foreground">{hub.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* SVG Map details popup */}
                <AnimatePresence>
                  {selectedHub && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 15 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 p-5 rounded-2xl bg-card/95 backdrop-blur-md border border-border/20 shadow-2xl z-30 text-left font-outfit"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm tracking-tight">{selectedHub.name}</h4>
                          <p className="text-[10px] text-muted-foreground">{selectedHub.city}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-[11px]">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground uppercase tracking-widest font-bold">Division</span>
                          <span className="text-primary dark:text-secondary font-bold">{selectedHub.type}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground uppercase tracking-widest font-bold">Activity</span>
                          <span className="text-foreground font-medium flex items-center gap-1">
                            <Zap className="w-3 h-3 text-accent animate-pulse" /> Optimal Telemetry
                          </span>
                        </div>
                      </div>

                      <button className="w-full py-2 rounded-xl bg-foreground text-background text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5">
                        <Info className="w-3 h-3" /> Node Details
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Grid Fallback Warning banner */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-border/10 bg-background/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-md">
                <Network className="w-3 h-3 text-primary" />
                Autonomous Telemetry Mesh Active
              </div>
            </div>
          )}

          {/* Map Overlay Stats */}
          <div className="absolute top-8 left-8 p-6 rounded-[2rem] border border-white/5 bg-background/40 backdrop-blur-md hidden md:block pointer-events-none z-10">
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Active Nodes</div>
                <div className="text-3xl font-black text-foreground">582</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Connectivity</div>
                <div className="text-3xl font-black text-primary dark:text-secondary">99.4%</div>
              </div>
            </div>
          </div>

          {/* Map Controls Helper */}
          <div className="absolute bottom-8 left-8 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em] flex items-center gap-4 z-10 pointer-events-none">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /> Established</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Emerging</span>
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
