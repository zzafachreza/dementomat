import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { ImageBackground } from 'react-native'
import axios from 'axios';
import { apiURLNEW, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';

export default function STentang() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {

        getData('user').then(u => {
            axios.post(apiURLNEW + 'kontak', {
                kecamatan: u.kecamatan
            }).then(res => {
                {
                    setOpen(true);
                    console.log(res.data);
                    setData(res.data);
                }
            })
        })

    }, [])

    const MYListData = ({ title, person, kecamatan, telepon }) => {
        return (
            <View style={{
                marginVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.white,
                margin: 10,
                padding: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: windowWidth / 20,
                    }}>
                        {kecamatan}
                    </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 20,
                    }}>{person}</Text>
                </View>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/' + telepon)} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        borderRadius: 10,
                        height: 40,
                        backgroundColor: colors.success
                    }}>
                        <Icon type='ionicon' name='logo-whatsapp' color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            flex: 1,
        }}>

            {open && data.map(i => {
                return (
                    <MYListData kecamatan={i.puskesmas} title={i.judul} person={i.nama + " - " + i.telepon} telepon={i.telepon} />
                )
            })}

            {!open && <ActivityIndicator color={colors.white} />}

        </ImageBackground>
    )
}

const styles = StyleSheet.create({})