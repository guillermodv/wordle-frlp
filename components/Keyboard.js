import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '←', 'OK'],
];

const screenWidth = Dimensions.get('window').width;

export default function Keyboard({ onKeyPress }) {
  return (
    <View style={styles.keyboard}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    width: screenWidth - 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 6,
  },
  key: {
    backgroundColor: '#818384',
    margin: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
