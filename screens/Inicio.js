
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation(); // Obtendo o objeto de navegação

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo ao App Restaurante Institucional!</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cardapio')}>
        <Text style={styles.buttonText}>Cardápio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('e-Carteira')}>
        <Text style={styles.buttonText}>Carteira RI</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExtratoRI')}>
        <Text style={styles.buttonText}>Créditos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Avaliação')}>
        <Text style={styles.buttonText}>Avaliação</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#40E0D0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});





