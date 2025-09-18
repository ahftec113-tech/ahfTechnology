import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import Video from 'react-native-video'; // Add Video component
import Ionicons from 'react-native-vector-icons/Ionicons';
import useReduxStore from '../Hooks/UseReduxStore';
import { types } from '../Redux/types';
import { imageUrl } from '../Utils/Urls';

import ImageZoom from 'react-native-image-pan-zoom';
import { hp, wp } from '../Hooks/useResponsive';

const ImagePreviewComp = ({ visible, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { dispatch } = useReduxStore();
  const [paused, setPaused] = useState(true); // Add state for video pause/play

  const onCloseModa = () => {
    dispatch({
      type: types.closeModal,
    });
    setPaused(true); // Reset video state on close
  };

  // Handle single media case (convert to array if needed)
  const mediaArray = Array.isArray(images) ? images : [images];

  const goToNext = () => {
    const newIndex =
      currentIndex === mediaArray.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setPaused(true); // Pause video when navigating
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? mediaArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setPaused(true); // Pause video when navigating
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  // Determine if item is a video based on extension
  const isVideo = item => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
    if (typeof item === 'string') {
      return videoExtensions.some(ext => item.toLowerCase().endsWith(ext));
    }
    return false;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCloseModa}
    >
      <View style={styles.modalContainer}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onCloseModa}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>

        {/* Main media content */}
        <View style={styles.imageContainer}>
          {mediaArray.length > 1 && (
            <TouchableOpacity
              style={styles.navButtonLeft}
              onPress={goToPrevious}
            >
              <Ionicons name="chevron-back" size={40} color="white" />
            </TouchableOpacity>
          )}
          <FlatList
            ref={flatListRef}
            data={mediaArray}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  alignItems: 'center',
                }}
              >
                {isVideo(item) ? (
                  <View style={styles.videoContainer}>
                    <Video
                      source={{ uri: imageUrl(item) }}
                      style={styles.video}
                      resizeMode="contain"
                      paused={paused}
                      onError={e => console.log('Video error:', e)}
                      repeat={true}
                    />
                    <TouchableOpacity
                      style={styles.playPauseButton}
                      onPress={() => setPaused(!paused)}
                    >
                      <Ionicons
                        name={paused ? 'play' : 'pause'}
                        size={50}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={hp('80')}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={hp('80')}
                    enableCenterFocus
                    enableDoubleClickZoom
                  >
                    <Image
                      source={{ uri: imageUrl(item) }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </ImageZoom>
                )}
              </View>
            )}
            onMomentumScrollEnd={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
              );
              setCurrentIndex(index);
              setPaused(true); // Pause video when scrolling
            }}
            initialScrollIndex={currentIndex}
            getItemLayout={(data, index) => ({
              length: Dimensions.get('window').width,
              offset: Dimensions.get('window').width * index,
              index,
            })}
          />

          {mediaArray.length > 1 && (
            <TouchableOpacity style={styles.navButtonRight} onPress={goToNext}>
              <Ionicons name="chevron-forward" size={40} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Indicator for multiple media */}
        {mediaArray.length > 1 && (
          <View style={styles.indicatorContainer}>
            <Text style={styles.indicatorText}>
              {currentIndex + 1} / {mediaArray.length}
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: wp('2'),
    zIndex: 1,
    height: hp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.11,
    height: Dimensions.get('window').width * 0.11,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: wp('100'),
    height: hp('80'),
  },
  videoContainer: {
    width: wp('100'),
    height: hp('80'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: wp('100'),
    height: hp('80'),
  },
  playPauseButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  navButtonRight: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  indicatorText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImagePreviewComp;
