import React, { Component } from 'react';
import { View, ImageBackground, Text, BackHandler } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import UtilsApi from '../../services/utils/utils';
import Loading from '../../components/Loading/Loading';
import VideoComponent from '../../components/Video/Video';
import Styles from './VideoStyles';


var startTimeout = false;
var videoTimeout = false;

class Video extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        const { title } = route.params;
        const { videoUrl } = route.params;
        this.state = {
            loading: false,
            ready: false,
            videoLoading: true,
            title: title,
            videoUrl: videoUrl
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener(
                'header-left-click', (data) => {
                    self.handleBackButton(navigation);
            });

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', (data) => {
                UtilsApi.backHome(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });

            self.start();
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            clearTimeout(startTimeout);
            clearTimeout(videoTimeout);

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

    start = () => {
        const self = this;

        clearTimeout(startTimeout);
        clearTimeout(videoTimeout);

        startTimeout = setTimeout(function () {
            self.setState({
                ready: true
            });

            videoTimeout = setTimeout(function () {
                self.setState({
                    videoLoading: false
                });
            }, 2000);

        }, 500);
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.loading} />

                <ImageBackground
                    source={require("../../assets/images/background_nutrition.jpg")}
                    style={Styles.background}>

                    {this.state.ready && this.state.title && this.state.videoUrl ?
                        <View style={Styles.content}>
                            <View style={Styles.titleContainer}>
                                <Text style={Styles.title}>
                                    {this.state.title}
                                </Text>
                            </View>
                            <View style={Styles.video}>
                                <VideoComponent videoLoading={this.state.videoLoading}
                                    containerStyle={Styles.videoComponent}
                                    url={UtilsApi.getYoutubeEmbedUrl(this.state.videoUrl)} />
                            </View>
                        </View> : null}

                </ImageBackground>
            </View>
        );
    }
}

export default Video;