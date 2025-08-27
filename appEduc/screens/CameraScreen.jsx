import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen({ navegar, setFotoUri }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para usar a câmera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionText}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Função para tirar a foto
  const tirarFoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setFotoUri(photo.uri); // salva no App.jsx
      navegar("Home"); // volta para Home
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.controls}>
          {/* Botão de voltar */}
          <TouchableOpacity style={styles.backButton} onPress={() => navegar("Home")}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Botão de captura */}
          <TouchableOpacity style={styles.shutterButton} onPress={tirarFoto}>
            <Ionicons name="camera" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  message: { textAlign: "center", paddingBottom: 10, color: "#000" },
  camera: { flex: 1 },
  controls: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "transparent",
  },
  shutterButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 30,
    position: "absolute",
    top: 40,
    left: 20,
  },
  permissionButton: {
    padding: 15,
    backgroundColor: "#4682B4",
    borderRadius: 10,
    alignSelf: "center",
  },
  permissionText: { color: "#fff", fontWeight: "bold" },
});