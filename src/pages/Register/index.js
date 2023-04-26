import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    Picker,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, apiURLNEW } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);



    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('Email is Not Correct');
            setData({ ...data, email: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, email: text });
            setValid(true);
            // console.log('Email is Correct');
        }
    };

    const [kecamatan, setKecamatan] = useState([]);
    const [desa, setDesa] = useState([]);
    useEffect(() => {
        axios.post(apiURLNEW + 'kecamatan').then(res => {
            console.log('data kecamatan', res.data);
            setData({
                ...data,
                kecamatan: res.data[0].value
            });

            setKecamatan(res.data)
            getDesa(res.data[0].value)
        })
    }, []);

    const getDesa = (x) => {

        axios.post(apiURLNEW + 'desa', {
            kecamatan: x
        }).then(d => {
            console.log(d.data);
            setData({
                ...data,
                desa: d.data[0].value
            });
            setDesa(d.data);
        })

    }

    const [data, setData] = useState({
        nik: '',
        nama_lengkap: '',
        nik_alamat: '',
        telepon: '',
        alamat: '',
        kecamatan: '',
        desa: ''
    });

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        if (!isEnabled) {
            setIsEnabled(true);
            setData({
                ...data,
                alamat: data.nik_alamat
            })
        } else {
            setIsEnabled(false);
            setData({
                ...data,
                alamat: ''
            })
        }
    };

    const simpan = () => {
        if (
            data.nik.length === 0 &&
            data.nama_lengkap.length === 0 &&
            data.tlepon.length === 0 &&
            data.alamat.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Maaf Semua Field Harus Di isi !',
            });
        } else if (data.nik.length === 0) {
            showMessage({
                message: 'Maaf nik masih kosong !',
            });
        } else if (data.nik.length !== 16) {
            showMessage({
                message: 'Maaf nik harus 16 digit !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Maaf email masih kosong !',
            });
        }
        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Maaf nama kucing masih kosong !',
            });
        } else if (data.alamat.length === 0) {
            showMessage({
                message: 'Maaf nama kucing masih kosong !',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Maaf Password masih kosong !',
            });
        } else {
            setLoading(true);
            console.log(data);
            axios
                .post(apiURL + 'register.php', data)
                .then(res => {
                    console.warn(res.data);
                    let err = res.data.split('#');

                    // console.log(err[0]);
                    if (err[0] == 50) {
                        setTimeout(() => {
                            setLoading(false);
                            showMessage({
                                message: err[1],
                                type: 'danger',
                            });
                        }, 1200);
                    } else {
                        setTimeout(() => {
                            navigation.replace('Login');
                            showMessage({
                                message: 'Pendaftaran user berhasil',
                                type: 'success',
                            });
                        }, 1200);
                    }
                });
        }
    };
    return (
        <ImageBackground
            style={{
                flex: 1,
                padding: 10,
                backgroundColor: colors.primary
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <MyGap jarak={10} />
                <MyInput

                    label="NIK Kepala Keluarga"
                    iconname="card"
                    value={data.nik}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nik: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput

                    label="Nama Lengkap"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput

                    label="Telepon"
                    iconname="call"
                    keyboardType="number-pad"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput

                    label="Alamat NIK"
                    iconname="home"
                    value={data.nik_alamat}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nik_alamat: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black
                    }}>Alamat Domisili sama dengan alamat NIK ?</Text>
                    <Switch
                        trackColor={{ false: colors.black, true: colors.success }}
                        thumbColor={isEnabled ? colors.secondary : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <MyGap jarak={10} />
                <MyInput

                    label="Alamat Domisili"
                    iconname="home"
                    value={data.alamat}
                    onChangeText={value =>
                        setData({
                            ...data,
                            alamat: value,
                        })
                    }
                />
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
                        Kecamatan / Puskesmas
                    </Text>
                </View>
                <View style={{
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    elevation: 3,
                }}>
                    <Picker onValueChange={x => {
                        setData({
                            ...data,
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
                    <Picker onValueChange={x => {
                        setData({
                            ...data,
                            desa: x
                        })
                    }}>

                        {desa.map(i => {
                            return <Picker.Item value={i.value} label={i.label} />
                        })}


                    </Picker>
                </View>
                <MyGap jarak={10} />
                <MyInput

                    label="Password"
                    iconname="key"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={20} />
                {!loading &&
                    <MyButton
                        colorText={colors.primary}
                        iconColor={colors.primary}
                        warna={colors.btn_primary}
                        title="REGISTER"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <MyGap jarak={20} />

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
