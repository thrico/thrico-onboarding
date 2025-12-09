"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import TeamRequirements from "./team-requirements";
import FeaturesIntegrations from "./features-integrations";

import BudgetTimeline from "./budget-timeline";
import SecurityRequirements from "./security-requirements";
import ContactInformation from "./contact-information";
import ThankYou from "./thank-you";
import StepIndicator from "./step-indicator";
import ModulesSelection from "./modules-selection";

const steps = [
  { title: "Requirement" },
  { title: "Features" },
  { title: "Modules" },
  { title: "Budget" },
  { title: "Security" },
  { title: "Contact" },
];

export default function CustomRequestForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TeamRequirements onNext={nextStep} />;
      case 1:
        return <FeaturesIntegrations onNext={nextStep} onPrevious={prevStep} />;
      case 2:
        return <ModulesSelection onNext={nextStep} onPrevious={prevStep} />;
      case 3:
        return <BudgetTimeline onNext={nextStep} onPrevious={prevStep} />;
      case 4:
        return <SecurityRequirements onNext={nextStep} onPrevious={prevStep} />;
      case 5:
        return <ContactInformation onNext={nextStep} onPrevious={prevStep} />;
      case 6:
        return <ThankYou />;
      default:
        return <TeamRequirements onNext={nextStep} />;
    }
  };

  return (
    <div className="space-y-6">
      {currentStep < totalSteps - 1 && (
        <Card>
          <CardContent className="pt-6">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </CardContent>
        </Card>
      )}

      {renderStep()}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Need help?</strong> Email us at info@thrico.com
        </AlertDescription>
      </Alert>
    </div>
  );
}
