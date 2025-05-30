
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
    continuouslyInsuredSince: ''
  });

  const totalSteps = 15; // Expanded to accommodate all sections
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
            {/* Step 1: ZIP Code */}
            {currentStep === 1 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Enter your ZIP code</h1>
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

            {/* Step 2: Vehicle Count */}
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
                  className="w-full max-w-md bg-[#467FCE] hover:bg-[#3a6bb8] text-white h-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 3: Vehicle Year */}
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

            {/* Step 4: Vehicle Make */}
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

            {/* Step 5: Vehicle Model */}
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

            {/* Step 6: Vehicle Details */}
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

            {/* Step 7: Driver Gender */}
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

            {/* Step 8: Marital Status */}
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

            {/* Step 9: Birth Date */}
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

            {/* Step 10: License Information */}
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

            {/* Step 11: Education & Occupation */}
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

            {/* Step 12: Credit Rating */}
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

            {/* Step 13: Current Insurance */}
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

            {/* Step 14: Coverage Type */}
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

            {/* Step 15: Contact Information */}
            {currentStep === 15 && (
              <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Enter your contact information</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                    />
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Address"
                    value={formData.address1}
                    onChange={(e) => updateFormData('address1', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                    />
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => updateFormData('state', e.target.value)}
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.emailAddress}
                    onChange={(e) => updateFormData('emailAddress', e.target.value)}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                  />
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.firstName || !formData.lastName || !formData.emailAddress || !formData.phoneNumber}
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
