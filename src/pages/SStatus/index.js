import { Alert, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fonts, windowHeight, windowWidth } from '../../utils'
import axios from 'axios'
import { MYAPP, apiURL, apiURLNEW, getData } from '../../utils/localStorage';
import YoutubePlayer from "react-native-youtube-iframe";
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components';
import DatePicker from 'react-native-date-picker'
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import ProgressCircle from 'react-native-progress-circle'

export default function SStatus({ navigation }) {

    const [date, setDate] = useState(new Date())
    const [openDate, setOpenDate] = useState(false)
    const [open, setOpen] = useState(false);
    const isFocused = useIsFocused();
    const [kirim, setKirim] = useState({
        jenis_kelamin: 'Laki-laki',
        tanggal_lahir: moment().format('YYYY-MM-DD')
    });
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [kecamatan, setKecamatan] = useState({
        nama: '',
        telepon: '',
        puskesmas: ''
    })



    const __renderItem = ({ item }) => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 5,
                padding: 10,
                elevation: 3,

            }}>
                <View style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('KeluargaEdit', item)} style={{
                        paddingHorizontal: 10,
                        backgroundColor: colors.primary,
                        width: 80,
                        marginHorizontal: 5,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        alignContent: 'center'
                    }}>
                        <Text style={{
                            color: colors.white,
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600]
                        }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('Hapus Keluarga', 'Apakah kamu akan hapus keluarga' + item.nama_keluarga + ' ?', [

                        { text: 'BATAL' },
                        {
                            text: 'HAPUS', onPress: () => {
                                axios.post(apiURLNEW + 'keluarga_delete', {
                                    id: item.id
                                }).then(res => {
                                    showMessage({
                                        type: 'success',
                                        message: 'Berhasil dihapus !'
                                    })
                                    getMyFirst();
                                })
                            }
                        }

                    ])} style={{
                        paddingHorizontal: 10,
                        backgroundColor: colors.black,
                        width: 80,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        alignContent: 'center'
                    }}>
                        <Text style={{
                            color: colors.white,
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600]
                        }}>Hapus</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{
                            color: colors.secondary,
                            fontFamily: fonts.secondary[600],
                        }}>NIK</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>{item.nik_ktp}</Text>
                        <Text style={{
                            color: colors.secondary,
                            fontFamily: fonts.secondary[600],
                        }}>Nama Anggota Keluarga</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>{item.nama_keluarga}</Text>
                        <Text style={{
                            color: colors.secondary,
                            fontFamily: fonts.secondary[600],
                        }}>Jenis Kelamin</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>{item.jenis_kelamin}</Text>
                        <Text style={{
                            color: colors.secondary,
                            fontFamily: fonts.secondary[600],
                        }}>Tanggal Lahir</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>{moment(item.tanggal_lahir).format('dddd, DD MMMM YYYY')}</Text>
                        <Text style={{
                            color: colors.secondary,
                            fontFamily: fonts.secondary[600],
                        }}>Umur</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                        }}>{item.umur}</Text>



                    </View>


                </View>


                {/* button screening */}
                <View style={{
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 10,
                    borderColor: colors.success,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.success,
                        fontSize: 14,
                        marginBottom: 10,
                    }}>SKRINING KESEHATAN TBC </Text>
                    <Text style={{
                        color: colors.secondary,
                        fontFamily: fonts.secondary[600],
                    }}>Klasifikasi TB</Text>
                    <Text style={{
                        color: colors.secondary,
                        fontFamily: fonts.secondary[400],
                    }}>{item.klasifikasi}</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            {item.status_keluarga == "Belum Mengisi" && <MyButton onPress={() => {
                                if (item.tahun < 17) {
                                    navigation.navigate('SCek2', item);
                                } else {
                                    navigation.navigate('SCek', item);
                                }
                            }} title="Skrining TBC" warna={colors.success} Icons="shield-checkmark-outline" />
                            }


                            {item.status_keluarga == "Dalam Pengobatan" &&
                                <View style={{
                                    // flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        paddingRight: 1,
                                    }}>
                                        <MyButton onPress={() => {
                                            // alert(item.tahun)
                                            if (item.tahun < 17) {
                                                navigation.navigate('SCek2', item);
                                            } else {
                                                navigation.navigate('SCek', item);
                                            }
                                        }} title="Skrining TBC" warna={colors.success} Icons="shield-checkmark-outline" />
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        paddingLeft: 1,
                                    }}>
                                        <MyButton onPress={() => {
                                            navigation.navigate('SObat', item);
                                        }} title="Pemantauan Obat" warna={colors.danger} Icons="shield-checkmark-outline" />
                                    </View>
                                </View>}

                            {item.status_keluarga == "Wajib menghubungi Kader / Petugas Puskesmas" && <View style={{
                                // flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1,

                                }}>
                                    <MyButton onPress={() => {
                                        if (item.tahun < 17) {
                                            navigation.navigate('SCek2', item);
                                        } else {
                                            navigation.navigate('SCek', item);
                                        }
                                    }} title="Skrining TBC" warna={colors.success} Icons="shield-checkmark-outline" />
                                </View>
                                <View style={{
                                    flex: 1,
                                    marginTop: 10,

                                }}><MyButton onPress={() => {
                                    navigation.navigate('SCekDahak', item);
                                }} title="Cek Dahak" warna={colors.black} Icons="shield-checkmark-outline" />
                                </View>

                            </View>
                            }


                        </View>


                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}>

                            <View style={{
                                borderRadius: 40,
                                borderWidth: 3,
                                borderColor: colors.black,
                                backgroundColor: item.status_keluarga == "Wajib menghubungi Kader / Petugas Puskesmas" ? 'red' : item.status_keluarga == "Aman" ? 'green' : item.status_keluarga == "Dalam Pengobatan" ? 'yellow' : 'white',
                                elevation: 3,
                                width: 80,
                                height: 80
                            }} />
                            <Text style={{
                                color: colors.black,
                                textAlign: 'center',
                                fontSize: 12,
                                fontFamily: fonts.secondary[400],
                            }}>{item.status_keluarga}</Text>


                            {item.status_keluarga == "Wajib menghubungi Kader / Petugas Puskesmas" && <TouchableOpacity style={{
                                padding: 10,
                                marginVertical: 5,
                                backgroundColor: colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                flexDirection: 'row'
                            }} onPress={() => Linking.openURL('https://wa.me/' + kecamatan.telepon)}>
                                <View style={{
                                    marginHorizontal: 5,
                                }}>
                                    <Icon name='logo-whatsapp' type='ionicon' size={14} color={colors.white} />
                                </View>
                                <View>
                                    <Text style={{
                                        color: colors.white,
                                        fontFamily: fonts.secondary[600]
                                    }}>{kecamatan.nama}</Text>
                                </View>
                            </TouchableOpacity>}

                        </View>
                    </View>

                </View>



                {item.status_keluarga == "Aman" &&
                    < MyButton onPress={() => {
                        if (item.tahun < 17) {
                            navigation.navigate('SCek2', item);
                        } else {
                            navigation.navigate('SCek', item);
                        }
                    }} title="Skrining" warna={colors.success} Icons="shield-checkmark-outline" />
                }

                {/* CEK KESEHATAN JANTUNG */}
                {item.status_keluarga !== "Belum Mengisi" && <View style={{
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 10,
                    borderColor: colors.danger,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.danger,
                        fontSize: 14,
                        marginBottom: 10,
                    }}>SCRINING KESEHATAN JANTUNG</Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyButton warna={colors.danger} Icons="fitness" title="Skrining Jantung" onPress={() => {
                                Alert.alert(MYAPP, 'TAHAPAN SKRINING', [
                                    { text: 'KEMBALI' },
                                    {
                                        text: 'TANPA HASIL LABORATORIUM',
                                        onPress: () => navigation.navigate('Screening', {
                                            jenis: 'TANPA HASIL LABORATORIUM',
                                            data: item
                                        })
                                    },
                                    {
                                        text: 'DENGAN HASIL LABORATORIUM',
                                        onPress: () => navigation.navigate('Screening', {
                                            jenis: 'DENGAN HASIL LABORATORIUM',
                                            data: item
                                        })
                                    },
                                ])
                            }} />

                            <MyGap jarak={10} />

                            <MyButton onPress={() => {
                                Alert.alert(MYAPP, 'RIWAYAT SKRINING', [
                                    { text: 'KEMBALI' },
                                    {
                                        text: 'RIWAYAT TANPA HASIL LABORATORIUM',
                                        onPress: () => navigation.navigate('ScreeningData', {
                                            jenis: 'TANPA HASIL LABORATORIUM',
                                            data: item
                                        })
                                    },
                                    {
                                        text: 'RIWAYAT DENGAN HASIL LABORATORIUM',
                                        onPress: () => navigation.navigate('ScreeningData', {
                                            jenis: 'DENGAN HASIL LABORATORIUM',
                                            data: item
                                        })
                                    },
                                ])
                            }} borderColor={colors.danger} Icons="receipt" iconColor={colors.danger} borderSize={1} title="Riwayat Jantung" colorText={colors.danger} />


                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ProgressCircle
                                percent={item.skor}
                                radius={40}
                                borderWidth={5}
                                color={colors.danger}
                                shadowColor={colors.secondary}
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 20 }}>{`${item.skor}%`}</Text>
                            </ProgressCircle>
                            {item.skor >= 20 && <TouchableOpacity style={{
                                padding: 10,
                                marginVertical: 5,
                                backgroundColor: colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                flexDirection: 'row'
                            }} onPress={() => Linking.openURL('https://wa.me/' + kecamatan.telepon)}>
                                <View style={{
                                    marginHorizontal: 5,
                                }}>
                                    <Icon name='logo-whatsapp' type='ionicon' size={14} color={colors.white} />
                                </View>
                                <View>
                                    <Text style={{
                                        color: colors.white,
                                        fontFamily: fonts.secondary[600]
                                    }}>{kecamatan.nama}</Text>
                                </View>
                            </TouchableOpacity>}
                        </View>
                    </View>
                    <View style={{
                        padding: 5,
                    }}>
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
                </View>}

            </View>
        )
    }

    useEffect(() => {

        if (isFocused) {
            getMyFirst();

        }
    }, [isFocused]);


    const getMyFirst = () => {
        getData('user').then(user => {
            setUser(user);

            axios.post(apiURLNEW + 'kontak', {
                kecamatan: user.kecamatan
            }).then(res => {
                {

                    console.log(res.data);
                    setKecamatan({
                        nama: res.data[0].nama,
                        telepon: res.data[0].telepon,
                        puskesmas: res.data[0].puskesmas
                    })

                }
            })

            setKirim({
                ...kirim,
                nik_keluarga: user.nik
            });
            getDataKeluarga(user.nik);


        })
    }

    const getDataKeluarga = (x) => {
        axios.post(apiURLNEW + 'keluarga', {
            nik: x
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        });
    }


    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            flex: 1,
        }}>

            <ScrollView style={{
                flex: 1,
            }}>
                {!open && <View style={{
                    flex: 1,
                    paddingTop: 10,

                }}>
                    <FlatList data={data} renderItem={__renderItem} />
                </View>}

                {/* open modal */}

                {open && <View style={{
                    flex: 1,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: colors.secondary,
                    margin: 10,
                    borderRadius: 10,
                    elevation: 4,
                    backgroundColor: colors.primary

                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.secondary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                color: colors.white
                            }}>Tambah Anggota Keluarga</Text>
                        </View>
                        <TouchableOpacity onPress={() => setOpen(false)} style={{
                            padding: 10,
                            backgroundColor: colors.secondary,
                        }}>
                            <Icon type="ionicon" name="close" color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    {/* form */}

                    <View style={{
                        padding: 10,
                    }}>
                        <MyInput
                            placeholder="Masukan nama lengkap"
                            label="Nama Lengkap"
                            iconname="person"
                            value={data.nama_keluarga}
                            onChangeText={value =>
                                setKirim({
                                    ...kirim,
                                    nama_keluarga: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />
                        <MyInput

                            label="NIK"
                            maxLength={16} keyboardType='number-pad'
                            placeholder="Masukan NIK harus 16 Digit"
                            iconname="card"

                            onChangeText={value =>
                                setKirim({
                                    ...kirim,
                                    nik_ktp: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />
                        <MyCalendar label="Tanggal Lahir" iconname="calendar" onDateChange={x => {
                            setKirim({
                                ...kirim,
                                tanggal_lahir: x
                            })
                        }} />
                        <MyGap jarak={10} />
                        <MyPicker label="Jenis Kelamin" data={[
                            { label: 'Laki-laki', value: 'Laki-laki' },
                            { label: 'Perempuan', value: 'Perempuan' },
                        ]} iconname="male-female" onValueChange={x => {
                            setKirim({
                                ...kirim,
                                jenis_kelamin: x
                            })
                        }} />



                        <MyGap jarak={10} />
                        <MyButton onPress={() => {
                            console.log(kirim)

                            if (kirim.nik_ktp.length !== 16) {
                                Alert.alert('SI DEMEN TOMAT DAN TERASI', 'Nik harus 16 digit !')
                            } else if (kirim.tanggal_lahir == moment().format('YYYY-MM-DD')) {
                                Alert.alert('SI DEMEN TOMAT DAN TERASI', 'Cek Kembali tanggal lahir')
                            } else {
                                axios.post(apiURLNEW + 'add_keluarga', kirim).then(res => {
                                    console.log(res.data);
                                    setOpen(false);
                                    getDataKeluarga(user.nik)
                                })
                            }


                        }} Icons="checkmark-circle-outline" warna={colors.btn_primary} colorText={colors.primary} iconColor={colors.primary} title="Simpan" />
                    </View>
                </View>}

                {/* open modal */}


            </ScrollView>
            {!open && <View style={{
                padding: 10,
                backgroundColor: colors.primary
            }}>
                <MyButton onPress={() => setOpen(true)} Icons="add-circle-outline" warna={colors.btn_primary} colorText={colors.primary} iconColor={colors.primary} title="Tambah Anggota Keluaga" />
            </View>}
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})