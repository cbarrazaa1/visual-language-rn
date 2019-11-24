import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import ActionButton from './ActionButton';
import ColorPalette from '../../common/ColorPalette';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';

function MainScreenView() {
  const navigation = useNavigation();
  const onTakePhotoPress = () => {
    navigation.navigate('TakePhoto');
  };

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <ActionButton
          title="Tomar Foto"
          icon={<Ionicon name={'md-home'} size={64} color="#FFFFFF" />}
          onPress={onTakePhotoPress}
          color={ColorPalette.CTA_PRIMARY}
        />
        <ActionButton
          title="Practicar"
          icon={<MaterialIcon name="style" size={64} color="#FFFFFF" />}
          onPress={() => null}
          color={ColorPalette.CTA_SECONDARY}
        />
      </View>
    </View>
  );
}

MainScreenView.navigationOptions = {
  title: 'Inicio',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
});

export default MainScreenView;
