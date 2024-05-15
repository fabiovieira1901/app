import React, { Component } from 'react';
import { View, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
import Api from '../../services/api/Api';
import Button from '../../components/Button/Button';
import Styles from './PhysicalEvaluationsEvolutionStyles';


export default class PhysicalEvaluationsEvolution extends Component {
	constructor(props) {
        super(props);
        this.state = {
			data: props['data'],
			client: props['client'],
			currentIndex: 0,
			loadingPhotos: true,
			photos: [],
			labels: this.getLabels(props['data'] ? props['data'][0] : null)
        };
	}

	componentDidMount() {
		if (this.state.data && this.state.data[0]) {
			this.getPhysicalEvaluationPhotos(this.state.data[0].id);
		}
    }

	next = () => {
		if (this.state.data.length > 1) {
			let newCurrentIndex = this.state.currentIndex + 1;

			if (!this.state.data[newCurrentIndex]) {
				newCurrentIndex = 0;
			}
	
			this.setState({
				currentIndex: newCurrentIndex,
				labels: this.getLabels(this.state.data[newCurrentIndex]),
				loadingPhotos: !this.state.data[newCurrentIndex].photos ? 
					true : false,
				photos: this.state.data[newCurrentIndex].photos ?
					this.state.data[newCurrentIndex].photos : []
			});

			if (!this.state.data[newCurrentIndex].photos) {
				this.getPhysicalEvaluationPhotos(
					this.state.data[newCurrentIndex].id);
			}
		}
	}
	
	getLabels = (data) => {
		return [{
			key: 'date',
			id: 'date',
			title: window.strings['date'],
			value: data && data.date ? data.date : ''
		}, {
			key: 'weight',
			id: 'weight',
			title: window.strings['weight'],
			value: data && data.body && (data.body.weight || data.body.weight === 0) ?
				data.body.weight : ''
		}, {
			key: 'waist',
			id: 'waist',
			title: window.strings['waist'],
			value: data && data.perimeters && (data.perimeters.waist || data.perimeters.waist === 0) ?
				data.perimeters.waist : ''
		}]
	}

	getPhysicalEvaluationPhotos = (id) => {
        const self = this;
        let payload = {
            clientDbId: this.state.client,
            id: id
		};
		
        Api.getPhysicalEvaluationPhotos(payload, function (response) {
			let photos = [];

			if (response.success) {
				for (let i = 0; i < response.data.length; i++) {
					photos.push(response.data[i].photo);
                }
			}
			
			self.state.data[self.state.currentIndex].photos = photos
            self.setState({
				photos: photos,
				data: self.state.data,
				loadingPhotos: false
            });
        });
    }

	render() {
		return (
			<View style={Styles.container}>
				{this.state.data && !this.state.data.length ?
					<View style={Styles.empty}>
						<Text style={Styles.emptyText}>
							{window.strings['no_physical_evaluations']}
						</Text>
					</View> : null}

				{this.state.data && this.state.data.length ?
					<View style={Styles.flex}>
						<View style={Styles.header}>
							<Button callback={this.next}
								buttonStyles={this.state.data.length == 1 ?
									Styles.disabled : null}
								text={window.strings['next']} />
						</View>
						{this.state.loadingPhotos ?
							<View>
								<ActivityIndicator style={Styles.loading} 
									size="large" color="#fff" />
							</View> :
							<ScrollView style={Styles.body}>
								<View style={Styles.labels}>
									{this.state.labels.map((label, index) => {
										return (
											<View key={index} style={Styles.label}>
												<Text style={Styles.labelText}>
													{label.title}{': '}
												</Text>
												<Text style={Styles.labelValue}>
													{label.value}
												</Text>
											</View>
										);
									})}
								</View>
								<View style={Styles.photos}>
									{this.state.photos.map((photo, index) => {
										return (
											<Image key={index} style={Styles.photo}
												source={{uri: photo}} />
										);
									})}
								</View>
							</ScrollView>}
					</View> : null}
			</View>
		);
	}
}
