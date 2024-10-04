import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function Carteira() {
  const [saldo, setSaldo] = useState(150.00); // Exemplo de saldo
  const [historico, setHistorico] = useState([
    { id: '1', descricao: 'Almoço na Cantina', valor: -20.00 },
    { id: '2', descricao: 'Adição de saldo', valor: 50.00 },
    { id: '3', descricao: 'Café na Lanchonete', valor: -10.00 },
  ]);

  const adicionarSaldo = () => {
    // Função para adicionar saldo
    alert("Esta tela ainda está sendo implementada. Por favor, aguarde novas atualizações.");
  };

  const renderItem = ({ item }) => (
    <View style={styles.historicoItem}>
      <Text style={styles.historicoDescricao}>{item.descricao}</Text>
      <Text style={[styles.historicoValor, item.valor < 0 ? styles.valorSaida : styles.valorEntrada]}>
        {item.valor < 0 ? '-' : '+'} R$ {Math.abs(item.valor).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Saldo */}
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoTitulo}>Saldo Atual</Text>
        <Text style={styles.saldoValor}>R$ {saldo.toFixed(2)}</Text>
      </View>

      {/* Botão Adicionar Saldo */}
      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarSaldo}>
        <Text style={styles.botaoTexto}>Adicionar Saldo</Text>
      </TouchableOpacity>

      {/* Histórico de Transações */}
      <Text style={styles.historicoTitulo}>Histórico de Transações</Text>
      <FlatList
        data={historico}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.historicoLista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  saldoContainer: {
    backgroundColor: '#40E0D0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  saldoTitulo: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  saldoValor: {
    fontSize: 32,
    color: '#fff',
    marginTop: 10,
  },
  botaoAdicionar: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historicoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historicoLista: {
    maxHeight: 300,
  },
  historicoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  historicoDescricao: {
    fontSize: 16,
  },
  historicoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valorSaida: {
    color: 'red',
  },
  valorEntrada: {
    color: 'green',
  },
});
