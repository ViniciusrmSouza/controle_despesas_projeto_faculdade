import { Colors } from '@/constants/Colors';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#745aad',  // Cor do ícone ativo
        tabBarInactiveTintColor: '#A0A0A0',      // Cor do ícone inativo (ajuste conforme o design)
        tabBarStyle: {
          backgroundColor: '#1f1e24', // Cor do fundo da Tab Bar
          borderTopWidth: 0,                      // Remove a borda superior da barra
          height: 60,                             // Altura da Tab Bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Despesas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'card' : 'card-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Investimentos"
        options={{
          title: 'Investimentos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
