/*
  Visual Learning
  TakePhotoScreenView.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import TakePhotoButton from './TakePhotoButton';
import {useState} from 'react';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';

/*
  TakePhotoScreenView
  React Functional Component

  Acts as a wrapper for the camera so the user can take a photo for an object.

  Props: {}
  State: {
    isTakingPhoto: boolean
  }
  Navigation Params: {}
*/
function TakePhotoScreenView() {
  const [{cameraRef}, {takePicture}] = useCamera();
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const onTakePhotoPress = async () => {
    try {
      setIsTakingPhoto(true);
      const image = await takePicture();
      navigation.navigate('RecognizedPhoto', {image});
    } catch (err) {
    } finally {
      setIsTakingPhoto(false);
    }
  };

  return (
    <View style={styles.root}>
      {isFocused ? (
        <RNCamera captureAudio={false} ref={cameraRef} style={styles.camera} />
      ) : null}
      {!isTakingPhoto && (
        <View style={styles.button}>
          <TakePhotoButton onPress={onTakePhotoPress} />
        </View>
      )}
    </View>
  );
}

TakePhotoScreenView.navigationOptions = {
  title: 'Tomar Foto',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    opacity: 0.8,
  },
});

export default TakePhotoScreenView;
