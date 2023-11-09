import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Picker,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, apiURLNEW, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        // setLoading(true);
        console.log(kirim);
        axios.post(apiURLNEW + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                storeData('user', res.data.data);
                navigation.replace('Home');
            }
        })
    }

    const [kecamatan, setKecamatan] = useState([]);
    const [desa, setDesa] = useState([]);

    useEffect(() => {

        axios.post(apiURLNEW + 'kecamatan').then(res => {
            console.log('kec', route.params.kecamatan)
            getDesa(route.params.kecamatan)
            setKecamatan(res.data)
        })

    }, []);

    const getDesa = (x) => {

        axios.post(apiURLNEW + 'desa', {
            kecamatan: x
        }).then(d => {
            console.log(d.data);
            setDesa(d.data);
        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>



                <MyInput label="Nama Lengkap" iconname="person" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />
                <MyGap jarak={10} />
                <MyInput label="NIK" maxLength={16} keyboardType='number-pad' iconname="card" value={kirim.nik} onChangeText={x => setKirim({ ...kirim, nik: x })} />
                <MyGap jarak={10} />
                <MyInput label="Telepon" iconname="call" keyboardType="phone-pad" value={kirim.telepon} onChangeText={x => setKirim({ ...kirim, telepon: x })} />
                <MyGap jarak={10} />
                <MyInput label="Alamat NIK" iconname="location" value={kirim.nik_alamat} onChangeText={x => setKirim({ ...kirim, nik_alamat: x })} />
                <MyGap jarak={10} />
                <MyInput label="Alamat Domisili" iconname="location" value={kirim.alamat} onChangeText={x => setKirim({ ...kirim, alamat: x })} />
                <MyGap jarak={10} />

                <MyGap jarak={10} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 3,
                    }}>
                    <Icon type="ionicon" name="map" color={colors.black} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            left: 10,
                            fontSize: 14,

                        }}>
                        Kecamatan
                    </Text>
                </View>
                <View style={{
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    elevation: 3,
                }}>
                    <Picker selectedValue={kirim.kecamatan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            kecamatan: x
                        });

                        getDesa(x);
                    }}>

                        {kecamatan.map(i => {
                            return <Picker.Item value={i.value} label={i.label} />
                        })}


                    </Picker>
                </View>
                <MyGap jarak={10} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 3,
                    }}>
                    <Icon type="ionicon" name="map" color={colors.black} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            left: 10,
                            fontSize: 14,

                        }}>
                        Desa
                    </Text>
                </View>
                <View style={{
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    elevation: 3,
                }}>
                    <Picker selectedValue={kirim.desa} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            desa: x
                        })
                    }}>

                        {desa.map(i => {
                            return <Picker.Item value={i.value} label={i.label} />
                        })}


                    </Picker>
                </View>
                <MyGap jarak={10} />
                <MyGap jarak={10} />

                <MyInput label="Password" iconname="key" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.secondary} size="large" />}

                {!loading && <MyButton warna={colors.btn_primary} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})