import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { ImageBackground } from 'react-native'
import axios from 'axios';
import { apiURLNEW } from '../../utils/localStorage';

export default function STentang() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {

        axios.post(apiURLNEW + 'kontak').then(res => {
            {
                setOpen(true);
                console.log(res.data);
                setData(res.data);
            }
        })

    }, [])

    const MYListData = ({ title, person }) => {
        return (
            <View style={{
                marginVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                }}>
                    {title}
                </Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 20,
                }}>{person}</Text>
            </View>
        )
    }
    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            flex: 1,
        }}>

            {open && data.map(i => {
                return (
                    <MYListData title={i.judul} person={i.nama + " - " + i.telepon} />
                )
            })}

            {!open && <ActivityIndicator color={colors.white} />}

        </ImageBackground>
    )
}

const styles = StyleSheet.create({})