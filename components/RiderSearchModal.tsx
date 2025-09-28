// components/RiderSearchModal.tsx
import { IMAGES } from "@/assets/assetsData";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  price: number | null;
  packageImage?: any; // fallback to IMAGES.riderBikePizza
};

export default function RiderSearchModal({
  visible,
  onClose,
  price,
  packageImage,
}: Props) {
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    if (visible) {
      setSearching(true);
      const timer = setTimeout(() => setSearching(false), 4000); // simulate search
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View className="flex-1 bg-neutral-900">
        {/* Header with Close Button */}
        <View className="flex-row justify-between items-center pt-12 pb-4 px-6">
          <Text className="text-white text-2xl font-bold">
            {searching ? "Finding Rider" : "Rider Found!"}
          </Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <Text className="text-gray-400 text-2xl">✕</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 px-6 pb-8">
          {searching ? (
            <View className="flex-1 justify-center items-center">
              {/* Package Section */}
              <View className="bg-neutral-800 rounded-3xl w-full p-6 mb-8">
                <Text className="text-white text-lg font-semibold mb-4 text-center">
                  Your Package
                </Text>
                <Image
                  source={packageImage || IMAGES.riderBikePizza}
                  className="w-40 h-40 rounded-2xl self-center mb-4"
                  resizeMode="cover"
                />
                {price && (
                  <Text className="text-orange-500 text-2xl font-bold text-center">
                    ₦{price}
                  </Text>
                )}
              </View>

              {/* Loading Section */}
              <View className="items-center">
                <ActivityIndicator size="large" color="#F97316" />
                <Text className="text-gray-400 mt-4 text-center text-base">
                  Connecting you with nearby riders...
                </Text>
                <Text className="text-gray-500 mt-2 text-center text-sm">
                  This usually takes less than a minute
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-1">
              {/* Success Header */}
              <View className="bg-green-600/20 rounded-2xl p-4 mb-6 border border-green-600/30">
                <Text className="text-green-400 text-center text-lg font-bold">
                  🎉 Rider Assigned Successfully!
                </Text>
              </View>

              {/* Package & Rider Combined View */}
              <View className="bg-neutral-800 rounded-3xl p-6 mb-6">
                {/* Package Info */}
                <View className="mb-6">
                  <Text className="text-white text-lg font-semibold mb-3">
                    Your Package
                  </Text>
                  <View className="flex-row items-center">
                    <Image
                      source={packageImage || IMAGES.riderBikePizza}
                      className="w-20 h-20 rounded-xl mr-4"
                      resizeMode="cover"
                    />
                    <View className="flex-1">
                      {price && (
                        <Text className="text-orange-500 text-xl font-bold">
                          ₦{price}
                        </Text>
                      )}
                      <Text className="text-gray-400 text-sm mt-1">
                        Ready for pickup
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Divider */}
                <View className="h-px bg-gray-600 mb-6" />

                {/* Rider Info */}
                <View>
                  <Text className="text-white text-lg font-semibold mb-3">
                    Your Rider
                  </Text>
                  <View className="flex-row items-center">
                    <Image
                      source={IMAGES.map_rider}
                      className="w-16 h-16 rounded-full mr-4"
                      resizeMode="contain"
                    />
                    <View className="flex-1">
                      <Text className="text-white text-lg font-semibold">
                        John Doe
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        ⭐ 4.8 rating • 1,250+ deliveries
                      </Text>
                      <Text className="text-green-400 text-sm mt-1">
                        🚴‍♂️ Arriving in 5 minutes
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="space-y-3 mt-auto mb-8">
                <TouchableOpacity className="bg-orange-500 w-full py-4 rounded-2xl">
                  <Text className="text-white font-bold text-lg text-center">
                    Track Rider
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onClose}
                  className="bg-neutral-700 w-full py-4 rounded-2xl"
                >
                  <Text className="text-white font-semibold text-lg text-center">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
