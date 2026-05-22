"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function DocumentUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFile("Q3_Financial_Report.pdf");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050510] items-center justify-center p-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-2xl w-full text-center relative z-10 mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Document Analyzer</h1>
        <p className="text-muted-foreground text-lg">Upload PDFs, strategic documents, or codebases. The AI will build a localized RAG context to answer any questions.</p>
      </div>

      {!file ? (
        <motion.div 
          className={`w-full max-w-2xl h-80 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-colors relative overflow-hidden ${isDragging ? 'border-primary bg-primary/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
               <p className="text-white font-medium">Extracting Vector Embeddings...</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/50">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xl font-bold text-white mb-2">Drag and drop your document here</p>
              <p className="text-sm text-white/50">Supports PDF, DOCX, TXT, CSV up to 50MB</p>
            </>
          )}
        </motion.div>
      ) : (
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="font-bold text-white">{file}</p>
                <p className="text-xs text-white/50">Context embedded successfully.</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="text-sm text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>

          {/* Simulated Chat Input for the doc */}
          <div className="relative flex items-center bg-[#111116] border border-white/10 rounded-2xl p-2 shadow-2xl">
            <input 
              type="text" 
              placeholder={`Ask anything about ${file}...`}
              className="w-full bg-transparent text-white placeholder:text-white/30 px-4 py-3 focus:outline-none"
            />
            <button className="m-2 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
