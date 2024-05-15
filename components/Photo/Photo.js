import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import Styles from './PhotoStyles';


export default class Photo extends Component {
	constructor(props) {
        super(props);
        const photo = props['photo'] ? props['photo'] : '';
        const width = props['width'] ? props['width'] : 200;
        const height = props['height'] ? props['height'] : 200;
        this.state = {
            photo: photo,
            width: width,
            height: height,
            callback: props['callback'],
            loadImageUrl: this.getUrl(),
            processing: true
        };
	}

    componentDidMount() {
        const self = this;

        this.loadTimeout = setTimeout(function () {
            self.setState({
                processing: false
            });
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.loadTimeout);
    }

    getUrl = () => {
        const width = this.props['width'] ? this.props['width'] : 200;
        const height = this.props['height'] ? this.props['height'] : 200;
        const imageSize = this.props['imageSize'] ? this.props['imageSize'] : null;
        return 'https://load-image.mkgest.com/?color=black&width=' + width + '&height=' + height + '&imagesize=' + imageSize + '&lng=' + window.language;
    }

    receiveImage = (image) => {
        const photoBase64 = 'data:image/png;base64,' + image;

        if (this.state.newPhotoCallback) {
            this.state.newPhotoCallback(photoBase64);
        } else {
            this.state.callback(photoBase64);
        }
    }
  
    render() {
        const self = this;
        const photo = this.state.photo && this.state.photo != ImagesBase64.user ?
            this.state.photo : 'no-photo';
        const jsCode = `
            setTimeout(function() {
                document.getElementById('receive-image').setAttribute('image', '${photo}')
                document.querySelector('#send-image')
                    .addEventListener('click', function(event) {
                        window.ReactNativeWebView.postMessage(document.getElementById('send-image').getAttribute('image'));
                    }
                );
            }, 1000);
		`;

        return (
            <View style={{width: this.state.width, height: this.state.height, backgroundColor: '#fff'}}>
                {this.state.processing ?
                    <View style={Styles.processing}>
                        <Text style={Styles.processingText}>
                            {window.strings['processing']}
                        </Text>
                    </View> : null}
                <WebView
                    androidHardwareAccelerationDisabled={true}
                    cacheEnabled={false}
                    cacheMode={'LOAD_NO_CACHE'}
                    incognito={true}
                    javaScriptEnabled={true}
                    bounces={false}
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={false}
                    source={{ uri: this.state.loadImageUrl }}
                    injectedJavaScript={jsCode}
                    style={{width: this.state.width, height: this.state.height, backgroundColor: 'transparent', opacity: 0.99}}
                    onMessage={(event) => {
                        const photo = event.nativeEvent.data;
                        self.state.callback(photo);
                    }}
                />
            </View>
        ); 
    } 
}