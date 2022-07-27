import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    animasi();


    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
      }
    });
  }, []);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingBottom: 20,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowWidth / 10,
      }}>
        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: 200,
              height: 230,
              marginBottom: 10,
            }
          }
        />
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 10,
          color: colors.white
        }}>DEMEN TOMAT</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 20,
          textAlign: 'center',

          color: colors.white,
          marginBottom: 10,
        }}>
          Deteksi Dini dan Pemantauan Tuberkulosis
          Kebakkramat
        </Text>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
      <Text style={{
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 20,
        textAlign: 'center',

        color: colors.secondary
      }}>
        UPT Puskesmas Kebakkramat 1
      </Text>
      <Text style={{
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 20,
        textAlign: 'center',
        color: colors.secondary
      }}>
        Dinas Kesehatan Karanganyar
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({});
