/*
  Visual Learning
  useComponentSize.js

  Copyright (c) 2019
*/
import {useState, useCallback} from 'react';

export function useComponentSize() {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
}
