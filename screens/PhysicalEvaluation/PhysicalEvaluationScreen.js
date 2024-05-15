import React, { Component } from 'react';
import { View, ImageBackground, BackHandler } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { WebView } from 'react-native-webview';
import UtilsApi from '../../services/utils/utils';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import Styles from './PhysicalEvaluationStyles';


class PhysicalEvaluation extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        const { data } = route.params;
        this.state = {
            navigation: null,
            loading: true,
            showContent: false,
            url: 'https://physical-evaluation.mkgest.com?app=true&pt_id=' + axios.defaults.ptId + '&client_id=' + axios.defaults.userId + '&pe_id=' + data.id + '&background=' + Styles.webviewBackground + '&lng=' + window.language
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener('header-left-click', () => {
                self.handleBackButton(navigation);
            });

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', (data) => {
                UtilsApi.backHome(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });

            self.setState({
                showContent: true,
                loading: true
            });
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            if (self._unsubscribeEvent) {
                EventRegister.removeEventListener(self._unsubscribeEvent);
            }

            if (self._unsubscribeHomeEvent) {
                EventRegister.removeEventListener(self._unsubscribeHomeEvent);
            }

            BackHandler.removeEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });

            self.setState({
                showContent: false
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();

        if (this._unsubscribeEvent) {
            EventRegister.removeEventListener(this._unsubscribeEvent);
        }

        if (this._unsubscribeHomeEvent) {
            EventRegister.removeEventListener(this._unsubscribeHomeEvent);
        }
    }

    handleBackButton(navigation) {
        navigation.goBack(null);
        return true;
    }

    closeView = () => {
        this.navigation.goBack(null);
    }

    render() {
        const self = this;
        const jsCode = `
            setTimeout(function() {
                document.querySelector('#close-view')
                    .addEventListener('click', function(event) {
                        window.ReactNativeWebView.postMessage('close');
                    }
                );
            }, 1000);
		`;

        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.loading} />

                {this.state.showContent && this.state.url ?
                    <ImageBackground style={Styles.background}>
                        <WebView
                            androidHardwareAccelerationDisabled={true}
                            cacheEnabled={false}
                            cacheMode={'LOAD_NO_CACHE'}
                            incognito={true}
                            javaScriptEnabled={true}
                            bounces={false}
                            automaticallyAdjustContentInsets={false}
                            scalesPageToFit={false}
                            source={{ uri: this.state.url }}
                            injectedJavaScript={jsCode}
                            style={Styles.webview}
                            onLoadEnd={() => {
                                setTimeout(function () {
                                    self.setState({
                                        loading: false
                                    });
                                }, 1000);
                            }}
                            onMessage={(event) => {
                                self.closeView()
                            }}
                        />
                    </ImageBackground> : null}
            </View>
        );
    }
}

export default PhysicalEvaluation;