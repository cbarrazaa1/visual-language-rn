import * as React from 'react';
import {Animated, View, StyleSheet, Text, Easing} from 'react-native';
import {useEffect, useContext, useMemo} from 'react';
import {useDimensions} from 'react-native-hooks';
import {useAnimatedValue} from '../common/useAnimatedValue';
import BottomDrawerContext, {
  BottomDrawerProvider,
} from '../context/BottomDrawerContext';

export const TITLE_CONTAINER_HEIGHT = 50;

function BottomDrawerComponent({title, content, offsetY}) {
  const {setHeight} = useContext(BottomDrawerContext);
  const drawerState = useAnimatedValue(0);
  const {height} = useDimensions().screen;
  const totalOffsetY = useMemo(() => height / 3 + (offsetY || 0), [
    height,
    offsetY,
  ]);

  useEffect(() => {
    Animated.timing(drawerState, {
      toValue: 1,
      duration: 300,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [drawerState]);

  useEffect(() => {
    setHeight(totalOffsetY);
  }, [setHeight, totalOffsetY]);

  const onHideDrawer = () => {
    Animated.timing(drawerState, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => BottomDrawer.hide());
  };

  return (
    <>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: drawerState.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
            }),
          },
        ]}
        onStartShouldSetResponder={onHideDrawer}
      />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: drawerState.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, height - totalOffsetY],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {content}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: TITLE_CONTAINER_HEIGHT,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

class BottomDrawer extends React.PureComponent {
  static show(options) {
    BottomDrawer._ref._show(options);
  }

  static hide() {
    BottomDrawer._ref._hide();
  }

  constructor(props) {
    super(props);
    BottomDrawer._ref = this;
    this.state = {
      visible: false,
      title: '',
      content: null,
    };
  }

  render() {
    return (
      this.state.visible && (
        <BottomDrawerComponent
          title={this.state.title}
          content={this.state.content}
        />
      )
    );
  }

  _show(options) {
    this.setState(prev => ({
      visible: true,
      title: options.title,
      content: options.content,
    }));
  }

  _hide() {
    this.setState(prev => ({visible: false, title: ''}));
  }
}

export default BottomDrawer;
