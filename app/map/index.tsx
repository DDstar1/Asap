// app/map/index.tsx
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Mock location data - replace with real API data
const locationSuggestions = [
  {
    id: "1",
    name: "Victoria Island",
    address: "Victoria Island, Lagos, Nigeria",
    distance: "12.5 km",
    type: "area",
    coordinates: { latitude: 6.4281, longitude: 3.4219 },
  },
  {
    id: "2",
    name: "Lekki Phase 1",
    address: "Lekki Phase 1, Lagos, Nigeria",
    distance: "8.3 km",
    type: "area",
    coordinates: { latitude: 6.4698, longitude: 3.5852 },
  },
  {
    id: "3",
    name: "Murtala Muhammed Airport",
    address: "Ikeja, Lagos, Nigeria",
    distance: "25.1 km",
    type: "airport",
    coordinates: { latitude: 6.5773, longitude: 3.3212 },
  },
  {
    id: "4",
    name: "National Theatre",
    address: "Iganmu, Lagos, Nigeria",
    distance: "15.7 km",
    type: "landmark",
    coordinates: { latitude: 6.4698, longitude: 3.3742 },
  },
  {
    id: "5",
    name: "Ikeja City Mall",
    address: "Obafemi Awolowo Way, Ikeja, Lagos",
    distance: "18.9 km",
    type: "shopping",
    coordinates: { latitude: 6.6018, longitude: 3.3515 },
  },
];

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 90}
      >
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

          {/* Bottom sheet */}
          <View className="bg-white rounded-t-2xl p-4 shadow-lg">
            <Text className="text-xl font-bold mb-3">Next stop, anywhere.</Text>
            <DestinationSearchBox mapRef={mapRef} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function DestinationSearchBox({
  mapRef,
}: {
  mapRef: React.RefObject<MapView>;
}) {
  const [from, setFrom] = useState("Fetching location...");
  const [to, setTo] = useState("");
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] =
    useState(locationSuggestions);
  const [selectedFromLocation, setSelectedFromLocation] = useState<any>(null);
  const [selectedToLocation, setSelectedToLocation] = useState<any>(null);

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setFrom("Permission denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setFrom("Current Location");
      setSelectedFromLocation({
        name: "Current Location",
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    })();
  }, []);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions(locationSuggestions);
    } else {
      const filtered = locationSuggestions.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [searchQuery]);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "airport":
        return "airplane";
      case "shopping":
        return "storefront";
      case "landmark":
        return "location";
      default:
        return "location-outline";
    }
  };

  const handleLocationSelect = (location: any) => {
    if (activeField === "from") {
      setFrom(location.name);
      setSelectedFromLocation(location);
    } else if (activeField === "to") {
      setTo(location.name);
      setSelectedToLocation(location);

      // Animate map to selected location
      if (mapRef.current && location.coordinates) {
        mapRef.current.animateToRegion(
          {
            ...location.coordinates,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          1000
        );
      }
    }

    setActiveField(null);
    setSearchQuery("");
  };

  const handleFieldPress = (field: "from" | "to") => {
    if (activeField === field) {
      setActiveField(null);
    } else {
      setActiveField(field);
      setSearchQuery("");
    }
  };

  return (
    <View className="bg-gray-50 rounded-xl p-4">
      {/* Location boxes container with conditional shadow */}
      <View
        className={`bg-white rounded-xl p-3 ${activeField ? "shadow-lg" : ""}`}
        style={
          activeField
            ? {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 8,
              }
            : {}
        }
      >
        {/* From Field */}
        <TouchableOpacity
          className={`flex-row items-center bg-gray-50 rounded-lg px-3 h-12 mb-2 border ${
            activeField === "from"
              ? "border-green-500 bg-white"
              : "border-transparent"
          }`}
          onPress={() => handleFieldPress("from")}
        >
          <View className="w-3 h-3 rounded-full bg-green-500 mr-3" />
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-medium">
              {from || "Where from?"}
            </Text>
          </View>
          {activeField === "from" && (
            <Ionicons name="close" size={20} color="#6B7280" />
          )}
        </TouchableOpacity>

        {/* Animated Arrow */}
        <View className="items-center my-2">
          <View className="w-6 h-6 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="swap-vertical" size={16} color="#6B7280" />
          </View>
        </View>

        {/* To Field */}
        <TouchableOpacity
          className={`flex-row items-center bg-gray-50 rounded-lg px-3 h-12 border ${
            activeField === "to"
              ? "border-green-500 bg-white"
              : "border-transparent"
          }`}
          onPress={() => handleFieldPress("to")}
        >
          <View className="w-3 h-3 rounded-full bg-red-500 mr-3" />
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-medium">
              {to || "Where to?"}
            </Text>
          </View>
          {activeField === "to" && (
            <Ionicons name="close" size={20} color="#6B7280" />
          )}
        </TouchableOpacity>
      </View>

      {/* Shadow line separator */}
      <View
        className="h-px bg-gray-200 mx-4 mt-4 mb-2"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 2,
        }}
      />

      {/* Search Input - Only show when a field is active */}
      {activeField && (
        <View className="mt-3">
          <View className="flex-row items-center bg-white rounded-lg px-3 h-12 border border-blue-200">
            <Ionicons name="search" size={18} color="#6B7280" />
            <TextInput
              className="ml-2 flex-1 text-base text-gray-900"
              placeholder={`Search for ${activeField === "from" ? "pickup" : "destination"}...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Location Suggestions */}
      {activeField && (
        <View
          className="mt-3 bg-white rounded-lg shadow-sm border border-gray-100"
          style={{ minHeight: 300, maxHeight: 400 }}
        >
          {/* Current Location Option (only for 'from' field) */}
          {activeField === "from" && (
            <TouchableOpacity
              className="flex-row items-center p-4 border-b border-gray-100"
              onPress={() => {
                setFrom("Current Location");
                setActiveField(null);
              }}
            >
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons name="locate" size={20} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-medium">
                  Use current location
                </Text>
                <Text className="text-gray-500 text-sm">Current location</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Location Suggestions List */}
          <ScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
            {filteredSuggestions.map((location) => (
              <TouchableOpacity
                key={location.id}
                className="flex-row items-center p-4 border-b border-gray-50"
                onPress={() => handleLocationSelect(location)}
              >
                <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                  <Ionicons
                    name={getLocationIcon(location.type) as any}
                    size={18}
                    color="#6B7280"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium" numberOfLines={1}>
                    {location.name}
                  </Text>
                  <Text className="text-gray-500 text-sm" numberOfLines={1}>
                    {location.address}
                  </Text>
                </View>
                <Text className="text-gray-400 text-sm">
                  {location.distance}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredSuggestions.length === 0 && searchQuery.length > 0 && (
            <View className="p-4 items-center" style={{ minHeight: 200 }}>
              <Ionicons name="search-outline" size={24} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">No locations found</Text>
              <Text className="text-gray-400 text-sm">
                Try searching with different keywords
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Book Ride Button - Show when both locations are selected */}
      {selectedFromLocation && selectedToLocation && (
        <TouchableOpacity className="mt-4 bg-green-600 rounded-lg h-12 items-center justify-center">
          <Text className="text-white font-semibold text-base">Book Ride</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
