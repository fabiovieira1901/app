import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Styles from './RadioButtonStyles';


export default class RadioButtons extends Component {
	state = {
		selected: 'benefit-1'
	};

	render() {
		const { options } = this.props;
		const { callback } = this.props;
		const { selected } = this.state;

		return (
			<View>
				{options.map(item => {
					return (
						<View key={item.key} style={Styles.buttonContainer}>
							<TouchableOpacity
								style={Styles.circle}
								onPress={() => {
									this.setState({
										selected: item.key,
                                    });
                                    callback(item.key);
								}}
							>
                                {selected === item.key &&
                                    <View style={Styles.checkedCircle} />}
                            </TouchableOpacity>
                            <Text style={Styles.text}>
                                {item.text}
                            </Text>
						</View>
					);
				})}
			</View>
		);
	}
}
