import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import GenericModal from '../../components/GenericModal';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setModalTitle('Error');
      setModalMessage('Por favor, ingresa usuario y contraseña.');
      setModalVisible(true);
      return;
    }

    const success = await login(username, password);
    if (success) {
      router.replace('/'); // Redirect to home after successful login
    } else {
      setModalTitle('Error');
      setModalMessage('Credenciales inválidas.');
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>¡Bienvenido!</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <GenericModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34', // Dark background for a modern look
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 75, // Make it circular
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#61dafb', // React blue for a techy feel
    marginBottom: 30,
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#3a3f47', // Slightly lighter dark for input fields
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#61dafb', // React blue for the button
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
  registerButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#8beb8f',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    opacity: 0.9,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
