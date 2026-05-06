import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable,Image } from 'react-native';
import React, { useState } from 'react';

const frases = [ 
  "Porque para Deus nada é impossivel",
  "Nunca desista dos seus sonhos",
  "Sempre haverá uma nova chance",
  "Acredite em si próprio e todo o resto virá naturalmente."
]

export default function App() {
  const [frase, setFrase] = useState(frases[1]) // state atual para controlar as nossas frases

  // função para gerar frases aleatorias
  const gerarFrases = () => {
    const indiceAleatorio = Math.floor(Math.random() * frases.length); 
    setFrase(frase[indiceAleatorio]);
  } 
  return (
    <View style={styles.container}>
      <Text style = {styles.textTitulo}>frases do dia </Text>

      <View style={styles.card}>
        <Text style={styles.textoFrase}>"{frase}"</Text>
      </View>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitulo:{
    color:"#000"
  }
});
