import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';
import { ImageBackground } from 'react-native';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    nik: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.nik == null && kirim.password == null) {
      alert('username dan Passwoord tidak boleh kosong !');
    } else if (kirim.nik == null) {
      alert('username tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
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

              alert(res.data.msg);

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
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>

          <Image source={require('../../assets/puskesmas.png')} style={{
            width: 95,
            height: 105,
            resizeMode: 'contain'
          }} />
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
            {/* Aplikasi Deteksi Dini dan Pemantauan Tuberkulosis
            Kebakkramat */}
            Aplikasi Deteksi Dini dan Pemantauan Tuberkulosis Mandiri dan Terpadu
          </Text>

        </View>
        <MyGap jarak={10} />
        <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
          <MyInput label="NIK" onChangeText={val => setKirim({
            ...kirim,
            nik: val
          })}


            iconname="card" placeholder="Masukan NIK kepala keluarga" />
          <MyGap jarak={20} />
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
          <MyGap jarak={40} />
          {!loading && <MyButton
            onPress={masuk}
            title="LOGIN SEKARANG"
            colorText={colors.primary}
            iconColor={colors.primary}
            warna={colors.btn_primary}
            Icons="log-in-outline"
          />}
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}><Text style={{
            fontSize: windowWidth / 25,
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
            <ActivityIndicator color={colors.secondary} size="large" />
          </View>
        }
      </ScrollView >
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
