"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import StepIndicator from "./StepIndicator";
import AddressStep from "./AddressStep";
import PlanStep from "./PlanStep";
import CrossSellModal from "./CrossSellModal";
import CheckoutStep from "./CheckoutStep";
import type { PropertySize } from "@/data/plans";

type AddOn = {
  type: "mosquito-tick" | "general-pest";
  sizeId: string;
  discountPercent?: number;
} | null;

type AddressData = {
  street: string;
  city: string;
  zipCode: string;
  propertySize: PropertySize;
  mosquitoTickSize: string;
  sqft: number | null;
  lotSizeAcres: number | null;
};

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedBilling, setSelectedBilling] = useState<
    "monthly" | "yearly"
  >("monthly");
  const [addOn, setAddOn] = useState<AddOn>(null);
  const [showCrossSell, setShowCrossSell] = useState(false);

  // Step 1 → Step 2
  const handleAddressComplete = useCallback((data: AddressData) => {
    setAddressData(data);
    setStep(2);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Step 2 → Cross-sell → Step 3
  const handlePlanSelect = useCallback(
    (planId: string, billing: "monthly" | "yearly") => {
      setSelectedPlan(planId);
      setSelectedBilling(billing);

      // For "ultimate-fortress", it already includes M&T, so skip cross-sell
      if (planId === "ultimate-fortress") {
        setAddOn(null);
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Show cross-sell modal for mosquito & tick add-on
      setShowCrossSell(true);
    },
    []
  );

  const handleCrossSellAccept = useCallback(
    (addon: { type: "mosquito-tick" | "general-pest"; sizeId: string; discountPercent: number }) => {
      setAddOn(addon);
      setShowCrossSell(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const handleCrossSellDecline = useCallback(() => {
    setAddOn(null);
    setShowCrossSell(false);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRemoveAddOn = useCallback(() => {
    setAddOn(null);
  }, []);

  const handleBackToStep1 = useCallback(() => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToStep2 = useCallback(() => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resolvedPropertySize = addressData?.propertySize ?? "small";

  return (
    <div className="w-full">
      <StepIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <AddressStep key="step-1" onComplete={handleAddressComplete} />
        )}

        {step === 2 && addressData && (
          <PlanStep
            key="step-2"
            propertySize={resolvedPropertySize}
            sqft={addressData.sqft}
            onSelectPlan={handlePlanSelect}
            onBack={handleBackToStep1}
          />
        )}

        {step === 3 && addressData && selectedPlan && (
          <CheckoutStep
            key="step-3"
            planId={selectedPlan}
            billing={selectedBilling}
            propertySize={resolvedPropertySize}
            street={addressData.street}
            city={addressData.city}
            zipCode={addressData.zipCode}
            addOn={addOn}
            onRemoveAddOn={handleRemoveAddOn}
            onBack={handleBackToStep2}
          />
        )}
      </AnimatePresence>

      {/* Cross-sell modal */}
      <CrossSellModal
        isOpen={showCrossSell}
        type="mosquito-tick"
        propertySize={resolvedPropertySize}
        sqft={addressData?.sqft ?? null}
        onAccept={handleCrossSellAccept}
        onDecline={handleCrossSellDecline}
      />
    </div>
  );
}
