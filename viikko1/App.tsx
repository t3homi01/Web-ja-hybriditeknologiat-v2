import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App(): JSX.Element {
  const [age, setAge] = useState<string>('');   // käyttäjän syöttämä ikä
  const [lower, setLower] = useState<number>(0); // alaraja
  const [upper, setUpper] = useState<number>(0); // yläraja

  const calculateLimits = (): void => {
    const a = parseInt(age); // vastaus kokonaisluvuksi
    if (isNaN(a)) {
      setLower(0);
      setUpper(0);
    } else {
      const lowerLimit = (220 - a) * 0.65;
      const upperLimit = (220 - a) * 0.85;
      setLower(Math.round(lowerLimit));
      setUpper(Math.round(upperLimit));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sykerajojen laskenta</Text>

      <Text style={styles.label}>Ikä:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Syötä ikä"
        placeholderTextColor="#888"
      />

      <View style={styles.buttonContainer}>
        <Button title="Laske" onPress={calculateLimits} color="#ff1493" />
      </View>

      <Text style={styles.result}>Alaraja: {lower}</Text>
      <Text style={styles.result}>Yläraja: {upper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // tumma teema
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // valkoiset tekstit
    marginBottom: 20,
  },
  label: {
    color: '#fff', 
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: 120,
    borderColor: '#ff1493',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
    padding: 8,
    color: '#fff', 
    fontSize: 18,
  },
  buttonContainer: {
    marginBottom: 20,
    width: 120,
  },
  result: {
    marginTop: 5,
    fontSize: 20,
    color: '#fff', 
  },
});
