import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useDimensions} from 'react-native-hooks';
import {elevationShadowStyle} from '../../common/StylesHelper';

function ActionButton({icon, title, onPress, color}) {
  const {width} = useDimensions().window;
  const size = width / 2 - 14;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.root,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    ...elevationShadowStyle(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default React.memo(ActionButton);
