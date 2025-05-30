
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle, X } from 'lucide-react';

interface QuoteNavigationProps {
  currentStep: number;
  onPrevious: () => void;
}

const QuoteNavigation = ({ currentStep, onPrevious }: QuoteNavigationProps) => {
  return (
    <div className="bg-white border-b p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 text-gray-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous Question
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteNavigation;
