import React from 'react';
import { cn } from "~/lib/utils";

interface StepProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
}

export const Step: React.FC<StepProps> = ({ title, icon, isActive, isCompleted, onClick }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center cursor-pointer",
        isActive && "text-primary",
        isCompleted && "text-primary"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2",
          isActive && "border-primary bg-primary text-primary-foreground",
          isCompleted && "border-primary bg-primary text-primary-foreground",
          !isActive && !isCompleted && "border-gray-300"
        )}
      >
        {icon || (isCompleted ? "✓" : "")}
      </div>
      <div className="mt-2 text-sm font-medium">{title}</div>
    </div>
  );
};

interface StepperProps {
  steps: Array<{ title: string; icon?: React.ReactNode }>;
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepClick }) => {
  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={cn(
                "flex-1 h-0.5",
                index <= activeStep ? "bg-primary" : "bg-gray-300"
              )}
            />
          )}
          <Step
            title={step.title}
            icon={step.icon}
            isActive={index === activeStep}
            isCompleted={index < activeStep}
            onClick={() => onStepClick && onStepClick(index)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};