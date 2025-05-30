
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface QuoteProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuoteProgress = ({ currentStep, totalSteps }: QuoteProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="ml-4 text-sm font-medium text-[#6FD0BD]">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuoteProgress;
