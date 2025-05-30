
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ZipCodeStepProps {
  zipCode: string;
  onZipCodeChange: (value: string) => void;
  onNext: () => void;
}

const ZipCodeStep = ({ zipCode, onZipCodeChange, onNext }: ZipCodeStepProps) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Enter your ZIP code</h1>
      <div className="max-w-sm mx-auto space-y-4">
        <Input
          type="text"
          placeholder="66200"
          value={zipCode}
          onChange={(e) => onZipCodeChange(e.target.value)}
          className="text-center text-lg h-12"
        />
        <Button 
          onClick={onNext}
          disabled={!zipCode}
          className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
        >
          CHECK RATES
        </Button>
      </div>
    </div>
  );
};

export default ZipCodeStep;
