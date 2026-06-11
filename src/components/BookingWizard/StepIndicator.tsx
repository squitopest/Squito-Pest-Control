"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, CreditCard, Check } from "lucide-react";
import FunnelProgress from "@/components/GetStarted/FunnelProgress";

type StepIndicatorProps = {
  currentStep: number;
};

const steps = [
  { num: 1, label: "Your Address", icon: MapPin },
  { num: 2, label: "Pick a Plan", icon: Shield },
  { num: 3, label: "Book & Pay", icon: CreditCard },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const funnelStep = currentStep + 1;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <FunnelProgress step={funnelStep} />

      <div className="flex items-center justify-between relative">
        <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-border" />
        <motion.div
          className="absolute top-6 left-[10%] h-1 bg-gradient-to-r from-green-600 to-green-500"
          initial={{ width: "0%" }}
          animate={{
            width: currentStep === 1 ? "0%" : currentStep === 2 ? "40%" : "80%",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          const Icon = step.icon;

          return (
            <div key={step.num} className="flex flex-col items-center gap-2 relative z-10">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-green-500/15 border-primary text-primary"
                      : "bg-card border-border text-muted"
                }`}
              >
                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
              </motion.div>
              <span
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted"
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
