import React, { Component } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import DatePicker from 'react-native-datepicker'
import Styles from './ModalUpdateValueStyles';


export default class ModalUpdateValue extends Component {
	state = {
		value: this.props.value
	};

	render() {
		const self = this;
		let { visible } = this.props;
		let { mainTitle } = this.props;
		let { type } = this.props;
		let { field } = this.props;
		let { value } = this.props;
		let { items } = this.props;
		let { placeholder } = this.props;
		let { inputType } = this.props;
		let { maxLength } = this.props;
		let { callbackCancel } = this.props;
		let { callbackConfirm } = this.props;

		if (type == 'datepicker' && !this.state.value) {
			this.setState({
				value: getToday()
			});
		}

		function formatDate(date) {
			let d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();
		
			if (month.length < 2) 
				month = '0' + month;
			if (day.length < 2) 
				day = '0' + day;
		
			return [year, month, day].join('-');
		}

		function getToday() {
			let d = new Date(),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();
		
			if (month.length < 2) 
				month = '0' + month;
			if (day.length < 2) 
				day = '0' + day;
		
			return [year, month, day].join('-');
		}

		return (
			<Modal
				animationType="slide"
				animationDirection="top"
				transparent={true}
				visible={visible}
			>
				<View style={Styles.modalView}>
					<View style={Styles.centeredView}>
						<View style={Styles.mainTitle}>
							<Text style={Styles.mainTitleText}>
								{mainTitle}
							</Text>
						</View>
						<View style={Styles.element}>
							{type == 'input' ?
								<TextInput
									maxLength={maxLength ? maxLength :
										(inputType == 'mobile_phone' ? 16 : 64)}
									returnKeyType='done'
									placeholder={placeholder ? placeholder : null}
									value={this.state.value}
									style={Styles.textInput}
									underlineColorAndroid='transparent'
									keyboardType={inputType == 'numeric' ||
										inputType == 'mobile_phone' ?
										'numeric' : (inputType == 'email' ?
											'email-address' : null)}
									onChangeText={function (inputValue) {
										self.setState({
											value: inputValue
										})
									}}
									selectionColor={Styles.cursorColor}
								/> : null}
							{type == 'select' ?
								<Select
									selectedValue={this.state.value}
									items={items}
									onValueChange={function (itemValue) {
										itemValue = parseFloat(itemValue);
										self.setState({
											value: itemValue
										})
									}}
								></Select> : null}
							{type == 'datepicker' ?
								<View style={Styles.datepicker}>
									<DatePicker
										style={{ width: 200 }}
										date={this.state.value ? new Date(this.state.value) : new Date()}
										onDateChange={function (selectedDate) {
											if (selectedDate) {
												let date = formatDate(selectedDate);
												self.setState({
													value: date
												})
											}
										}}
										mode="date"
										placeholder=""
										format="YYYY-MM-DD"
										confirmBtnText={window.strings['confirm']}
										cancelBtnText={window.strings['cancel']}
										style={Styles.datepickerElement}
										customStyles={{
											dateInput: Styles.datepickerElementInput,
											dateTouchBody: {
												opacity: 1
											}
										}}
										iconComponent={
											<FontAwesome5 name="calendar-alt"
												style={Styles.datepickerElementIcon}
												size={Styles.calendarSize}
												color={Styles.calendarColor} />
										}
										TouchableComponent={TouchableOpacity}
									/>
									<FontAwesome name="caret-down"
										style={Styles.datepickerElementCaret}
										size={Styles.caretSize}
										color={Styles.caretColor} />
								</View> : null}
						</View>
						<View style={Styles.buttons}>
							<Button callback={function () {
									self.setState({
										value: value
									});
									callbackCancel();
								}}
								buttonStyles={[Styles.button,
									Styles.buttonLeft]}
								buttonTextStyles={Styles.buttonDangerText}
								text={window.strings['cancel']} />
							<Button callback={function () {
                                    callbackConfirm(field, self.state.value)
                                }}
								buttonStyles={[Styles.button,
									Styles.buttonRight]}
								buttonTextStyles={Styles.buttonSuccessText}
								text={window.strings['ok']} />
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}