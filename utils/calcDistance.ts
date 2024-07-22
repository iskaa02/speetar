import { Location } from "@/hooks/useNearbyPlaces";

export function calculateDistance(loc1: Location, loc2: Location) {
  const R = 6371; // Earth's radius in kilometers

  const latRad1 = toRadians(loc1.latitude);
  const latRad2 = toRadians(loc2.latitude);
  const dLat = toRadians(loc2.latitude - loc1.latitude);
  const dLon = toRadians(loc2.longitude - loc1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latRad1) *
      Math.cos(latRad2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
