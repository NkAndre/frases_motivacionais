import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable,Image } from 'react-native';
import React, { useState } from 'react';

const frases = [ 
  "Porque para Deus nada é impossivel",
  "Nunca desista dos seus sonhos",
  "Sempre haverá uma nova chance",
  "Acredite em si próprio e todo o resto virá naturalmente.",
 
]

export default function App() {
  const [frase, setFrase] = useState(frases[0]) // state atual para controlar as nossas frases

  // função para gerar frases aleatorias
  const gerarFrase = () => {
    const indiceAleatorio = Math.floor(Math.random() * frases.length); 
    setFrase(frases[indiceAleatorio]);
  } 
  return (
    <View style={styles.container}>
      <Text style = {styles.textTitulo}>frases do dia </Text>

      <View style={styles.card}>
        <Text style={styles.textoFrase}>"{frase}"</Text>
      </View>
      <View>
        <Pressable style = {styles.botao} onPress={gerarFrase}>
          <Text style={styles.textoBotao}>Nova Frase</Text>
        </Pressable>
        
        
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  textTitulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#333"
  } , 
  card:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:20,
    marginVertical:20,
    elevation:3,
     width: '100%',
     alignItems:"center",
  }
});
