import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Image,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { apiURL } from '../../utils/localStorage';
const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
export default function ({ navigation, route }) {

    console.warn(route.params);


    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataBarang();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {




        getDataBarang();

    }, []);

    const getDataBarang = () => {

        axios
            .post(apiURL + '/data_obat.php', {
                nik_ktp: route.params.nik_ktp,
            })
            .then(x => {
                console.log(x.data);
                setData(x.data);
            });

    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
                elevation: 1,
            }}>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <Text
                    style={{
                        flex: 1,
                        fontSize: windowWidth / 30,
                        color: colors.primary,
                        fontFamily: fonts.secondary[600],
                    }}>
                    Tanggal Kontrol
                </Text>
                <Text
                    style={{
                        flex: 1,
                        fontSize: windowWidth / 30,
                        color: colors.black,
                        fontFamily: fonts.secondary[600],
                    }}>
                    {item.tanggal}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>

                <View style={{
                    flex: 1,
                }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                        }}>
                        BB bulan 1
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                        }}>
                        {item.berat_1}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                        }}>
                        BB bulan 2
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                        }}>
                        {item.berat_2}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                        }}>
                        BB bulan 3
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                        }}>
                        {item.berat_3}
                    </Text>
                </View>

            </View>

            <View style={{ flexDirection: 'row', padding: 10 }}>

                <View style={{
                    flex: 1,
                }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                        }}>
                        BB bulan 4
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                        }}>
                        {item.berat_4}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                        }}>
                        BB bulan 5
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                        }}>
                        {item.berat_5}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            fontFamily: fonts.secondary[600],
                        }}>
                        BB bulan 6
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: windowWidth / 30,
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                        }}>
                        {item.berat_6}
                    </Text>
                </View>

            </View>


        </TouchableOpacity>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.primary]}
                />
            }
            style={{
                padding: 10,
            }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
