import { Place } from "@/hooks/useNearbyPlaces";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
export default function OpenInGoogleMapButton({
  selectedPlace,
}: {
  selectedPlace: Place | null;
}) {
  if (!selectedPlace) {
    return null;
  }
  return (
    <Pressable
      style={{
        position: "absolute",
        top: "60%",
        left: 20,
        height: 48,
        width: 48,
        borderRadius: 100,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      android_ripple={{ borderless: false, foreground: true }}
      onPress={() => {
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${selectedPlace.location.latitude},${selectedPlace.location.longitude}&query_place_id=${selectedPlace.name}`,
        );
      }}
    >
      <Feather name="external-link" size={22} color="white" />
    </Pressable>
  );
}
