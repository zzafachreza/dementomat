import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage';
import YoutubePlayer from "react-native-youtube-iframe";
import { ImageBackground } from 'react-native';


export default function SEdukasi() {

    const [data, setData] = useState([]);

    const __CekData = x => {

        setUrlyoutube(x);
        setPlaying(true);
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => __CekData(item.link)} style={{
                flex: 1,
                backgroundColor: colors.btn_primary,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 5,
                padding: 10,
                height: 200,

            }}>

                <Image source={require('../../assets/A4.png')} style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    color: colors.primary,
                    fontFamily: fonts.secondary[600],
                    textAlign: 'center'
                }}>{item.judul}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        axios.post(apiURL + 'youtube.php').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, []);

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);
    const [urlyoutube, setUrlyoutube] = useState('');
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,

            }}>
                <YoutubePlayer
                    height={windowHeight / 3}
                    play={playing}
                    videoId={urlyoutube}
                    onChangeState={onStateChange}
                />
            </View>
            <View style={{
                flex: 1.5,
                paddingTop: 10,

            }}>
                <FlatList numColumns={2} data={data} renderItem={__renderItem} />
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})