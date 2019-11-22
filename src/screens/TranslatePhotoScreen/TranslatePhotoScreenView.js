import * as React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Button from '../../common/Button';
import {useState, useEffect, useMemo} from 'react';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import DraftFlashcard from '../RecognizedPhotoScreen/DraftFlashcard';
import ColorPalette from '../../common/ColorPalette';
import LanguageSelector from '../RecognizedPhotoScreen/LanguageSelector';
import {useDimensions} from 'react-native-hooks';
import GoogleAPIController from '../../api/GoogleAPIController';

function TranslatePhotoSreenView() {
  const screenWidth = useDimensions().window.width;
  const navigation = useNavigation();
  const option = useNavigationParam('option');
  const image = useNavigationParam('image');
  const buttonSize = useMemo(() => screenWidth, [screenWidth]);

  const onTranslatePress = async () => {
    const res = await GoogleAPIController.getTranslationForText(option, 'en');
    alert(res);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.rootContent}>
      <DraftFlashcard image={image} text={option} />
      <Text style={styles.descLabel}>Traducir a...</Text>
      <LanguageSelector />
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, {width: buttonSize - 40}]}
          color={ColorPalette.CTA_PRIMARY}
          text="Traducir"
          onPress={onTranslatePress}
        />
        <Button
          style={[styles.button, {width: buttonSize - 40}]}
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
