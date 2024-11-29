import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadData = async (setSalary, setExpenses) => {
  try {
    const savedSalary = await AsyncStorage.getItem('salary');
    const savedExpenses = await AsyncStorage.getItem('expenses');
    
    if (savedSalary !== null) {
      setSalary(parseFloat(savedSalary) || 0);
    }
    if (savedExpenses !== null) {
      setExpenses(JSON.parse(savedExpenses));
    }
  } catch (error) {
    console.log('Erro ao carregar dados:', error);
  }
};


export const saveSalaryData = async (salary) => {
  await AsyncStorage.setItem('salary', salary.toString());
};

export const saveExpensesData = async (expenses) => {
  await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
};

export const clearData = async () => {
  await AsyncStorage.clear();
};
