import * as React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import DraftFlashcard from '../../common/components/DraftFlashcard';
import ColorPalette from '../../common/ColorPalette';
import Button from '../../common/components/Button';
import {useDimensions} from 'react-native-hooks';
import {useMemo} from 'react';

function CreateFlashcardScreenView() {
  const navigation = useNavigation();
  const text = useNavigationParam('text');
  const image = useNavigationParam('image');
  const language = useNavigationParam('language');
  const translatedText = useNavigationParam('translatedText');
  const screenWidth = useDimensions().window.width;
  const buttonSize = useMemo(() => screenWidth - 40, [screenWidth]);

  const onCreatePress = () => {};

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.rootContent}>
      <DraftFlashcard image={image} text={text} />
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, {width: buttonSize}]}
          color={ColorPalette.CTA_PRIMARY}
          text="Crear Flashcard"
          onPress={onCreatePress}
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

CreateFlashcardScreenView.navigationOptions = {
  title: 'Crear Flashcard',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND,
    paddingTop: 16,
  },
  rootContent: {
    alignItems: 'center',
    flexGrow: 1,
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

export default CreateFlashcardScreenView;