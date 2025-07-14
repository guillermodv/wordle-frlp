import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function HelpScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Cómo Jugar</ThemedText>
      <View style={styles.rulesContainer}>
        <ThemedText style={styles.ruleText}>- Adivina la palabra oculta en seis intentos.</ThemedText>
        <ThemedText style={styles.ruleText}>- Cada intento debe ser una palabra válida de 5 letras.</ThemedText>
        <ThemedText style={styles.ruleText}>- Después de cada intento, el color de las fichas cambiará para mostrar qué tan cerca estuviste de la palabra.</ThemedText>
        <ThemedText style={styles.ruleText}><ThemedText style={styles.green}>Verde:</ThemedText> La letra está en la palabra y en la posición correcta.</ThemedText>
        <ThemedText style={styles.ruleText}><ThemedText style={styles.yellow}>Amarillo:</ThemedText> La letra está en la palabra pero en la posición incorrecta.</ThemedText>
        <ThemedText style={styles.ruleText}><ThemedText style={styles.gray}>Gris:</ThemedText> La letra no está en la palabra.</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop  : 40,
    alignItems: 'center',
  },
  rulesContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  ruleText: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  green: {
    fontWeight: 'bold',
    color: '#6AAA64',
  },
  yellow: {
    fontWeight: 'bold',
    color: '#C9B458',
  },
  gray: {
    fontWeight: 'bold',
    color: '#787C7E',
  },
});
