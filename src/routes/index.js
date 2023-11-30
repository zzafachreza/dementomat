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
  SBerat,
  KeluargaEdit,
  Scek2,
  Account,
  AccountEdit,
  Screening,
  ScreeningData,
  ScreeningResult,
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
          headerTitle: 'Daftar',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="KeluargaEdit"
        component={KeluargaEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Anggota Keluarga',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Screening"
        component={Screening}
        options={{
          headerShown: true,
          headerTitle: 'Cek Kesehatan Jantung',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="ScreeningData"
        component={ScreeningData}
        options={{
          headerShown: true,
          headerTitle: 'Riwayat Cek Kesehatan Jantung',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SBerat"
        component={SBerat}
        options={{
          headerShown: true,
          headerTitle: 'Riwayat Berat Badan',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
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
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SCek2"
        component={Scek2}
        options={{
          headerShown: true,
          headerTitle: 'Skrinning Anak',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          headerTitle: 'Profile Saya',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="SCekDahak"
        component={SCekDahak}
        options={{
          headerShown: true,
          headerTitle: 'Hasil Tes Dahak',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
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
            elevation: 0,
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
            backgroundColor: colors.primary,
            elevation: 0,
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
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SEdukasi"
        component={SEdukasi}
        options={{
          headerShown: true,
          headerTitle: 'Video Edukasi',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
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
            backgroundColor: colors.primary,
            elevation: 0,
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
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />



      <Stack.Screen
        name="ScreeningResult"
        component={ScreeningResult}
        options={{
          headerShown: true,
          headerTitle: 'Hasil Skrinning Jantung',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />



    </Stack.Navigator>
  );
}
