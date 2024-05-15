import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Styles from './VideoStyles';

export default class Video extends Component {
	render() {
		const { url } = this.props;
		const { videoLoading } = this.props;
		const { containerStyle } = this.props;
		const { darkLoading } = this.props;

		return (
			<View style={containerStyle ? containerStyle : null}>
				<WebView
					javaScriptEnabled={true}
					source={{uri: url}}
					style={[Styles.video, !videoLoading ? Styles.visible : null]}
				/>

				{videoLoading && !darkLoading ?
					<ActivityIndicator style={Styles.loading} 
						size="large" color="#fff" /> : null}

				{videoLoading && darkLoading ?
					<ActivityIndicator style={Styles.loading} 
						size="large" color="#000" /> : null}
			</View>
		);
	}
}
