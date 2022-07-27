import { StyleSheet, Text, Dimensions, View, TouchableOpacity, FlatList, Image, SafeAreaView, Switch, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyGap, MyInput } from '../../components';
import { apiURL } from '../../utils/localStorage';


export default function SCekDahak({ navigation, route }) {

    const item = route.params;
    const [bta, setBta] = useState('');
    const [kirim, setKirim] = useState(route.params);


    const MYListData = ({ title, person }) => {
        return (
            <View style={{
                padding: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white
                }}>
                    {title}
                </Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 30,
                    color: colors.white
                }}>{person}</Text>
            </View>
        )
    }





    return (
        <SafeAreaView style={{

            backgroundColor: colors.primary
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    backgroundColor: colors.secondary,
                    marginBottom: 10,
                    padding: 10,
                }}>
                    <MYListData title="NIK" person={item.nik_ktp} />
                    <MYListData title="Nama Lengkap" person={item.nama_keluarga} />
                    <MYListData title="Tanggal Lahir" person={item.tanggal_lahir} />

                </View>

                <View style={{
                    padding: 10,
                }}>

                    <MyInput value={bta} onChangeText={x => setBta(x)} label="BTA" iconname="search" placeholder="Masukan nilai BTA" />
                    <MyGap jarak={20} />
                    <MyButton onPress={() => {



                        if (bta.length == 0) {
                            Alert.alert('Informasi Demen Tomat', 'BTA Wajib di isi !');
                        } else {
                            axios.post(apiURL + 'update_pengobatan.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Dalam Pengobatan',
                                bta: bta
                            }).then(res => {
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                console.log(res.data);
                                navigation.goBack()
                            })
                        }



                    }} Icons="checkmark-circle-outline" title="Selesai" warna={colors.secondary} />
                </View>
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bulat: {
        margin: 5,
        padding: 10,
        backgroundColor: colors.white,
        overflow: 'hidden',
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
    },
    cek: {
        margin: 5,
        padding: 10,
        elevation: 3,
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 10,
        borderColor: colors.secondary,
        backgroundColor: colors.secondary
    },
    txt: {
        fontFamily: fonts.secondary[400],
        color: colors.black,
        fontSize: 12
    },
    txtOK: {
        fontFamily: fonts.secondary[600],
        color: colors.white,
        fontSize: 12
    }
})