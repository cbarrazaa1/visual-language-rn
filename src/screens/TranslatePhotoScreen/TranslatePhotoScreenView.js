/*
  Visual Learning
  TranslatePhotoScreenView.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Button from '../../common/components/Button';
import {useState, useMemo} from 'react';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import DraftFlashcard from '../../common/components/DraftFlashcard';
import ColorPalette from '../../common/ColorPalette';
import LanguageSelector from './LanguageSelector';
import {useDimensions} from 'react-native-hooks';
import GoogleAPIController from '../../controllers/GoogleAPIController';

const languages = {
  en: 'Inglés',
  fr: 'Francés',
  de: 'Alemán',
  it: 'Italiano',
  pt: 'Portugués',
  zh: 'Chino',
  ja: 'Japonés',
  ko: 'Coreano',
  hi: 'Hindú',
};

/*
  TranslatePhotoScreenView
  React Functional Component

  Allows the user to pick a language to translate a recognized object.

  Props: {}
  State: {
    language: string
  }
  Navigation Params: {
    option: string,
    image: URI
  }
*/
function TranslatePhotoSreenView() {
  // Translate Photo Screen View Controller //
  const [language, setLanguage] = useState('en');
  const screenWidth = useDimensions().window.width;
  const navigation = useNavigation();
  const option = useNavigationParam('option');
  const image = useNavigationParam('image');
  const buttonSize = useMemo(() => screenWidth - 40, [screenWidth]);

  const onTranslatePress = async () => {
    const res = await GoogleAPIController.getTranslationForText(
      option,
      language,
    );

    navigation.navigate('CreateFlashcard', {
      text: option,
      image,
      language: languages[language],
      translatedText: res,
    });
  };

  // Translate Photo Screen View //
  const onLanguageChange = lang => {
    setLanguage(lang);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.rootContent}>
      <DraftFlashcard image={image} text={option} />
      <Text style={styles.descLabel}>Traducir a...</Text>
      <LanguageSelector onLanguageChange={onLanguageChange} />
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, {width: buttonSize}]}
          color={ColorPalette.CTA_PRIMARY}
          text="Traducir"
          onPress={onTranslatePress}
        />
        <Button
          style={[styles.button, {width: buttonSize}]}
          color={ColorPalette.CTA_SECONDARY}
          text="Volver"
          onPress={onBackPress}
        />
      </View>
    </ScrollView>
  );
}

TranslatePhotoSreenView.navigationOptions = {
  title: '¿Cómo se dice en...?',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND,
  },
  rootContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  descLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginBottom: 12,
  },
});

export default TranslatePhotoSreenView;
