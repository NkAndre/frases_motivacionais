import { StatusBar } from "expo-status-bar";

import React, { useState, useRef } from "react"; 
import { StyleSheet, Text, View, Pressable, Image, Animated, Share } from "react-native";

const frases = [
  "Porque para Deus nada é impossível",
  "Nunca desista dos seus sonhos",
  "Sempre haverá uma nova chance",
  "Acredite em si próprio",
  "Seja forte e corajoso",
];

export default function App() {
  const [frase, setFrase] = useState(frases[0]);
  
  // Agora o useRef está importado corretamente!
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const gerarFrase = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      const indiceAleatorio = Math.floor(Math.random() * frases.length);
      setFrase(frases[indiceAleatorio]);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };

  const compartilharFrase = async () => {
    try {
      await Share.share({
        message: `"${frase}" - Frases do Dia`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardImage}>
        <Image source={require('./assets/pensar.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
      </View>
      
      <Text style={styles.textTitulo}>frases do dia</Text>

      <Animated.View style={[styles.card, 
        { opacity: fadeAnim }]}>
        <Text style={styles.aspas}>“</Text>
        <Text style={styles.textoFrase}>{frase}</Text>
        <Text style={[styles.aspas, { textAlign: 'right' }]}>”</Text>
      </Animated.View>

      <View style={styles.areaBotoes}>
        <Pressable 
          style={({ pressed }) => [styles.botao, pressed && { opacity: 0.7, transform: [{scale: 0.98}] }]} 
          onPress={gerarFrase}
        >
          <Text style={styles.textoBotao}>Nova Frase</Text>
        </Pressable>

        <Pressable style={styles.botaoShare} onPress={compartilharFrase}>
          <Text style={styles.textoBotaoShare}>Compartilhar Frase</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 80,
  },
  cardImage: {
    marginBottom: 10,
    alignItems: "center",
  },
  textTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textTransform: 'lowercase'
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 25,
    width: "100%",
    minHeight: 150,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  aspas: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ADD8E6',
    marginTop: -20,
    marginBottom: -10,
  },
  textoFrase: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontStyle: 'italic',
    color: '#444',
    paddingHorizontal: 10,
  },
  areaBotoes: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center'
  },
  botao: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoShare: {
    padding: 10,
  },
  textoBotaoShare: {
    color: '#333',
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});