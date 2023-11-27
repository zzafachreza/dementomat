import { Alert, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

    const [kirim, setKirim] = useState({
        fid_nik: item.data.nik_ktp,
        jenis: item.jenis,
        diabetes: 'Tidak',
        jenis_kelamin: 'Laki-laki',
        merokok: 'Tidak',
        umur: '40-44',
        gula: '',
        kolesterol: '',
        tensi: '',
        berat: 0,
        tinggi: 0,
        imt: 0,

    });

    const sendServer = () => {
        console.log({
            ...kirim,
            imt: Math.round(kirim.berat / (Math.pow(kirim.tinggi / 100, 2)))
        })

        axios.post(apiURLNEW + 'screening_insert', {
            ...kirim,
            imt: Math.round(kirim.berat / (Math.pow(kirim.tinggi / 100, 2)))
        }).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                showMessage({
                    type: 'success',
                    message: 'Terima kasih Sudah Melakukan Screening !'
                });
                navigation.goBack();
            }
        })
    }

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
                {item.jenis == 'DENGAN HASIL LABORATORIUM' && <>
                    <MyGap jarak={10} />
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            diabetes: x
                        })
                    }} label="Ada Diabetes ?" data={[
                        { label: 'Tidak', value: 'Tidak' },
                        { label: 'Ya', value: 'Ya' },

                    ]} />
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
                    }} label="Tensi (mmHg)" keyboardType='number-pad' />
                    <MyGap jarak={10} />
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            umur: x
                        })
                    }} label="Kelompok Umur" data={[
                        { label: '40-44', value: '40-44' },
                        { label: '45-49', value: '45-49' },
                        { label: '50-54', value: '50-54' },
                        { label: '55-59', value: '55-59' },
                        { label: '60-64', value: '60-64' },
                        { label: '65-69', value: '65-69' },
                        { label: '70-74', value: '70-74' },

                    ]} />
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
                    <MyGap jarak={10} />
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            jenis_kelamin: x
                        })
                    }} label="Jenis Kelamin" data={[
                        { label: 'Laki-laki', value: 'Laki-laki' },
                        { label: 'Perempuan', value: 'Perempuan' },

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
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            jenis_kelamin: x
                        })
                    }} label="Jenis Kelamin" data={[
                        { label: 'Laki-laki', value: 'Laki-laki' },
                        { label: 'Perempuan', value: 'Perempuan' },

                    ]} />
                    <MyGap jarak={10} />
                    <MyInput onChangeText={x => {
                        setKirim({
                            ...kirim,
                            tensi: x
                        })
                    }} label="Tensi (mmHg)" keyboardType='number-pad' />
                    <MyGap jarak={10} />
                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            umur: x
                        })
                    }} label="Kelompok Umur" data={[
                        { label: '40-44', value: '40-44' },
                        { label: '45-49', value: '45-49' },
                        { label: '50-54', value: '50-54' },
                        { label: '55-59', value: '55-59' },
                        { label: '60-64', value: '60-64' },
                        { label: '65-69', value: '65-69' },
                        { label: '70-74', value: '70-74' },

                    ]} />
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
                <MyButton onPress={sendServer} warna={colors.danger} title="Simpan" Icons="shield-checkmark-outline" />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})