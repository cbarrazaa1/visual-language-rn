/*
  Visual Learning
  Flashcard.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {elevationShadowStyle} from '../../common/StylesHelper';
import ColorPalette from '../../common/ColorPalette';
import Ionicon from 'react-native-vector-icons/Ionicons';
import BottomDrawer from '../../common/components/BottomDrawer';
import Button from '../../common/components/Button';
import TextToSpeechController from '../../controllers/TextToSpeechController';

/*
  Flashcard
  React Functional Component

  Acts as a view to style a flashcard.

  Props: {
    id: string,
    uri: string,
    text: string,
    language: string,
    translatedText: string,
    onDelete: (id: string) => void
  }
  State: {
    flipped: boolean
  }
*/
function Flashcard({id, uri, text, language, translatedText, onDelete}) {
  const upperCaseText = text.charAt(0).toUpperCase() + text.substring(1);
  const upperCaseTranslatedText =
    translatedText.charAt(0).toUpperCase() + translatedText.substring(1);
  const [flipped, setFlipped] = useState(false);

  const onFlashcardPress = () => {
    setFlipped(prev => !prev);
  };

  const onDeletePress = () => {
    onDelete(id);
  };

  const onAudioPress = () => {
    TextToSpeechController.speak(translatedText, language);
  };
  const onLongPress = () => {
    BottomDrawer.show({
      title: upperCaseText,
      content: (
        <View style={{alignItems: 'center'}}>
          <Button
            style={{width: '90%'}}
            text="Delete"
            color={ColorPalette.CTA_CANCEL}
            onPress={onDeletePress}
          />
        </View>
      ),
      offsetY: -120,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onFlashcardPress}
      onLongPress={onLongPress}>
      {flipped ? (
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.backTitle}>{upperCaseTranslatedText}</Text>
            <TouchableOpacity onPress={onAudioPress}>
              <Ionicon name="ios-volume-high" size={36} />
            </TouchableOpacity>
          </View>
          <Text>{language}</Text>
        </View>
      ) : (
        <>
          <Image style={styles.image} source={{uri}} width={150} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{upperCaseText}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...elevationShadowStyle(2),
    width: '90%',
    height: 154,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    margin: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 154,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
  },
  backTitle: {
    fontSize: 34,
    fontWeight: '300',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Flashcard;
