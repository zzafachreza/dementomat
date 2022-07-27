import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { Icon } from 'react-native-elements'
import { getData, storeData } from '../../utils/localStorage';

export default function Home({ navigation }) {

  const DataMenu = ({ img, judul, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        backgroundColor: colors.secondary,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 20,
      }}>
        <Image source={img} style={{
          width: 70,
          height: 70,
          resizeMode: "contain"
        }} />
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.white,
          textAlign: 'center',
          fontSize: 16
        }}>{judul}</Text>
      </TouchableOpacity>
    )
  }

  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);

    })
  }, []);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary
    }}>
      <View style={{
        flex: 1,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
          height: 80,
        }}>
          <Text style={styles.txt}>Selamt datang,{user.nama_lengkap}</Text>
          <Text style={styles.txtLogo}>DEMEN TOMAT</Text>
          <Text style={styles.txt}>Deteksi Dini dan Pemantauan Tuberkulosis
            Kebakkramat</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
        }}>
          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{

            flexDirection: 'row',
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" name="log-out-outline" color={colors.secondary} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              left: 3,
              color: colors.secondary
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>


      </View>
      <View style={{
        flex: 3,
        backgroundColor: colors.primary,
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -100,
        }}>
          <Image source={require('../../assets/slide.png')} style={{
            width: '90%',
            height: 200,
            borderRadius: 20,
          }} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 5,
        }}>
          <DataMenu onPress={() => navigation.navigate('SStatus')} judul="Status" img={require('../../assets/A1.png')} />
          {/* <DataMenu onPress={() => navigation.navigate('SCek')} judul="Screening" img={require('../../assets/A2.png')} /> */}
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
          {/* <DataMenu onPress={() => navigation.navigate('SObat')} judul="Pemantauan Minum Obat" img={require('../../assets/A3.png')} /> */}
          <DataMenu onPress={() => navigation.navigate('SEdukasi')} judul="Vidio Edukasi" img={require('../../assets/A4.png')} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
          <DataMenu onPress={() => navigation.navigate('STentang')} judul="Kontak Info" img={require('../../assets/A5.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    color: colors.white,
  }
  , txt2: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    marginBottom: 20,
    color: colors.primary,
  },
  txtLogo: {
    fontFamily: fonts.secondary[600],
    fontSize: 30,
    marginBottom: 5,
    color: colors.white,
  }, txtLogo2: {
    fontFamily: fonts.secondary[400],
    fontSize: 18,
    color: colors.primary,
  }

})