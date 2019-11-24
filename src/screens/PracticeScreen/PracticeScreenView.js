import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ColorPalette from '../../common/ColorPalette';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import {elevationShadowStyle} from '../../common/StylesHelper';
import {useDimensions} from 'react-native-hooks';
import DraftFlashcard from '../../common/components/DraftFlashcard';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Voice from 'react-native-voice';
import TextToSpeechController from '../../controllers/TextToSpeechController';
import FlashcardController from '../../controllers/FlashcardController';
import Alert from '../../common/components/Alert';

function PracticeScreenView() {
  const [time, setTime] = useState(10);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [flashcard, setFlashcard] = useState(null);
  const flashcardsArray = useRef([]);
  const flashcards = useRef([]);
  const screenWidth = useDimensions().screen.width;
  const barWidth = useMemo(() => screenWidth - 30, [screenWidth]);
  const actualWidth = useMemo(() => (barWidth * time) / 10, [time, barWidth]);

  useEffect(() => {
    async function getFlashcards() {
      flashcardsArray.current = await FlashcardController.readFlashcards();
      flashcards.current = [...flashcardsArray.current];

      if (flashcardsArray.current.length > 0) {
        generateRandomFlashcard();
      }
    }

    getFlashcards();

    // setup voice
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;

    // start timer
    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (time < 0) {
      setTime(10);
    }
  }, [time]);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashcard]);

  const generateRandomFlashcard = () => {
    const rnd = Math.floor(Math.random() * flashcards.current.length);
    setFlashcard(flashcards.current[rnd]);
    flashcards.current.splice(rnd, 1);

    if (flashcards.current.length === 0) {
      flashcards.current = flashcardsArray.current;
    }
  };

  const onSpeechStart = e => {
    setIsSpeaking(true);
  };

  const onSpeechEnd = e => {
    setIsSpeaking(false);
  };

  const onSpeechResults = async e => {
    const results = e.value;
    if (
      results.some(
        val => val.toLowerCase() === flashcard.translatedText.toLowerCase(),
      )
    ) {
      Alert.show({
        title: 'Correcto!',
        hasButton: false,
        hideTimer: 2000,
        titleColor: ColorPalette.CTA_PRIMARY,
      });
    } else {
      Alert.show({
        title: 'Incorrecto!',
        hasButton: false,
        hideTimer: 2000,
        titleColor: ColorPalette.CTA_CANCEL,
      });
    }

    await Voice.stop();
    setIsSpeaking(false);
  };

  const onSpeakPress = async () => {
    if (isSpeaking) {
      await Voice.stop();
      setIsSpeaking(false);
    } else {
      await Voice.start(
        TextToSpeechController.convertLanguageToLocale(flashcard.language),
      );
    }
  };

  return (
    flashcard && (
      <View style={styles.root}>
        <Text style={styles.timeLabel}>{time} segundos</Text>
        <View style={[styles.emptyProgress, {width: barWidth}]}>
          <View style={[styles.fullProgress, {width: actualWidth}]} />
        </View>
        <Text style={styles.descLabel}>Cómo se dice...</Text>
        <DraftFlashcard text={flashcard.text} image={{uri: flashcard.uri}} />
        <Text style={styles.descLabel}>en</Text>
        <Text style={styles.langLabel}>¿{flashcard.language}?</Text>
        <TouchableOpacity
          style={[
            styles.speakButton,
            {
              backgroundColor: isSpeaking
                ? ColorPalette.CTA_PRIMARY
                : ColorPalette.PRIMARY,
            },
          ]}
          onPress={onSpeakPress}>
          <Ionicon name="ios-mic" size={64} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    )
  );
}

PracticeScreenView.navigationOptions = {
  title: 'Práctica',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND,
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyProgress: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    height: 16,
    ...elevationShadowStyle(1),
    marginBottom: 20,
  },
  fullProgress: {
    backgroundColor: ColorPalette.PRIMARY,
    borderRadius: 8,
    height: 16,
  },
  timeLabel: {
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 10,
  },
  descLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  langLabel: {
    fontSize: 30,
  },
  speakButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    ...elevationShadowStyle(8),
    marginTop: 12,
  },
});

export default PracticeScreenView;
