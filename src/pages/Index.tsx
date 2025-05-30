
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, HelpCircle, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface FormData {
  // Contact Information
  zipCode: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  emailAddress: string;
  phoneNumber: string;
  secondaryPhone: string;
  residenceStatus: string;
  occupancyDate: string;
  
  // Vehicle Information
  vehicleCount: number;
  vehicles: Array<{
    year: string;
    make: string;
    model: string;
    submodel: string;
    vinPrefix: string;
    locationParked: string;
    ownedOrLeased: string;
    vehicleUse: string;
    annualMiles: string;
    weeklyCommuteDays: string;
    oneWayDistance: string;
  }>;
  
  // Driver Information
  drivers: Array<{
    gender: string;
    maritalStatus: string;
    relationshipToApplicant: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    state: string;
    ageLicensed: string;
    licenseStatus: string;
    licenseEverSuspended: string;
    occupation: string;
    occupationYears: string;
    isStudent: string;
    education: string;
    requiresSR22: string;
    creditRating: string;
    hasMilitaryAffiliation: string;
  }>;
  
  // Incidents
  hasIncidents: boolean;
  incidents: Array<{
    atFault: string;
    type: string;
    duiState: string;
    incidentDate: string;
    insurancePaid: string;
    whatDamaged: string;
  }>;
  
  // Insurance Profile
  coverageType: string;
  hasCurrentInsurance: boolean;
  currentInsurer: string;
  expirationDate: string;
  startDate: string;
  continuouslyInsuredSince: string;
  hasInsurancePast30Days: boolean;
  isHomeowner: boolean;
}

const Index = () => {
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
    continuouslyInsuredSince: '',
    hasInsurancePast30Days: false,
    isHomeowner: false
  });

  const totalSteps = 17; // Updated to include new steps
  const progress = (currentStep / totalSteps) * 100;

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

  // Auto-advance function for selection steps
  const handleSelectionAndAdvance = (field: string, value: any, updateFunction?: (field: string, value: any) => void) => {
    if (updateFunction) {
      updateFunction(field, value);
    } else {
      updateFormData(field, value);
    }
    setTimeout(() => handleNext(), 300); // Small delay for visual feedback
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-md p-4 sm:p-8 text-center">
          <div className="mb-6">
            <img src="/lovable-uploads/ffc1c08f-f4cb-4b31-a4c8-d80f99d0d75b.png" alt="TrueQuote" className="h-8 sm:h-12 mx-auto mb-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
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
      <div className="bg-white shadow-sm p-2 sm:p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <img src="/lovable-uploads/ffc1c08f-f4cb-4b31-a4c8-d80f99d0d75b.png" alt="TrueQuote" className="h-6 sm:h-8" />
          <p className="text-xs sm:text-sm text-gray-600 hidden md:block">
            Get fast, cheap car insurance quotes with one simple form.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto p-2 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="ml-2 sm:ml-4 text-xs sm:text-sm font-medium text-[#6FD0BD]">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b p-2 sm:p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm p-1 sm:p-2"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Previous Question</span>
            <span className="sm:hidden">Previous</span>
          </Button>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-1 sm:p-2">
              <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Help</span>
            </Button>
            <Button variant="ghost" size="sm" className="p-1 sm:p-2">
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-2 sm:p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-4 sm:p-8">
            {/* Step 1: ZIP Code */}
            {currentStep === 1 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Enter your ZIP code</h1>
                <div className="max-w-sm mx-auto space-y-4">
                  <Input
                    type="text"
                    placeholder="66200"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    className="text-center text-base sm:text-lg h-10 sm:h-12"
                  />
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.zipCode}
                    className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-10 sm:h-12 text-sm sm:text-base"
                  >
                    CHECK RATES
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Count */}
            {currentStep === 2 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">How many vehicles will be on your policy?</h1>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto">
                  {[1, 2, 3].map((count) => (
                    <Button
                      key={count}
                      variant={formData.vehicleCount === count ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('vehicleCount', count)}
                      className={`h-12 sm:h-16 text-base sm:text-lg ${
                        formData.vehicleCount === count 
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {count === 3 ? '3+' : count}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Vehicle Year */}
            {currentStep === 3 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Select your vehicle year</h1>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto">
                  {Array.from({ length: 28 }, (_, i) => 2025 - i).map((year) => (
                    <Button
                      key={year}
                      variant={formData.vehicles[0].year === year.toString() ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('year', year.toString(), (field, value) => updateVehicle(0, field, value))}
                      className={`h-10 sm:h-12 text-sm sm:text-base ${
                        formData.vehicles[0].year === year.toString()
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Vehicle Make */}
            {currentStep === 4 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Select your vehicle make</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl mx-auto">
                  {['BMW', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia'].map((make) => (
                    <Button
                      key={make}
                      variant={formData.vehicles[0].make === make ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('make', make, (field, value) => updateVehicle(0, field, value))}
                      className={`h-12 sm:h-16 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                        formData.vehicles[0].make === make
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg sm:text-2xl">🚗</span>
                      {make}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Vehicle Model */}
            {currentStep === 5 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Select your vehicle model</h1>
                <div className="grid grid-cols-1 gap-2 sm:gap-3 max-w-md mx-auto">
                  {['Camry', 'Civic', 'Accord'].map((model) => (
                    <Button
                      key={model}
                      variant={formData.vehicles[0].model === model ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('model', model, (field, value) => updateVehicle(0, field, value))}
                      className={`h-12 sm:h-16 text-sm sm:text-base ${
                        formData.vehicles[0].model === model
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {model}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Insurance Past 30 Days */}
            {currentStep === 6 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Have you had auto insurance in the past 30 days?</h1>
                <div className="flex gap-2 sm:gap-4 max-w-md mx-auto">
                  <Button
                    variant={formData.hasInsurancePast30Days === true ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('hasInsurancePast30Days', true)}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.hasInsurancePast30Days === true
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={formData.hasInsurancePast30Days === false ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('hasInsurancePast30Days', false)}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.hasInsurancePast30Days === false
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {/* Step 7: Vehicle Ownership */}
            {currentStep === 7 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Is this vehicle owned, financed or leased?</h1>
                <div className="grid grid-cols-1 gap-2 sm:gap-3 max-w-md mx-auto">
                  {['Owned', 'Financed', 'Leased'].map((option) => (
                    <Button
                      key={option}
                      variant={formData.vehicles[0].ownedOrLeased === option ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('ownedOrLeased', option, (field, value) => updateVehicle(0, field, value))}
                      className={`h-12 sm:h-16 text-sm sm:text-base ${
                        formData.vehicles[0].ownedOrLeased === option
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Driver Gender */}
            {currentStep === 8 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Select your gender</h1>
                <div className="flex gap-2 sm:gap-4 max-w-md mx-auto">
                  {['Male', 'Female'].map((gender) => (
                    <Button
                      key={gender}
                      variant={formData.drivers[0].gender === gender ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('gender', gender, (field, value) => updateDriver(0, field, value))}
                      className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                        formData.drivers[0].gender === gender
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Marital Status */}
            {currentStep === 9 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Are you married?</h1>
                <div className="flex gap-2 sm:gap-4 max-w-md mx-auto">
                  {['Yes', 'No'].map((status) => (
                    <Button
                      key={status}
                      variant={formData.drivers[0].maritalStatus === status ? "default" : "outline"}
                      onClick={() => handleSelectionAndAdvance('maritalStatus', status, (field, value) => updateDriver(0, field, value))}
                      className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                        formData.drivers[0].maritalStatus === status
                          ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 10: Homeowner */}
            {currentStep === 10 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Homeowner?</h1>
                <div className="flex gap-2 sm:gap-4 max-w-md mx-auto">
                  <Button
                    variant={formData.isHomeowner === true ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('isHomeowner', true)}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.isHomeowner === true
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={formData.isHomeowner === false ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('isHomeowner', false)}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.isHomeowner === false
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {/* Step 11: Birth Date */}
            {currentStep === 11 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">What is your birth date?</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <Input
                    type="date"
                    value={formData.drivers[0].birthDate}
                    onChange={(e) => updateDriver(0, 'birthDate', e.target.value)}
                    className="text-center text-sm sm:text-base"
                  />
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.drivers[0].birthDate}
                    className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-10 sm:h-12 text-sm sm:text-base"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 12: Driving Incidents */}
            {currentStep === 12 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Have you had any driving incidents in the last 3 years?</h1>
                <div className="flex gap-2 sm:gap-4 max-w-md mx-auto">
                  <Button
                    variant={formData.hasIncidents === true ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('hasIncidents', true)}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.hasIncidents === true
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={formData.hasIncidents === false ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('hasIncidents', false)}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.hasIncidents === false
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {/* Step 13: Military Affiliation */}
            {currentStep === 13 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Are either you or your spouse an active member, or an honorably discharged veteran of the US military?</h1>
                <div className="flex gap-2 sm:gap-4 max-w-md mx-auto">
                  <Button
                    variant={formData.drivers[0].hasMilitaryAffiliation === 'Yes' ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('hasMilitaryAffiliation', 'Yes', (field, value) => updateDriver(0, field, value))}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.drivers[0].hasMilitaryAffiliation === 'Yes'
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={formData.drivers[0].hasMilitaryAffiliation === 'No' ? "default" : "outline"}
                    onClick={() => handleSelectionAndAdvance('hasMilitaryAffiliation', 'No', (field, value) => updateDriver(0, field, value))}
                    className={`flex-1 h-12 sm:h-16 text-sm sm:text-base ${
                      formData.drivers[0].hasMilitaryAffiliation === 'No'
                        ? 'bg-[#467FCE] hover:bg-[#3a6bb8] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {/* Step 14: License Information */}
            {currentStep === 14 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">License Information</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <Input
                    type="number"
                    placeholder="Age when first licensed"
                    value={formData.drivers[0].ageLicensed}
                    onChange={(e) => updateDriver(0, 'ageLicensed', e.target.value)}
                    className="text-sm sm:text-base"
                  />
                  
                  <Select onValueChange={(value) => updateDriver(0, 'licenseStatus', value)}>
                    <SelectTrigger className="text-sm sm:text-base">
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
                    className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-10 sm:h-12 text-sm sm:text-base"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 15: Education & Occupation */}
            {currentStep === 15 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Education & Occupation</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <Select onValueChange={(value) => updateDriver(0, 'education', value)}>
                    <SelectTrigger className="text-sm sm:text-base">
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
                    className="text-sm sm:text-base"
                  />
                  
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.drivers[0].education || !formData.drivers[0].occupation}
                    className="w-full bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-10 sm:h-12 text-sm sm:text-base"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 16: Coverage Type */}
            {currentStep === 16 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">What type of coverage do you need?</h1>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto">
                  {['Premium', 'Standard', 'Preferred', 'State_Min'].map((coverage) => (
                    <Button
                      key={coverage}
                      variant={formData.coverageType === coverage ? "default" : "outline"}
                      onClick={() => updateFormData('coverageType', coverage)}
                      className={`h-10 sm:h-12 text-xs sm:text-sm ${
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
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-10 sm:h-12 text-sm sm:text-base"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 17: Contact Information */}
            {currentStep === 17 && (
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Enter your contact information</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <Input
                    placeholder="Address"
                    value={formData.address1}
                    onChange={(e) => updateFormData('address1', e.target.value)}
                    className="text-sm sm:text-base"
                  />
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => updateFormData('state', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.emailAddress}
                    onChange={(e) => updateFormData('emailAddress', e.target.value)}
                    className="text-sm sm:text-base"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    className="text-sm sm:text-base"
                  />
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.firstName || !formData.lastName || !formData.emailAddress || !formData.phoneNumber}
                    className="w-full bg-[#6FD0BD] hover:bg-[#5bc0a8] text-white h-10 sm:h-12 text-sm sm:text-base"
                  >
                    Get My Quotes
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Footer */}
          <div className="mt-4 sm:mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
              <span className="text-xs sm:text-sm">✓</span>
              <span className="text-xs sm:text-sm">Free quotes, secure form, competitive offers.</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <img src="/api/placeholder/80/40" alt="BBB Accredited Business" className="h-6 sm:h-8" />
                <span className="text-xs text-gray-500 hidden sm:inline">BBB Accredited Business</span>
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
