"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, CreditCard, Check } from "lucide-react";

type StepIndicatorProps = {
  currentStep: number; // 1, 2, or 3
};

const steps = [
  { num: 1, label: "Your Address", icon: MapPin },
  { num: 2, label: "Pick a Plan", icon: Shield },
  { num: 3, label: "Book & Pay", icon: CreditCard },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-white/10" />
        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-[10%] h-0.5 bg-gradient-to-r from-green-500 to-emerald-400"
          initial={{ width: "0%" }}
          animate={{
            width:
              currentStep === 1
                ? "0%"
                : currentStep === 2
                  ? "40%"
                  : "80%",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.num}
              className="flex flex-col items-center gap-2 relative z-10"
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-card/60 border-white/15 text-white/30"
                }`}
                animate={
                  isActive
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(34,197,94,0)",
                          "0 0 0 8px rgba(34,197,94,0.15)",
                          "0 0 0 0 rgba(34,197,94,0)",
                        ],
                      }
                    : {}
                }
                transition={
                  isActive
                    ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    : {}
                }
              >
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <Icon size={18} />
                )}
              </motion.div>
              <span
                className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-green-400"
                    : isCompleted
                      ? "text-white/70"
                      : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
