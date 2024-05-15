import React, { Component } from 'react';
import { View, ImageBackground, Linking, BackHandler } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Api from '../../services/api/Api';
import Loading from '../../components/Loading/Loading';
import Styles from './RegisterStyles';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            registerUrl: 'https://ptclient.mkgest.com?app=true&receive_link=true&pt_id=' + axios.defaults.ptId + '&background=' + Styles.webviewBackground + '&chat_token=' + window.expoToken + (window.developer ? '&dev=true' : '') + '&lng=' + window.language + '&app_version=' + axios.defaults.appVersion,
            registerId: null
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this.navigation = navigation;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener('header-left-click', () => {
                self.handleBackButton(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            if (self._unsubscribeEvent) {
                EventRegister.removeEventListener(self._unsubscribeEvent);
            }

            BackHandler.removeEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });

            clearTimeout(self.paymentPromise);
        });
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();

        if (this._unsubscribeEvent) {
            EventRegister.removeEventListener(this._unsubscribeEvent);
        }
    }

    handleBackButton(navigation) {
        navigation.goBack(null);
        return true;
    }

    closeView = () => {
        this.navigation.goBack(null);
    }

    startPayment = (data) => {
        const self = this;
        if (data) {
            this.setState({
                registerId: data.id
            });
            setTimeout(function () {
                self.checkPayment();
            });
        }
    }

    checkPayment = () => {
        const self = this;
        try {
            clearTimeout(this.paymentPromise);
            if (this.state.registerId) {
                this.paymentPromise = setTimeout(function () {
                    Api.getRegister({
                        id: self.state.registerId
                    }, function (response) {
                        if (response.success && response.data[0] && (response.data[0].paym_sub_check & (1 << 6)) !== 0) {
                            const paymentStatusSuccess = [4];
                            const paymentStatusFailed = [2, 6];
                            if (paymentStatusSuccess.indexOf(response.data[0].paym_sub_status) > -1) {
                                return self.setState({
                                    registerUrl: 'https://vivawallet.mkgest.com/?pt_id=' + axios.defaults.ptId + '&success=1' + (window.developer ? '&dev=true' : '')
                                });
                            }
                            if (paymentStatusFailed.indexOf(response.data[0].paym_sub_status) > -1) {
                                return self.setState({
                                    registerUrl: 'https://vivawallet.mkgest.com/?pt_id=' + axios.defaults.ptId + '&success=0' + (window.developer ? '&dev=true' : '')
                                });
                            }
                        }
                        self.checkPayment();
                    });
                }, 5000);
            }
        } catch (error) { }
    }

    render() {
        const self = this;
        const jsCode = `
            setTimeout(function() {
                document.querySelector('#link-view')
                    .addEventListener('click', function(event) {
                        let data = document.getElementById('link-view').getAttribute('data')
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            event: 'link',
                            data: data
                        }));
                    }
                );
                document.querySelector('#close-view')
                    .addEventListener('click', function(event) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            event: 'close'
                        }));
                    }
                );
            }, 2000);
		`;

        return (
            <View style={Styles.container}>
                <ImageBackground style={Styles.background}>
                    <Loading loadingVisible={this.state.loading} />
                    <WebView
                        androidHardwareAccelerationDisabled={true}
                        cacheEnabled={false}
                        cacheMode={'LOAD_NO_CACHE'}
                        incognito={true}
                        javaScriptEnabled={true}
                        bounces={false}
                        automaticallyAdjustContentInsets={false}
                        scalesPageToFit={false}
                        source={{ uri: this.state.registerUrl }}
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
                            const res = JSON.parse(event.nativeEvent.data);
                            if (res.event == 'link') {
                                Linking.openURL(res.data);
                            }
                            if (res.event == 'close') {
                                self.closeView();
                            }
                            if (res.event == 'start-payment') {
                                self.startPayment(res.data);
                            }
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
}

export default Register;