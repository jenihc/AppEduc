import React, { useState } from "react";
import { View } from "react-native";

import Home from "./screens/Home";
import Instrucoes from "./screens/Instrucoes";
import Jogo from "./screens/Jogo";
import CameraScreen from "./screens/CameraScreen";

export default function App() {
  const [tela, setTela] = useState("Home");
  const [fotoUri, setFotoUri] = useState(null); // <- guarda a última foto

  const navegar = (nomeTela) => {
    setTela(nomeTela);
  };

  return (
    <View style={{ flex: 1 }}>
      {tela === "Home" && <Home navegar={navegar} fotoUri={fotoUri} />}
      {tela === "Instrucoes" && <Instrucoes navegar={navegar} />}
      {tela === "Jogo" && <Jogo navegar={navegar} />}
      {tela === "Camera" && <CameraScreen navegar={navegar} setFotoUri={setFotoUri} />}
    </View>
  );
}