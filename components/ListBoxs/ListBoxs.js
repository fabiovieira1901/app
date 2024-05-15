import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Styles from './ListBoxsStyles';

export default class ListBoxs extends Component {
	render() {
		const { data } = this.props;
		const { callback } = this.props;
		const { horizontal } = this.props;
		const { containerStyle } = this.props;
		const { itemStyle } = this.props;
		const { textStyle } = this.props;
		const { titleStyle } = this.props;
		const { valueStyle } = this.props;

		return (
			<FlatList
				style={containerStyle ? containerStyle : null}
				horizontal={horizontal ? true : false}
				data={data}
				renderItem={({ item: rowData }) => {
					return (
						<View style={Styles.row}>
							<TouchableWithoutFeedback onPress={function () {
								if (callback) {
									callback(rowData);
								}
							}}>
								<View style={[Styles.item, itemStyle ? itemStyle : null]}>
									<View style={Styles.itemImageCol}>
										{rowData.photo ?
											<Image style={Styles.itemPhoto}
												source={{ uri: rowData.photo }} /> : null}
										{rowData.icon ? 
											<FontAwesome5 name={rowData.icon}
												style={Styles.icon}
												size={Styles.iconSize}
												color={Styles.iconColor} /> : null}
									</View>
									<View style={[Styles.itemTitleCol,
										textStyle ? textStyle : null]}>
										<Text style={[Styles.itemTitleText,
											titleStyle ? titleStyle : null]}>
											{rowData.name}
										</Text>
										{rowData.type == 'info' ?
											<Text style={[Styles.itemInfoText, 
												valueStyle ? valueStyle : null]}>
												{rowData.value}
											</Text> : null}

										{rowData.type == 'success' ?
											<Text style={[Styles.itemSuccessText, 
												valueStyle ? valueStyle : null]}>
												{rowData.value}
											</Text> : null}

										{rowData.type == 'danger' ?
											<Text style={[Styles.itemDangerText, 
												valueStyle ? valueStyle : null]}>
												{rowData.value}
											</Text> : null}
									</View>
								</View>
							</TouchableWithoutFeedback>
						</View>
					);
				}}
				keyExtractor={(item) => item.id.toString()}
			/>
		);
	}
}
