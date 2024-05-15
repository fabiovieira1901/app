import React, { Component } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import Styles from './ButtonStyles';

export default class Button extends Component {
	render() {
		const { text } = this.props;
		const { callback } = this.props;
		const { secondary } = this.props;
		const { buttonStyles } = this.props;
		const { buttonTextStyles } = this.props;
		const { image } = this.props;
		const { icon } = this.props;
		const { iconColor } = this.props;

		return (
			<TouchableOpacity activeOpacity={0.8}
				onPress={callback}
				style={[Styles.button, buttonStyles, secondary ? Styles.buttonSecondary : null]}>

				{image ? <Image style={Styles.image} source={image} /> : null}

				{icon ? <SvgIcon style={Styles.image} icon={icon} color={iconColor} /> : null}

				<Text style={[Styles.buttonText, buttonTextStyles, secondary ? Styles.buttonSecondaryText : null]}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}
}
