import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import DashboardScreen from '@/components/screens/DashboardScreen';

// TODO: Crea este archivo después
// import DashboardScreen from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#0f0f0f' }, // fondo oscuro estilo RE
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen} // Reemplaza cuando crees el screen
      />

      {/* Ejemplo de cómo añadir un modal rápido más adelante */}
      {/*
      <Stack.Screen
        name="AddCard"
        component={AddCardModal}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      */}
    </Stack.Navigator>
  );
}
