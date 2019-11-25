/*
  Visual Learning
  Button.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {elevationShadowStyle} from '../StylesHelper';

/*
  Button
  React Functional Component

  Serves as a list of available languages.

  Props: {
    text: string,
    onPress: () => void,
    color: string,
    style: View Style Prop
  }
  State: {}
*/
function Button({text, onPress, color, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, {backgroundColor: color}, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    ...elevationShadowStyle(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    marginVertical: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default React.memo(Button);
