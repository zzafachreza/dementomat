import { StyleSheet, Text, Dimensions, View, TouchableOpacity, FlatList, Image, SafeAreaView, Switch, Alert, Picker } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyGap, MyInput } from '../../components';
import { apiURL } from '../../utils/localStorage';

import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
export default function SObat({ navigation, route }) {

    const item = route.params;
    const [bta, setBta] = useState('');
    const [kirim, setKirim] = useState(route.params);
    const [date, setDate] = useState(new Date())
    const [openDate, setOpenDate] = useState(false)

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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 3,
                        }}>
                        <Icon type="ionicon" name="calendar" color={colors.secondary} size={16} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.secondary,
                                left: 10,
                                fontSize: 14,

                            }}>
                            Tanggal Kontrol
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
                        }}>{kirim.tanggal_control}</Text>
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
                                tanggal_control: yyyy + '-' + mm + '-' + dd
                            })

                        }}
                        onCancel={() => {
                            setOpenDate(false)
                        }}
                    />
                    <MyGap jarak={10} />
                    <MyInput value={kirim.gejala_awal} onChangeText={x => setKirim({
                        ...kirim,
                        gejala_awal: x
                    })} label="Apakah Gejala awal berkurang setelah minum obat ?" iconname="search" placeholder="Masukan jawaban" />
                    <MyGap jarak={10} />

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 3,
                        }}>
                        <Icon type="ionicon" name="create-outline" color={colors.secondary} size={16} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.secondary,
                                left: 10,
                                fontSize: 14,

                            }}>
                            Gejala saat ini ?
                        </Text>
                    </View>

                    {/* mual */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Mual
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.mual} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    mual: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>
                    {/* pipis merah */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Pipis Merah
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.pipis_merah} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    pipis_merah: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>

                    {/* pipis merah */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Pendengan Menurun
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.pendengaran_menurun} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    pendengaran_menurun: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>

                    {/* pipis merah */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Penglihatan Menurun
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.penglihatan_menurun} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    penglihatan_menurun: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>

                    {/* pipis merah */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Pegal - Pegal
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.pegal_pegal} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    pegal_pegal: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>

                    {/* pipis merah */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Batuk
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.batuk} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    batuk: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>

                    {/* pipis merah */}
                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 3,
                            }}>

                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.secondary,
                                    left: 10,
                                    fontSize: 14,

                                }}>
                                Demam
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.white,
                            borderRadius: 5,
                            elevation: 3,
                        }}>
                            <Picker selectedValue={kirim.demam} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    demam: x
                                })
                            }}>
                                <Picker.Item value="TIDAK" label="TIDAK" />
                                <Picker.Item value="YA" label="YA" />
                            </Picker>
                        </View>
                    </View>


                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 3,
                        }}>
                        <Icon type="ionicon" name="create-outline" color={colors.secondary} size={16} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.secondary,
                                left: 10,
                                fontSize: 14,

                            }}>
                            Berat Badan :
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            flex: 1,
                            padding: 5
                        }}>
                            <MyInput value={kirim.bulan_1} onChangeText={x => setKirim({
                                ...kirim,
                                bulan_1: x
                            })} iconname="barbell-outline" label="Bulan 1" placeholder="Kg" />
                        </View>

                        <View style={{
                            flex: 1,
                            padding: 5
                        }}>
                            <MyInput value={kirim.bulan_2} onChangeText={x => setKirim({
                                ...kirim,
                                bulan_2: x
                            })} iconname="barbell-outline" label="Bulan 2" placeholder="Kg" />
                        </View>

                        <View style={{
                            flex: 1,
                            padding: 5
                        }}>
                            <MyInput value={kirim.bulan_3} onChangeText={x => setKirim({
                                ...kirim,
                                bulan_3: x
                            })} iconname="barbell-outline" label="Bulan 3" placeholder="Kg" />
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            flex: 1,
                            padding: 5
                        }}>
                            <MyInput value={kirim.bulan_4} onChangeText={x => setKirim({
                                ...kirim,
                                bulan_4: x
                            })} iconname="barbell-outline" label="Bulan 4" placeholder="Kg" />
                        </View>

                        <View style={{
                            flex: 1,
                            padding: 5
                        }}>
                            <MyInput value={kirim.bulan_5} onChangeText={x => setKirim({
                                ...kirim,
                                bulan_5: x
                            })} iconname="barbell-outline" label="Bulan 5" placeholder="Kg" />
                        </View>

                        <View style={{
                            flex: 1,
                            padding: 5
                        }}>
                            <MyInput value={kirim.bulan_6} onChangeText={x => setKirim({
                                ...kirim,
                                bulan_6: x
                            })} iconname="barbell-outline" label="Bulan 6" placeholder="Kg" />
                        </View>

                    </View>



                    <MyButton onPress={() => {

                        console.log(kirim)
                        axios.post(apiURL + 'add_obat.php', kirim).then(res => {
                            console.log(res.data);
                            navigation.replace('Home')
                            Alert.alert('Demen Tomat', 'Berhasil disimpan !')
                        })




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