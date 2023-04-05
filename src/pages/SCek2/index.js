import { StyleSheet, Text, Dimensions, View, TouchableOpacity, FlatList, Image, SafeAreaView, Switch, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton } from '../../components';
import { apiURL } from '../../utils/localStorage';
import { ImageBackground } from 'react-native';


export default function SCek2({ navigation, route }) {

    const item = route.params;

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


    const [soal, setSoal] = useState([
        { 'pertanyaan': 'Apakah ada riwayat kontak dengan orang dewasa yang menderita batuk lama/pengobatan TB?', 'a': 'YA', 'b': 'TIDAK', 'betul': 'a' },
        { 'pertanyaan': 'Batuk lama >3 minggu', 'a': 'YA', 'b': 'TIDAK', 'betul': 'a' },
        { 'pertanyaan': 'Berat badan menurun', 'a': 'YA', 'b': 'TIDAK', 'betul': 'a' },
        { 'pertanyaan': 'Demam yang tidak diketahui sebabnya >2 minggu', 'a': 'YA', 'b': 'TIDAK', 'betul': 'a' },
        { 'pertanyaan': 'Benjolan di leher/ketiak/selangkangan', 'a': 'YA', 'b': 'TIDAK', 'betul': 'a' },
        { 'pertanyaan': 'Pembengkakan tulang/sendi', 'a': 'YA', 'b': 'TIDAK', 'betul': 'a' },




    ]);

    const [jawaban, setJawaban] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,

    });

    const [pilih, setPilih] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    });

    const MySoal = ({ no, tanya, a, b, c, d, jawab }) => {
        return (
            <View style={{
                marginHorizontal: 5,
            }} key={no}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>{no}. </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                        flex: 1
                    }}>{tanya}</Text>
                    <View style={{ marginVertical: 5, flexDirection: 'row' }}>

                        <TouchableOpacity style={pilih[no] == a ? styles.cek : styles.bulat} onPress={() => {
                            setJawaban({
                                ...jawaban,
                                [no]: jawab == 'a' ? 1 : 0
                            })

                            setPilih({
                                ...pilih,
                                [no]: a
                            })
                        }}
                        >
                            <Text style={pilih[no] == a ? styles.txtOK : styles.txt}>{a}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setJawaban({
                                ...jawaban,
                                [no]: jawab == 'b' ? 1 : 0
                            })
                            setPilih({
                                ...pilih,
                                [no]: b
                            })
                        }} style={pilih[no] == b ? styles.cek : styles.bulat}>
                            <Text style={pilih[no] == b ? styles.txtOK : styles.txt}>{b}</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View >

        )
    }


    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            flex: 1,
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
                {soal.map((item, index) => {
                    return (
                        <MySoal no={index + 1} tanya={item.pertanyaan} jawab={item.betul} a={item.a} b={item.b} c={item.c} d={item.d} img={item.image} />
                    )
                })}

                <View style={{
                    padding: 10,
                }}>
                    <MyButton onPress={() => {
                        console.log(jawaban)

                        if (jawaban[1] == 1 && jawaban[2] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })

                        } else if (jawaban[2] == 1 && jawaban[3] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else if (jawaban[2] == 1 && jawaban[4] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else if (jawaban[1] == 1 && jawaban[4] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else if (jawaban[5] == 1 && jawaban[6] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else if (jawaban[4] == 1 && jawaban[6] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else if (jawaban[4] == 1 && jawaban[5] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else if (jawaban[4] == 1 && jawaban[6] == 1) {
                            console.log('Wajib menghubungi Kader / Petugas Puskesmas');

                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Wajib menghubungi Kader / Petugas Puskesmas'
                            }).then(res => {
                                console.log(res.data);
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                navigation.goBack()
                            })



                        } else {
                            console.log('Aman');
                            axios.post(apiURL + 'update_status.php', {
                                nik_ktp: item.nik_ktp,
                                status_keluarga: 'Aman'
                            }).then(res => {
                                Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                                console.log(res.data);
                                navigation.goBack()
                            })
                        }
                    }} Icons="checkmark-circle-outline" title="Selesai" warna={colors.btn_primary} colorText={colors.primary} iconColor={colors.primary} />
                </View>
            </ScrollView>



        </ImageBackground>
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