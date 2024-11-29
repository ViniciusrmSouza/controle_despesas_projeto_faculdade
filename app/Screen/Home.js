import { Button, Card, Dialog, List, MD3DarkTheme, Provider as PaperProvider, Portal, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { calculatePercentage, groupExpensesByType } from '../../Utils/ExpenseUtils';
import { clearData, loadData, saveExpensesData, saveSalaryData } from '../../services/storage';

import ExpenseForm from '../../components/ExpenseForm';
import ExpenseList from './../../components/ExpenseList';
import GetExpenses from '../../Utils/TiposDespesas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './../../styles/HomeStyles';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const [salary, setSalary] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', type: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [types] = useState(GetExpenses);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadData(setSalary, setExpenses);
    }, [])
  );

  useEffect(() => {
    calculateRemaining();
  }, [salary, expenses]);

  const calculateRemaining = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setRemaining(salary ? parseFloat(salary) - totalExpenses : 0);
  };

  const handleSaveSalary = async (newSalary) => {
    setSalary(newSalary);
    await saveSalaryData(newSalary);  // Salva o salário
  };

  const addOrUpdateExpense = async () => {
    if (!newExpense.name || !newExpense.amount || !newExpense.type) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setErrorDialogVisible(true);
      return;
    }

    let updatedExpenses;
    if (editingIndex !== null) {
      updatedExpenses = expenses.map((expense, index) =>
        index === editingIndex ? newExpense : expense
      );
      setEditingIndex(null);
    } else {
      updatedExpenses = [...expenses, newExpense];
    }

    setExpenses(updatedExpenses);
    await saveExpensesData(updatedExpenses);  // Salva as despesas
    setNewExpense({ name: '', amount: '', type: '' });
  };

  const editExpense = (index) => {
    const expenseToEdit = expenses[index];
    setNewExpense(expenseToEdit);
    setEditingIndex(index);
  };

  const deleteExpense = async (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    await saveExpensesData(updatedExpenses);  // Salva as despesas após exclusão
  };

  const theme = {
    ...MD3DarkTheme,
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors
    },
  };

  return (
    <PaperProvider  theme={theme}>
      <ScrollView style={styles.background}>
        <SafeAreaView style={styles.container}>
          <Card style={styles.card}>
            <ExpenseForm
              salary={salary}
              setSalary={handleSaveSalary}  // Atualizado para usar o handleSaveSalary
              newExpense={newExpense}
              setNewExpense={setNewExpense}
              isAccordionOpen={isAccordionOpen}
              setIsAccordionOpen={setIsAccordionOpen}
              addOrUpdateExpense={addOrUpdateExpense}
              editingIndex={editingIndex}
            />
            <ExpenseList
              expenses={expenses}
              setExpenses={setExpenses}
              setEditingIndex={setEditingIndex}
              editExpense={editExpense}
              deleteExpense={deleteExpense}
            />
            <Text style={styles.remaining}>Saldo Restante: R$ {remaining.toFixed(2)}</Text>
            <Button onPress={() => setDialogVisible(true)} style={styles.button}>
              Ver Percentuais
            </Button>
          </Card>

          <Portal>
            <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
              <Dialog.Title>Percentuais por Tipo de Despesa</Dialog.Title>
              <Dialog.Content>
                {Object.entries(groupExpensesByType(expenses)).map(([type, amount], index) => (
                  <Text key={index} style={{ color: '#D3D3D3', fontSize: 18 }}>
                    {type}: {calculatePercentage(expenses, amount)}%
                  </Text>
                ))}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialogVisible(false)}>Fechar</Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog visible={errorDialogVisible} onDismiss={() => setErrorDialogVisible(false)}>
              <Dialog.Title>Informações Incompletas!</Dialog.Title>
              <Dialog.Content>
                <Text style={{ color: '#D3D3D3' }}>{errorMessage}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setErrorDialogVisible(false)}>Fechar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
      </ScrollView>
    </PaperProvider>
  );
}
