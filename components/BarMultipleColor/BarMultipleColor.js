import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from './BarMultipleColorStyles';

export default class BarMultipleColor extends Component {
	render() {
		const { data } = this.props;

		return (
			<View style={Styles.container}>
				<View style={[Styles.caret, { left: data.value + '%' }]}>
					<FontAwesome name="caret-down"
						size={Styles.iconSize} color={Styles.iconColor} />
				</View>
				{data.cols.map(item => {
					return (
						<View key={item.color}
							style={[Styles.col,
								{
									backgroundColor: item.color,
									width: item.value + '%'
								}]
							}>
						</View>
					);
				})}
			</View>
		);
	}
}
