import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage';
import YoutubePlayer from "react-native-youtube-iframe";


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
                backgroundColor: colors.secondary,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 5,
                padding: 10,
                borderWidth: 1,
            }}>

                <Image source={require('../../assets/A4.png')} style={{
                    width: '100%',
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    color: colors.white,
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
        <View style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
                backgroundColor: colors.secondary,
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
                backgroundColor: colors.primary
            }}>
                <FlatList numColumns={2} data={data} renderItem={__renderItem} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({})