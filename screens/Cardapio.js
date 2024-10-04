import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Cardapio() {
  const [selectedMeal, setSelectedMeal] = useState('Almoço');
  const [selectedDay, setSelectedDay] = useState(null); // Estado para armazenar o dia selecionado

  // Mock de várias semanas
  const multipleWeeks = [
    [
      { day: 'Seg', date: '04', month: 'Mar' },
      { day: 'Ter', date: '04', month: 'Mar' }, 
      { day: 'Qua', date: '04', month: 'Mar' },
      { day: 'Qui', date: '05', month: 'Mar' },
      { day: 'Sex', date: '06', month: 'Mar' },
      { day: 'Sab', date: '07', month: 'Mar' },
      { day: 'Dom', date: '08', month: 'Mar' },
    ],
    [
      { day: 'Seg', date: '09', month: 'Mar' },
      { day: 'Ter', date: '10', month: 'Mar' }, 
      { day: 'Qua', date: '11', month: 'Mar' },
      { day: 'Qui', date: '12', month: 'Mar' },
      { day: 'Sex', date: '13', month: 'Mar' },
      { day: 'Sab', date: '14', month: 'Mar' },
      { day: 'Dom', date: '15', month: 'Mar' },
    ],
    [
      { day: 'Seg', date: '09', month: 'Mar' },
      { day: 'Ter', date: '10', month: 'Mar' }, 
      { day: 'Qua', date: '11', month: 'Mar' },
      { day: 'Qui', date: '12', month: 'Mar' },
      { day: 'Sex', date: '13', month: 'Mar' },
      { day: 'Sab', date: '14', month: 'Mar' },
      { day: 'Dom', date: '15', month: 'Mar' },
    ],
    [
      { day: 'Seg', date: '09', month: 'Mar' },
      { day: 'Ter', date: '10', month: 'Mar' }, 
      { day: 'Qua', date: '11', month: 'Mar' },
      { day: 'Qui', date: '12', month: 'Mar' },
      { day: 'Sex', date: '13', month: 'Mar' },
      { day: 'Sab', date: '14', month: 'Mar' },
      { day: 'Dom', date: '15', month: 'Mar' },
    ],
    // Adicione mais semanas se necessário
  ];

  const menuItems = [
    { id: 1, type: 'Principal', items: ['Isca de carne ao molho e mostarda', 'Peixada Amazonense'], icon: 'silverware-fork-knife' },
    { id: 2, type: 'Salada', items: ['Acelga, repolho roxo, cenoura'], icon: 'leaf' },
    { id: 3, type: 'Guarnição', items: ['Farofa'], icon: 'food-variant' },
    { id: 4, type: 'Acompanhamento', items: ['Arroz branco', 'Arroz Integral', 'Feijão carioca'], icon: 'rice' },
    { id: 5, type: 'Suco', items: ['Suco de abacaxi'], icon: 'cup' },
  ];

  return (
    <View style={styles.container}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {multipleWeeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekContainer}>
            {week.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dayContainer, selectedDay === `${weekIndex}-${index}` && styles.daySelected]}
                onPress={() => setSelectedDay(`${weekIndex}-${index}`)}
              >
                <Text style={styles.dayText}>{item.day}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.monthText}>{item.month}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>


      <View style={styles.mealButtonsContainer}>
        {['Café', 'Almoço', 'Jantar'].map((meal) => (
          <TouchableOpacity
            key={meal}
            style={[styles.mealButton, selectedMeal === meal && styles.mealButtonSelected]}
            onPress={() => setSelectedMeal(meal)}
          >
            <Text style={[styles.mealButtonText, selectedMeal === meal && styles.mealButtonTextSelected]}>
              {meal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuSection}>
            <View style={styles.menuHeader}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#045" />
              <Text style={styles.menuTitle}>{item.type}</Text>
            </View>
            {item.items.map((menuItem, index) => (
              <Text key={index} style={styles.menuItem}>{menuItem}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
    padding: 5,
    backgroundColor: '#40E0D0',
    borderRadius: 5,
  },
  daySelected: {
    backgroundColor: '#ddd', // Cor do botão selecionado
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  monthText: {
    fontSize: 12,
    color: '#fff',
  },
  mealButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  mealButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  mealButtonSelected: {
    backgroundColor: '#FFD700',
  },
  mealButtonText: {
    fontSize: 16,
    color: '#333',
  },
  mealButtonTextSelected: {
    fontWeight: 'bold',
    color: '#fff', // Cor do texto quando selecionado
  },
  menuSection: {
    marginVertical: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  menuItem: {
    marginLeft: 30,
    fontSize: 16,
    color: '#333',
  },
});

