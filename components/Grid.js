import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Grid({ grid, colors }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
