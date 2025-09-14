import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function CameraModal({
  visible,
  onClose,
  onConfirm, // 👈 added
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (uri: string) => void; // 👈 added
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return null;
  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-800">
        <TouchableOpacity
          className="px-4 py-2 bg-white rounded"
          onPress={requestPermission}
        >
          <Ionicons name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("📸 Picture taken:", photo.uri);

      onConfirm(photo.uri); // ✅ send photo uri back to parent
      onClose(); // ✅ close modal after confirm
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        <CameraView ref={cameraRef} className="flex-1" facing={facing} />

        <View className="absolute top-12 w-full items-center">
          <Text className="text-white text-lg font-semibold">
            Take a picture of the package
          </Text>
        </View>

        <View className="absolute bottom-8 w-full flex-row justify-around items-center px-6">
          <TouchableOpacity
            className="bg-gray-800 p-3 rounded-full"
            onPress={onClose}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-16 h-16 bg-white rounded-full border-4 border-gray-400"
            onPress={takePicture}
          />

          <TouchableOpacity
            className="bg-gray-800 p-3 rounded-full"
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          >
            <Ionicons name="camera-reverse" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
