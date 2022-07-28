import { StyleSheet, Text, Dimensions, View, TouchableOpacity, FlatList, Image, SafeAreaView, Switch, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyGap, MyInput } from '../../components';
import { apiURL } from '../../utils/localStorage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function SCekDahak({ navigation, route }) {

    const item = route.params;
    const [bta, setBta] = useState('');
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





    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

    const options = {
        includeBase64: true,
        quality: 0.3,
    };

    const getCamera = xyz => {
        launchCamera(options, response => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                let source = { uri: response.uri };
                switch (xyz) {
                    case 1:
                        setfoto(`data:${response.type};base64, ${response.base64}`)
                        break;
                }
            }
        });
    };

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            console.log('All Response = ', response);

            console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 200000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setfoto(`data:${response.type};base64, ${response.base64}`)
                            break;
                    }
                } else {
                    Alert.alert('Dement Tomat', 'Ukuran Foto Terlalu Besar Max 500 KB')
                }
            }
        });
    };

    const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    elevation: 2,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>

                <View
                    style={{
                    }}>

                    <Image
                        source={{
                            uri: foto,
                        }}
                        style={{
                            width: '100%',
                            aspectRatio: 2,
                            resizeMode: 'contain',
                        }}
                    />

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                                flex: 1,
                                paddingRight: 5,
                            }}>
                            <MyButton
                                onPress={onPress1}
                                colorText={colors.white}
                                title="KAMERA"
                                warna={colors.primary}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingLeft: 5,
                            }}>
                            <MyButton
                                onPress={onPress2}
                                title="GALLERY"
                                colorText={colors.white}
                                warna={colors.secondary}
                            />
                        </View>
                    </View>



                </View>
            </View>
        );
    };
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

                    <UploadFoto
                        onPress1={() => getCamera(1)}
                        onPress2={() => getGallery(1)}
                        label="Upload Bukti Foto"
                        foto={foto}
                    />
                    <MyGap jarak={20} />
                    <MyButton onPress={() => {



                        if (foto.length == 0) {
                            Alert.alert('Informasi Demen Tomat', 'BTA Wajib di isi !');
                        } else {
                            axios.post(apiURL + 'update_pengobatan.php', {
                                nik_ktp: item.nik_ktp,
                                bta: foto
                            }).then(res => {
                                Alert.alert('Demen Tomat', 'Menunggu validasi BTA')
                                console.log(res.data);
                                navigation.goBack()
                            })
                        }



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