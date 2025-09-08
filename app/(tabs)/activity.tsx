import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IMAGES, MY_ICONS } from "@/assets/assetsData";

const OrdersPage = () => {
  const orders = [
    {
      id: "TRK-1A9X-74KD",
      date: "23-05-2025",
      time: "9:28pm",
      location: "Sapele Rd Benin",
      category: "Food",
      distance: "17km",
      direction: "right",
    },
    {
      id: "TRK-1A9X-74KD",
      date: "23-05-2025",
      time: "9:28pm",
      location: "Sapele Rd Benin",
      category: "Gadgets",
      distance: "17km",
      direction: "left",
    },
    {
      id: "TRK-1A9X-74KD",
      date: "23-05-2025",
      time: "9:28pm",
      location: "Sapele Rd Benin",
      category: "Fabric",
      distance: "17km",
      direction: "right",
    },
    {
      id: "TRK-1A9X-74KD",
      date: "23-05-2025",
      time: "9:28pm",
      location: "Sapele Rd Benin",
      category: "Food",
      distance: "17km",
      direction: "left",
    },
    {
      id: "TRK-1A9X-74KD",
      date: "23-05-2025",
      time: "9:28pm",
      location: "Sapele Rd Benin",
      category: "Documents",
      distance: "17km",
      direction: "right",
    },
  ];

  const DirectionArrows = ({ direction }: { direction: string }) => (
    <View className="flex-row items-center">
      {direction === "right" ? (
        <>
          {MY_ICONS.arrowRight("#fed7aa", 20)}
          {MY_ICONS.arrowRight("#fed7aa", 20)}
          {MY_ICONS.arrowRight("#fed7aa", 20)}
        </>
      ) : (
        <>
          {MY_ICONS.arrowLeft("#fca5a5", 20)}
          {MY_ICONS.arrowLeft("#fca5a5", 20)}
          {MY_ICONS.arrowLeft("#fca5a5", 20)}
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-white text-2xl font-semibold">My Orders</Text>
        {MY_ICONS.message("white", 24)}
      </View>
      {/* Current Tracking Card */}
      <View className="bg-[#3C3C43] mx-4 py-4 rounded-2xl flex flex-row  mb-6 overflow-hidden relative">
        <View className="relative pl-5 w-3/5 z-10">
          <Text className="text-white text-lg font-medium mb-2">
            Current Tracking
          </Text>
          <Text className="text-white text-xl font-bold mb-4">
            #TRK-9F2X-7A6B
          </Text>

          <Text className="text-gray-400 text-sm mb-2">Current Location</Text>
          <View className="flex-row items-center mb-4">
            {MY_ICONS.location("#9CA3AF", 16)}
            <Text className="text-white text-base ml-2">Sapele Rd Benin</Text>
          </View>

          <Text className="text-gray-400 text-sm mb-2">Status</Text>
          <View className="flex-row items-center">
            {MY_ICONS.circle("#22c55e", 8)}
            <Text className="text-white text-base ml-3">In Transit</Text>
          </View>
        </View>
        <Image source={IMAGES.dummy_map} className="w-2/5 h-full  " />
      </View>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Month Separator */}
        <Text className="text-gray-400 text-sm mb-4">May 2025</Text>

        {/* Orders List */}
        <View className="space-y-3 mb-6">
          {orders.map((order, index) => (
            <View key={index} className="bg-orange-500 rounded-2xl p-4 mb-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold">
                    {order.id}
                  </Text>
                  <Text className="text-orange-200 text-sm">{order.date}</Text>
                </View>
                <TouchableOpacity className="bg-white rounded-full px-4 py-2">
                  <Text className="text-gray-900 text-sm font-medium">
                    Rebook
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white text-base">{order.location}</Text>
                </View>

                <View className="flex-row items-center space-x-4">
                  <DirectionArrows direction={order.direction} />

                  <View className="items-end">
                    <Text className="text-orange-200 text-sm">
                      {order.time}
                    </Text>
                    <Text className="text-white text-sm font-medium">
                      {order.category}
                    </Text>
                    <Text className="text-orange-200 text-sm">
                      {order.distance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersPage;
