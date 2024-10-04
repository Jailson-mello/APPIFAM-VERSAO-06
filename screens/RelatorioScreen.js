import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../src/Firebase.config';

const RelatorioScreen = () => {
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [totalComentarios, setTotalComentarios] = useState(0);
  const [sugestoesContagem, setSugestoesContagem] = useState({
    Atendimento: 0,
    'Qualidade da Comida': 0,
    'Variedade do Cardápio': 0,
  });
  
  const [estrelasContagem, setEstrelasContagem] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  // Função para buscar os dados
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'avaliacoes'));
    const allDados = querySnapshot.docs.map((doc) => doc.data());

    // Atualizando contagem total de avaliações e comentários
    setTotalAvaliacoes(allDados.length);
    setTotalComentarios(allDados.filter(item => item.comment).length);

    const updatedSugestoes = {
      Atendimento: 0,
      'Qualidade da Comida': 0,
      'Variedade do Cardápio': 0,
    };

    const updatedEstrelas = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    allDados.forEach((item) => {
      // Atualizando contagem de estrelas
      if (item.rating) {
        updatedEstrelas[item.rating]++;
      }

      // Atualizando contagem de sugestões
      if (item.suggestions.Atendimento) updatedSugestoes.Atendimento++;
      if (item.suggestions['Qualidade da Comida']) updatedSugestoes['Qualidade da Comida']++;
      if (item.suggestions['Variedade do Cardápio']) updatedSugestoes['Variedade do Cardápio']++;
    });

    setSugestoesContagem(updatedSugestoes);
    setEstrelasContagem(updatedEstrelas);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: ['5 Estrelas', '4 Estrelas', '3 Estrelas', '2 Estrelas', '1 Estrela'],
    datasets: [
      {
        data: [
          estrelasContagem[5],
          estrelasContagem[4],
          estrelasContagem[3],
          estrelasContagem[2],
          estrelasContagem[1],
        ],
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Resumo do Relatório</Text>
        {/* Ícone de Refresh */}
        <TouchableOpacity onPress={fetchData}>
          <Icon name="refresh" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Total de Avaliações:</Text>
        <Text style={styles.value}>{totalAvaliacoes}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Total de Comentários:</Text>
        <Text style={styles.value}>{totalComentarios}</Text>
      </View>

      <Text style={styles.chartTitle}>Avaliações por Estrelas</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#1E2923',
          backgroundGradientFrom: '#08130D',
          backgroundGradientTo: '#08130D',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`, // Cor da barra (amarelo)
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={styles.chart}
        verticalLabelRotation={30}
      />
      
      {Object.entries(sugestoesContagem).map(([key, value]) => (
        <View key={key} style={styles.section}>
          <Text style={styles.label}>{key}:</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
});

export default RelatorioScreen;
