import React, { Component } from 'react';
import {
	View, Text, Image, FlatList, TextInput, TouchableOpacity,
	TouchableWithoutFeedback, RefreshControl
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Styles from './ListStyles';


export default class List extends Component {
	state = {
		value: ''
	}

	render() {
		const self = this;
		const { data } = this.props;
		const { loading } = this.props;
		const { callbackRefresh } = this.props;
		const { callbackOpen } = this.props;
		const { showAlertMessage } = this.props;
		const { sortableCallback } = this.props;
		const { search } = this.props;
		const { searchFields } = this.props;
		const { emptyMessage } = this.props;
		const { boxStyle } = this.props;
		const { contentStyle } = this.props;
		const { titleStyle } = this.props;
		const { descriptionStyle } = this.props;
		const { showDescription } = this.props;
		const { boxs } = this.props;
		const { showImage } = this.props;
		const { imageColStyle } = this.props;
		const { imageElementStyle } = this.props;

		function sortItem(index, move) {
			if (move == 'up') {
				arrayMove(data, index, index - 1);
			} else {
				arrayMove(data, index, index + 1);
			}
			sortableCallback(data);
		}

		function arrayMove(arr, oldIndex, newIndex) {
			if (newIndex >= arr.length) {
				let k = newIndex - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}
			arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
			return arr;
		}

		function filteredData() {
			const cloneData = JSON.parse(JSON.stringify(data));
			const out = [];
			const searchValue = self.state.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
			for (let i = 0; i < cloneData.length; i++) {
				const item = cloneData[i];
				const itemName = item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
				let filtered = true;
				if (itemName.indexOf(searchValue) == -1 && searchValue) {
					filtered = false;
				}
				if (searchFields) {
					for (let f = 0; f < searchFields.length; f++) {
						if (item[searchFields[f]].indexOf(searchValue) > -1 && searchValue) {
							filtered = true;
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
			<View style={Styles.container}>
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
						{this.state.value ?
							<TouchableOpacity activeOpacity={0.8}
								onPress={() =>
									this.setState({
										value: ''
									})
								}
								style={Styles.inputIcon}
							>
								<FontAwesome name={'close'}
									size={Styles.inputIconSize}
									color={Styles.inputIconColor} />
							</TouchableOpacity> : null}
					</View> : null}

				{!data.length && !loading ?
					<View style={Styles.emptyList}>
						<Text style={Styles.emptyListText}>
							{emptyMessage ? emptyMessage : window.strings['empty_list']}
						</Text>
					</View> : null}
				<FlatList
					data={filteredData()}
					initialNumToRender={5}
					numColumns={boxs ? 2 : null}
					refreshControl={
						<RefreshControl refreshing={loading} onRefresh={callbackRefresh ? callbackRefresh : function () { }} />
					}
					style={boxs ? Styles.wrapBoxs : null}
					renderItem={({ item, index }) => {
						return (
							<View style={[Styles.row, item.disabled ? Styles.rowDisabled : null, boxs ? Styles.box : null]}>
								<TouchableWithoutFeedback onPress={function () {
									if (callbackOpen) {
										callbackOpen(item);
									}
								}}>
									<View style={[Styles.rowItem, boxs ? Styles.boxRowItem : null, boxStyle]}>
										{item.photo ?
											<View style={[Styles.itemImageCol, imageColStyle]}>
												<Image style={[Styles.itemPhoto, imageElementStyle]}
													source={{ uri: item.photo }} />
											</View> : null}

										<View style={[Styles.itemTitleCol, boxs ? Styles.boxItemTitleCol : null, contentStyle]}>
											{showImage && item.image ?
												<View style={Styles.itemImage}>
													<Image style={Styles.itemImageElement}
														source={{ uri: item.image }} />
												</View> : null}

											<Text style={[Styles.itemTitleText, titleStyle]}>
												{item.name}
											</Text>

											{item.info ?
												<View style={Styles.itemInfoRow}>
													<Text style={[Styles.itemInfoText, descriptionStyle]}>
														{item.info}
													</Text>
												</View> : null}

											{showDescription && item.description ?
												<View style={Styles.itemInfoRow}>
													<Text style={[Styles.itemInfoText, descriptionStyle]}>
														{item.description}
													</Text>
												</View> : null}

											{item.message ?
												<View style={Styles.itemMessageRow}>
													<Text style={[Styles.itemMessageText, Styles[item.message.type + 'Text']]}>
														{item.message.text}
													</Text>
												</View> : null}

											{showAlertMessage ?
												<View style={Styles.itemInfoRow}>
													{item.training_plan_expired ||
														item.physical_evaluation_expired ?
														<Ionicons name="md-alert"
															style={Styles.alertIcon}
															size={Styles.iconSize}
															color={Styles.iconAlertColor} /> : null}
													{item.training_plan_expired ?
														<Text style={Styles.itemDangerText}>
															{window.strings['training_plan_expiring']}
														</Text> : null}
													{item.physical_evaluation_expired ?
														<Text style={Styles.itemDangerText}>
															{window.strings['physical_evaluation_expiring']}
														</Text> : null}
												</View> : null}
										</View>
										<View style={[Styles.itemIconCol, sortableCallback ? Styles.itemIconColSortable : null]}>
											{sortableCallback ?
												<View style={Styles.sortableIcons}>
													<TouchableOpacity activeOpacity={0.8}
														onPress={function () {
															if (index > 0) {
																sortItem(index, 'up');
															}
														}}
														style={[Styles.sortIcon, index == 0 ?
															Styles.hidden : null]}>
														<FontAwesome name="chevron-up"
															size={Styles.sortIconSize}
															color={Styles.sortIconColor}
														/>
													</TouchableOpacity>
													<TouchableOpacity activeOpacity={0.8}
														onPress={function () {
															if (index < data.length - 1) {
																sortItem(index, 'down');
															}
														}}
														style={[Styles.sortIcon, index == data.length - 1 ? Styles.hidden : null]}>
														<FontAwesome name="chevron-down"
															size={Styles.sortIconSize}
															color={Styles.sortIconColor}
														/>
													</TouchableOpacity>
												</View> : null}

											{callbackOpen ?
												<FontAwesome name="chevron-right"
													color={Styles.iconColor}
												/> : null}
										</View>
									</View>
								</TouchableWithoutFeedback>
							</View>
						);
					}}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		);
	}
}
