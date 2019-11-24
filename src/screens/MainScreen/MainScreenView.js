import * as React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import ActionButton from './ActionButton';
import ColorPalette from '../../common/ColorPalette';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';
import GoalCard from './GoalCard';

function MainScreenView() {
  const navigation = useNavigation();

  const onTakePhotoPress = () => {
    navigation.navigate('TakePhoto');
  };

  const onPracticePress = () => {
    navigation.navigate('Practice');
  };

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <ActionButton
          title="Tomar Foto"
          icon={<Ionicon name={'md-camera'} size={64} color="#FFFFFF" />}
          onPress={onTakePhotoPress}
          color={ColorPalette.CTA_PRIMARY}
        />
        <ActionButton
          title="Practicar"
          icon={<MaterialIcon name="style" size={64} color="#FFFFFF" />}
          onPress={onPracticePress}
          color={ColorPalette.CTA_SECONDARY}
        />
      </View>
      <Text style={styles.goalTitle}>Metas de hoy</Text>
      <ScrollView
        style={styles.goalList}
        contentContainerStyle={styles.goalListContent}>
        <GoalCard
          goalName="Tiempo de práctica"
          subtitle="minutos"
          value={15}
          maxValue={30}
        />
        <GoalCard
          goalName="Flashcards nuevas"
          subtitle="creadas"
          value={1}
          maxValue={3}
        />
      </ScrollView>
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
    height: '30%',
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 16,
  },
  goalList: {
    height: '70%',
  },
  goalListContent: {
    paddingTop: 8,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
});

export default MainScreenView;
