import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Card } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native';
import { colorMap } from '@/Utils/TiposDespesas';
import { loadData } from '@/services/storage';
import styles from '@/styles/InvestmentsStyles';
import { useFocusEffect } from '@react-navigation/native';

export default function Investimentos() {
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [topExpenses, setTopExpenses] = useState([]);
  const [showFixedTips, setShowFixedTips] = useState(false);
  const [showHighRiskTips, setShowHighRiskTips] = useState(false);
  const [showCdbCalculator, setShowCdbCalculator] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [cdbAnnualReturn, setCdbAnnualReturn] = useState(null);
  const [cdbMonthlyReturn, setCdbMonthlyReturn] = useState(null);
  const [showMonthlyReturns, setShowMonthlyReturns] = useState(false);
  const [monthlyReturns, setMonthlyReturns] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData(setSalary, setExpenses);
    }, [])
  );

  useEffect(() => {
    calculateRemaining();
    calculateTopExpenses();
  }, [salary, expenses]);

  const calculateRemaining = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setRemaining(salary - totalExpenses);
  };

  const calculateTopExpenses = () => {
    const expenseTypes = {};
    expenses.forEach((expense) => {
      if (expenseTypes[expense.type]) {
        expenseTypes[expense.type] += parseFloat(expense.amount);
      } else {
        expenseTypes[expense.type] = parseFloat(expense.amount);
      }
    });

    const sortedExpenses = Object.entries(expenseTypes).sort((a, b) => b[1] - a[1]);
    setTopExpenses(sortedExpenses.slice(0, 3));
  };

  const getChartData = () => {
    const expenseTypes = {};
    expenses.forEach((expense) => {
      if (expenseTypes[expense.type]) {
        expenseTypes[expense.type] += parseFloat(expense.amount);
      } else {
        expenseTypes[expense.type] = parseFloat(expense.amount);
      }
    });

    return Object.keys(expenseTypes).map((type) => ({
      name: type.length > 8 ? type.substring(0, 8) + '...' : type,
      amount: expenseTypes[type],
      color: colorMap[type] || '#FFFFFF',
      legendFontColor: '#D3D3D3',
      legendFontSize: 15,
    }));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const chartData = getChartData();

  const calculateCdbReturn = () => {
    const annualRate = 0.12;
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
    const taxRate = 0.20;
    const initialInvestment = parseFloat(investmentAmount);
    const monthlyInvestmentAmount = parseFloat(monthlyInvestment);

    if (!isNaN(initialInvestment) && initialInvestment >= 0 && !isNaN(monthlyInvestmentAmount) && monthlyInvestmentAmount >= 0) {
      let balance = initialInvestment;
      let monthlyReturnsList = [];

      for (let month = 1; month <= 12; month++) {
        const grossReturn = balance * monthlyRate;
        const tax = grossReturn * taxRate;
        const netReturn = grossReturn - tax;

        balance += netReturn + monthlyInvestmentAmount;
        monthlyReturnsList.push(balance);
      }

      setCdbAnnualReturn(balance);
      setMonthlyReturns(monthlyReturnsList);
    } else {
      setCdbAnnualReturn(null);
      setMonthlyReturns([]);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Card style={styles.container}>
          <Text style={styles.title}>Investimentos</Text>
          <Text style={styles.totalExpenses}>Total de Gastos: R$ {totalExpenses.toFixed(2)}</Text>

          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              width={300}
              height={220}
              chartConfig={{
                backgroundColor: '#1f1e24',
                backgroundGradientFrom: '#1f1e24',
                backgroundGradientTo: '#1f1e24',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          <Text style={styles.remaining}>Saldo Restante: R$ {remaining.toFixed(2)}</Text>

          <Text style={styles.topExpensesTitle}>Seus Top 3 Gastos:</Text>
          {topExpenses.map(([type, amount], index) => (
            <Text key={index} style={styles.topExpense}>
              {`${type}: R$ ${amount.toFixed(2)}`}
            </Text>
          ))}

          <Text style={styles.tips}>
            Dicas: Tente focar em reduzir seus gastos de: {topExpenses[0] ? topExpenses[0][0] : 'Nenhuma despesa'}
          </Text>

          <TouchableOpacity onPress={() => setShowFixedTips(!showFixedTips)} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Dicas de Investimento em Renda Fixa</Text>
          </TouchableOpacity>
          {showFixedTips && (
            <Text style={styles.tips}>
               Considere investir seu saldo restante em opções de renda fixa, que oferecem baixo risco e rendimentos estáveis. 
               Exemplos incluem CDBs (Certificados de Depósito Bancário), Tesouro Direto e LCIs (Letras de Crédito Imobiliário). 
               Essas opções são ideais para quem busca segurança e retorno previsível.
            </Text>
          )}

          <TouchableOpacity onPress={() => setShowHighRiskTips(!showHighRiskTips)} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Investimento em CDB</Text>
          </TouchableOpacity>
          {showHighRiskTips && (
            <Text style={styles.tips}>
              Um ótimo e simples investimento de baixo risco é o CDB (Certificado de Depósito Bancário). Nele, você empresta seu dinheiro ao banco e recebe juros em troca.
              O CDB conta com a proteção do FGC (Fundo Garantidor de Crédito), que cobre até R$ 250 mil por instituição em caso de quebra do banco, garantindo mais segurança ao investidor.
            </Text>
          )}

          <TouchableOpacity onPress={() => setShowCdbCalculator(!showCdbCalculator)} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Simulação de investimento em CDB</Text>
          </TouchableOpacity>
          {showCdbCalculator && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Investimento Inicial (R$)"
                keyboardType="numeric"
                value={investmentAmount}
                onChangeText={setInvestmentAmount}
              />
              <TextInput
                style={styles.input}
                placeholder="Investimentos Mensais (R$)"
                keyboardType="numeric"
                value={monthlyInvestment}
                onChangeText={setMonthlyInvestment}
              />
              <TouchableOpacity onPress={calculateCdbReturn} style={styles.calculateButton}>
                <Text style={styles.calculateButtonText}>Calcular</Text>
              </TouchableOpacity>

              {cdbAnnualReturn !== null && (
                <Text style={styles.tips}>
                  Rendimento Anual Total: R$ {cdbAnnualReturn.toFixed(2)}
                </Text>
              )}

              <TouchableOpacity onPress={() => setShowMonthlyReturns(!showMonthlyReturns)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>Mostrar Rendimentos Mensais</Text>
              </TouchableOpacity>
              {showMonthlyReturns && monthlyReturns.map((monthlyReturn, index) => (
                <Text key={index} style={styles.tips}>
                  Mês {index + 1}: R$ {monthlyReturn.toFixed(2)}
                </Text>
              ))}
            </>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}