
import React from 'react';
import { Button } from '@/components/ui/button';

interface VehicleCountStepProps {
  vehicleCount: number;
  onVehicleCountChange: (count: number) => void;
  onNext: () => void;
}

const VehicleCountStep = ({ vehicleCount, onVehicleCountChange, onNext }: VehicleCountStepProps) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">How many vehicles will be on your policy?</h1>
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {[1, 2, 3].map((count) => (
          <Button
            key={count}
            variant={vehicleCount === count ? "default" : "outline"}
            onClick={() => onVehicleCountChange(count)}
            className={`h-16 text-lg ${
              vehicleCount === count 
                ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white' 
                : 'hover:bg-gray-50'
            }`}
          >
            {count === 3 ? '3+' : count}
          </Button>
        ))}
      </div>
      <Button 
        onClick={onNext}
        className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
      >
        Continue
      </Button>
    </div>
  );
};

export default VehicleCountStep;
