// MapScreen.tsx
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";

export default function MapScreen() {
  const { photoUri } = useLocalSearchParams();

  // Pickup is always a LatLng
  const [pickup, setPickup] = useState<LatLng>({
    latitude: 6.5244, // example: Lagos
    longitude: 3.3792,
  });

  // Dropoff can be LatLng or null until user sets it
  const [dropoff, setDropoff] = useState<LatLng | null>(null);

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: pickup.latitude,
          longitude: pickup.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => {
          setDropoff(e.nativeEvent.coordinate); // ✅ now works
        }}
      >
        <Marker coordinate={pickup} title="Pickup" />
        {dropoff && <Marker coordinate={dropoff} title="Dropoff" />}
      </MapView>

      <View className="absolute bottom-0 w-full bg-white p-4">
        <Text className="text-lg font-bold">Set your trip</Text>
        <Text>
          Pickup: {pickup.latitude}, {pickup.longitude}
        </Text>
        {dropoff ? (
          <Text>
            Dropoff: {dropoff.latitude}, {dropoff.longitude}
          </Text>
        ) : (
          <Text>Tap map to set dropoff</Text>
        )}

        <TouchableOpacity
          className="mt-3 bg-black p-4 rounded-xl"
          disabled={!dropoff}
        >
          <Text className="text-white text-center font-bold">
            {dropoff ? "Request Ride" : "Set dropoff to continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
