import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';

export default function Extrato() {
  // Mock dos dados do extrato
  const [transactions] = useState([
    { id: 1, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 2, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 3, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 4, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 5, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 6, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 7, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 8, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
    { id: 9, date: '13/03/2024', meal: 'Transferência', value: -1.20, type: 'Débito', details: 'Transferência' },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const renderTransaction = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedTransaction(item)}
        style={[styles.transactionItem, item.type === 'Crédito' ? styles.credit : styles.debit]}
      >
        <View style={styles.transactionRow}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionMeal}>{item.meal}</Text>
        </View>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionValue}>
            {item.type === 'Crédito' ? '+' : '-'} R$ {Math.abs(item.value).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Extrato dos últimos 15 dias</Text>


      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Saldo anterior:</Text>
        <Text style={styles.balanceValue}>R$ 15,00</Text>
        <View style={styles.divider} />
        <Text style={styles.balanceText}>Saldo atual:</Text>
        <Text style={styles.balanceValue}>R$ 12,00</Text>
      </View>

      <Text style={styles.subtitle}>Últimas transações</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListEmptyComponent={<Text style={styles.noTransactions}>Nenhuma transação encontrada</Text>}
      />


      <Modal
        visible={selectedTransaction !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedTransaction && (
              <>
                <Text style={styles.modalTitle}>Detalhes da Transação</Text>
                <Text style={styles.modalDetail}>Data: {selectedTransaction.date}</Text>
                <Text style={styles.modalDetail}>Refeição: {selectedTransaction.meal}</Text>
                <Text style={styles.modalDetail}>
                  Valor: {selectedTransaction.type === 'Crédito' ? '+' : '-'} R$ {Math.abs(selectedTransaction.value).toFixed(2)}
                </Text>
                <Text style={styles.modalDetail}>Detalhes: {selectedTransaction.details}</Text>
                
                
                <TouchableOpacity style={styles.modalButton} onPress={() => setSelectedTransaction(null)}>
                <Text style={styles.modalButtonText}  onPress={() => setSelectedTransaction(null)} >Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
    marginLeft: 10,
  },
  balanceContainer: {
    padding: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginVertical: 8,
  },
  balanceText: {
    fontSize: 18,
    color: '#333',
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  transactionItem: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
  },
  credit: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  debit: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionMeal: {
    fontSize: 14,
    color: '#555',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noTransactions: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    marginBottom: 5,
  },

  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },

});


