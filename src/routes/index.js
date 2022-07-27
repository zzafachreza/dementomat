import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  SCek,
  SPenyakit,
  STentang,
  SHasil,
  SObat,
  SEdukasi,
  SStatus,
  SCekDahak,
} from '../pages';
import { colors } from '../utils';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: 'Register',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="SCek"
        component={SCek}
        options={{
          headerShown: true,
          headerTitle: 'Skrinning',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="SCekDahak"
        component={SCekDahak}
        options={{
          headerShown: true,
          headerTitle: 'Hasil BTA',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SPenyakit"
        component={SPenyakit}
        options={{
          headerShown: true,
          headerTitle: 'Indeks Penyakit',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}

      />

      <Stack.Screen
        name="STentang"
        component={STentang}
        options={{
          headerShown: true,
          headerTitle: 'Kontak Info',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SObat"
        component={SObat}
        options={{
          headerShown: true,
          headerTitle: 'Pemantauan Minum Obat',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SEdukasi"
        component={SEdukasi}
        options={{
          headerShown: true,
          headerTitle: 'Vidio Edukasi',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SStatus"
        component={SStatus}
        options={{
          headerShown: true,
          headerTitle: 'Status Keluarga',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SHasil"
        component={SHasil}
        options={{
          headerShown: true,
          headerTitle: 'Skrinning',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: '#fff',
        }}
      />



    </Stack.Navigator>
  );
}