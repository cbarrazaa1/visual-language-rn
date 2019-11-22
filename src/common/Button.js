import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {elevationShadowStyle} from './StylesHelper';

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
    ...elevationShadowStyle(8),
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
