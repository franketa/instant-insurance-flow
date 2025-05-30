
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/formData';

interface ContactInfoStepProps {
  formData: FormData;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const ContactInfoStep = ({ formData, onFieldChange, onSubmit }: ContactInfoStepProps) => {
  const isFormValid = formData.firstName && formData.lastName && formData.emailAddress && formData.phoneNumber;

  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Enter your contact information</h1>
      <div className="space-y-4 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => onFieldChange('firstName', e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => onFieldChange('lastName', e.target.value)}
          />
        </div>
        <Input
          placeholder="Address"
          value={formData.address1}
          onChange={(e) => onFieldChange('address1', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="City"
            value={formData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
          />
          <Input
            placeholder="State"
            value={formData.state}
            onChange={(e) => onFieldChange('state', e.target.value)}
          />
        </div>
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.emailAddress}
          onChange={(e) => onFieldChange('emailAddress', e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => onFieldChange('phoneNumber', e.target.value)}
        />
        <Button 
          onClick={onSubmit}
          disabled={!isFormValid}
          className="w-full bg-[#6FD0BD] hover:bg-[#5bc0a8] text-white h-12"
        >
          Get My Quotes
        </Button>
      </div>
    </div>
  );
};

export default ContactInfoStep;
