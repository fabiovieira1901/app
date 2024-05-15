import React, { Component } from "react";
import {
	Modal, View, ScrollView, Alert,
	Text, TouchableOpacity, Keyboard
} from "react-native";
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Styles from './ModalUpdateValuesStyles';


export default class ModalUpdateValues extends Component {
	state = {
		visible: this.props.visible,
		callbackCancel: this.props.callbackCancel,
		callbackConfirm: this.props.callbackConfirm,
		confirmButtonText: this.props.confirmButtonText,
		cancelButtonText: this.props.cancelButtonText,
		title: this.props.title,
		errorMessage: this.props.errorMessage,
		data: this.props.data,
		clickOutsideCloseKeyboard: this.props.clickOutsideCloseKeyboard,
		inline: this.props.inline
	};

	updateData = (id, value) => {
		for (let i = 0; i < this.state.data.length; i++) {
			if (this.state.data[i].id == id) {
				this.state.data[i].value = value;
				break;
			}
		}

		this.setState({
			data: this.state.data
		});
	}

	validateFields = () => {
		for (let i = 0; i < this.state.data.length; i++) {
			if (this.state.data[i].required && !this.state.data[i].value &&
				!this.state.data[i].disabled) {
				return false;
			}
		}

		return true;
	}

	render() {
		const self = this;
		let { extraView } = this.props;

		if (this.state.clickOutsideCloseKeyboard) {
			return (
				<Modal
					animationType="slide"
					animationDirection="top"
					transparent={true}
					visible={this.state.visible}
				>
					<TouchableOpacity activeOpacity={1} style={Styles.modalView}
						onPress={Keyboard.dismiss}
					>
						<View style={Styles.centeredView}>
							{this.state.title ?
								<View style={Styles.title}>
									<Text style={Styles.titleText}>
										{this.state.title}
									</Text>
								</View> : null}

							<Form callback={this.updateData}
								adjust={true}
								dark={true}
								data={this.state.data}
								inline={this.state.inline}
							/>

							{this.state.errorMessage ?
								<View style={Styles.errorMessage}>
									<Text style={Styles.errorMessageText}>
										{this.state.errorMessage}
									</Text>
								</View> : null}

							{extraView ?
								<ScrollView>
									{extraView}
								</ScrollView> : null}

							<View style={Styles.buttons}>
								<Button callback={this.state.callbackCancel}
									buttonStyles={[Styles.button, Styles.buttonLeft]}
									buttonTextStyles={Styles.buttonDangerText}
									text={this.state.cancelButtonText ? this.state.cancelButtonText : window.strings['cancel']}
								/>
								<Button
									callback={function () {
										if (self.validateFields()) {
											self.state.callbackConfirm(self.state.data)
										} else {
											Alert.alert('', window.strings['fill_all_fields']);
										}
									}}
									buttonStyles={[Styles.button, Styles.buttonRight]}
									buttonTextStyles={Styles.buttonSuccessText}
									text={this.state.confirmButtonText ? this.state.confirmButtonText : window.strings['ok']} />
							</View>
						</View>
					</TouchableOpacity>
				</Modal>
			);
		} else {
			return (
				<Modal
					animationType="slide"
					animationDirection="top"
					transparent={true}
					visible={this.state.visible}
				>
					<View style={Styles.modalView}>
						<View style={Styles.centeredView}>
							{this.state.title ?
								<View style={Styles.title}>
									<Text style={Styles.titleText}>
										{this.state.title}
									</Text>
								</View> : null}

							<Form callback={this.updateData}
								adjust={true}
								dark={true}
								data={this.state.data}
								inline={this.state.inline}
							/>

							{this.state.errorMessage ?
								<View style={Styles.errorMessage}>
									<Text style={Styles.errorMessageText}>
										{this.state.errorMessage}
									</Text>
								</View> : null}

							{extraView ?
								<ScrollView>
									{extraView}
								</ScrollView> : null}

							<View style={Styles.buttons}>
								<Button callback={this.state.callbackCancel}
									buttonStyles={[Styles.button, Styles.buttonLeft]}
									buttonTextStyles={Styles.buttonDangerText}
									text={this.state.cancelButtonText ? this.state.cancelButtonText : window.strings['cancel']}
								/>
								<Button
									callback={function () {
										if (self.validateFields()) {
											self.state.callbackConfirm(self.state.data)
										} else {
											Alert.alert('', window.strings['fill_all_fields']);
										}
									}}
									buttonStyles={[Styles.button, Styles.buttonRight]}
									buttonTextStyles={Styles.buttonSuccessText}
									text={this.state.confirmButtonText ? this.state.confirmButtonText : window.strings['ok']}
								/>
							</View>
						</View>
					</View>
				</Modal>
			);
		}
	}
}