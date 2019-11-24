import * as React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {elevationShadowStyle} from '../../common/StylesHelper';
import ColorPalette from '../../common/ColorPalette';
import Ionicon from 'react-native-vector-icons/Ionicons';

function Flashcard({uri, title, lang, trad}) {
  const [flipped, setFlipped] = useState(false);

  const onFlashcardPress = () => {
    setFlipped(prev => !prev);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onFlashcardPress}>
      {flipped ? (
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.backTitle}>{trad}</Text>
            <Ionicon name="ios-volume-high" size={44} />
          </View>
          <Text>{lang}</Text>
        </View>
      ) : (
        <>
          <Image style={styles.image} source={{uri}} width={150} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...elevationShadowStyle(4),
    width: '90%',
    height: 154,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EBF5DF',
    margin: 10,
  },
  textContainer: {
    flex: 1,
    //alignItems: 'center',
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
