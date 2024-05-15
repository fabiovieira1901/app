import React, { Component } from 'react';
import {
	View, Text, FlatList,
	TouchableWithoutFeedback, RefreshControl
} from 'react-native';
import { Icon } from 'react-native-elements';
import Styles from './AccordionStyles';


export default class Accordion extends Component {
	state = {
		opened: []
	}

	render() {
		const self = this;
		const { data } = this.props;
		const { loading } = this.props;
		const { callbackRefresh } = this.props;

		return (
			<FlatList
				data={data}
				refreshControl={
					<RefreshControl refreshing={loading}
						onRefresh={callbackRefresh} />
				}
				renderItem={({ item, index }) => {
					return (
						<View style={Styles.row}>
							<TouchableWithoutFeedback
								onPress={function () {
									if (self.state.opened.indexOf(index) > -1) {
										self.state.opened = [];
									} else {
										self.state.opened = [];
										self.state.opened.push(index);
									}
									self.setState({
										opened: self.state.opened
									});
								}}>
								<View style={Styles.rowItem}>
									<View style={Styles.itemTitleCol}>
										<Text style={Styles.itemTitleText}>
											{item.name}
										</Text>
									</View>
									{data.length > 1 ?
										<View style={Styles.itemIconCol}>
											{this.state.opened.indexOf(index) > -1 ?
												<Icon name='chevron-up'
													type='font-awesome'
													color={Styles.iconColor} /> :
												<Icon name='chevron-down'
													type='font-awesome'
													color={Styles.iconColor} />}
										</View> : null}
								</View>
							</TouchableWithoutFeedback>
							{this.state.opened.indexOf(index) > -1 || data.length == 1 ?
								<View style={Styles.itemDescription}>
									<Text style={Styles.itemDescriptionText}>
										{item.description}
									</Text>
								</View> : null}
						</View>
					);
				}}
				keyExtractor={(item) => item.id.toString()}
			/>
		);
	}
}
