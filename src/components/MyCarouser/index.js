import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { apiURL } from '../../utils/localStorage';


export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();



  const [data, setData] = useState([
    {
      image: require('../../assets/s1.png')
    }, {
      image: require('../../assets/s2.png')
    }, {
      image: require('../../assets/s3.png')
    }, {
      image: require('../../assets/s4.png')
    }, {
      image: require('../../assets/s5.png')
    }, {
      image: require('../../assets/s6.png')
    }, {
      image: require('../../assets/s7.png')
    }
  ]);

  const renderCarouselItem = ({ item }) => (
    <Image
      source={item.image}
      style={{
        resizeMode: 'cover',
        height: 180,
        width: 300,
        borderRadius: 10,
      }}
    />
  );

  return (
    <View>
      <Carousel
        loop={true}
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: colors.black,
    opacity: 1,
    height: 250,
    width: 300,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  cardImage: {
    height: 250,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
