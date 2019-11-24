import * as React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {elevationShadowStyle} from '../StylesHelper';

function DraftFlashcard({text, image}) {
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{uri: image.uri}} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 154,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    ...elevationShadowStyle(2),
  },
  image: {
    width: 114,
    height: 114,
    borderRadius: 2,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
  },
});

export default React.memo(DraftFlashcard);
