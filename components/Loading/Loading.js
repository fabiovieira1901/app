import React, { Component } from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import Styles from './LoadingStyles';


export default class Loading extends Component {
	render() {
		let { loadingVisible } = this.props;

		return (
			<Modal
				animationType="slide"
				animationDirection="top"
				transparent={true}
				visible={loadingVisible}
			>
				<View style={Styles.centeredView}>
					<View style={Styles.modalView}>
						<ActivityIndicator size="large" color="#999" />
					</View>
				</View>
			</Modal>

		);
	}
}