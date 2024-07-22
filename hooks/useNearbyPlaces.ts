import { useEffect, useState } from "react";

export interface PlacesArray {
  places: Place[];
}
export interface Place {
  location: Location;
  rating: number;
  name: string;
  businessStatus: string;
  displayName: DisplayName;
  shortFormattedAddress: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface DisplayName {
  text: string;
  languageCode: string;
}

function getNearbyResturants(userLocation: Location) {
  const searchBody = JSON.stringify({
    locationRestriction: {
      circle: {
        center: userLocation,
        radius: 10000,
      },
    },
    includedTypes: ["restaurant"],
    maxResultCount: 10,
    languageCode: "ar",
  });

  const searchOptions = {
    method: "POST",
    headers: {
      "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: searchBody,
  };
  return fetch(
    "https://places.googleapis.com/v1/places:searchNearby?fields=places.location,places.name,places.displayName,places.businessStatus,places.rating,places.shortFormattedAddress",
    // @ts-ignore
    searchOptions,
  );
}
export default function useNearbyPlaces(userLocation: Location | null) {
  const [resturants, setResturants] = useState<PlacesArray>({ places: [] });
  useEffect(() => {
    if (!userLocation) return;
    getNearbyResturants(userLocation)
      .then((i) => i.json())
      .then((i: any) => {
        console.log(JSON.stringify(i));
        if (i?.places) {
          setResturants(i);
        }
      });
  }, [userLocation]);
  return resturants;
}
