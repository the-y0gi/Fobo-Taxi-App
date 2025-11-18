export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  isBlocked: boolean;
  role: 'user' | 'driver' | 'admin';
  createdAt: string;
}

export interface Driver extends User {
  employeeId: string;
  address: string;
  vehicle: {
    carName: string;
    carModel: string;
    carNumber: string;
    carType: '2-seater' | '3-8-seater' | '10+-seater';
    carColor: string;
    carPhoto?: string;
  };
  documents: {
    drivingLicense?: string;
    vehicleRC?: string;
    insurance?: string;
    aadhaar?: string;
  };
  isApproved: boolean;
  isActive: boolean;
  status: 'offline' | 'online' | 'arriving' | 'on-ride' | 'break';
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  totalTrips: number;
  totalEarnings: number;
  cancellationRate: number;
}

export interface AuthResponse {
  user: User | Driver;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: 'user' | 'driver' | 'admin';
}

export interface UserRegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface DriverRegistrationData extends UserRegistrationData {
  address: string;
  vehicle: {
    carName: string;
    carModel: string;
    carNumber: string;
    carType: '2-seater' | '3-8-seater' | '10+-seater';
    carColor: string;
  };
}