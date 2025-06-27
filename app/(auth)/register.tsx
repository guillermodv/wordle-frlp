import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, ingresa usuario y contraseña.');
      return;
    }

    const success = await register(username, password);
    if (success) {
      Alert.alert('Registro Exitoso', 'Usuario registrado correctamente.');
      router.replace('/login'); // Redirect to login after successful registration
    } else {
      Alert.alert('Error', 'El usuario ya existe o hubo un error en el registro.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Volver al Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 75,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#3a3f47',
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#61dafb',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#555',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
