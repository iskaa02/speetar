import MainSheet from "@/components/BottomSheet";
import useNearbyPlaces, { Location } from "@/hooks/useNearbyPlaces";
import * as React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import * as ExpoLocation from "expo-location";
import OpenInGoogleMapButton from "@/components/OpenInGoogleMapsButton";
export default function HomePage() {
  // if user deny location permission user a default location ( Al bayda )
  const [userLocation, setUserLocation] = React.useState<Location>({
    longitude: 21.75867,
    latitude: 32.762939,
  });
  const [selectedPlaceIndex, setSelectedPlaceIndex] = React.useState<
    number | null
  >(null);
  const places = useNearbyPlaces(userLocation);

  React.useEffect(() => {
    tryGetUserLocation().then((i) => {
      setUserLocation(i);
    });
  }, []);
  const ref = React.useRef<MapView>(null);

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref}
          provider="google"
          style={{ flex: 1 }}
          initialCamera={{
            zoom: 16,
            center: {
              longitude: userLocation.longitude,
              latitude: userLocation.latitude,
            },
            heading: 0,
            pitch: 0,
            altitude: 0,
          }}
        >
          {selectedPlaceIndex !== null ? (
            <Marker coordinate={places.places[selectedPlaceIndex].location} />
          ) : null}
        </MapView>

        <OpenInGoogleMapButton
          selectedPlace={
            selectedPlaceIndex !== null
              ? places.places[selectedPlaceIndex]
              : null
          }
        />
        <MainSheet
          selectedPlaceIndex={selectedPlaceIndex}
          userLocation={userLocation}
          onPlacePress={(v, i) => {
            ref.current?.animateCamera({
              center: v.location,
              zoom: 18,
            });
            setSelectedPlaceIndex(i);
          }}
          places={places}
        />
      </View>
    </GestureHandlerRootView>
  );
}

//  Trying to get user location, fallback if permission denied
async function tryGetUserLocation() {
  let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return {
      longitude: 21.75867,
      latitude: 32.762939,
    };
  }

  let location = await ExpoLocation.getCurrentPositionAsync({});
  return {
    longitude: location.coords.longitude,
    latitude: location.coords.latitude,
  };
}
