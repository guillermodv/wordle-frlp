import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useScore } from '../../context/ScoreContext';

const WORD = 'PERRO'; // Palabra a adivinar (puedes cambiarla)

const rows = 6;
const cols = 5;

export default function App() {
  const [grid, setGrid] = useState(Array(rows).fill('').map(() => Array(cols).fill('')));
  const [colors, setColors] = useState(Array(rows).fill('').map(() => Array(cols).fill('gray')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const { user, logout } = useAuth();
  const { addScore } = useScore();
  const router = useRouter();

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === '←') {
      if (currentCol > 0) {
        const newGrid = [...grid];
        newGrid[currentRow][currentCol - 1] = '';
        setGrid(newGrid);
        setCurrentCol(currentCol - 1);
      }
    } else if (key === 'OK') {
      if (currentCol === cols) {
        const guess = grid[currentRow].join('');
        const newColors = [...colors];
        for (let i = 0; i < cols; i++) {
          if (guess[i] === WORD[i]) {
            newColors[currentRow][i] = 'green';
          } else if (WORD.includes(guess[i])) {
            newColors[currentRow][i] = 'gold';
          } else {
            newColors[currentRow][i] = 'darkgray';
          }
        }
        setColors(newColors);
        if (guess === WORD) {
          const score = (rows - currentRow) * 100; // Score based on remaining rows
          Alert.alert('¡Ganaste!', `Adivinaste la palabra en ${currentRow + 1} intentos! Puntos: ${score}`);
          if (user) {
            addScore(user.username, score);
          }
          setGameOver(true);
        } else if (currentRow === rows - 1) {
          Alert.alert('Perdiste', `La palabra era ${WORD}`);
          setGameOver(true);
        } else {
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
        }
      }
    } else {
      if (currentCol < cols) {
        const newGrid = [...grid];
        newGrid[currentRow][currentCol] = key;
        setGrid(newGrid);
        setCurrentCol(currentCol + 1);
      }
    }
  };

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '←', 'OK'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          {user && <Text style={styles.usernameText}>Hola, {user.username}!</Text>}
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Salir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaderboardButton} onPress={() => router.push('/(tabs)/leaderboard')}>
            <Text style={styles.leaderboardButtonText}>Best</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Wordle Clone</Text>

        <View style={styles.grid}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((letter, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.cell, { backgroundColor: colors[rowIndex][colIndex] }]}
                >
                  <Text style={styles.cellText}>{letter}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.keyboard}>
          {keyboard.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.key}
                  onPress={() => handleKeyPress(key)}
                >
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
    alignItems: 'center',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  usernameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: '#74dada',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 40,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  leaderboardButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  leaderboardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  grid: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderColor: '#3a3a3c',
    borderWidth: 2,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  keyboard: {
    marginTop: 10,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
  },
  key: {
    backgroundColor: '#818384',
    margin: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  keyText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
