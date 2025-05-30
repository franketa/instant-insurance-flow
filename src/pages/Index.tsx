
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, HelpCircle, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface FormData {
  zipCode: string;
  vehicleCount: number;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  hasRecentInsurance: boolean;
  currentInsurer: string;
  insuranceLength: string;
  coverageNeeded: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    vehicleCount: 1,
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    hasRecentInsurance: false,
    currentInsurer: '',
    insuranceLength: '',
    coverageNeeded: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  });

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const vehicleMakes = [
    'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC',
    'Honda', 'Hyundai', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Nissan', 'Ram',
    'Subaru', 'Toyota', 'Volkswagen'
  ];

  const bmwModels = [
    '228i', '228Xi', '230i', '230Xi', '330E', '330i', '330XE', '330Xi',
    '430i', '430Xi', '530', '530E'
  ];

  const insurers = [
    'Allstate', 'American Family', 'Farmers Ins', 'GEICO', 'The General',
    'Liberty Mutual', 'Nationwide', 'Progressive', 'Root', 'State Farm',
    'Travelers', 'USAA'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Placeholder webhook URL - replace with actual webhook
      const webhookUrl = 'https://webhook.site/your-unique-id';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Quote request submitted successfully!');
      } else {
        toast.error('Failed to submit quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection and try again.');
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6">
            <img src="/lovable-uploads/ffc1c08f-f4cb-4b31-a4c8-d80f99d0d75b.png" alt="TrueQuote" className="h-12 mx-auto mb-4" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We'll contact you shortly with your personalized quotes from top insurance providers.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white"
          >
            Get Another Quote
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <img src="/lovable-uploads/ffc1c08f-f4cb-4b31-a4c8-d80f99d0d75b.png" alt="TrueQuote" className="h-8" />
          <p className="text-sm text-gray-600 hidden sm:block">
            Get fast, cheap car insurance quotes with one simple form.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
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

      {/* Navigation */}
      <div className="bg-white border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handlePrevious}
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

      {/* Form Content */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            {currentStep === 1 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Enter zip code</h1>
                <div className="max-w-sm mx-auto space-y-4">
                  <Input
                    type="text"
                    placeholder="66200"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    className="text-center text-lg h-12"
                  />
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.zipCode}
                    className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                  >
                    CHECK RATES
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">How many vehicles will be on your policy?</h1>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {[1, 2, 3].map((count) => (
                    <Button
                      key={count}
                      variant={formData.vehicleCount === count ? "default" : "outline"}
                      onClick={() => updateFormData('vehicleCount', count)}
                      className={`h-16 text-lg ${
                        formData.vehicleCount === count 
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {count === 3 ? '3+' : count}
                    </Button>
                  ))}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.vehicleCount}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Select your vehicle year</h1>
                <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {Array.from({ length: 28 }, (_, i) => 2025 - i).map((year) => (
                    <Button
                      key={year}
                      variant={formData.vehicleYear === year.toString() ? "default" : "outline"}
                      onClick={() => updateFormData('vehicleYear', year.toString())}
                      className={`h-12 ${
                        formData.vehicleYear === year.toString()
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.vehicleYear}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center space-y-6">
                <div className="text-left mb-4">
                  <span className="text-sm text-gray-500">{formData.vehicleYear}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Select your vehicle make</h1>
                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {vehicleMakes.map((make) => (
                    <Button
                      key={make}
                      variant={formData.vehicleMake === make ? "default" : "outline"}
                      onClick={() => updateFormData('vehicleMake', make)}
                      className={`h-16 flex items-center justify-center gap-3 ${
                        formData.vehicleMake === make
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">🚗</span>
                      {make}
                    </Button>
                  ))}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.vehicleMake}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 5 && (
              <div className="text-center space-y-6">
                <div className="text-left mb-4">
                  <span className="text-sm text-gray-500">{formData.vehicleYear} {formData.vehicleMake}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Select your vehicle model</h1>
                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {(formData.vehicleMake === 'BMW' ? bmwModels : ['Model 1', 'Model 2', 'Model 3', 'Model 4']).map((model) => (
                    <Button
                      key={model}
                      variant={formData.vehicleModel === model ? "default" : "outline"}
                      onClick={() => updateFormData('vehicleModel', model)}
                      className={`h-12 ${
                        formData.vehicleModel === model
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {model}
                    </Button>
                  ))}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.vehicleModel}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 6 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Have you had auto insurance in the past 30 days?</h1>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Button
                    variant={formData.hasRecentInsurance === true ? "default" : "outline"}
                    onClick={() => updateFormData('hasRecentInsurance', true)}
                    className={`flex-1 h-16 ${
                      formData.hasRecentInsurance === true
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={formData.hasRecentInsurance === false && formData.currentInsurer !== '' ? "default" : "outline"}
                    onClick={() => updateFormData('hasRecentInsurance', false)}
                    className={`flex-1 h-16 ${
                      formData.hasRecentInsurance === false && formData.currentInsurer !== ''
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    No
                  </Button>
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={formData.hasRecentInsurance === null}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 7 && formData.hasRecentInsurance && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Select your current auto insurance</h1>
                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {insurers.map((insurer) => (
                    <Button
                      key={insurer}
                      variant={formData.currentInsurer === insurer ? "default" : "outline"}
                      onClick={() => updateFormData('currentInsurer', insurer)}
                      className={`h-12 ${
                        formData.currentInsurer === insurer
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {insurer}
                    </Button>
                  ))}
                </div>
                <Select onValueChange={(value) => updateFormData('currentInsurer', value)}>
                  <SelectTrigger className="w-full max-w-sm mx-auto">
                    <SelectValue placeholder="Select other carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="other">Other carrier</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.currentInsurer}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 8 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Enter your contact information</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                    />
                    <Input
                      placeholder="Last Name"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  />
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.personalInfo.firstName || !formData.personalInfo.lastName || !formData.personalInfo.email || !formData.personalInfo.phone}
                    className="w-full bg-[#6FD0BD] hover:bg-[#5bc0a8] text-white h-12"
                  >
                    Get My Quotes
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
              <span className="text-sm">✓</span>
              <span className="text-sm">Free quotes, secure form, competitive offers.</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/api/placeholder/80/40" alt="BBB Accredited Business" className="h-8" />
                <span className="text-xs text-gray-500">BBB Accredited Business</span>
              </div>
              <div className="bg-[#467FCE] text-white px-2 py-1 rounded text-xs font-bold">A+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
