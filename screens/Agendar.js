import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-web';

export default function Agendar() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showRestaurantOptions, setShowRestaurantOptions] = useState(false);
  const [tipoRefeicao, setTipoRefeicao] = useState('Almoço');
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const agendarRefeicao = () => {
    if (selectedRestaurant) {
      setModalVisible(true);
    }
  };

  const toggleRestaurantOptions = () => {
    setShowRestaurantOptions(!showRestaurantOptions);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agendar Refeição</Text>

      <View style={styles.restaurantContainer}>
        <TouchableOpacity onPress={toggleRestaurantOptions} style={styles.restaurantPicker}>
          <Text style={styles.restaurantText}>
            {selectedRestaurant ? selectedRestaurant : 'Selecione um Restaurante'}
          </Text>
        </TouchableOpacity>
        {showRestaurantOptions && (
          <View style={styles.restaurantOptions}>
            {['R I - Campus IFAM', 'RU - Campus UFAM', 'RU - Campus UEA'].map((ru) => (
              <TouchableOpacity
                key={ru}
                style={[
                  styles.restaurantOption,
                  ru === selectedRestaurant && styles.selectedRestaurantOption, // Aplica estilo se selecionado
                ]}
                onPress={() => {
                  setSelectedRestaurant(ru);
                  setShowRestaurantOptions(false);
                }}
              >
                <Text style={styles.restaurantOptionText}>{ru}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Tipo de Refeição:</Text>
      <View style={styles.pickerContainer}>
        {['Café da Manhã', 'Almoço', 'Jantar'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.pickerOption, tipo === tipoRefeicao && styles.selectedOption]}
            onPress={() => setTipoRefeicao(tipo)}
          >
            <Text style={[styles.pickerText, tipo === tipoRefeicao && styles.selectedText]}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={agendarRefeicao}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reserva Confirmada!</Text>
            <Text style={styles.modalDetails}>
              {`Data: ${date.toLocaleDateString()}\nRestaurante: ${selectedRestaurant}\nTipo de Refeição: ${tipoRefeicao}`}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  restaurantContainer: {
    marginBottom: 20,
  },
  restaurantPicker: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  restaurantText: {
    fontSize: 18,
    color: '#333',
  },
  restaurantOptions: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
    maxHeight: 150,
    overflow: 'hidden',
  },
  restaurantOption: {
    padding: 10,
  },
  selectedRestaurantOption: {
    backgroundColor: '#FFD700', // Cor de fundo quando selecionado
  },
  restaurantOptionText: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    fontWeight:'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerOption: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff', // Cor do texto quando selecionado
    fontWeight: 'bold', // Negrito
  },
  button: {
    backgroundColor: '#40E0D0',
    fontWeight: 'bold', // Negrito
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontWeight: 'bold', // Negrito
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
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
