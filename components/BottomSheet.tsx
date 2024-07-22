import { StyleSheet, View, Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Location, Place, PlacesArray } from "@/hooks/useNearbyPlaces";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import OpenInGoogleMapButton from "./OpenInGoogleMapsButton";
type MainSheetProps = {
  places: PlacesArray;
  onPlacePress: (i: Place, index: number) => void;
  selectedPlaceIndex: number | null;
};
export default function MainSheet({
  places,
  onPlacePress,
  selectedPlaceIndex,
}: MainSheetProps) {
  const myLoc = {
    longitude: 21.75867,
    latitude: 32.762939,
  };
  const ref = useRef<BottomSheet>(null);

  return (
    <BottomSheet ref={ref} snapPoints={["30%", "80%"]} index={1}>
      <BottomSheetScrollView style={styles.contentContainer}>
        {places.places.map((v, i) => (
          <Pressable
            key={i}
            onPress={() => {
              ref.current?.collapse();
              onPlacePress(v, i);
            }}
            style={[
              styles.placeCard,
              selectedPlaceIndex == i ? { backgroundColor: "#73e864" } : {},
            ]}
            android_ripple={{
              radius: 200,
              foreground: true,
              borderless: false,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 5 }}>
                <Text numberOfLines={3} style={styles.placeName}>
                  {v.displayName.text}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Feather name="map-pin" size={16} color="black" />
                  <Text style={styles.address}>{v.shortFormattedAddress}</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <MaterialCommunityIcons
                    name="transit-connection-variant"
                    size={18}
                    color="black"
                  />
                  <Text
                    style={styles.distance}
                  >{`${calculateDistance(v.location, myLoc).toFixed(1)} كم`}</Text>
                </View>
              </View>
              <View style={styles.ratingContainer}>
                <Feather name="star" color="#135e08" size={18} />
                <Text style={styles.rating}>{v.rating}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  address: {
    alignSelf: "flex-start",
    color: "#5b5b5b",
    marginStart: 4,
  },
  distance: { fontSize: 14, marginStart: 5 },
  distanceContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  ratingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    left: 10,
  },
  rating: {
    fontWeight: "bold",
    color: "#135e08",
    fontSize: 16,
  },
  placeCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    overflow: "hidden",
  },
});
function calculateDistance(loc1: Location, loc2: Location) {
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
