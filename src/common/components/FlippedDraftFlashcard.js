import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {elevationShadowStyle} from '../StylesHelper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import TextToSpeechController from '../../controllers/TextToSpeechController';

function FlippedDraftFlashcard({language, translatedText}) {
  const onAudioPress = () => {
    TextToSpeechController.speak(translatedText, language);
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.translatedTextLabel}>{translatedText}</Text>
        <TouchableOpacity onPress={onAudioPress}>
          <Ionicon name="ios-volume-high" size={36} />
        </TouchableOpacity>
      </View>
      <Text>{language}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 154,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    ...elevationShadowStyle(2),
    marginTop: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  translatedTextLabel: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default React.memo(FlippedDraftFlashcard);
