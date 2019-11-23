import * as React from 'react';
import {useScreens} from 'react-native-screens';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ColorPalette from './common/ColorPalette';
import FlashcardsListScreen from './screens/FlaschardsListScreen/FlashcardsListScreenView';
import MainScreen from './screens/MainScreen/MainScreenView';
import TakePhotoScreen from './screens/TakePhotoScreen/TakePhotoScreenView';
import RecognizedPhotoScreen from './screens/RecognizedPhotoScreen/RecognizedPhotoScreenView';
import TranslatePhotoScreen from './screens/TranslatePhotoScreen/TranslatePhotoScreenView';
import BottomDrawer from './common/BottomDrawer';
import {BottomDrawerContextProvider} from './context/BottomDrawerContext';
useScreens();

const defaultStackNavigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: ColorPalette.PRIMARY,
  },
  headerTitleStyle: {
    color: '#FFFFFF',
  },
  headerTintColor: '#FFFFFF',
});

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    TakePhoto: {
      screen: TakePhotoScreen,
    },
    RecognizedPhoto: {
      screen: RecognizedPhotoScreen,
    },
    TranslatePhoto: {
      screen: TranslatePhotoScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: defaultStackNavigationOptions,
  },
);

MainStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (
    navigation.state.routes[navigation.state.index].routeName === 'TakePhoto'
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const FlashcardsStack = createStackNavigator(
  {
    FlashcardsList: {
      screen: FlashcardsListScreen,
    },
  },
  {
    initialRouteName: 'FlashcardsList',
    defaultNavigationOptions: defaultStackNavigationOptions,
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Main: MainStack,
    Flashcards: FlashcardsStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let icon = null;

        if (routeName === 'Main') {
          icon = <Ionicon name={'md-home'} size={24} color={tintColor} />;
        } else if (routeName === 'Flashcards') {
          icon = <MaterialIcon name={'style'} size={24} color={tintColor} />;
        }

        return icon;
      },
      tabBarOptions: {
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#ACACAC',
        showLabel: false,
        style: {
          backgroundColor: ColorPalette.PRIMARY,
        },
      },
    }),
  },
);
const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <BottomDrawerContextProvider>
      <AppContainer />
      <BottomDrawer />
    </BottomDrawerContextProvider>
  );
}
