
export interface FormData {
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
