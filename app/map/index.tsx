// app/map/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function MapHomeScreen() {
  const mapRef = useRef<MapView | null>(null);

  const center = {
    latitude: 6.5244,
    longitude: 3.3792,
  };

  const drivers = [
    { id: "d1", lat: 6.526, lng: 3.379, heading: 45 },
    { id: "d2", lat: 6.523, lng: 3.381, heading: 120 },
  ];

  const fakePhoto = "https://picsum.photos/300/300";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Map */}
      <View className="flex-1">
        <MapView
          ref={(r) => (mapRef.current = r)}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
          }}
          showsUserLocation
          showsMyLocationButton={false}
        >
          {/* OSM tiles */}
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />

          {/* User location (blue dot with halo) */}
          <Marker coordinate={center} anchor={{ x: 0.5, y: 0.5 }}>
            <View className="w-11 h-11 rounded-full bg-teal-500/10 justify-center items-center">
              <View className="w-3.5 h-3.5 rounded-full bg-sky-600 shadow-lg" />
            </View>
          </Marker>

          {/* Fake drivers */}
          {drivers.map((d) => (
            <Marker
              key={d.id}
              coordinate={{ latitude: d.lat, longitude: d.lng }}
              anchor={{ x: 0.5, y: 0.5 }}
              rotation={d.heading}
            >
              <Ionicons name="car-sport" size={28} color="#0EA5A4" />
            </Marker>
          ))}
        </MapView>

        {/* Hamburger button */}
        <TouchableOpacity className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white items-center justify-center shadow-md">
          <Ionicons name="menu" size={24} color="#111827" />
        </TouchableOpacity>

        {/* Bottom sheet */}
      </View>
      <View className=" bg-white rounded-t-2xl p-4 shadow-lg">
        <Text className="text-xl font-bold mb-3">Next stop, anywhere.</Text>

        {/* Search input look */}
        <TouchableOpacity className="flex-row items-center bg-gray-100 rounded-lg px-3 h-12">
          <Ionicons name="search" size={18} color="#6B7280" />
          <Text className="ml-2 text-gray-500 text-base">Where to?</Text>
        </TouchableOpacity>

        {/* Promo row 
        <View className="flex-row items-center bg-gray-50 rounded-xl mt-4 p-3">
          <Image
            source={{ uri: fakePhoto }}
            className="w-16 h-16 rounded-lg mr-3"
          />
          <View className="flex-1">
            <Text className="text-sm font-semibold mb-1">
              Always arrive on time
            </Text>
            <Text className="text-xs text-gray-500">
              Calendar connection makes it easy
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>*/}
      </View>
    </SafeAreaView>
  );
}
