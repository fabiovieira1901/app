import React, { Component } from 'react';
import { View, ImageBackground, BackHandler } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import UtilsApi from '../../services/utils/utils';
import Loading from '../../components/Loading/Loading';
import Styles from './NewPhysicalEvaluationStyles';


class NewPhysicalEvaluation extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        const { initialQuiz } = route.params;
        this.state = {
            navigation: null,
            loading: true,
            initialQuiz: initialQuiz,
            url: 'https://new-physical-evaluation.mkgest.com?app=true&pt_id=' + axios.defaults.ptId + '&client_id=' + axios.defaults.userId + '&background=' + Styles.webviewBackground + (initialQuiz ? '&initial_quiz=true' : '') + (window.developer ? '&dev=true' : '') + '&lng=' + window.language
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

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
        this.props.navigation.goBack(null);
    }

    render() {
        const self = this;
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
                        source={{ uri: this.state.url }}
                        style={Styles.webview}
                        onLoadEnd={() => {
                            setTimeout(function () {
                                self.setState({
                                    loading: false
                                });
                            }, 1000);
                        }}
                        onMessage={() => {
                            self.closeView()
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
}

export default NewPhysicalEvaluation;