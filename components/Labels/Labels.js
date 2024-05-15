import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Styles from './LabelsStyles';

export default class Labels extends Component {
	render() {
		const { data } = this.props;
		const { scrollDisabled } = this.props;
		const { noInline } = this.props;
		const { textColor } = this.props;

		return (
			<View>
				{scrollDisabled ?
					<View>
						{data.map((item, index) => {
							return (
								<View key={index}
									style={noInline ? Styles.rowNoInline : Styles.rowInline}>
									<View style={Styles.col}>
										{item.color ?
											<View style={[Styles.circle,
												{ backgroundColor: item.color }]}>
											</View> : null}

										{item.icon ?
											<View style={Styles.icon}>
												<FontAwesome5 name={item.icon}
													size={Styles.iconSize}
													color={Styles.iconColor} />
											</View> : null}

										<Text style={[noInline ?
											Styles.titleNoInline : Styles.title,
											textColor ? textColor : null]}>
											{item.title}
										</Text>
									</View>
									<Text style={[Styles.value, noInline ? Styles.valueRow : null]}>
										{item.value}
									</Text>
								</View>
							);
						})}
					</View> :
					<FlatList
						data={data}
						renderItem={({ item: rowData }) => {
							return (
								<View style={noInline ? Styles.rowNoInline : Styles.rowInline}>
									<View style={Styles.col}>
										{rowData.color ?
											<View style={[Styles.circle,
												{ backgroundColor: rowData.color }]}>
											</View> : null}
										
										{rowData.icon ?
											<View style={Styles.icon}>
												<FontAwesome5 name={rowData.icon}
													size={Styles.iconSize}
													color={Styles.iconColor} />
											</View> : null}

										<Text style={noInline ?
											Styles.titleNoInline : Styles.title}>
											{rowData.title}
										</Text>
									</View>
									<Text style={Styles.value}>
										{rowData.value}
									</Text>
								</View>
							);
						}}
						keyExtractor={(item) => item.title.toString()}
					/>
				}
			</View>
		);
	}
}
