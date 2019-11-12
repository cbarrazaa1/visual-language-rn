import * as React from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import {useDimensions} from 'react-native-hooks';
import {useEffect, useState} from 'react';
import ImaggaAPIController from '../../api/ImaggaAPIController';
import OptionButton from './OptionButton';
import ColorPalette from '../../common/ColorPalette';

function RecognizedPhotoScreenView() {
  const screenWidth = useDimensions().window.width;
  const image = useNavigationParam('image');
  const [possibleObjects, setPossibleObjects] = useState([]);

  const imageSize = screenWidth - 60;

  useEffect(() => {
    async function fetchPossibleObjects() {
      setPossibleObjects(
        await ImaggaAPIController.getObjectRecognitionFromURI(image.uri),
      );
    }

    fetchPossibleObjects();
  }, [image]);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.rootContent}>
      <Image
        source={{uri: image.uri}}
        style={[styles.image, {width: imageSize, height: imageSize}]}
      />
      <View style={styles.buttonContainer}>
        {possibleObjects.map((obj, i) => {
          return (
            <OptionButton
              key={i}
              style={[styles.optionButton, {width: imageSize + 20}]}
              text={obj.tag.es}
              onPress={() => null}
              color={ColorPalette.CTA_PRIMARY}
            />
          );
        })}
        <OptionButton
          style={[styles.optionButton, {width: imageSize + 20}]}
          text="Tomar otra foto"
          onPress={() => null}
          color={ColorPalette.CTA_SECONDARY}
        />
      </View>
    </ScrollView>
  );
}

RecognizedPhotoScreenView.navigationOptions = {
  title: '¿Qué es este objeto?',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 12,
  },
  rootContent: {
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 2,
  },
  optionButton: {
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 10,
  },
});

export default RecognizedPhotoScreenView;
