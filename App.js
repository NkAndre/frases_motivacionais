import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Image, Animated, Share } from "react-native";

const frases = [
  { texto: "Porque para Deus nada é impossível", categoria: "fé" },
  { texto: "Nunca desista dos seus sonhos", categoria: "motivacao" },
  { texto: "Sempre haverá uma nova chance", categoria: "motivacao" },
  { texto: "Acredite em si próprio", categoria: "motivacao" },
  { texto: "Sorrir é o melhor remédio", categoria: "engracada" },
];

const temasCategoria = {
  fé: "#FFD700",       // Dourado
  motivacao: "#ADD8E6", // Azul
  engracada: "#90EE90", // Verde
};

export default function App() {
  const [frase, setFrase] = useState(frases[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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

  // --- LÓGICA DE CORES 
  const corFundoFundo = isDarkMode ? "#121212" : temasCategoria[frase.categoria];
  const corTexto = isDarkMode ? "#FFF" : "#333";
  const corCard = isDarkMode ? "#1E1E1E" : "#FFF";
  const corAspas = isDarkMode ? "#555" : "#ADD8E6"; // Aspas visíveis nos dois modos

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
   
    <View style={[styles.container, { backgroundColor: corFundoFundo }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <Pressable onPress={toggleDarkMode} style={styles.botaoDark}>
        <Text style={{ fontSize: 30 }}>{isDarkMode ? "☀️" : "🌙"}</Text>
      </Pressable>

      <View style={styles.cardImage}>
        <Image 
          source={require('./assets/pensar.png')} 
          style={[styles.logo, isDarkMode && { tintColor: '#FFF' }]} 
        />
      </View>

      <Text style={[styles.textTitulo, { color: corTexto }]}>frases do dia</Text>

 
      <Animated.View style={[styles.card, { opacity: fadeAnim, backgroundColor: corCard }]}>
        <Text style={[styles.aspas, { color: corAspas }]}>“</Text>
        <Text style={[styles.textoFrase, { color: corTexto }]}>{frase.texto}</Text>
        <Text style={[styles.aspas, { textAlign: 'right', color: corAspas }]}>”</Text>
      </Animated.View>

      <View style={styles.areaBotoes}>
        <Pressable
          style={({ pressed }) => [
            styles.botao, 
            { backgroundColor: isDarkMode ? "#333" : "#FFF" },  
            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
          ]}
          onPress={gerarFrase}
        >
          <Text style={[styles.textoBotao, { color: isDarkMode ? "#FFF" : "#000" }]}>Nova Frase</Text>
        </Pressable>

        <Pressable style={styles.botaoShare} onPress={compartilharFrase}>
          <Text style={[styles.textoBotaoShare, { color: corTexto }]}>Compartilhar Frase</Text>
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
  botaoDark: {
    alignSelf: 'flex-end',
    marginBottom: 10,
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
    textTransform: 'lowercase'
  },
  card: {
    padding: 30,
    borderRadius: 25,
    width: "100%",
    minHeight: 180,
    justifyContent: 'center',
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
  },
  textoFrase: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  areaBotoes: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center'
  },
  botao: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoShare: {
    padding: 10,
  },
  textoBotaoShare: {
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});