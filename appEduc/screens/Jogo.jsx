import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import materiasData from '../assets/materias.json';

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const normalizar = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').toUpperCase();
};

export default function Jogo({ navegar }) {
  const [materiaAtual, setMateriaAtual] = useState('');
  const [palavra, setPalavra] = useState('');
  const [palavraDisplay, setPalavraDisplay] = useState('');
  const [palavraNormalizada, setPalavraNormalizada] = useState('');
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  useEffect(() => {
    novoJogo();
  }, []);

  const novoJogo = () => {
    const materias = Object.keys(materiasData.materias);
    const materiaSorteada = materias[Math.floor(Math.random() * materias.length)];
    const palavras = materiasData.materias[materiaSorteada];
    const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];

    setMateriaAtual(materiaSorteada);
    setPalavra(palavraSorteada);
    setPalavraNormalizada(normalizar(palavraSorteada));
    setPalavraDisplay('_ '.repeat(palavraSorteada.length));
    setLetrasErradas([]);
    setLetrasCorretas([]);
    setFimDeJogo(false);
  };

  const verificarLetra = (letra) => {
    if (fimDeJogo) return;

    if (palavraNormalizada.includes(letra)) {
      const novasLetrasCorretas = [...letrasCorretas, letra];
      setLetrasCorretas(novasLetrasCorretas);

      let novoDisplay = '';
      for (let i = 0; i < palavra.length; i++) {
        const charNormalizado = normalizar(palavra[i]);
        novoDisplay += novasLetrasCorretas.includes(charNormalizado) ? palavra[i] + ' ' : '_ ';
      }
      setPalavraDisplay(novoDisplay);

      if (!novoDisplay.includes('_')) {
        setFimDeJogo(true);
        alert('🎉 Parabéns! Você venceu!');
      }
    } else {
      const novasLetrasErradas = [...letrasErradas, letra];
      setLetrasErradas(novasLetrasErradas);

      if (novasLetrasErradas.length >= 6) {
        setFimDeJogo(true);
        setPalavraDisplay(palavra.split('').join(' '));
        alert('❌ Você perdeu! A palavra era: ${palavra}');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Título */}
        <Text style={styles.titulo}>Forca Educativa</Text>

        {/* Matéria e palavra com imagem à esquerda */}
        <View style={styles.materiaContainer}>
          <Image source={require('../assets/images/Forca.png')} style={styles.imagemForca} />
          <View style={styles.textosContainer}>
            <Text style={styles.materia}>Matéria: {materiaAtual}</Text>
            <Text style={styles.palavra}>{palavraDisplay}</Text>
          </View>
        </View>

        <Text style={styles.erros}>Erros: {letrasErradas.join(', ')}</Text>

        {/* Teclado */}
        <View style={styles.tecladoContainer}>
          {ALFABETO.map((letra) => (
            <TouchableOpacity
              key={letra}
              style={[
                styles.letraBtn,
                letrasCorretas.includes(letra) || letrasErradas.includes(letra) ? styles.letraUsada : null
              ]}
              onPress={() => verificarLetra(letra)}
              disabled={letrasCorretas.includes(letra) || letrasErradas.includes(letra)}
            >
              <Text style={styles.letra}>{letra}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botões */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botao} onPress={novoJogo}>
            <Text style={styles.botaoTexto}>🎮 Jogar Novamente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, styles.botaoVoltar]} onPress={() => navegar('Home')}>
            <Text style={styles.botaoTexto}>🏠 Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#e0f7fa', padding:20 },

  titulo: { fontSize:32, fontWeight:'bold', marginBottom:20, color:'#006064', textAlign:'center' },

  materiaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imagemForca: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  textosContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  materia: { fontSize:22, fontWeight:'bold', color:'#004d40', marginBottom:5 },
  palavra: { fontSize:32, letterSpacing:10, color:'#00796b', textAlign:'left' },
  erros: { fontSize:16, color:'#d32f2f', marginBottom:20, textAlign:'center' },

  tecladoContainer: { 
    flexDirection:'row', 
    flexWrap:'wrap', 
    justifyContent:'center', 
    marginBottom:30, 
    backgroundColor:'#b2ebf2', 
    padding:10, 
    borderRadius:10,
    width:'100%',
  },
  letraBtn: { 
    backgroundColor:'#00bcd4', 
    paddingVertical:10, 
    paddingHorizontal:8, 
    margin:4, 
    borderRadius:8, 
    minWidth:30, 
    alignItems:'center',
  },
  letraUsada: { backgroundColor:'#80deea' },
  letra: { fontSize:16, fontWeight:'bold', color:'#fff' },

  botoesContainer: { flexDirection:'row', marginTop:20, flexWrap:'wrap', justifyContent:'center' },
  botao: { 
    backgroundColor:'#00796b', 
    paddingVertical:12, 
    paddingHorizontal:15, 
    borderRadius:25, 
    margin:5 
  },
  botaoVoltar: { backgroundColor:'#004d40' },
  botaoTexto: { color:'#fff', fontSize:16, fontWeight:'bold', textAlign:'center' }
});