"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceData } from "@/data/services";

interface Props {
  data: ServiceData;
}

export function ProjectEstimator({ data }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const steps = data.estimatorSteps;
  const totalSteps = steps.length + 1; // +1 for the email/generate step

  const handleSelect = (stepId: string, value: number) => {
    setSelections((prev) => ({ ...prev, [stepId]: value }));
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }, 300);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsGenerating(true);
    // Simulate network delay for PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
    }, 2500);
  };

  return (
    <section className="w-full bg-background py-32 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold md:text-5xl text-white mb-4">Project Estimator</h2>
          <p className="text-muted-foreground text-lg">Answer a few questions to dynamically generate a custom proposal for {data.title}.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden min-h-[400px] flex flex-col">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {!isDone ? (
                currentStep < steps.length ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">{steps[currentStep].label}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {steps[currentStep].options.map((opt, i) => {
                        const isSelected = selections[steps[currentStep].id] === opt.value;
                        return (
                          <button
                            key={i}
                            onClick={() => handleSelect(steps[currentStep].id, opt.value)}
                            className={`p-6 rounded-2xl border transition-all text-left ${isSelected ? 'border-primary bg-primary/20 text-white' : 'border-white/10 bg-black/50 text-white/70 hover:border-white/30 hover:bg-white/5'}`}
                          >
                            <span className="block font-semibold text-lg">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email-step"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md mx-auto text-center"
                  >
                    <h3 className="text-3xl font-bold text-white mb-4">Finalizing Estimate</h3>
                    <p className="text-muted-foreground mb-8">Enter your corporate email to receive the detailed PDF proposal and technical blueprint.</p>
                    <form onSubmit={handleGenerate} className="space-y-4">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@enterprise.com" 
                        className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary text-center text-lg"
                        required
                      />
                      <button 
                        type="submit" 
                        disabled={isGenerating}
                        className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Proposal...
                          </>
                        ) : "Generate Proposal"}
                      </button>
                    </form>
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Proposal Sent</h3>
                  <p className="text-muted-foreground mb-8">A comprehensive technical proposal and pricing estimate has been sent to <span className="text-white">{email}</span>.</p>
                  <button onClick={() => { setIsDone(false); setCurrentStep(0); setSelections({}); setEmail(""); }} className="text-sm font-medium text-primary hover:text-white transition-colors">
                    Calculate Another Project
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {!isDone && currentStep > 0 && currentStep < steps.length && (
            <div className="absolute bottom-8 left-8">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors"
              >
                &larr; Back
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
