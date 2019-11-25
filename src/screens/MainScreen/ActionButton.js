/*
  Visual Learning
  ActionButton.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useDimensions} from 'react-native-hooks';
import {elevationShadowStyle} from '../../common/StylesHelper';
import {useMemo} from 'react';

/*
  ActionButton
  React Functional Component

  Acts as a view to style action buttons in main screen.

  Props: {
    icon: string,
    title: string,
    onPress: () => void,
    color: string
  }
  State: {}
*/
function ActionButton({icon, title, onPress, color}) {
  const {width} = useDimensions().window;
  const size = useMemo(() => width / 2 - 14, [width]);

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
