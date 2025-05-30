import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FormData } from '@/types/formData';
import QuoteHeader from './QuoteHeader';
import QuoteProgress from './QuoteProgress';
import QuoteNavigation from './QuoteNavigation';
import ZipCodeStep from './steps/ZipCodeStep';
import VehicleCountStep from './steps/VehicleCountStep';
import ContactInfoStep from './steps/ContactInfoStep';
import ThankYouPage from './ThankYouPage';

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Contact
    zipCode: '',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    emailAddress: '',
    phoneNumber: '',
    secondaryPhone: '',
    residenceStatus: '',
    occupancyDate: '',
    
    // Vehicle
    vehicleCount: 1,
    vehicles: [{
      year: '',
      make: '',
      model: '',
      submodel: '',
      vinPrefix: '',
      locationParked: '',
      ownedOrLeased: '',
      vehicleUse: '',
      annualMiles: '',
      weeklyCommuteDays: '',
      oneWayDistance: ''
    }],
    
    // Drivers
    drivers: [{
      gender: '',
      maritalStatus: '',
      relationshipToApplicant: 'Self',
      firstName: '',
      lastName: '',
      birthDate: '',
      state: '',
      ageLicensed: '',
      licenseStatus: '',
      licenseEverSuspended: '',
      occupation: '',
      occupationYears: '',
      isStudent: '',
      education: '',
      requiresSR22: '',
      creditRating: '',
      hasMilitaryAffiliation: ''
    }],
    
    // Incidents
    hasIncidents: false,
    incidents: [],
    
    // Insurance
    coverageType: '',
    hasCurrentInsurance: false,
    currentInsurer: '',
    expirationDate: '',
    startDate: '',
    continuouslyInsuredSince: ''
  });

  const totalSteps = 15;

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

  const updateVehicle = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      vehicles: prev.vehicles.map((vehicle, i) => 
        i === index ? { ...vehicle, [field]: value } : vehicle
      )
    }));
  };

  const updateDriver = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      drivers: prev.drivers.map((driver, i) => 
        i === index ? { ...driver, [field]: value } : driver
      )
    }));
  };

  if (isSubmitted) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <QuoteHeader />
      <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />
      <QuoteNavigation currentStep={currentStep} onPrevious={handlePrevious} />

      {/* Form Content */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            {/* Step 1: ZIP Code */}
            {currentStep === 1 && (
              <ZipCodeStep
                zipCode={formData.zipCode}
                onZipCodeChange={(value) => updateFormData('zipCode', value)}
                onNext={handleNext}
              />
            )}

            {/* Step 2: Vehicle Count */}
            {currentStep === 2 && (
              <VehicleCountStep
                vehicleCount={formData.vehicleCount}
                onVehicleCountChange={(count) => updateFormData('vehicleCount', count)}
                onNext={handleNext}
              />
            )}

            {/* Steps 3-14: Keep existing inline implementations for now */}
            {currentStep === 3 && (
              
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Select your vehicle year</h1>
                <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {Array.from({ length: 28 }, (_, i) => 2025 - i).map((year) => (
                    <Button
                      key={year}
                      variant={formData.vehicles[0].year === year.toString() ? "default" : "outline"}
                      onClick={() => updateVehicle(0, 'year', year.toString())}
                      className={`h-12 ${
                        formData.vehicles[0].year === year.toString()
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
                  disabled={!formData.vehicles[0].year}
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Keep all other steps 4-14 the same for now */}
            {currentStep >= 4 && currentStep <= 14 && (
              
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Step {currentStep}</h1>
                {/* Vehicle Make */}
                {currentStep === 4 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">Select your vehicle make</h1>
                    <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {['BMW', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia'].map((make) => (
                        <Button
                          key={make}
                          variant={formData.vehicles[0].make === make ? "default" : "outline"}
                          onClick={() => updateVehicle(0, 'make', make)}
                          className={`h-16 flex items-center justify-center gap-3 ${
                            formData.vehicles[0].make === make
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
                      disabled={!formData.vehicles[0].make}
                      className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Vehicle Model */}
                {currentStep === 5 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">Select your vehicle model</h1>
                    <div className="space-y-4 max-w-md mx-auto">
                      <Input
                        placeholder="Enter vehicle model"
                        value={formData.vehicles[0].model}
                        onChange={(e) => updateVehicle(0, 'model', e.target.value)}
                        className="text-center"
                      />
                      <Button 
                        onClick={handleNext}
                        disabled={!formData.vehicles[0].model}
                        className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Vehicle Details */}
                {currentStep === 6 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">Vehicle Details</h1>
                    <div className="space-y-4 max-w-md mx-auto">
                      <Select onValueChange={(value) => updateVehicle(0, 'ownedOrLeased', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Owned or Leased?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Owned">Owned</SelectItem>
                          <SelectItem value="Leased">Leased</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select onValueChange={(value) => updateVehicle(0, 'vehicleUse', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Primary use?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pleasure">Pleasure</SelectItem>
                          <SelectItem value="Commute_Work">Commute to Work</SelectItem>
                          <SelectItem value="Commute_School">Commute to School</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select onValueChange={(value) => updateVehicle(0, 'annualMiles', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Annual miles driven?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5000">Under 5,000</SelectItem>
                          <SelectItem value="7500">5,000 - 10,000</SelectItem>
                          <SelectItem value="12500">10,000 - 15,000</SelectItem>
                          <SelectItem value="20000">15,000 - 25,000</SelectItem>
                          <SelectItem value="50000">Over 25,000</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        onClick={handleNext}
                        disabled={!formData.vehicles[0].ownedOrLeased || !formData.vehicles[0].vehicleUse}
                        className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Driver Gender */}
                {currentStep === 7 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">What is your gender?</h1>
                    <div className="flex gap-4 max-w-md mx-auto">
                      {['Male', 'Female'].map((gender) => (
                        <Button
                          key={gender}
                          variant={formData.drivers[0].gender === gender ? "default" : "outline"}
                          onClick={() => updateDriver(0, 'gender', gender)}
                          className={`flex-1 h-16 ${
                            formData.drivers[0].gender === gender
                              ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {gender}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleNext}
                      disabled={!formData.drivers[0].gender}
                      className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Marital Status */}
                {currentStep === 8 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">What is your marital status?</h1>
                    <div className="flex gap-4 max-w-md mx-auto">
                      {['Single', 'Married'].map((status) => (
                        <Button
                          key={status}
                          variant={formData.drivers[0].maritalStatus === status ? "default" : "outline"}
                          onClick={() => updateDriver(0, 'maritalStatus', status)}
                          className={`flex-1 h-16 ${
                            formData.drivers[0].maritalStatus === status
                              ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleNext}
                      disabled={!formData.drivers[0].maritalStatus}
                      className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Birth Date */}
                {currentStep === 9 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">What is your birth date?</h1>
                    <div className="space-y-4 max-w-md mx-auto">
                      <Input
                        type="date"
                        value={formData.drivers[0].birthDate}
                        onChange={(e) => updateDriver(0, 'birthDate', e.target.value)}
                        className="text-center"
                      />
                      <Button 
                        onClick={handleNext}
                        disabled={!formData.drivers[0].birthDate}
                        className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* License Information */}
                {currentStep === 10 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">License Information</h1>
                    <div className="space-y-4 max-w-md mx-auto">
                      <Input
                        type="number"
                        placeholder="Age when first licensed"
                        value={formData.drivers[0].ageLicensed}
                        onChange={(e) => updateDriver(0, 'ageLicensed', e.target.value)}
                      />
                      
                      <Select onValueChange={(value) => updateDriver(0, 'licenseStatus', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="License status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Valid">Valid</SelectItem>
                          <SelectItem value="Permit">Permit</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                          <SelectItem value="Revoked">Revoked</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        onClick={handleNext}
                        disabled={!formData.drivers[0].ageLicensed || !formData.drivers[0].licenseStatus}
                        className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Education & Occupation */}
                {currentStep === 11 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">Education & Occupation</h1>
                    <div className="space-y-4 max-w-md mx-auto">
                      <Select onValueChange={(value) => updateDriver(0, 'education', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Highest education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Some College">Some College</SelectItem>
                          <SelectItem value="Associate">Associate Degree</SelectItem>
                          <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="Master">Master's Degree</SelectItem>
                          <SelectItem value="PhD">PhD/Doctorate</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Input
                        placeholder="Occupation"
                        value={formData.drivers[0].occupation}
                        onChange={(e) => updateDriver(0, 'occupation', e.target.value)}
                      />
                      
                      <Button 
                        onClick={handleNext}
                        disabled={!formData.drivers[0].education || !formData.drivers[0].occupation}
                        className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Credit Rating */}
                {currentStep === 12 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">How would you rate your credit?</h1>
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                      {['Excellent', 'Good', 'Some Problems', 'Major Problems'].map((rating) => (
                        <Button
                          key={rating}
                          variant={formData.drivers[0].creditRating === rating ? "default" : "outline"}
                          onClick={() => updateDriver(0, 'creditRating', rating)}
                          className={`h-12 ${
                            formData.drivers[0].creditRating === rating
                              ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleNext}
                      disabled={!formData.drivers[0].creditRating}
                      className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Current Insurance */}
                {currentStep === 13 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">Do you currently have auto insurance?</h1>
                    <div className="flex gap-4 max-w-md mx-auto">
                      <Button
                        variant={formData.hasCurrentInsurance === true ? "default" : "outline"}
                        onClick={() => updateFormData('hasCurrentInsurance', true)}
                        className={`flex-1 h-16 ${
                          formData.hasCurrentInsurance === true
                            ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        Yes
                      </Button>
                      <Button
                        variant={formData.hasCurrentInsurance === false ? "default" : "outline"}
                        onClick={() => updateFormData('hasCurrentInsurance', false)}
                        className={`flex-1 h-16 ${
                          formData.hasCurrentInsurance === false
                            ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        No
                      </Button>
                    </div>
                    <Button 
                      onClick={handleNext}
                      disabled={formData.hasCurrentInsurance === null}
                      className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Coverage Type */}
                {currentStep === 14 && (
                  <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">What type of coverage do you need?</h1>
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                      {['Premium', 'Standard', 'Preferred', 'State_Min'].map((coverage) => (
                        <Button
                          key={coverage}
                          variant={formData.coverageType === coverage ? "default" : "outline"}
                          onClick={() => updateFormData('coverageType', coverage)}
                          className={`h-12 ${
                            formData.coverageType === coverage
                              ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {coverage.replace('_', ' ')}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      onClick={handleNext}
                      disabled={!formData.coverageType}
                      className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                    >
                      Continue
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 15: Contact Information */}
            {currentStep === 15 && (
              <ContactInfoStep
                formData={formData}
                onFieldChange={updateFormData}
                onSubmit={handleSubmit}
              />
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

export default QuoteForm;
