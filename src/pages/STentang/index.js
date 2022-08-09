import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { ImageBackground } from 'react-native'

export default function STentang() {

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

            <MYListData title="Koordinator Puskesmas Kebakkramat 1" person="Suyamti - 0821-3531-3745" />
            <MYListData title="Bidan Desa Kemiri" person="SIndah - 0813-2925-3935" />
            <MYListData title="Bidan Desa Waru" person="Sri Maryatun - 0858-6749-5335" />
            <MYListData title="Bidan Desa Nangsri" person="Yuni - 0821-3438-0758" />
            <MYListData title="Bidan Desa Macanan" person="Witri - 0813-2924-6554" />
            <MYListData title="Bidan Desa Kebak" person="Vety - 0857-2840-2020" />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})