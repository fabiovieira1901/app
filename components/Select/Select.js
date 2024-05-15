import React, { Component } from "react";
import { Modal, View, FlatList, TextInput, Text, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import Styles from './SelectStyles';


export default class Select extends Component {
	state = {
		visible: false,
		value: '',
		filtersValues: {},
		filterVisible: null,
		multiselectValues: [],
		searchFocusActive: false
	};

	render() {
		const self = this;
		let { selectedValue } = this.props;
		let { items } = this.props;
		let { search } = this.props;
		let { onValueChange } = this.props;
		let { disabled } = this.props;
		let { filters } = this.props;
		let { multiselect } = this.props;
		let { style } = this.props;

		function getText() {
			if (multiselect) {
				if (self.state.multiselectValues.length > 1) {
					return self.state.multiselectValues.length + ' ' + window.strings['exercises'];
				} else if (self.state.multiselectValues.length == 1) {
					return self.state.multiselectValues.length + ' ' + window.strings['exercise'];
				} else {
					return window.strings['choose_exercises']
				}
			} else {
				for (let i = 0; i < items.length; i++) {
					if (items[i].value == selectedValue) {
						return items[i].label;
					}
				}
			}
		}

		function getLabelFilter(filterId) {
			let filterSelected = self.state.filtersValues[filterId];

			for (let i = 0; i < filters.length; i++) {
				if (filters[i].id == filterId) {
					for (let t = 0; t < filters[i].items.length; t++) {
						if (filters[i].items[t].value === filterSelected) {
							return filters[i].items[t].label;
						}
					}
					break;
				}
			}

			return window.strings['no_filter_selected'];
		}

		function filteredItems() {
			let cloneItems = JSON.parse(JSON.stringify(items));
			let out = [];
			let searchValue = self.state.value.normalize("NFD").replace(
				/[\u0300-\u036f]/g, "").toLowerCase();

			for (let i = 0; i < cloneItems.length; i++) {
				const item = cloneItems[i];
				let filtered = true;
				let itemName = item.label.normalize("NFD").replace(
					/[\u0300-\u036f]/g, "").toLowerCase();
				
				if (itemName.indexOf(searchValue) == -1 && searchValue) {
					filtered = false;
				}

				if (filters) {
					for (let i = 0; i < filters.length; i++) {
						if (self.state.filtersValues[filters[i].id]) {
							if (item[filters[i].id] != self.state.filtersValues[filters[i].id]) {
								filtered = false;
							}
						}
					}
				}

				if (filtered) {
					out.push(item);
				}
			}

			return out;
		}
		
		return (
			<View style={style ? style : null}>
				<View>
					<TouchableOpacity activeOpacity={0.8} style={Styles.openSelect}
						onPress={function () {
							if (!disabled) {
								self.setState({
									visible: true
								});
							}
						}}>
						<Text style={Styles.openSelectText}>
							{getText()}
						</Text>
						<FontAwesome name="caret-down"
							size={Styles.caretSize}
							color={Styles.caretColor} />
					</TouchableOpacity>
				</View>
				<Modal
					animationType="slide"
					animationDirection="top"
					transparent={true}
					visible={this.state.visible}
				>
					<TouchableOpacity activeOpacity={1} style={Styles.modalTouch}
						onPress={function () {
							self.setState({
								visible: false
							});
						}}>
						<View style={Styles.modalView}>
							<View style={Styles.centeredView}>

								{search ?
									<View style={Styles.searchContainer}>
										<TextInput
											value={this.state.value}
											style={Styles.textInput}
											underlineColorAndroid='transparent'
											placeholder={window.strings['search']}
											onFocus={() =>
												this.setState({
													searchFocusActive: true
												})
											}
											onBlur={() =>
												this.setState({
													searchFocusActive: false
												})
											}
											onChangeText={(inputValue) =>
												this.setState({
													value: inputValue
												})
											}
											selectionColor={Styles.cursorColor}
										/>
									</View> : null}

								{filters ?
									<View style={Styles.filtersContainer}>
										{filters.map((filter, index) => {
											return (
												<View key={filter.id + '-' + index}
													style={Styles.filterItem}>
													<TouchableOpacity activeOpacity={0.8}
														style={Styles.filterName}
														onPress={function () {
															if (self.state.filterVisible == filter) {
																self.state.filterVisible = null;
															} else {
																self.state.filterVisible = filter;
															}
															self.setState({
																filterVisible: self.state.filterVisible
															});
														}}>
														<Text style={Styles.filterTitleText}>
															{filter.title}
														</Text>
														<View style={Styles.filterNameBox}>
															<Text style={Styles.filterNameText}>
																{getLabelFilter(filter.id)}
															</Text>
															<FontAwesome name="caret-down"
																size={Styles.caretSize}
																color={Styles.caretColor} />
														</View>
													</TouchableOpacity>
												</View>
											)
										})}
									</View> : null}

								{items.length > 6 ?
									<View style={[filters ?
										Styles.rowsContainerFilters : Styles.rowsContainer,
										this.state.searchFocusActive ? Styles.rowsContainerFiltersFocus : null]}>
										<FlatList
											style={Styles.rows}
											data={filteredItems()}
											initialNumToRender={5}
											renderItem={({ item, index }) => {
												return (
													<TouchableOpacity key={item.value}
														activeOpacity={0.8}
														style={[Styles.button,
															selectedValue == item.value ?
																Styles.selected : null,
															index < items.length - 1 ?
																Styles.buttonBorder : null,
															multiselect ? Styles.multiselectRow : null]}
														onPress={function () {
															if (multiselect) {
																let multiselectIndex = self.state.multiselectValues.indexOf(item.value);
																if (multiselectIndex > -1) {
																	self.state.multiselectValues.splice(multiselectIndex, 1);
																} else {
																	self.state.multiselectValues.push(item.value);
																}
																self.setState({
																	multiselectValues: self.state.multiselectValues
																});
															} else {
																onValueChange(item.value);
																self.setState({
																	visible: false
																});
															}
														}}>
														<Text style={[Styles.buttonText,
															multiselect ? Styles.buttonTextFlex : null]}>
															{item.label}
														</Text>
														{multiselect ?
															<View style={Styles.multiselectRowIcon}>
																{this.state.multiselectValues.indexOf(item.value) > -1 ?
																	<MaterialCommunityIcons name="checkbox-marked"
																		size={Styles.caretSize}
																		color={Styles.caretColor} />
																	: <MaterialCommunityIcons name="checkbox-blank-outline"
																		size={Styles.caretSize}
																		color={Styles.caretColor} />}
															</View> : null}
													</TouchableOpacity>
												);
											}}
											keyExtractor={(item) => item.value.toString()}
										/>
									</View> :
									<View style={Styles.rows}>
										{items.map((item, index) => {
											return (
												<TouchableOpacity key={item.value}
													activeOpacity={0.8}
													style={[Styles.button,
														selectedValue == item.value ?
															Styles.selected : null,
														index < items.length - 1 ?
															Styles.buttonBorder : null,
														item.label.normalize("NFD").replace(
															/[\u0300-\u036f]/g, "").toLowerCase().indexOf(
																this.state.value.normalize("NFD").replace(
																	/[\u0300-\u036f]/g, "").toLowerCase()) == -1 ?
															Styles.hidden : null]}
													onPress={function () {
														onValueChange(item.value);
														self.setState({
															visible: false
														});
													}}>
													<Text style={Styles.buttonText}>
														{item.label}
													</Text>
												</TouchableOpacity>
											);
										})}
									</View>
								}

								{multiselect ?
									<View style={Styles.multiselectButtons}>
										<Button
											callback={function () {
												self.setState({
													visible: false
												});
											}}
											buttonStyles={[Styles.multiselectButton, Styles.multiselectButtonLeft]}
											buttonTextStyles={Styles.multiselectButtonCancel}
											text={window.strings['cancel']} />
										<Button
											callback={function () {
												onValueChange(self.state.multiselectValues);
												self.setState({
													visible: false
												});
											}}
											buttonStyles={[Styles.multiselectButton, Styles.multiselectButtonRight]}
											buttonTextStyles={Styles.multiselectButtonConfirm}
											text={window.strings['confirm']} />
									</View> : null}
							</View>
						</View>
					</TouchableOpacity>

					{this.state.filterVisible && this.state.filterVisible.items ?
						<TouchableOpacity activeOpacity={1}
							style={Styles.filterOptions}
							onPress={function () {
								self.setState({
									filterVisible: null
								});
							}}>
							<View style={Styles.filterOptionsContainer}>
								<TouchableOpacity activeOpacity={0.8}
									style={Styles.filterOption}
									onPress={function () {
										self.state.filtersValues[
											self.state.filterVisible.id] = null
										self.setState({
											filtersValues: self.state.filtersValues,
											filterVisible: null
										});
									}}>
									<Text style={Styles.filterOptionText}>
										{window.strings['clean_filter']}
									</Text>
								</TouchableOpacity>
								{this.state.filterVisible.items.map((option, index) => {
									return (
										<TouchableOpacity key={option.value + '-' + index}
											activeOpacity={0.8}
											style={Styles.filterOption}
											onPress={function () {
												self.state.filtersValues[
													self.state.filterVisible.id] = option.value
												self.setState({
													filtersValues: self.state.filtersValues,
													filterVisible: null
												});
											}}>
											<Text style={Styles.filterOptionText}>
												{option.label}
											</Text>
										</TouchableOpacity>
									)
								})}
							</View>
						</TouchableOpacity> : null}
				</Modal>
			</View>
		);
	}
}