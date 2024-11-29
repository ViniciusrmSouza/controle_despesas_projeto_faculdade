import { Button, List, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import  GetExpenses  from '@/Utils/TiposDespesas';
import { saveSalaryData } from '@/services/storage';
import styles from '@/styles/HomeStyles';

export default function ExpenseForm({ salary, setSalary, newExpense, setNewExpense, isAccordionOpen, setIsAccordionOpen, addOrUpdateExpense, editingIndex }) {
  const tiposDespesas = GetExpenses();

  return (
    <View style={styles.container}>
      <TextInput
        label="Salário"
        value={salary ? salary.toString() : ''}
        keyboardType="numeric"
        onChangeText={async (value) => {
          setSalary(value);
          await saveSalaryData(value);
        }}

        style={styles.input}
      />
      <TextInput
        label="Nome da Despesa"
        value={newExpense.name}
        onChangeText={(text) => setNewExpense({ ...newExpense, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Valor"
        value={newExpense.amount}
        keyboardType="numeric"
        onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
        style={styles.input}
      />
      <List.Accordion
        title={newExpense.type || 'Selecione o tipo da despesa'}
        expanded={isAccordionOpen}
        onPress={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        {tiposDespesas.map((type, index) => (
          <List.Item
            key={index}
            title={type}
            onPress={() => {
              setNewExpense({ ...newExpense, type });
              setIsAccordionOpen(false);
            }}
          />
        ))}
      </List.Accordion>
      <Button mode="contained" onPress={addOrUpdateExpense} style={styles.button}>
        {editingIndex !== null ? 'Atualizar Despesa' : 'Adicionar Despesa'}
      </Button>
    </View>
  );
}