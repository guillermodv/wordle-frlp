import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useScore } from '../../context/ScoreContext';

export default function LeaderboardScreen() {
  const { scores, loadScores } = useScore();
  const router = useRouter();

  useEffect(() => {
    loadScores();
  }, []);

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Máximos Jugadores</Text>
      </View>
      <FlatList
        data={sortedScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.scoreRank}>#{index + 1}</Text>
            <Text style={styles.scoreText}>{item.username}: {item.score} puntos</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay puntuaciones aún.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    backgroundColor: '#555',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#282c34',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#61dafb',
  },
  scoreText: {
    fontSize: 18,
    color: 'white',
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});
