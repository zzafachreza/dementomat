import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
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
  const w = new Animated.Value(0.1);
  const h = new Animated.Value(0);

  Animated.timing(w, {
    toValue: windowWidth / 23,
    duration: 1000,
  }).start();

  Animated.timing(h, {
    toValue: 100,
    duration: 1000,
  }).start();




  useEffect(() => {



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
    <ImageBackground
      source={require('../../assets/back.png')}
      style={{
        flex: 1,
        paddingBottom: 20,
      }}>

      <View style={{
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      </View>


      <View style={{
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowWidth / 10,
      }}>


        <Image
          source={require('../../assets/puskesmas.png')}
          style={
            {
              width: 150,
              height: 180,
              marginBottom: 10,
            }
          }
        />
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 15,
          color: colors.white
        }}>SI DEMEN TOMAT</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 28,
          textAlign: 'center',

          color: colors.white,
          marginBottom: 10,
        }}>
          Sistem Deteksi Dini dan Pemantauan Tuberkulosis Mandiri dan Terpadu
        </Text>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
      <Text style={{
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 25,
        textAlign: 'center',

        color: colors.white
      }}>
        Dinas Kesehatan Kabupaten Karanganyar
      </Text>


    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
