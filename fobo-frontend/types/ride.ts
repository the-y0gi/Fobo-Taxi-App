export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface FareDetails {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  totalFare: number;
  distance: number;
  duration: number;
}

export interface Ride {
  id: string;
  user: string;
  driver?: string; 
  pickupLocation: Location;
  dropLocation: Location;
  distance: number;
  estimatedTime: number;
  memberCount: number;
  vehicleType: '2-seater' | '3-8-seater' | '10+-seater';
  baseFare: number;
  distanceFare: number;
  totalFare: number;
  status: 'pending' | 'accepted' | 'arrived' | 'started' | 'completed' | 'cancelled';
  otp: string;
  paymentStatus: 'pending' | 'success' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  requestedAt: string;
  acceptedAt?: string;
  arrivedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface RideEstimateRequest {
  pickupLat: number;
  pickupLng: number;
  dropLat: number;
  dropLng: number;
  vehicleType: '2-seater' | '3-8-seater' | '10+-seater';
  memberCount: number;
}

export interface RideBookingRequest {
  pickupLocation: Location;
  dropLocation: Location;
  vehicleType: '2-seater' | '3-8-seater' | '10+-seater';
  memberCount: number;
  distance: number;
  estimatedTime: number;
}