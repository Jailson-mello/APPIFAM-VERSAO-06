import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MeusAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newMeal, setNewMeal] = useState('');

  const handleAddAgendamento = () => {
    if (!newDate || !newTime || !newMeal) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newAgendamento = {
      id: String(agendamentos.length + 1),
      date: newDate,
      time: newTime,
      meal: newMeal,
      status: 'Pendente',
    };

    setAgendamentos([...agendamentos, newAgendamento]);
    setNewDate('');
    setNewTime('');
    setNewMeal('');
  };

  const handleCancel = (id) => {
    Alert.alert('Cancelar Agendamento', 'Você tem certeza que deseja cancelar este agendamento?', [
      { text: 'Cancelar' },
      { text: 'Confirmar', onPress: () => setAgendamentos(agendamentos.filter(a => a.id !== id)) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.agendamentoContainer}>
      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="calendar" size={24} color="#4CAF50" />
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time} - {item.meal}</Text>
          <Text style={styles.statusText(item.status)}>{item.status}</Text>
        </View>
      </View>
      {item.status !== 'Cancelado' && (
        <TouchableOpacity onPress={() => handleCancel(item.id)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      
      <Text style={styles.subtitle}>Adicionar Novo Agendamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Data (AAAA-MM-DD)"
        value={newDate}
        onChangeText={setNewDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={newTime}
        onChangeText={setNewTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Refeição"
        value={newMeal}
        onChangeText={setNewMeal}
      />
      <TouchableOpacity onPress={handleAddAgendamento} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  agendamentoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  statusText: (status) => ({
    fontSize: 14,
    color: status === 'Cancelado' ? 'red' : (status === 'Pendente' ? 'orange' : 'green'),
  }),
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MeusAgendamentos;
