import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils';
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components';
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
                <MyInput label="NIK KTP" maxLength={16} keyboardType='number-pad' iconname="card" value={kirim.nik_ktp} onChangeText={x => setKirim({ ...kirim, nik_ktp: x })} />
                <MyGap jarak={10} />
                <MyInput label="Nama Lengkap" iconname="person" value={kirim.nama_keluarga} onChangeText={x => setKirim({ ...kirim, nama_keluarga: x })} />
                <MyGap jarak={10} />
                <MyCalendar value={kirim.tanggal_lahir} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })
                }} label="Tanggal Lahir" iconname="calendar" />
                <MyGap jarak={10} />
                <MyPicker label="Jenis Kelamin" value={kirim.jenis_kelamin} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })
                }} iconname="male-female" data={[
                    { label: 'Laki-laki', value: 'Laki-laki' },
                    { label: 'Perempuan', value: 'Perempuan' },
                ]} />
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