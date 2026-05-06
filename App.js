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
  
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
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
});
