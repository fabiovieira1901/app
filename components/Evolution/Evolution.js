import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import Styles from './EvolutionStyles';


export default class Evolution extends Component {
	render() {
		const { data } = this.props;
		const { loading } = this.props;
		const { callbackRefresh } = this.props;

		return (
			<View style={Styles.container}>
				{!data.length ? 
					<View style={Styles.emptyContainer}>
						<Text style={Styles.emptyNoDataText}>
							{window.strings['no_data']}
						</Text>
						<Text style={Styles.emptyText}>
							{window.strings['change_dates_check_evolutions']}
						</Text>
					</View> : null}

				<FlatList
					data={data}
					refreshControl={
						<RefreshControl refreshing={loading}
							onRefresh={callbackRefresh} />
					}
					renderItem={({ item: rowData }) => {
						return (
							<View style={Styles.row}>
								<View style={Styles.title}>
									<Text style={Styles.titleText}>
										{rowData.title}
									</Text>
								</View>
								<View style={Styles.valuesContainer}>
									<View style={Styles.values}>
										<View style={[Styles.line,
											rowData.values[0] > rowData.values[1] ? 
												Styles.lineDown : null,
											rowData.values[0] < rowData.values[1] ? 
												Styles.lineUp : null]}>
											<View style={Styles.lineColor}></View>
										</View>

										<View style={[Styles.lineStart,
											rowData.values[0] > rowData.values[1] ?
												Styles.lineStartUp : null,
											rowData.values[0] < rowData.values[1] ?
												Styles.lineStartDown : null]}>
											<Text style={Styles.valueText}>
												{rowData.values[0]}
											</Text>
											<View style={Styles.valuePoint}></View>
										</View>

										<View style={[Styles.lineEnd,
											rowData.values[0] < rowData.values[1] ?
												Styles.lineEndUp : null,
											rowData.values[0] > rowData.values[1] ?
												Styles.lineEndDown : null]}>
											<Text style={Styles.valueText}>
												{rowData.values[1]}
											</Text>
											<View style={Styles.valuePoint}></View>
										</View>
									</View>
								</View>
							</View>
						);
					}}
					keyExtractor={(item) => item.title}
				/>
			</View>
		);
	}
}
