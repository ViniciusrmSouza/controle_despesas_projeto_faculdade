import { Button, Text, View } from 'react-native';

import React from 'react';

export default function AddExpense({ navigation }) {
  return (
    <View>
      <Text>Adicionar Despesa</Text>
      {/* Lógica para adicionar uma despesa */}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}
