import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Instrucoes({ navegar }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📘 INSTRUÇÕES</Text>

      {/* Caixa semi-transparente */}
      <View style={styles.caixa}>
        <Text style={styles.texto}>
          1. Escolha uma matéria e uma palavra será sorteada.{"\n"}
          2. A palavra aparece com letras ocultas (_).{"\n"}
          3. Clique nas letras para tentar adivinhar a palavra.{"\n"}
          4. A cada erro, a forca será desenhada.{"\n"}
          5. Você perde se errar todas as tentativas.{"\n"}
          6. Ao acertar a palavra ou terminar o jogo, clique em "Jogar Novamente" para continuar.
        </Text>
      </View>

      {/* Botão estilizado */}
      <TouchableOpacity style={styles.botao} onPress={() => navegar('Home')}>
        <Text style={styles.botaoTexto}>VOLTAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#63ADED',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F7039',
  },
  caixa: {
    backgroundColor: 'rgba(21, 20, 64, 0.1)', // fundo semi-transparente
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
  },
  texto: {
    fontSize: 16,
    lineHeight: 26,
    color: '#ffff',
  },
  botao: {
    backgroundColor: '#4CAF50', // verde bonito
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30, // botão bem arredondado
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});