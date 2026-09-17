export type VehicleCategory = 'intracity' | 'intercity' | 'heavy' | 'parcel';

export interface VehicleType {
  id: string;
  name: string;
  category: VehicleCategory;
  capacityKg: number;
  capacityDisplay: string;
  dimensions: string; // e.g., "7.0ft x 4.8ft x 4.8ft"
  lengthFt: number;
  widthFt: number;
  heightFt: number;
  volumeCuFt: number;
  baseFare: number;
  perKmRate: number;
  estimatedHours: string;
  iconName: string;
  bodyType: 'Open Body' | 'Closed Container' | 'Flatbed' | 'Refrigerated' | 'Two-Wheeler Box';
  idealFor: string[];
  whatFitsInside: string[];
  badge?: string;
  sizeCategoryTag: string;
  popularForB2B: boolean;
}

export type ShipmentStatus = 'booked' | 'driver_assigned' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';

export interface RouteCheckpoint {
  id: string;
  locationName: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  description: string;
}

export interface Shipment {
  trackingId: string;
  waybillNo: string;
  senderName: string;
  senderCompany: string;
  senderAddress: string;
  senderCity: string;
  receiverName: string;
  receiverCompany: string;
  receiverAddress: string;
  receiverCity: string;
  vehicleId: string;
  vehicleName: string;
  vehicleNo: string;
  goodsCategory: string;
  weightKg: number;
  status: ShipmentStatus;
  progressPercent: number;
  scheduledDate: string;
  estimatedDelivery: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  currentLocationName: string;
  currentLat: number;
  currentLng: number;
  totalDistanceKm: number;
  baseFare: number;
  gstAmount: number;
  totalFare: number;
  checkpoints: RouteCheckpoint[];
  temperatureCelsius?: number; // for reefer cargo
  podSignedBy?: string;
  podSignedAt?: string;
}

export interface B2BAccount {
  companyName: string;
  gstin: string;
  creditLimit: number;
  usedCredit: number;
  tier: 'Enterprise Platinum' | 'Gold Logistics Partner' | 'Standard B2B';
  primaryContact: string;
  email: string;
  phone: string;
  contractDiscountPercent: number;
}
