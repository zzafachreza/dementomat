import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils';
import { MyButton, MyGap, MyInput } from '../../components';
import DatePicker from 'react-native-date-picker'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { apiURLNEW } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
export default function KeluargaEdit({ navigation, route }) {

    const [kirim, setKirim] = useState(route.params);
    const [date, setDate] = useState(new Date(route.params.tanggal_lahir))
    const [openDate, setOpenDate] = useState(false)
    const [open, setOpen] = useState(false);
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.primary
        }}>
            <ScrollView>
                <MyInput label="NIK KTP" iconname="card" value={kirim.nik_ktp} onChangeText={x => setKirim({ ...kirim, nik_ktp: x })} />
                <MyGap jarak={10} />
                <MyInput label="Nama Lengkap" iconname="person" value={kirim.nama_keluarga} onChangeText={x => setKirim({ ...kirim, nama_keluarga: x })} />
                <MyGap jarak={10} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 3,
                    }}>
                    <Icon type="ionicon" name="calendar" color={colors.black} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            left: 10,
                            fontSize: 14,

                        }}>
                        Tanggal Lahir
                    </Text>
                </View>
                <TouchableOpacity onPress={() => setOpenDate(true)} style={{
                    backgroundColor: colors.white,
                    width: '100%',
                    height: 50,
                    borderRadius: 5,
                    elevation: 3,
                }}>
                    <Text style={{
                        marginVertical: 15,
                        marginLeft: 10,
                        fontFamily: fonts.secondary[400],
                        fontSize: 14
                    }}>{kirim.tanggal_lahir}</Text>
                </TouchableOpacity>

                <DatePicker
                    modal
                    mode='date'
                    open={openDate}
                    date={date}
                    onConfirm={(date) => {
                        setOpenDate(false)
                        setDate(date)
                        // setKirim({
                        //     ...kirim,
                        //     tanggal_lahir: date
                        // })
                        console.log(date);

                        var today = new Date(date);
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();


                        today = yyyy + '-' + mm + '-' + dd;
                        console.log(today);

                        setKirim({
                            ...kirim,
                            tanggal_lahir: yyyy + '-' + mm + '-' + dd
                        })

                    }}
                    onCancel={() => {
                        setOpenDate(false)
                    }}
                />
                <MyGap jarak={20} />
                <MyButton onPress={() => {
                    console.log(kirim);
                    axios.post(apiURLNEW + 'keluarga_edit', kirim).then(res => {
                        console.log(res.data);
                        navigation.goBack();
                        showMessage({
                            type: 'success',
                            message: 'Data berhasil diupdate !'
                        })
                    })



                }} Icons="checkmark-circle-outline" warna={colors.btn_primary} colorText={colors.primary} iconColor={colors.primary} title="Simpan" />


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})