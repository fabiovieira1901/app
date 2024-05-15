import React, { Component } from 'react';
import {
    View, ImageBackground, ScrollView, Text, BackHandler, Linking, Image
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import UtilsApi from '../../services/utils/utils';
import Video from '../../components/Video/Video';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import Button from '../../components/Button/Button';
import Styles from './ContentStyles';


var videoTimeout = false;

class Content extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        const { data } = route.params;
        const hasVideo = data && data.urls && data.urls.find(function (url) {
            return url && typeof url == 'string' && (url.indexOf('youtube.com') > -1 || url.indexOf('youtu.') > -1);
        }) ? true : false;
        this.state = {
            data: data,
            hasVideo: hasVideo,
            videoLoading: true
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

            self.showVideos();
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
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

    showVideos = () => {
        const self = this;
        clearTimeout(videoTimeout);
        videoTimeout = setTimeout(function () {
            self.setState({
                videoLoading: false
            });
        }, 2000);
    }

    openUrl = (url) => {
        Linking.openURL(url);
    }

    render() {
        const self = this;
        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_contents.jpg")}
                    style={Styles.background}
                >
                    {this.state.data ?
                        <View style={Styles.dataContainer}>
                            <ScrollView style={Styles.scroll} ref={ref => { this.state.scrollView = ref }}>
                                <View style={Styles.textContainer}>
                                    <Text style={Styles.title}>
                                        {this.state.data.name}
                                    </Text>
                                    {this.state.data.photo && !this.state.hasVideo ?
                                        <View style={Styles.image}>
                                            <Image style={Styles.imageElement} source={{ uri: this.state.data.photo }} />
                                        </View> : null}
                                    {this.state.data.info || this.state.data.description ?
                                        <Text style={Styles.description}>
                                            {this.state.data.info ? this.state.data.info : this.state.data.description}
                                        </Text> : null}
                                </View>
                                {this.state.data.urls.map((url, index) => {
                                    if (url && typeof url == 'string' && url.indexOf('youtube.com') == -1 && url.indexOf('youtu.') == -1) {
                                        return (
                                            <View key={index} style={Styles.button}>
                                                <Button
                                                    callback={function () {
                                                        self.openUrl(url);
                                                    }}
                                                    text={window.strings['open_link']}
                                                    buttonStyles={Styles.buttonElement}
                                                />
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <View key={index} style={Styles.video}>
                                                <Video videoLoading={this.state.videoLoading} url={UtilsApi.getYoutubeEmbedUrl(url)} />
                                            </View>
                                        );
                                    }
                                })}
                                {this.state.data.pdf ?
                                    <View style={Styles.pdf}>
                                        <PDFViewer
                                            source={{
                                                base64: this.state.data.pdf
                                            }}
                                        />
                                    </View> : null}
                            </ScrollView>
                        </View> : null}
                </ImageBackground>
            </View>
        );
    }
}

export default Content;