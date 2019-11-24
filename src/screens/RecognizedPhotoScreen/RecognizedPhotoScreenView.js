import * as React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigationParam, useNavigation} from 'react-navigation-hooks';
import {useDimensions} from 'react-native-hooks';
import {useEffect, useState, useMemo} from 'react';
import ImaggaAPIController from '../../controllers/ImaggaAPIController';
import Button from '../../common/components/Button';
import ColorPalette from '../../common/ColorPalette';

function RecognizedPhotoScreenView() {
  const screenWidth = useDimensions().window.width;
  const image = useNavigationParam('image');
  const [possibleObjects, setPossibleObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageSize = useMemo(() => screenWidth - 60, [screenWidth]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchPossibleObjects() {
      setPossibleObjects(
        await ImaggaAPIController.getObjectRecognitionFromURI(image.uri),
      );
    }

    fetchPossibleObjects();
  }, [image]);

  useEffect(() => {
    if (possibleObjects.length > 0) {
      setLoading(false);
    }
  }, [possibleObjects]);

  const onSelectOption = option => {
    navigation.navigate('TranslatePhoto', {option, image});
  };

  const onTakeOtherPhoto = () => {
    if (loading) {
      return;
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.rootContent}>
      <Image
        source={{uri: image.uri}}
        style={[styles.image, {width: imageSize, height: imageSize}]}
      />
      <Text style={styles.descLabel}>Esto parece...</Text>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          possibleObjects.map((obj, i) => {
            return (
              <Button
                key={i}
                style={[styles.optionButton, {width: imageSize + 20}]}
                text={obj.tag.es}
                onPress={() => onSelectOption(obj.tag.es)}
                color={ColorPalette.CTA_PRIMARY}
              />
            );
          })
        )}
        <Button
          style={[styles.backButton, {width: imageSize + 20}]}
          text="Tomar otra foto"
          onPress={onTakeOtherPhoto}
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
    backgroundColor: ColorPalette.BACKGROUND,
  },
  rootContent: {
    alignItems: 'center',
    flexGrow: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 2,
  },
  optionButton: {
    marginBottom: 12,
  },
  backButton: {
    marginTop: 16,
  },
  buttonContainer: {
    padding: 10,
  },
  descLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default RecognizedPhotoScreenView;
