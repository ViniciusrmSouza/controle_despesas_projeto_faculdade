import { FlatList, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { List } from 'react-native-paper';
import React from 'react';
import styles from '@/styles/HomeStyles';

export default function ExpenseList({ expenses, editExpense, deleteExpense }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <List.Item
          title={item.name}
          description={`R$ ${item.amount} - ${item.type}`}
          right={() => (
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name="edit"
                size={24}
                color="#A9A9A9"
                onPress={() => editExpense(index)}
                style={styles.icon}
              />
              <Icon
                name="delete"
                size={24}
                color="#A9A9A9"
                onPress={() => deleteExpense(index)}
                style={styles.icon}
              />
            </View>
          )}
        />
      )}
    />
  );
}
