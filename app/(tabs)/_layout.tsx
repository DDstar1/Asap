import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { MY_ICONS } from "@/assets/assetsData";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => MY_ICONS.home(color),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => MY_ICONS.activity(color),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => MY_ICONS.account(color),
        }}
      />
    </Tabs>
  );
}
