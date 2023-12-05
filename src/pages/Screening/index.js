import { ActivityIndicator, Alert, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fonts, windowHeight, windowWidth } from '../../utils'
import axios from 'axios'
import { MYAPP, apiURL, apiURLNEW, getData } from '../../utils/localStorage';
import YoutubePlayer from "react-native-youtube-iframe";
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import DatePicker from 'react-native-date-picker'
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native';
export default function Screening({ navigation, route }) {

    const item = route.params;

    const [loading, setLoading] = useState(false);



    const [kirim, setKirim] = useState({
        fid_nik: item.data.nik_ktp,
        jenis: item.jenis,
        diabetes: 'Tidak',
        jenis_kelamin: item.jenis_kelamin,
        merokok: 'Tidak',
        umur: KELOMPOK_UMUR,
        gula: '',
        kolesterol: '',
        tensi: '',
        berat: 0,
        tinggi: 0,
        imt: 0,

    });

    const sendServer = () => {

        setLoading(true);
        axios.post(apiURLNEW + 'screening_insert', {
            ...kirim,
            umur: KELOMPOK_UMUR,
            jenis_kelamin: item.data.jenis_kelamin,
            imt: Math.round(kirim.berat / (Math.pow(kirim.tinggi / 100, 2)))
        }).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                showMessage({
                    type: 'success',
                    message: 'Terima kasih Sudah Melakukan Screening !'
                });
                navigation.replace('ScreeningResult', {
                    nik_ktp: item.data.nik_ktp,
                    jenis: item.jenis
                });
            }
        }).finally(() => {

            setLoading(false);
        })
    }

    const [KELOMPOK_UMUR, setKELOMPOK_UMUR] = useState('');
    useEffect(() => {

        if (item.data.tahun >= 0 && item.data.tahun <= 44) {
            setKELOMPOK_UMUR('40-44');
        } else if (item.data.tahun >= 45 && item.data.tahun <= 49) {
            setKELOMPOK_UMUR('45-49');
        } else if (item.data.tahun >= 50 && item.data.tahun <= 54) {
            setKELOMPOK_UMUR('50-54');
        } else if (item.data.tahun >= 55 && item.data.tahun <= 59) {
            setKELOMPOK_UMUR('55-59');
        } else if (item.data.tahun >= 60 && item.data.tahun <= 64) {
            setKELOMPOK_UMUR('60-64');
        } else if (item.data.tahun >= 65 && item.data.tahun <= 69) {
            setKELOMPOK_UMUR('65-69');
        } else if (item.data.tahun >= 70 && item.data.tahun <= 74) {
            setKELOMPOK_UMUR('70-74');
        }

        console.log(KELOMPOK_UMUR)

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <Text style={{
                fontFamily: fonts.secondary[800],
                textAlign: 'center',
                fontSize: 14,
                marginBottom: 10,
            }}>{item.jenis}</Text>



            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.primary,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        borderBottomColor: colors.primary
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: 14,

                        }}>Jenis Kelamin</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,

                        }}>{item.data.jenis_kelamin}</Text>
                    </View>
                    <View style={{
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor: colors.border
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: 14,
                        }}>Kelompok Umur</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,

                        }}>{KELOMPOK_UMUR}</Text>
                    </View>
                </View>
                {item.jenis == 'DENGAN HASIL LABORATORIUM' && <>

                    <MyGap jarak={10} />
                    <MyInput label="Gula Darah Sewaktu (mg/dl)" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            gula: x
                        })
                    }} keyboardType='number-pad' />
                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            kolesterol: x
                        })
                    }} label="Kolesterol (mg/dl)" keyboardType='number-pad' />
                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            tensi: x
                        })
                    }} label="Tensi Sistolik (mmHg)" keyboardType='number-pad' />


                    <MyGap jarak={10} />
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            merokok: x
                        })
                    }} label="Kebiasaan Merokok" data={[
                        { label: 'Tidak', value: 'Tidak' },
                        { label: 'Ya', value: 'Ya' },

                    ]} />


                </>}

                {item.jenis == 'TANPA HASIL LABORATORIUM' && <>
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            merokok: x
                        })
                    }} label="Kebiasaan Merokok" data={[
                        { label: 'Tidak', value: 'Tidak' },
                        { label: 'Ya', value: 'Ya' },

                    ]} />
                    <MyGap jarak={10} />

                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            tensi: x
                        })
                    }} label="Tensi Sistolik (mmHg)" keyboardType='number-pad' />

                    <MyGap jarak={10} />
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <MyInput label="Tinggi Badan (cm)" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    tinggi: x
                                })
                            }} keyboardType='number-pad' />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                            <MyInput label="Berat Badan (kg)" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    berat: x
                                })
                            }} keyboardType='number-pad' />
                        </View>

                    </View>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            color: colors.black
                        }}>Indeks Masa Tubuh (IMT)</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 20,
                            marginTop: 10,
                            color: colors.black
                        }}>{kirim.berat > 0 && kirim.tinggi > 0 ? Math.round(kirim.berat / (Math.pow(kirim.tinggi / 100, 2))) : 0}</Text>
                    </View>




                </>}

                <MyGap jarak={20} />
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
                {!loading && <MyButton onPress={sendServer} warna={colors.danger} title="Simpan" Icons="shield-checkmark-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})