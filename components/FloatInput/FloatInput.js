import React, { Component } from 'react';
import { View, Animated, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from './FloatInputStyles';

export default class FloatInput extends Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      showPassword: false
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, callback } = this.props; 
    callback(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
    } = this.props;
  
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [Styles.animatedTextY, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    }
  }

  render() {
    const self = this;
    const { secureTextEntry } = this.props;
    const { disabled } = this.props;

    return (
      <View>
        {disabled ?
          <View style={[Styles.container, Styles.disabledInput,
            this.props.rowStyles]} pointerEvents="none">
            <Animated.Text
              style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
            >
              {this.props.title}
            </Animated.Text>
            <TextInput
              secureTextEntry={secureTextEntry}
              value={this.props.value}
              style={[Styles.textInput, this.props.textInputStyles]}
              underlineColorAndroid='transparent'
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
              onChangeText={this._onChangeText}
              keyboardType={this.props.keyboardType}
							selectionColor={Styles.cursorColor}
              {...this.props.otherTextInputProps}
            />
            </View> : 
            <View style={[Styles.container, this.props.rowStyles]}>
              {this.props.title ?
                <Animated.Text
                  style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                >
                  {this.props.title}
                </Animated.Text> : null}
              <TextInput
                secureTextEntry={secureTextEntry && !this.state.showPassword ? true : false}
                value={this.props.value}
                style={[Styles.textInput, this.props.textInputStyles,
                  this.props.title ? null : Styles.textInputWithoutTitle,
                  secureTextEntry ? Styles.textPasswordInput : null]}
                underlineColorAndroid='transparent'
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                onChangeText={this._onChangeText}
                keyboardType={this.props.keyboardType}
                maxLength={this.props.maxLength}
                selectionColor={Styles.cursorColor}
                {...this.props.otherTextInputProps}
              />
              {secureTextEntry ?
                <TouchableOpacity activeOpacity={0.8}
                  onPress={function () {
                    self.setState({
                      showPassword: !self.state.showPassword
                    })
                  }}
                  style={Styles.passwordIcon}>
                  <FontAwesome name={this.state.showPassword ? "eye-slash" : "eye"}
                    size={Styles.passwordIconSize}
                    color={Styles.passwordIconColor} />
                </TouchableOpacity> : null}
            </View>
        }
      </View>
    )
  }
}