/*
  Visual Learning
  useAnimatedValue.js

  Copyright (c) 2019
*/

import {useRef} from 'react';
import {Animated} from 'react-native';

export function useAnimatedValue(initialValue) {
  return useRef(new Animated.Value(initialValue)).current;
}
