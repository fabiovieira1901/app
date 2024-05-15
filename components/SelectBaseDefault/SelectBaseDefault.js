import React, { Component } from "react";
import { Modal, View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import Button from '../../components/Button/Button';
import Styles from './SelectBaseDefaultStyles';


export default class SelectBaseDefault extends Component {
	state = {
		value: ''
	};

	render() {
		let { visible } = this.props;
		let { search } = this.props;
		let { items } = this.props;
		let { callbackCancel } = this.props;
		let { callbackItem } = this.props;

		return (
			<Modal
				animationType="slide"
				animationDirection="top"
				transparent={true}
				visible={visible}
			>
				<View style={Styles.modalView}>
					<View style={Styles.centeredView}>
						{search ?
							<View style={Styles.searchContainer}>
								<TextInput
									value={this.state.value}
									style={Styles.textInput}
									underlineColorAndroid='transparent'
									placeholder={window.strings['search']}
									onChangeText={(inputValue) =>
										this.setState({
											value: inputValue
										})
									}
									selectionColor={Styles.cursorColor}
								/>
							</View> : null}
						<View style={Styles.list}>
							<ScrollView style={Styles.scrollList}>
								{items.map((item, index) => {
									return (
										<TouchableOpacity key={index}
											activeOpacity={0.8}
											style={[Styles.row,
												item.name.normalize("NFD").replace(
													/[\u0300-\u036f]/g, "").toLowerCase().indexOf(
														this.state.value.normalize("NFD").replace(
															/[\u0300-\u036f]/g, "").toLowerCase()) == -1 ?
													Styles.hidden : null]}
											onPress={function () {
												callbackItem(item);
											}}>
											<Text style={Styles.rowText}>
												{item.name}
											</Text>
										</TouchableOpacity>
									);
								})}
							</ScrollView>
						</View>

						<View style={Styles.buttons}>
							<Button callback={callbackCancel}
								buttonStyles={[Styles.button,
									Styles.buttonLeft]}
								buttonTextStyles={Styles.buttonDangerText}
								text={window.strings['cancel']} />
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}