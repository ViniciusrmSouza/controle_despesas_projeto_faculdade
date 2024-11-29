import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#1f1e24',
      padding: 20,
    },
    container: {
      borderRadius: 10,
      backgroundColor: '#1f1e24',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#D3D3D3',
      textAlign: 'center',
      marginBottom: 10,
    },
    totalExpenses: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#D3D3D3',
      marginBottom: 20,
    },
    remaining: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#D3D3D3',
      marginTop: 20,
    },
    topExpensesTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#D3D3D3',
      marginTop: 20,
    },
    topExpense: {
      fontSize: 18,
      textAlign: 'center',
      color: '#D3D3D3',
      marginVertical: 5,
    },
    tips: {
      fontSize: 16,
      textAlign: 'center',
      color: '#D3D3D3',
      marginTop: 10,
    },
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownButton: {
      marginVertical: 10,
      backgroundColor: '#333333',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    dropdownButtonText: {
      color: '#D3D3D3',
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: '#FFF',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginTop: 10,
      color: '#FFF',
    },
    calculateButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    calculateButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });
  

export default styles;