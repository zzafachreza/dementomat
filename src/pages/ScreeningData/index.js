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
import 'moment/locale/id';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native';


const ListData = ({ label, value }) => {
    return (
        <View style={{
            flexDirection: 'row', alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.border
        }}>
            <Text style={{
                marginVertical: 2,
                fontFamily: fonts.secondary[400],
                fontSize: 15,
                flex: 1,
            }}>{label}</Text>
            <Text style={{
                marginVertical: 2,
                fontFamily: fonts.secondary[600],
                fontSize: 15,
            }}>{value}</Text>
        </View>
    )
}

export default function ScreeningData({ navigation, route }) {

    const item = route.params;
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const __renderItemDENGAN = ({ item }) => {
        return (
            <View style={{
                padding: 10,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 10,
                marginVertical: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                <ListData label="Ada Diabetes" value={item.diabetes} />
                <ListData label="Gula Darah Sewaktu" value={item.gula + ' mg/dl'} />
                <ListData label="Kriteria Diagnosis Diabetes" value={item.status_diabetes} />
                <ListData label="Kolesterol" value={item.kolesterol + ' mg/dl'} />
                <ListData label="Tensi" value={item.tensi + ' mmHg'} />
                <ListData label="Kelompok Umur" value={item.umur + ' Tahun'} />
                <ListData label="Kebiasaan Merokok" value={item.merokok} />
                <ListData label="Jenis Kelamin" value={item.jenis_kelamin} />


                <View style={{
                    marginVertical: 10,
                    padding: 10,
                    width: 70,
                    borderRadius: 35,
                    alignSelf: 'center',
                    height: 70,
                    backgroundColor: item.warna,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>{item.skor}%</Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>Hasil</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 15,
                    }}>{item.hasil}</Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>Edukasi</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 15,
                    }}>{item.edukasi}</Text>
                </View>
            </View>
        )
    }
    const __renderItemTANPA = ({ item }) => {
        return (
            <View style={{
                padding: 10,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 10,
                marginVertical: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                <ListData label="Kebiasaan Merokok" value={item.merokok} />
                <ListData label="Jenis Kelamin" value={item.jenis_kelamin} />
                <ListData label="Tensi" value={item.tensi + ' mmHg'} />
                <ListData label="Kelompok Umur" value={item.umur + ' Tahun'} />
                <ListData label="Berat Badan" value={item.berat + ' kg'} />
                <ListData label="Tinggi Badan" value={item.tinggi + ' cm'} />
                <ListData label="Hasil IMT" value={item.imt} />
                <ListData label="Klasifikasi IMT" value={item.status_imt} />
                <View style={{
                    marginVertical: 10,
                    padding: 10,
                    width: 70,
                    borderRadius: 35,
                    alignSelf: 'center',
                    height: 70,
                    backgroundColor: item.warna,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>{item.skor}%</Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>Hasil</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 15,
                    }}>{item.hasil}</Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>Edukasi</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 15,
                    }}>{item.edukasi}</Text>
                </View>

            </View>
        )
    }

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused])

    const __getTransaction = () => {
        setLoading(true)
        axios.post(apiURLNEW + 'screening', {
            jenis: route.params.jenis,
            fid_nik: item.data.nik_ktp
        }).then(res => {

            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const [loading, setLoading] = useState(false);

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

            <View style={{
                padding: 10,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                marginBottom: 10,
            }}>

                <View style={{ marginVertical: 2 }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12 }}>Nama</Text>
                    <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12 }}>{item.data.nama_keluarga}</Text>
                </View>


            </View>

            {
                loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            }

            {
                item.jenis == 'DENGAN HASIL LABORATORIUM' && !loading && <>

                    <FlatList data={data} renderItem={__renderItemDENGAN} />

                </>
            }

            {
                item.jenis == 'TANPA HASIL LABORATORIUM' && !loading && <>

                    <FlatList data={data} renderItem={__renderItemTANPA} />


                </>
            }

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})