import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SobreApp() {
  const navigation = useNavigation(); // Certifique-se de usar o hook de navegação

  const handleLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.description}>
        Este aplicativo foi desenvolvido para facilitar sua experiência no Restaurante Institucional IFAM, permitindo
        agendar refeições, consultar cardápios e gerenciar seu saldo de forma prática e eficiente.
      </Text>

      <Text style={styles.subtitle}>Objetivo</Text>
      <Text style={styles.text}>
        O nosso objetivo é proporcionar uma experiência simples e agradável, tornando o acesso às refeições mais
        rápido e organizado.
      </Text>

      <Text style={styles.subtitle}>Funcionalidades</Text>
      <Text style={styles.text}>
        - Agendamento de refeições. {'\n'}
        - Consulta de cardápios. {'\n'}
        - Recarga de saldo. {'\n'}
        - Avaliações e feedback 
      </Text>

      <Text style={styles.subtitle}>Equipe de Desenvolvimento</Text>
      <Text style={styles.text}>
        Desenvolvido por Jailson de Melo Aranha, Nelciane dos Santos Cardoso, Wellington Moraes Paulain/IFAM. Um agradecimento especial a todos que contribuíram para
        o sucesso deste projeto.
      </Text>

      <Text style={styles.subtitle}>Contatos e Suporte</Text>
      <Text style={styles.text}>
        Para suporte, feedback ou sugestões, entre em contato: {'\n'}
        <TouchableOpacity onPress={() => handleLink('mailto:suportriapp@gmail.com')}>
          <Text style={styles.link}>suportriapp@gmail.com</Text>
        </TouchableOpacity>
      </Text>

      <Text style={styles.subtitle}>Política de Privacidade</Text>
      <TouchableOpacity onPress={() => handleLink('https://docs.google.com/document/d/1xst1nJrfFRNeVRgH11WeQ1D08cXzOd_ag7vtD2x5wdY/edit?usp=sharing+')}>
        <Text style={styles.link}>Leia nossa Política de Privacidade</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Agradecimentos</Text>
      <Text style={styles.text}>
        Agradecemos a todos os usuários e colaboradores que tornaram este app possível!
      </Text>

      <Text style={styles.subtitle}>Links Úteis</Text>
      <TouchableOpacity onPress={() => handleLink('http://www2.ifam.edu.br/campus/parintins')}>
        <Text style={styles.link}>Site Oficial</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLink('https://www.instagram.com/ifamparintins.oficial/')}>
        <Text style={styles.link}>Instagram</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLink('https://docs.google.com/document/d/1xst1nJrfFRNeVRgH11WeQ1D08cXzOd_ag7vtD2x5wdY/edit?usp=sharing+')}>
        <Text style={styles.link}>Leia nossa Política de Privacidade</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#34495e',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#34495e',
  },
  link: {
    fontSize: 16,
    color: '#2980b9',
    textDecorationLine: 'underline',
  },
});
