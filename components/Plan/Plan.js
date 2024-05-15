import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import Styles from './PlanStyles';


export default class Plan extends Component {
	constructor(props) {
        super(props);
        this.state = {
			data: props['data'],
			trainExtra: props['trainExtra'],
			openCallback: props['openCallback'],
			exercisesDict: this.getExercisesDict(props['exercises'])
        };
	}

	refresh = (exercises) => {
		this.setState({
			exercisesDict: this.getExercisesDict(exercises)
		});
	}

	getExercisesDict = (exercises) => {
		const dict = {};
        for (let i = 0; i < exercises.length; i++) {
            dict[exercises[i].id] = exercises[i];
        }
        return dict;
	}

	getValueString = (step) => {
		let info = '';

        if (step.repeat_id) {
			info += step.repeat_id + ' ' + window.strings['series'].toLowerCase() + ' / ';
        }

        if (step.value) {
			info += step.value + ' / ';
        } else if (step.repeat) {
			info += step.repeat + ' ' + window.strings['reps'].toLowerCase() + ' / ';
        }

        if (step.weight) {
			info += step.weight + ' ' + window.strings['kg'] + ' / ';
        }

        if (step.rest) {
			info += step.rest + ' ' + window.strings['rest'].toLowerCase() + ' / ';
        }

		info = info.substring(0, info.length - 2);

		return info;
	}

	isLastStepCircuit = (index) => {
		let lastIndex = 0;

		for (let i = 0; i < this.state.data.steps.length; i++) {
			if (this.state.data.steps[i].circuit === this.state.data.steps[index].circuit) {
				lastIndex = i;
			}
		}

		if (lastIndex === index) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const self = this;

		return (
			<View>
				<ScrollView style={Styles.container}>
					<View style={Styles.header}>
						{this.state.remarks ?
							<Text style={Styles.headerTitle}>
								{this.state.remarks}
							</Text> :null}
					</View>

					{this.state.data ?
						<View>
							{this.state.data.steps.map((step, index) => {
								if (step.repeat == '#CIRCUITO#') {
									return getCircuitHeader(step, index);
								} else {
									return getStep(step, index);
								}
							})}
						</View> : null}
				</ScrollView>
			</View>
		);

		function getCircuitHeader(step, index) {
			return <View key={index} style={Styles.stepCircuitHeader}>
				<Text style={Styles.stepCircuitHeaderText}>
					{step.remarks}{step.repeat_id > 1 ? ' - ' + step.repeat_id + 'x' : ''}
				</Text>
			</View>
		}

		function getStep(step, index) {
			const exercise = self.state.exercisesDict[step.workout_id] ? self.state.exercisesDict[step.workout_id] : {};
			return (
				<View key={index}
					style={[
						step.circuit ? Styles.stepCircuit : Styles.step,
						step.circuit && self.isLastStepCircuit(index) ? Styles.stepCircuitLast : null
					]}
				>
					<View style={Styles.stepBox}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={Styles.stepRow}
							onPress={function () {
								self.state.openCallback(step);
							}}
						>
							{exercise.photo && exercise.photo.toString().indexOf('data:image') > -1 ?
								<View style={Styles.stepImageView}>
									<Image style={Styles.stepImage}
										source={{ uri: exercise.photo }}
									/>
								</View> : null}

							<View style={Styles.stepText}>
								<Text style={Styles.stepTextName}>
									{exercise.label}
								</Text>
								<Text style={Styles.stepTextValue}>
									{self.getValueString(step)}
								</Text>
							</View>
						</TouchableOpacity>

						{self.state.trainExtra ?
							<TouchableOpacity activeOpacity={0.8}
								onPress={function () {
									self.state.trainExtra.callback(step);
								}}
								style={Styles.stepTrainExtra}
							>
								<Image style={Styles.stepTrainExtraImage}
									source={{ uri: self.state.trainExtra.image }}
								/>
							</TouchableOpacity> : null}
					</View>
				</View>
			)
		}
	}
}