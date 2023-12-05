import React, { useState } from 'react';
import { StyleSheet, Alert, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, apiURLNEW, storeData } from '../../utils/localStorage';
import { ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { Linking } from 'react-native';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    nik: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  useEffect(() => {
    axios.post(apiURLNEW + 'company').then(res => {
      console.log(res.data);
      setComp(res.data);
    })
  }, [])



  const masuk = () => {


    if (kirim.nik.length == 0 && kirim.length == 0) {
      Alert.alert('SI DEMEN TOMAT DAN TERASI', 'NIK dan Passwoord tidak boleh kosong !');
    } else if (kirim.nik.length == 0) {
      Alert.alert('SI DEMEN TOMAT DAN TERASI', 'NIK tidak boleh kosong !');
    } else if (kirim.nik.length !== 16) {
      Alert.alert('SI DEMEN TOMAT DAN TERASI', 'NIK harus 16 digit !');
    } else if (kirim.password.length == 0) {
      Alert.alert('SI DEMEN TOMAT DAN TERASI', 'Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);
      setTimeout(() => {
        axios
          .post(apiURL + 'login.php', kirim)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {

              Alert.alert('SI DEMEN TOMAT DAN TERASI DAN TERASI', res.data.msg);

            } else {
              storeData('user', res.data);
              navigation.replace('Home');
            }
          });
      }, 1200);


    }




  }

  return (
    <ImageBackground source={require('../../assets/back.png')} style={{
      flex: 1,
    }}>
      <ScrollView style={{ padding: 10, flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image
              source={require('../../assets/karang.png')}
              style={
                {
                  width: windowWidth / 3.5,
                  height: 100,
                  resizeMode: 'contain'
                }
              }
            />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 10,
          }}>


            <Image
              source={require('../../assets/tos.png')}
              style={
                {
                  width: windowWidth / 3.5,
                  height: 90,
                  resizeMode: 'contain'
                }
              }
            />


            <Image
              source={require('../../assets/cerdik.png')}
              style={
                {
                  width: windowWidth / 3.5,
                  height: 90,
                  resizeMode: 'contain'
                }
              }
            />

          </View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 22,
            color: colors.white
          }}>SI DEMEN TOMAT TERASI</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 32,
            textAlign: 'center',
            color: colors.white,
          }}>
            {/* Aplikasi Deteksi Dini dan Pemantauan Tuberkulosis
            Kebakkramat */}
            Sistem Deteksi Dini dan Pemantauan Tuberkulosis Mandiri Terpadu dan Terintegrasi
          </Text>

        </View>
        <MyGap jarak={10} />
        <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
          <MyInput maxLength={16} keyboardType="number-pad" label="NIK" onChangeText={val => setKirim({
            ...kirim,
            nik: val
          })}


            iconname="card" placeholder="Masukan NIK kepala keluarga" />
          <MyGap jarak={10} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="key"
            placeholder="Masukan password Anda"
          />
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://wa.me/' + comp.tlp)
          }} style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: 5,
            paddingVertical: 5,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 32,
              color: colors.black
            }}>Lupa password ?</Text>
          </TouchableOpacity>
          <MyGap jarak={40} />
          {!loading && <MyButton
            onPress={masuk}
            title="MASUK SEKARANG"
            colorText={colors.black}
            iconColor={colors.black}
            warna={colors.btn_primary}
            Icons="log-in-outline"
          />}
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}><Text style={{
            fontSize: windowWidth / 32,
            fontFamily: fonts.primary[400],
            textAlign: 'center',
            color: colors.black
          }}>Belum punya user ? silahkan daftar disini</Text></TouchableOpacity>
        </View>
        {
          loading && <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator color={colors.white} size="large" />
          </View>
        }
      </ScrollView >
      <Text style={{
        margin: 5,
        textAlign: 'center',
        color: colors.black,
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 32,
      }}>Dinas Kesehatan Kabupaten Karanganyar</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
