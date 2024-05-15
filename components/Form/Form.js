import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Select from '../../components/Select/Select';
import ModalUpdateValue from '../../components/ModalUpdateValue/ModalUpdateValue';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Styles from './FormStyles';


export default class Form extends Component {
	state = {
		modals: {},
		showPassword: {}
	};

	render() {
		const self = this;
		const { data } = this.props;
		const { callback } = this.props;
		const { formField } = this.props;
		const { dark } = this.props;
		const { adjust } = this.props;
		const { inline } = this.props;
		const { containerStyle } = this.props;
		const { centered } = this.props;

		let hoursOptions = getTimeOptions('h');
		let minutesOptions = getTimeOptions('m');
		let secondsOptions = getTimeOptions('s');

		checkDatepickerValues();

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

		function getSelectValueUnit(item) {
			let selectIndex = item.setUnitSelectIndex;

			if (item.type == 'time') {
				return ' (hh:mm:ss)';
			}

			if (data[selectIndex].value) {
				for (let i = 0; i < data[selectIndex].items.length; i++) {
					if (data[selectIndex].items[i].unit &&
						data[selectIndex].items[i].value == data[selectIndex].value) {
						return ' (' + data[selectIndex].items[i].unit + ')';
					}
				}
			}

			return '';
		}

		function checkChangeType(id, value) {
			for (let i = 0; i < data.length; i++) {
				let parent = data[i];

				if (parent.id == id) {
					if (parent.changeItemType) {
						for (let t = 0; t < data.length; t++) {
							let children = data[t];

							if (parent.changeItemType == children.id) {
								for (let o = 0; o < children.changeTypeOpts.length; o++) {
									let opts = children.changeTypeOpts[o];

									if (opts.value == value) {
										children.type = opts.type;
										children.value = '';
										callback(children.id, children.value, formField);
									}
								}
								break;
							}
						}
					}

					break;
				}
			}
		}

		function checkChangeSwitch(id, value) {
			for (let i = 0; i < data.length; i++) {
				let parent = data[i];

				if (parent.id == id) {
					if (parent.updateFields) {
						let updateFields = null;

						for (let u = 0; u < parent.updateFields.length; u++) {
							if (parent.updateFields[u].value == value) {
								updateFields = parent.updateFields[u].fields;
								break;
							}
						}

						for (let d = 0; d < updateFields.length; d++) {
							for (let t = 0; t < data.length; t++) {
								let children = data[t];

								if (updateFields[d].id == children.id) {
									if (updateFields[d].type) {
										children.type = updateFields[d].type;
									}

									children.disabled = updateFields[d].disabled;
									children.value = updateFields[d].value;
									callback(children.id, children.value, formField);

									break;
								}
							}
						}
					}

					break;
				}
			}
		}

		function getTimeOptions(unit) {
			let limit = unit == 'h' ? 24 : 60;
			let opts = [];

			for (let i = 0; i < limit; i++) {
				opts.push({
					label: i < 10 ? '0' + i : i + '',
					value: i
				});
			}

			return opts;
		}

		function getTimeFormat(item, value, unit) {
			let split = item.value.split(':');
			let index = 0;

			switch (unit) {
				case 'm':
					index = 1;
					break;
				case 's':
					index = 2;
					break;
			}

			split[index] = value;

			split[0] = parseFloat(split[0]) < 10 ?
				'0' + parseFloat(split[0]) : split[0] + '';
			split[1] = parseFloat(split[1]) < 10 ?
				'0' + parseFloat(split[1]) : split[1] + '';
			split[2] = parseFloat(split[2]) < 10 ?
				'0' + parseFloat(split[2]) : split[2] + '';

			let time = split.join(':');
			item.value = time;

			return time;
		}

		function getTimeValue(item, unit) {
			let value = item.value;
			let split = value.split(':');
			let index = 0;
			let hours = split[0];
			let minutes = split[0];
			let seconds = split[0];

			switch (unit) {
				case 'm':
					index = 1;
					break;
				case 's':
					index = 2;
					break;
			}

			let changed = false;
			if (!hours) {
				changed = true;
				hours = '00';
			}
			if (!minutes) {
				changed = true;
				minutes = '00';
			}
			if (!seconds) {
				changed = true;
				seconds = '00';
			}

			if (changed) {
				item.value = [hours, minutes, seconds].join(':');
			}

			return split[index];
		}

		function checkDatepickerValues() {
			for (let i = 0; i < data.length; i++) {
				if (!data[i].value && data[i].type == 'datepicker') {
					callback(data[i].id, getDatepickerDefaultValue(
						data[i].onlyPreviousDates), formField);
				}
			}
		}

		function getDatepickerDefaultValue(onlyPreviousDates) {
			let d = new Date();

			if (onlyPreviousDates) {
				d = new Date((new Date()).setFullYear((new Date()).getFullYear() - 18))
			}

			let month = '' + (d.getMonth() + 1);
			let day = '' + d.getDate();
			let year = d.getFullYear();

			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;

			return [year, month, day].join('-');
		}

		return (
			<View style={[adjust ? Styles.containerAdjust : Styles.container, inline ? Styles.containerInline : null, containerStyle]}>
				{data.map((item, index) => {
					if (!item.hidden) {
						return (
							<View key={item.key} style={[Styles.row, inline ? Styles.rowInline : null, inline && item.type == 'textfield' ? Styles.rowTextfieldInline : null]}>
								{item.separatorTitle ?
									<View style={Styles.separatorTitle}>
										<Text style={Styles.separatorTitleText}>
											{item.separatorTitle}
										</Text>
									</View> : null}
								{item.type != 'view' && item.type != 'switch' ?
									<View style={Styles.title}>
										<Text style={[Styles.titleText, dark ? Styles.textColorBlack : null]}>
											{item.setUnitSelectIndex != undefined ? item.title + getSelectValueUnit(item) : item.title}
										</Text>
									</View> : null}
								<View style={Styles.valueContainer}>
									{item.type == 'input' ?
										<TextInput
											editable={!item.disabled ? true : false}
											maxLength={item.maxLength ? item.maxLength : (item.inputType == 'mobile_phone' ? 16 : 64)}
											returnKeyType='done'
											placeholder={item.placeholder ? item.placeholder : null}
											secureTextEntry={item.isPassword && !this.state.showPassword[item.id] ? true : false}
											value={item.value}
											style={[Styles.textInput, dark ? Styles.borderColorBlack : null, !item.hideEmpty ? Styles.inputWithIcon : null, item.disabled ? Styles.disabled : null]}
											underlineColorAndroid='transparent'
											keyboardType={item.inputType == 'numeric' || item.inputType == 'mobile_phone' ? 'numeric' : (item.inputType == 'email' ? 'email-address' : null)}
											onChangeText={function (inputValue) {
												callback(item.id, inputValue, formField);
											}}
											selectionColor={Styles.cursorColor}
										/> : null}
									{item.type == 'input' && item.isPassword ?
										<TouchableOpacity activeOpacity={0.8}
											onPress={function () {
												self.state.showPassword[item.id] = !self.state.showPassword[item.id];
												self.setState({
													showPassword: self.state.showPassword
												});
											}}
											style={Styles.inputIcon}
										>
											<FontAwesome name={this.state.showPassword[item.id] ? 'eye-slash' : 'eye'}
												size={Styles.inputIconSize}
												color={Styles.inputIconColor}
											/>
										</TouchableOpacity> : null}
									{item.type == 'input' && !item.hideEmpty && !item.isPassword && !item.disabled && item.value ?
										<TouchableOpacity activeOpacity={0.8}
											onPress={function () {
												callback(item.id, '', formField);
											}}
											style={Styles.inputIcon}
										>
											<FontAwesome name={'close'}
												size={Styles.inputIconSize}
												color={Styles.inputIconColor}
											/>
										</TouchableOpacity> : null}
									{item.type == 'textfield' ?
										<TextInput
											maxLength={item.fullPage ? null : 512}
											placeholder={item.placeholder ? item.placeholder : null}
											multiline={true}
											numberOfLines={item.fullPage ? null : 2}
											secureTextEntry={item.isPassword ? true : false}
											value={item.value}
											style={[Styles.textfield, item.fullPage ? Styles.textfieldFull : null, dark ? Styles.borderColorBlack : null]}
											keyboardType={'default'}
											underlineColorAndroid='transparent'
											onChangeText={(inputValue) =>
												callback(item.id, inputValue, formField)
											}
											selectionColor={Styles.cursorColor}
										/> : null}
									{item.type == 'time' ?
										<View style={Styles.timeSelects}>
											<Select
												style={Styles.timeSelect}
												selectedValue={getTimeValue(item, 'h')}
												items={hoursOptions}
												onValueChange={function (itemValue) {
													callback(
														item.id,
														getTimeFormat(item, itemValue, 'h'),
														formField
													);
												}}>
											</Select>
											<Text style={Styles.timeSeparator}>:</Text>
											<Select
												style={Styles.timeSelect}
												selectedValue={getTimeValue(item, 'm')}
												items={minutesOptions}
												onValueChange={function (itemValue) {
													callback(
														item.id,
														getTimeFormat(item, itemValue, 'm'),
														formField
													);
												}}>
											</Select>
											<Text style={Styles.timeSeparator}>:</Text>
											<Select
												style={Styles.timeSelect}
												selectedValue={getTimeValue(item, 's')}
												items={secondsOptions}
												onValueChange={function (itemValue) {
													callback(
														item.id,
														getTimeFormat(item, itemValue, 's'),
														formField
													);
												}}>
											</Select>
										</View> : null}
									{item.type == 'select' || item.type == 'multiselect' ?
										<Select
											filters={item.filters}
											selectedValue={item.value}
											search={item.search}
											items={item.items}
											multiselect={item.type == 'multiselect' ? true : false}
											disabled={item.disabled}
											style={item.disabled ? Styles.disabled : null}
											onValueChange={function (itemValue) {
												if (item.type != 'multiselect') {
													checkChangeType(item.id, itemValue);
													if (!item.string) {
														itemValue = parseFloat(itemValue);
													}
												}
												callback(item.id, itemValue, formField);
											}}>
										</Select> : null}
									{item.type == 'switch' ?
										<View style={Styles.switchContainer}>
											<Text style={item.textBlack ? Styles.switchTitleBlack : Styles.switchTitle}>
												{item.title}
											</Text>
											<Switch
												trackColor={{ false: Styles.switchOff, true: Styles.switchOn }}
												thumbColor={item.value ? Styles.switchBackgroundOn : Styles.switchBackgroundOff}
												ios_backgroundColor={Styles.switchBackground}
												onValueChange={function (value) {
													checkChangeSwitch(item.id, value);
													callback(item.id, value, formField);
												}}
												value={item.value}
											/>
										</View> : null}
									{item.type == 'datepicker' ?
										<TouchableOpacity activeOpacity={0.8}
											onPress={function () {
												let modals = {};
												modals[item.id] = true;
												self.setState({
													modals: modals
												});
											}}>
											<View style={Styles.datepickerButton}>
												<Text style={Styles.datepickerButtonText}>
													{item.value}
												</Text>
												<DateTimePickerModal
													isVisible={this.state.modals[item.id] ? true : false}
													mode="date"
													cancelTextIOS="Cancelar"
													confirmTextIOS="Ok"
													format="YYYY-MM-DD"
													date={item.value ? new Date(item.value) : new Date((new Date()).setFullYear((new Date()).getFullYear() - 18))}
													onConfirm={function (selectedDate) {
														if (selectedDate) {
															const date = formatDate(selectedDate);
															callback(item.id, date, formField);
															let modals = {};
															modals[item.id] = false;
															self.setState({
																modals: modals
															});
														}
													}}
													onCancel={function () {
														let modals = {};
														modals[item.id] = false;
														self.setState({
															modals: modals
														});
													}}
												/>
												<FontAwesome name="caret-down"
													style={Styles.datepickerElementCaret}
													size={Styles.caretSize}
													color={Styles.caretColor}
												/>
											</View>
										</TouchableOpacity> : null}
									{item.type == 'view' ?
										<View>
											{item.edited ?
												<ModalUpdateValue
													mainTitle={item.mainTitle}
													field={item.id}
													value={item.value}
													type={item.subType}
													inputType={item.inputType}
													items={item.items}
													visible={this.state.modals[item.id] ? true : false}
													callbackCancel={function () {
														self.setState({
															modals: {}
														});
													}}
													callbackConfirm={function (attrName, value) {
														callback(attrName, value, formField);
														self.setState({
															modals: {}
														});
													}} /> : null}
											<TouchableOpacity activeOpacity={0.8}
												onPress={function () {
													if (item.edited) {
														let modals = {};
														modals[item.id] = true;
														self.setState({
															modals: modals
														});
													}
												}}>
												<View style={[Styles.viewRow, item.edited ? Styles.viewRowEdited : null]}>
													<View style={Styles.viewCol}>
														{item.edited && item.showEditIcon ?
															<MaterialCommunityIcons
																name="pencil"
																style={Styles.iconEdit}
																size={Styles.iconSize}
																color={Styles.iconEditColor} />
															: null}

														{item.edited && item.showEditIcon ?
															<MaterialCommunityIcons
																name="pencil-off"
																style={Styles.iconEdit}
																size={Styles.iconSize}
																color={Styles.iconEditColor} />
															: null}

														<View style={centered ? Styles.fullWidth : null}>
															<Text style={[Styles.viewRowTitle, centered ? Styles.centered : null]}>
																{item.title}
															</Text>
															<Text style={[Styles.viewRowValue, centered ? Styles.centered : null]}>
																{item.value}
															</Text>
														</View>
													</View>
												</View>
											</TouchableOpacity>
										</View> : null}
								</View>
							</View>
						);
					}
				})}
			</View>
		);
	}
}
