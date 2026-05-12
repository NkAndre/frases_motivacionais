import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Image, Animated, Share } from "react-native";

const frases = [
  { texto: "Porque para Deus nada é impossível", categoria: "fé" },
  { texto: "Josué 1:9", categoria: "fé" },
  { texto: "Nunca desista dos seus sonhos", categoria: "motivacao" },
  { texto: "Sempre haverá uma nova chance", categoria: "motivacao" },
  { texto: "Acredite em si próprio", categoria: "motivacao" },
  { texto: "Sorrir é o melhor remédio", categoria: "engracada" },
  { texto: "Minha cama me chama mais do que qualquer pessoa", categoria: "engracada" },
  {texto: "Essa semana eu tô dando orgulho! Orgulho pra clínica psiquiátrica", categoria: "engracada"},
  {texto:"Tenho medo de perguntar pra Deus onde eu errei e Ele não parar de falar…", categoria:"engracada"}
];

const temasCategoria = {
  fé: "#FFD700",
  motivacao: "#ADD8E6",
  engracada: "#90EE90",
};

export default function App() {
  const [frase, setFrase] = useState(frases[0]);
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
        message: `Olha essa frase que vi no app: \n\n"${frase.texto}"`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: temasCategoria[frase.categoria] }]}>
      <StatusBar style="dark" />

      <View style={styles.cardImage}>
        <Image
          source={require('./assets/pensar.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.textTitulo}>frases do dia</Text>

      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.aspas}>"</Text>
        <Text style={styles.textoFrase}>{frase.texto}</Text>
        <Text style={[styles.aspas, { textAlign: 'right' }]}>"</Text>
      </Animated.View>

      <View style={styles.areaBotoes}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
          ]}
          onPress={gerarFrase}
        >
          <Text style={styles.textoBotao}>Nova Frase</Text>
        </Pressable>

        <Pressable style={styles.botaoShare} onPress={compartilharFrase}>
          <Text style={styles.textoBotaoShare}>Compartilhar Frase</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
  },
  cardImage: {
    marginBottom: 10,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  textTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: 'lowercase',
    color: "#333333",
  },
  card: {
    padding: 30,
    borderRadius: 25,
    width: "100%",
    minHeight: 180,
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  aspas: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: -20,
    marginBottom: -10,
    color: "#ADD8E6",
  },
  textoFrase: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    fontStyle: 'italic',
    paddingHorizontal: 10,
    color: "#333333",
  },
  areaBotoes: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  botao: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#000000",
  },
  botaoShare: {
    padding: 10,
  },
  textoBotaoShare: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: "#333333",
  },
});