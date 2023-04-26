import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { Icon } from 'react-native-elements'
import { getData, storeData } from '../../utils/localStorage';
import { FlatListSlider } from 'react-native-flatlist-slider'
import { MySlider } from '../../components';
import MyCarouser from '../../components/MyCarouser';
import { ImageBackground } from 'react-native';

export default function Home({ navigation }) {

  const DataMenu = ({ img, judul, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        backgroundColor: colors.btn_primary,
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
          color: colors.primary,
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
    <ImageBackground source={require('../../assets/back.png')} style={{
      flex: 1,
    }}>
      <View style={{
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginBottom: 10,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
          height: 80,

        }}>
          <Text style={styles.txt}>Selamat datang, {user.nama_lengkap}</Text>
          <Text style={styles.txtLogo}>SI DEMEN TOMAT TERASI</Text>
          <Text style={styles.txt}>
            {/* Aplikasi Deteksi Dini dan Pemantauan Tuberkulosis
            Kebakkramat */}
            Sistem Deteksi Dini dan Pemantauan Tuberkulosis Mandiri Terpadu dan Terintegrasi
          </Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
        }}>
          <TouchableOpacity onPress={() => {
            // storeData('user', null);

            navigation.navigate('Account');
          }} style={{

            flexDirection: 'row',
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.btn_primary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" name="person-outline" color={colors.primary} size={14} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              left: 3,
              color: colors.primary
            }}>Profile</Text>
          </TouchableOpacity>
        </View>


      </View>


      <View style={{
        flex: 3,
      }}>
        <MyCarouser />
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
          <DataMenu onPress={() => navigation.navigate('SEdukasi')} judul="Video Edukasi" img={require('../../assets/A4.png')} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
          <DataMenu onPress={() => navigation.navigate('STentang')} judul="Kontak Info" img={require('../../assets/A5.png')} />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 32,
    color: colors.white,
  }
  , txt2: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 28,
    marginBottom: 20,
    color: colors.primary,
  },
  txtLogo: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 21,
    marginBottom: 0,
    color: colors.white,
  }, txtLogo2: {
    fontFamily: fonts.secondary[400],
    fontSize: 18,
    color: colors.primary,
  }

})