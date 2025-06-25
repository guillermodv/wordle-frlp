import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const WORD = 'PERRO'; // Palabra a adivinar (puedes cambiarla)

const rows = 6;
const cols = 5;

export default function App() {
  const [grid, setGrid] = useState(Array(rows).fill('').map(() => Array(cols).fill('')));
  const [colors, setColors] = useState(Array(rows).fill('').map(() => Array(cols).fill('gray')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  interface GridType extends Array<string[]> {}
  interface ColorsType extends Array<string[]> {}

  const handleKeyPress = (key: string): void => {
    if (gameOver) return;

    if (key === '←') {
      if (currentCol > 0) {
        const newGrid: GridType = [...grid];
        newGrid[currentRow][currentCol - 1] = '';
        setGrid(newGrid);
        setCurrentCol(currentCol - 1);
      }
    } else if (key === 'OK') {
      if (currentCol === cols) {
        const guess: string = grid[currentRow].join('');
        const newColors: ColorsType = [...colors];
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
          Alert.alert('¡Ganaste!', 'Adivinaste la palabra');
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
        const newGrid: GridType = [...grid];
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
      <Text style={styles.title}>Wordle Frlp</Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
    alignItems: 'center',
    paddingTop: 50,
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
    margin: 20,
    width: '50%',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  key: {
    backgroundColor: '#818384',
    margin: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  keyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});
