/*
  Visual Learning
  Alert.js

  Copyright (c) 2019
*/
import * as React from 'react';
import {Animated, View, StyleSheet, Text, Easing} from 'react-native';
import {useAnimatedValue} from '../hooks/useAnimatedValue';
import {useEffect} from 'react';
import Button from './Button';
import ColorPalette from '../ColorPalette';

/*
  AlertComponent
  React Functional Component

  Serves as a list of available languages.

  Props: {
    title: string,
    titleColor: string,
    content: string,
    contentColor: string,
    hasButton: boolean,
    onPress: () => void
    hideTimer: number,
    onHide: () => void
  }
  State: {}
*/
function AlertComponent({
  title,
  titleColor,
  content,
  contentColor,
  hasButton,
  onPress,
  hideTimer,
  onHide,
}) {
  const alertState = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(alertState, {
      toValue: 1,
      duration: 100,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();

    if (hideTimer != null) {
      setTimeout(() => {
        onHideAlert();
        onHide != null && onHide();
      }, hideTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertState, hideTimer]);

  const onHideAlert = () => {
    Animated.timing(alertState, {
      toValue: 0,
      duration: 100,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => Alert.hide());
  };

  const onButtonPress = () => {
    onPress != null && onPress();
    onHideAlert();
  };

  return (
    <>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: alertState.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
            }),
          },
        ]}
      />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.body,
            {
              opacity: alertState.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
          {content && (
            <Text style={[styles.alertContent, {color: contentColor}]}>
              {content}
            </Text>
          )}
          {hasButton && (
            <Button
              style={styles.button}
              text="OK"
              color={ColorPalette.CTA_PRIMARY}
              onPress={onButtonPress}
            />
          )}
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertContent: {
    fontSize: 14,
    marginVertical: 4,
  },
  button: {
    marginTop: 20,
    width: '90%',
  },
});

class Alert extends React.PureComponent {
  static show(options) {
    Alert._ref._show(options);
  }

  static hide() {
    Alert._ref._hide();
  }

  constructor(props) {
    super(props);
    Alert._ref = this;
    this.state = {
      visible: false,
      title: '',
      titleColor: '#000000',
      content: '',
      contentColor: '#000000',
      hasButton: false,
      onPress: null,
      hideTimer: null,
      onHide: null,
    };
  }

  render() {
    return (
      this.state.visible && (
        <AlertComponent
          title={this.state.title}
          titleColor={this.state.titleColor}
          content={this.state.content}
          contentColor={this.state.contentColor}
          hasButton={this.state.hasButton}
          onPress={this.state.onPress}
          hideTimer={this.state.hideTimer}
          onHide={this.state.onHide}
        />
      )
    );
  }

  _show(options) {
    this.setState({
      visible: true,
      title: options.title,
      titleColor: options.titleColor,
      content: options.content,
      contentColor: options.contentColor,
      hasButton: options.hasButton,
      onPress: options.onPress,
      hideTimer: options.hideTimer,
      onHide: options.onHide,
    });
  }

  _hide() {
    this.setState({
      visible: false,
      title: '',
      titleColor: '#000000',
      content: '',
      contentColor: '#000000',
      hasButton: false,
      onPress: null,
      hideTimer: null,
    });
  }
}

export default Alert;
