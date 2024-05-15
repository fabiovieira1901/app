import React, { Component } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import Button from '../../components/Button/Button';
import Styles from './ModalPlansStyles';


export default class ModalPlans extends Component {
	render() {
		let { visible } = this.props;
		let { items } = this.props;
		let { callbackCancel } = this.props;

		return (
			<Modal
				animationType="slide"
				animationDirection="top"
				transparent={true}
				visible={visible}
			>
				<View style={Styles.modalView}>
					<View style={Styles.centeredView}>
						<View style={Styles.items}>
							{items.map((item, index) => {
								return (
									<TouchableOpacity
										key={index}
										style={Styles.item}
										onPress={item.callback}
									>
										<Text style={Styles.itemText}>
											{item.text}
										</Text>
									</TouchableOpacity>
								);
							})}
						</View>
						<View style={Styles.buttons}>
							<Button callback={callbackCancel}
								buttonStyles={Styles.button}
								buttonTextStyles={Styles.buttonText}
								text={window.strings['cancel']}
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}