import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ColorPalette from '../../common/ColorPalette';
import {useState, useEffect, useMemo} from 'react';
import {elevationShadowStyle} from '../../common/StylesHelper';
import {useDimensions} from 'react-native-hooks';
import DraftFlashcard from '../../common/components/DraftFlashcard';
import Ionicon from 'react-native-vector-icons/Ionicons';

function PracticeScreenView() {
  const [time, setTime] = useState(10);
  const screenWidth = useDimensions().screen.width;
  const barWidth = useMemo(() => screenWidth - 30, [screenWidth]);
  const actualWidth = useMemo(() => (barWidth * time) / 10, [time, barWidth]);
  const flashcard = {
    text: 'Camello',
    uri: 'https://secretldn.com/wp-content/uploads/2018/03/Animals-5.jpg',
    translatedText: 'Camel',
    language: 'Inglés',
  };

  return (
    <View style={styles.root}>
      <Text style={styles.timeLabel}>{time} segundos</Text>
      <View style={[styles.emptyProgress, {width: barWidth}]}>
        <View style={[styles.fullProgress, {width: actualWidth}]} />
      </View>
      <Text style={styles.descLabel}>Cómo se dice...</Text>
      <DraftFlashcard text={flashcard.text} image={{uri: flashcard.uri}} />
      <Text style={styles.descLabel}>en</Text>
      <Text style={styles.langLabel}>¿{flashcard.language}?</Text>
      <TouchableOpacity style={styles.speakButton}>
        <Ionicon name="ios-mic" size={64} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
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
    backgroundColor: ColorPalette.PRIMARY,
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
