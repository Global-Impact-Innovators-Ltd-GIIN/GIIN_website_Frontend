"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Map, { Marker, NavigationControl, Popup, MarkerEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sparkles, MapPin, Info, Network, Zap, Play, Pause, Activity } from "lucide-react";

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

// Generate a grid of points for the dot matrix inside Africa
const DOTS_GRID: { x: number; y: number }[] = [];
for (let x = 3; x <= 97; x += 3.2) {
  for (let y = 3; y <= 97; y += 3.2) {
    DOTS_GRID.push({ x, y });
  }
}

export function MapSection() {
  const [selectedHub, setSelectedHub] = useState<typeof HUBS[0] | null>(null);
  const [isAutoScan, setIsAutoScan] = useState(true);
  const [connectivity, setConnectivity] = useState(99.4);
  const [activeNodes, setActiveNodes] = useState(582);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Booting autonomous telemetry mesh...",
    "[OK] Lagos Node linked. Latency: 14ms",
    "[SYNC] Cape Town SOC: backup sync complete",
    "[OK] Nairobi Hub: routing tables active"
  ]);

  const [viewState, setViewState] = useState({
    longitude: 17.5,
    latitude: 2.0,
    zoom: 2.8,
    pitch: 45,
    bearing: 0
  });

  // Fluctuate connectivity and active nodes to make stats look live
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setConnectivity(parseFloat((99.1 + Math.random() * 0.8).toFixed(1)));
      setActiveNodes(prev => {
        const offset = Math.random() > 0.5 ? 1 : -1;
        const next = prev + offset;
        return next >= 580 && next <= 585 ? next : prev;
      });
    }, 4500);

    return () => clearInterval(statsInterval);
  }, []);

  // System logs stream effect
  useEffect(() => {
    const cities = ["Lagos", "Nairobi", "Kigali", "Accra", "Cape Town", "Cairo", "Addis Ababa", "Casablanca"];
    const templates = [
      (c1: string, c2: string) => `[FLOW] ${c1} ↔ ${c2} rate: ${(Math.random() * 8 + 4).toFixed(1)} Gbps`,
      (c1: string) => `[OK] ${c1} Node telemetry online`,
      (c1: string) => `[SYNC] Replicating index weights to ${c1}...`,
      (c1: string) => `[SEC] ${c1} SOC: firewall verified [OK]`,
      (c1: string) => `[OPTIMIZE] Routing optimization complete for ${c1}`,
      (c1: string) => `[PING] ${c1} ping: ${(10 + Math.random() * 30).toFixed(0)}ms`,
    ];

    const logsInterval = setInterval(() => {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const c1 = cities[Math.floor(Math.random() * cities.length)];
      let c2 = cities[Math.floor(Math.random() * cities.length)];
      while (c1 === c2) {
        c2 = cities[Math.floor(Math.random() * cities.length)];
      }
      const template = templates[Math.floor(Math.random() * templates.length)];
      const message = template(c1, c2);
      
      setLogs(prev => [...prev.slice(-3), `[${time}] ${message}`]);
    }, 3000);

    return () => clearInterval(logsInterval);
  }, []);

  // Auto scan effect - cycle through nodes
  useEffect(() => {
    if (!isAutoScan) return;

    const scanInterval = setInterval(() => {
      setSelectedHub((prev) => {
        const currentIndex = prev ? HUBS.findIndex(h => h.id === prev.id) : -1;
        const nextIndex = (currentIndex + 1) % HUBS.length;
        return HUBS[nextIndex];
      });
    }, 4500);

    return () => clearInterval(scanInterval);
  }, [isAutoScan]);

  // Convert GPS coordinates to local SVG percentages for the fallback map
  const getSVGCoords = (lon: number, lat: number) => {
    // Range maps: Lon [-20, 55] -> X [0, 100], Lat [-38, 38] -> Y [100, 0]
    const x = ((lon - (-20)) / 75) * 100;
    const y = ((38 - lat) / 76) * 100;
    return { x: `${x}%`, y: `${y}%` };
  };

  // Helper to draw curved connections in SVG
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    
    // Perpendicular normal vector
    const nx = -dy / len;
    const ny = dx / len;
    
    // Offset amount for bending (higher = more curved)
    const offset = 8;
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  // SVG high-fidelity polyline path for Africa
  const africaPath = "M 16.5 5.8 L 18.6 2.6 L 30.6 1.3 L 40.0 1.3 L 44.0 6.6 L 68.0 9.2 L 69.3 10.5 L 76.0 24.2 L 84.6 33.4 L 95.2 36.3 L 86.6 47.3 L 78.6 57.9 L 72.0 76.3 L 70.0 84.2 L 68.0 89.5 L 53.3 95.8 L 51.2 94.6 L 48.5 87.6 L 46.0 80.2 L 44.0 61.5 L 39.2 49.4 L 39.6 44.7 L 31.2 41.4 L 26.4 42.6 L 21.3 43.0 L 9.3 38.8 L 3.3 30.6 L 5.3 26.3 L 9.3 14.5 Z";

  return (
    <section className="relative w-full border-t border-border/50 bg-section-gradient py-32 overflow-hidden transition-colors duration-500">

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
                    setIsAutoScan(false);
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
              <div className="w-[85%] h-[85%] relative max-w-lg aspect-square flex items-center justify-center">
                {/* Africa continent SVG path */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full text-primary/10 fill-current"
                  style={{ filter: "drop-shadow(0 0 30px rgba(127,76,165,0.08))" }}
                >
                  <defs>
                    {/* Africa clipping path for dot matrix */}
                    <clipPath id="africa-clip">
                      <path d={africaPath} />
                    </clipPath>
                    
                    {/* Glowing gradients */}
                    <radialGradient id="africa-gradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Africa filled silhouette */}
                  <path
                    d={africaPath}
                    className="stroke-primary/20 dark:stroke-secondary/25 stroke-[0.4]"
                    fill="url(#africa-gradient)"
                  />

                  {/* Twinkling Dot-Matrix overlay inside Africa boundary */}
                  <g clipPath="url(#africa-clip)">
                    {DOTS_GRID.map((dot, idx) => (
                      <motion.circle
                        key={idx}
                        cx={dot.x}
                        cy={dot.y}
                        r={0.4 + (idx % 3) * 0.15}
                        className="fill-primary/25 dark:fill-secondary/35"
                        animate={{
                          opacity: [0.15, 0.7, 0.15]
                        }}
                        transition={{
                          duration: 3 + (idx % 5),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (idx % 7) * 0.4
                        }}
                      />
                    ))}
                  </g>

                  {/* Connective overlay streams (Curved paths with dash offsets) */}
                  {CONNECTIONS.map(([fromId, toId], idx) => {
                    const from = HUBS.find(h => h.id === fromId)!;
                    const to = HUBS.find(h => h.id === toId)!;
                    
                    const fromCoords = getSVGCoords(from.coords[0], from.coords[1]);
                    const toCoords = getSVGCoords(to.coords[0], to.coords[1]);

                    const fromX = parseFloat(fromCoords.x);
                    const fromY = parseFloat(fromCoords.y);
                    const toX = parseFloat(toCoords.x);
                    const toY = parseFloat(toCoords.y);

                    const curvePath = getCurvePath(fromX, fromY, toX, toY);

                    return (
                      <g key={idx}>
                        {/* Static thin line */}
                        <path
                          d={curvePath}
                          fill="none"
                          className="stroke-primary/15 dark:stroke-secondary/20 stroke-[0.25]"
                        />
                        {/* Animated signal particle flow */}
                        <motion.path
                          d={curvePath}
                          fill="none"
                          className="stroke-primary/50 dark:stroke-secondary/60 stroke-[0.35]"
                          strokeDasharray="3, 10"
                          animate={{ strokeDashoffset: [0, -26] }}
                          transition={{ repeat: Infinity, duration: 4 + (idx % 3), ease: "linear" }}
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
                      onClick={() => {
                        setSelectedHub(hub);
                        setIsAutoScan(false);
                      }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Interactive trigger area */}
                        <div className="absolute w-8 h-8 rounded-full bg-transparent" />
                        
                        {/* Pulse animation rings */}
                        <div className="absolute w-6 h-6 rounded-full bg-primary/20 dark:bg-secondary/20 scale-75 animate-ping opacity-60" />
                        {isSelected && (
                          <div className="absolute w-8 h-8 rounded-full bg-primary/10 border border-primary/20 scale-100 animate-pulse" />
                        )}
                        
                        {/* Glowing core */}
                        <div className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-300 ${isSelected ? 'bg-primary scale-125 shadow-[0_0_12px_rgba(127,76,165,0.9)]' : 'bg-primary dark:bg-secondary group-hover/node:bg-primary group-hover/node:shadow-[0_0_10px_rgba(127,76,165,0.7)] shadow-[0_0_6px_rgba(127,76,165,0.5)]'}`} />

                        {/* Label name tag on marker hover */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 z-20">
                          <div className="bg-background/95 border border-border/20 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xl text-center whitespace-nowrap">
                            <span className="text-[9px] font-black uppercase tracking-widest text-foreground">{hub.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Grid Fallback Warning banner */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-border/10 bg-background/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-md pointer-events-none">
                <Network className="w-3 h-3 text-primary animate-pulse" />
                Autonomous Telemetry Mesh Active
              </div>
            </div>
          )}

          {/* LEFT Cockpit Control Panel */}
          <div className="absolute top-8 left-8 p-6 rounded-[2rem] border border-white/5 bg-background/40 backdrop-blur-md hidden md:block pointer-events-auto z-10 w-64 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Active Nodes</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              <div className="text-3xl font-black text-foreground">
                {activeNodes}
              </div>
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Connectivity</div>
                <div className="text-3xl font-black text-primary dark:text-secondary">
                  {connectivity.toFixed(1)}%
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Auto Scan
                </span>
                <button
                  onClick={() => setIsAutoScan(!isAutoScan)}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${isAutoScan ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-muted-foreground border border-border/30'}`}
                >
                  {isAutoScan ? <Pause className="w-2 h-2" /> : <Play className="w-2 h-2" />}
                  {isAutoScan ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT Sidebar (Node Intelligence & Scrolling Logs) */}
          <div className="absolute top-8 right-8 w-80 h-[calc(100%-4rem)] hidden lg:flex flex-col gap-4 z-10 pointer-events-auto shadow-xl">
            {/* Node Intelligence Dashboard */}
            <div className="p-5 rounded-[2rem] border border-white/5 bg-background/40 backdrop-blur-md flex-1 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-primary animate-pulse" />
                    Node Intelligence
                  </span>
                  {selectedHub ? (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-wider border border-primary/20">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[8px] font-bold uppercase tracking-wider border border-border/20 animate-pulse">
                      Scanning
                    </span>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {selectedHub ? (
                    <motion.div
                      key={selectedHub.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-black text-foreground tracking-tight">{selectedHub.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-primary" /> {selectedHub.city}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-muted-foreground uppercase tracking-widest font-bold">Specialization</span>
                          <span className="text-primary dark:text-secondary font-bold uppercase tracking-wider">{selectedHub.type}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-muted-foreground uppercase tracking-widest font-bold">Throughput</span>
                          <span className="text-foreground font-mono font-bold">{(selectedHub.id * 14.2 + 8.1).toFixed(1)} Gbps</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-muted-foreground uppercase tracking-widest font-bold">Local Ping</span>
                          <span className="text-foreground font-mono font-bold">{(12 + selectedHub.id * 7 + Math.random() * 5).toFixed(0)}ms</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-muted-foreground uppercase tracking-widest font-bold">Impact Weight</span>
                          <div className="flex gap-1">
                            <span className="w-2.5 h-1 rounded-full bg-primary" />
                            <span className="w-2.5 h-1 rounded-full bg-primary" />
                            <span className={`w-2.5 h-1 rounded-full ${selectedHub.impact === 'High' ? 'bg-primary' : 'bg-white/10'}`} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-28 flex flex-col items-center justify-center text-center space-y-2"
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em]">Mesh Discovery Active</p>
                      <p className="text-[9px] text-muted-foreground/60 max-w-[200px]">Click a node or wait for Auto-Scan to fetch details.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Scrolling Telemetry System Logs */}
              <div className="border-t border-white/5 pt-4 mt-4 flex-1 flex flex-col justify-end overflow-hidden">
                <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-2 font-mono">
                  <span>🛰️ Telemetry Stream</span>
                  <span className="text-green-500 animate-pulse">Live</span>
                </div>
                <div className="bg-black/35 rounded-xl p-3 font-mono text-[8px] text-green-400/90 space-y-1.5 h-[110px] overflow-hidden border border-white/5 flex flex-col justify-end">
                  {logs.map((log, index) => (
                    <div key={index} className="truncate opacity-90 first:opacity-40 transition-opacity duration-300">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
