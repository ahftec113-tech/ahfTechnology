import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from '../Theme/Variables';
import { wp, hp } from '../Hooks/useResponsive';
// import { Ionicons } from '@expo/vector-icons';
import Video from 'react-native-video';
import {
  backIcon,
  heart,
  heartFilledLike,
  heartGray,
  picIcon,
  videoIcon,
} from '../Assets';
import useReduxStore from '../Hooks/UseReduxStore';
import NavigationService from '../Services/NavigationService';
import { imageUrl } from '../Utils/Urls';
import { favProject } from '../Redux/Action/FavProjectAction';
import { types } from '../Redux/types';
import { Touchable } from './Touchable';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

// Helper to check media type from URL
const getMediaType = url => {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.endsWith(ext))
    ? 'video'
    : 'image';
};

const ImageSliderComp = ({ media = [], onBack, onLike, item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Detect media types from URLs
  const processedMedia = media.map(url => ({
    url,
    type: getMediaType(url),
  }));

  const imagesCount = processedMedia.filter(
    item => item.type === 'image',
  ).length;
  const videosCount = processedMedia.filter(
    item => item.type === 'video',
  ).length;

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const { dispatch, getState, queryClient } = useReduxStore();

  const onImagePress = () => {
    dispatch({
      payload: media,
      type: types.openModal,
    });
  };

  const { favProjects } = getState('favProjects');

  return (
    <View style={styles.container}>
      {/* Media Carousel */}
      <FlatList
        data={processedMedia}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Touchable style={{ width }} onPress={onImagePress}>
            {item.type === 'image' ? (
              <FastImage
                source={{ uri: imageUrl(item.url) }}
                style={styles.image}
                resizeMode="cover"
                // on={e => console.log(e, 'lskdnvklsdnvklnsdvds')}
              />
            ) : (
              <Video
                source={{ uri: imageUrl(item.url) }}
                style={styles.image}
                resizeMode="cover"
                paused={currentIndex !== index}
                repeat
                controls
              />
            )}
          </Touchable>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => NavigationService.goBack()}
      >
        <Image
          source={backIcon}
          resizeMode="contain"
          style={{ width: wp('5'), height: hp('3') }}
          tintColor={'black'}
        />
      </TouchableOpacity>

      {/* Like Button */}
      <TouchableOpacity
        style={styles.likeBtn}
        onPress={() => dispatch(favProject(item?.id))}
      >
        <Image
          source={
            favProjects.find(id => id == item?.id) ? heartFilledLike : heart
          }
          resizeMode="contain"
          style={{ width: wp('5'), height: hp('3') }}
        />
      </TouchableOpacity>

      {/* Media Count */}
      <View style={styles.countBox}>
        <Image
          source={videoIcon}
          resizeMode="contain"
          style={{ width: wp('5'), height: hp('3') }}
        />
        <Text style={styles.countText}>{videosCount}</Text>
        <Text style={styles.separator}>/</Text>
        <Image
          source={picIcon}
          resizeMode="contain"
          style={{ width: wp('5'), height: hp('3') }}
        />
        <Text style={styles.countText}>{imagesCount}</Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {processedMedia.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? Colors.primaryColor : '#ccc',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSliderComp;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: hp('30'),
  },
  image: {
    width: width,
    height: hp('30'),
  },
  backBtn: {
    position: 'absolute',
    top: hp('2'),
    left: wp('3'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: hp('1'),
  },
  likeBtn: {
    position: 'absolute',
    top: hp('2'),
    right: wp('3'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: hp('1'),
  },
  countBox: {
    position: 'absolute',
    bottom: hp('2'),
    right: wp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.diableBtnCOlor,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('0.5'),
    borderRadius: 8,
  },
  countText: {
    color: 'black',
    fontSize: hp('1.6'),
    marginLeft: wp('1'),
    marginRight: wp('1'),
  },
  separator: {
    color: 'black',
    marginHorizontal: 2,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: hp('1'),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
