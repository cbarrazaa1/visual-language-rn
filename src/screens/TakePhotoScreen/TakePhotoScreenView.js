import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import TakePhotoButton from './TakePhotoButton';
import {useState} from 'react';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';

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

  const onTakePhotoMejorado = async () => {
    try {
      setIsTakingPhoto(true);
      const image = await takePicture();
      navigation.navigate('RecognizedPhoto', {image, isMejorado: true});
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
          <TakePhotoButton
            onPress={onTakePhotoPress}
            onLongPress={onTakePhotoMejorado}
          />
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
