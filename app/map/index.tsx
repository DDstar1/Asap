// app/map/MapScreen.tsx
import { IMAGES } from "@/assets/assetsData";
import DestinationSearchModal from "@/components/DestinationSearchModal";
import RiderSearchModal from "@/components/RiderSearchModal";
import { calculateFare, generateRiders, moveRiders } from "@/utils/mapUtils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  const { photoUri } = useLocalSearchParams();

  const [pickup, setPickup] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [riders, setRiders] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const mapRef = useRef<MapView>(null);

  // Generate riders when pickup changes
  useEffect(() => {
    const baseLocation = pickup?.coordinates || {
      latitude: 6.5244,
      longitude: 3.3792,
    };
    const generated = generateRiders(baseLocation);
    setRiders(generated);
  }, [pickup]);

  // Move riders smoothly every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setRiders((prev) => moveRiders(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto zoom logic
  useEffect(() => {
    if (!mapRef.current) return;

    if (pickup && !destination) {
      mapRef.current.animateToRegion(
        { ...pickup.coordinates, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        1000
      );
    } else if (destination && !pickup) {
      mapRef.current.animateToRegion(
        {
          ...destination.coordinates,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    } else if (pickup && destination) {
      mapRef.current.fitToCoordinates(
        [pickup.coordinates, destination.coordinates],
        {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        }
      );
    }
  }, [pickup, destination]);

  // Calculate fare when both points are selected
  useEffect(() => {
    const fetchFare = async () => {
      if (!pickup || !destination) return;
      setLoading(true);
      setPrice(null);
      const fare = await calculateFare();
      setPrice(fare);
      setLoading(false);
    };
    if (pickup && destination) fetchFare();
  }, [pickup, destination]);

  return (
    <View className="flex-1 bg-gray-900">
      {/* Map */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 6.5244,
          longitude: 3.3792,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {riders.map((rider) => (
          <Marker.Animated
            key={rider.id}
            coordinate={rider.coordinate}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={IMAGES.map_rider}
              style={{
                width: 40,
                height: 40,
                transform: [{ rotate: `${rider.heading}deg` }],
              }}
              resizeMode="contain"
            />
          </Marker.Animated>
        ))}

        {pickup && (
          <Marker
            coordinate={pickup.coordinates}
            title="Pickup"
            description={pickup.name}
            pinColor="green"
          >
            {/* {showSearchModal && (
              <>
                <MotiView
                  from={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    loop: true,
                    type: "timing",
                    duration: 1000,
                  }}
                  className="w-10 h-10 rounded-full bg-orange-400"
                />
                <View className="w-4 h-4 rounded-full bg-orange-500" />
              </>
            )} */}
          </Marker>
        )}
        {destination && (
          <Marker
            coordinate={destination.coordinates}
            title="Destination"
            description={destination.name}
            pinColor="red"
          />
        )}
        {pickup && destination && (
          <Polyline
            coordinates={[pickup.coordinates, destination.coordinates]}
            strokeColor="#2563EB"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Bottom overlay */}
      <SafeAreaView className="absolute bottom-0 left-0 right-0 px-4">
        <View className="bg-[#3C3C43] rounded-t-2xl px-4 py-3">
          <Text className="text-lg font-semibold text-white text-center">
            Select Pickup & Destination
          </Text>
        </View>

        <View className="bg-[#3C3C43] p-4 rounded-b-2xl">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="flex-1 bg-white rounded-xl px-4 py-3 shadow-lg"
              onPress={() => setActiveField("from")}
            >
              <Text className="text-gray-700 font-medium">
                {pickup ? pickup.name : "Set Pickup"}
              </Text>
            </TouchableOpacity>

            <MotiView
              from={{ translateX: -3, opacity: 0.5 }}
              animate={{ translateX: 3, opacity: 1 }}
              transition={{ loop: true, type: "timing", duration: 1000 }}
              className="mx-3"
            >
              <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
            </MotiView>

            <TouchableOpacity
              className="flex-1 bg-white rounded-xl px-4 py-3 shadow-lg"
              onPress={() => setActiveField("to")}
            >
              <Text className="text-gray-700 font-medium">
                {destination ? destination.name : "Set Destination"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Delivery */}
          <TouchableOpacity
            className={`mt-4 rounded-xl px-4 py-4 bg-orange-500 ${pickup && destination && !loading ? "" : "opacity-50"}`}
            disabled={!pickup || !destination || loading}
            onPress={() => setShowSearchModal(true)}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : price ? (
              <Text className="text-white text-center font-semibold text-lg">
                Confirm Delivery – ₦{price}
              </Text>
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Book Ride
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modals */}
      <DestinationSearchModal
        visible={!!activeField}
        field={activeField || "from"}
        onClose={() => setActiveField(null)}
        onSelect={(location) => {
          if (activeField === "from") setPickup(location);
          if (activeField === "to") setDestination(location);
        }}
      />

      <RiderSearchModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        price={price}
        packageImage={photoUri ? { uri: photoUri } : IMAGES.riderWithPizza}
      />
    </View>
  );
}
