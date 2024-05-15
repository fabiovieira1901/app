import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  Animated, View, Dimensions, Keyboard, TextInput,
  UIManager, TouchableWithoutFeedback, Platform
} from 'react-native';
import Styles from './KeyboardFeaturesStyles';

const { State: TextInputState } = TextInput;

export default class KeyboardFeatures extends Component {
  state = {
    openedCallback: this.props.openedCallback,
    closedCallback: this.props.closedCallback,
    shift: new Animated.Value(0),
    speed: 100
  };

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const { children: renderProp } = this.props;
    const { disabled } = this.props;
    const { shift } = this.state;
    if (Platform.OS == 'ios' && !disabled) {
      return (
        <Animated.View style={[Styles.container, { transform: [{ translateY: shift }] }]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {renderProp()}
          </TouchableWithoutFeedback>
        </Animated.View>
      );
    } else {
      return (
        <View style={Styles.container}>
          {renderProp()}
        </View>
      );
    }
  }

  handleKeyboardDidShow = (event) => {
    try {
      if (Platform.OS != 'ios') {
        return Platform.OS;
      }

      if (this.state.openedCallback) {
        this.state.openedCallback();
      }

      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      let currentlyFocusedField = TextInputState.currentlyFocusedInput();

      if (currentlyFocusedField && currentlyFocusedField._nativeTag) {
        currentlyFocusedField = currentlyFocusedField._nativeTag;
      }

      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        const offset = 20;
        const value = gap - offset;

        if (value >= 0 || isNaN(value)) {
          return;
        }

        Animated.timing(
          this.state.shift,
          {
            toValue: value,
            duration: this.state.speed,
            useNativeDriver: true
          }
        ).start();
      });
    } catch (error) { }
  }

  handleKeyboardDidHide = () => {
    try {
      if (Platform.OS != 'ios') {
        return Platform.OS;
      }

      if (this.state.closedCallback) {
        this.state.closedCallback();
      }

      Animated.timing(
        this.state.shift,
        {
          toValue: 0,
          duration: this.state.speed,
          useNativeDriver: true
        }
      ).start();
    } catch (error) { }
  }
}

KeyboardFeatures.propTypes = {
  children: PropTypes.func.isRequired,
};