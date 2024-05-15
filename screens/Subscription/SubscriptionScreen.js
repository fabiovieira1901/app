import React, { Component } from 'react';
import { View, ImageBackground, BackHandler, Linking } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Loading from '../../components/Loading/Loading';
import Styles from './SubscriptionStyles';


class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: null,
            loading: true,
            subscriptionUrl: 'https://subscription-ptadmin.mkgest.com?app=true&pt_id=' + axios.defaults.ptId + '&client_id=' + axios.defaults.userId + '&background=' + Styles.webviewBackground + (window.developer ? '&dev=true' : '') + '&receive_data=true&lng=' + window.language
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

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', () => {
                UtilsApi.backHome(navigation);
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

            if (self._unsubscribeHomeEvent) {
                EventRegister.removeEventListener(self._unsubscribeHomeEvent);
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

    checkPayment = () => {
        const self = this;
        try {
            clearTimeout(this.paymentPromise);
            this.paymentPromise = setTimeout(function () {
                Api.getUserPayment(function (response) {
                    if (response.success && response.data[0] && (response.data[0].flags & (1 << 6)) !== 0) {
                        const paymentStatusSuccess = [4];
                        const paymentStatusFailed = [2, 6];
                        if (paymentStatusSuccess.indexOf(response.data[0].paym_check) > -1) {
                            return self.setState({
                                subscriptionUrl: 'https://vivawallet.mkgest.com/?pt_id=' + axios.defaults.ptId + '&success=1' + (window.developer ? '&dev=true' : '')
                            });
                        }
                        if (paymentStatusFailed.indexOf(response.data[0].paym_check) > -1) {
                            return self.setState({
                                subscriptionUrl: 'https://vivawallet.mkgest.com/?pt_id=' + axios.defaults.ptId + '&success=0' + (window.developer ? '&dev=true' : '')
                            });
                        }
                    }
                    self.checkPayment();
                });
            }, 5000);
        } catch (error) { }
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
                        source={{ uri: this.state.subscriptionUrl }}
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
                                self.checkPayment();
                            }
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
}

export default Subscription;