import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navegar, fotoUri }) {
  return (
    <ImageBackground source={require('../assets/images/fundo1.png')} style={styles.background}>
  <View style={styles.overlay}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>BEM VINDO(A)</Text>
      <Text style={styles.subtitulo}>Aprenda e se divirta com o appEduc!!!</Text>

      <TouchableOpacity style={styles.botaoJogar} onPress={() => navegar("Jogo")}>
        <Text style={styles.textoBotao}>🎮 JOGAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoInstrucoes} onPress={() => navegar("Instrucoes")}>
        <Text style={styles.textoBotao}>📘 INSTRUÇÕES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoFoto} onPress={() => navegar("CameraScreen")}>
        <Ionicons name="camera-outline" size={22} color="#000" />
        <Text style={styles.textoFoto}>TIRE UMA FOTO SUA</Text>
      </TouchableOpacity>

      {fotoUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>📷 Sua última foto:</Text>
          <Image source={{ uri: fotoUri }} style={styles.previewImage} />
        </View>
      )}
    </ScrollView>
    </View>
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // garante que a imagem cubra toda a tela
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // escurece a imagem para destacar textos
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff", // melhor contraste com fundo
    marginBottom: 40,
    textAlign: "center",
  },
  botaoJogar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 5,
  },
  botaoInstrucoes: {
    backgroundColor: "#8D84B8",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 5,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  botaoFoto: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 4,
    marginTop: 10,
  },
  textoFoto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 8,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
