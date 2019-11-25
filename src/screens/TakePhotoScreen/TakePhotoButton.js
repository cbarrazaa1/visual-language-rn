import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {elevationShadowStyle} from '../../common/StylesHelper';

function TakePhotoButton({onPress, onLongPress}) {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Ionicon name="md-camera" size={48} color="#000000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...elevationShadowStyle(8),
  },
});

export default React.memo(TakePhotoButton);
