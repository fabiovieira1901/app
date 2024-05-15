import React, { Component } from 'react';
import {
    View, ImageBackground, ScrollView,
    Text, Image, BackHandler
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import UtilsApi from '../../services/utils/utils';
import Storage from '../../storage/storage';
import Form from '../../components/Form/Form';
import Loading from '../../components/Loading/Loading';
import Video from '../../components/Video/Video';
import Styles from './ExerciseStyles';


var promise = false;
var videoTimeout = false;

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ready: false,
            data: null,
            scrollView: null,
            photoActive: 0,
            videoLoading: true,
            exerciseInputs: [{
                key: 'exercise-description',
                id: 'description',
                title: window.strings['description'] + ':',
                type: 'view',
                value: ''
            }],
            stepInputs: [{
                key: 'exercise-remarks',
                id: 'remarks',
                title: window.strings['remarks'] + ':',
                type: 'view',
                value: ''
            }],
            user: null
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

            self.getData();
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            clearInterval(promise);
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
        this.setState({
            showVideo: false
        });
        setTimeout(function () {
            window.lastAction = 'close-exercise';
            navigation.goBack(null);
        }, 200);
        return true;
    }

    getData = () => {
        const self = this;

        Storage.getItem('exercise').then(data => {
            let exercise = data && data.exercise ? data.exercise : {};

            self.setState({
                title: data && data.title ? data.title : window.strings['exercise'],
                subtitle: data && data.subtitle ? data.subtitle : null,
                data: exercise,
                step: data.step,
                loading: false,
                ready: true
            });
            self.setStepData(data.step);
            self.setExerciseData(exercise);
            self.getUserData(exercise.id);

            if (exercise.photos && exercise.photos.length) {
                self.activePhotosSlider(exercise.photos.length);
            }

            setTimeout(function () {
                self.setState({
                    showVideo: true
                });
                clearTimeout(videoTimeout);
                videoTimeout = setTimeout(function () {
                    self.setState({
                        videoLoading: false
                    });
                }, 2000);
            }, 200);
        });
    }

    getUserData = () => {
        const self = this;

        Storage.getItem('user').then(userData => {
            self.setState({
                user: userData
            });
        });
    }

    setStepData = (step) => {
        for (let i = this.state.stepInputs.length - 1; i > -1; i--) {
            if (step && step[this.state.stepInputs[i].id] != undefined) {
                this.state.stepInputs[i].value = step[this.state.stepInputs[i].id];

                if (this.state.stepInputs[i].items) {
                    for (let t = 0; t < this.state.stepInputs[i].items.length; t++) {
                        if (this.state.stepInputs[i].items[t].value == step[this.state.stepInputs[i].id]) {
                            this.state.stepInputs[i].value = this.state.stepInputs[i].items[t].label;
                            break;
                        }
                    }
                }

                if (!this.state.stepInputs[i].value && this.state.stepInputs[i].value !== 0) {
                    this.state.stepInputs.splice(i, 1);
                }
            }
        }

        this.setState({
            stepInputs: this.state.stepInputs
        });
    }

    setExerciseData = (exercise) => {
        for (let i = this.state.exerciseInputs.length - 1; i > -1; i--) {
            if (exercise && exercise[this.state.exerciseInputs[i].id] != undefined) {
                this.state.exerciseInputs[i].value = exercise[this.state.exerciseInputs[i].id];

                if (this.state.exerciseInputs[i].items) {
                    for (let t = 0; t < this.state.exerciseInputs[i].items.length; t++) {
                        if (this.state.exerciseInputs[i].items[t].value == exercise[this.state.exerciseInputs[i].id]) {
                            this.state.exerciseInputs[i].value = this.state.exerciseInputs[i].items[t].label;
                            break;
                        }
                    }
                }

                if (!this.state.exerciseInputs[i].value && this.state.exerciseInputs[i].value !== 0) {
                    this.state.exerciseInputs.splice(i, 1);
                }
            }
        }

        this.setState({
            exerciseInputs: this.state.exerciseInputs
        });
    }

    activePhotosSlider = (photosNumber) => {
        const self = this;

        clearInterval(promise);
        promise = setInterval(function () {
            if (self.state.photoActive == photosNumber - 1) {
                self.state.photoActive = 0;
            } else {
                self.state.photoActive += 1;
            }

            self.setState({
                photoActive: self.state.photoActive
            });
        }, 1300);
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.loading} />

                <ImageBackground
                    source={require("../../assets/images/background_training.jpg")}
                    style={Styles.background}>

                    {this.state.data && this.state.ready ?
                        <View style={Styles.dataContainer}>
                            <ScrollView style={Styles.scroll}
                                ref={ref => { this.state.scrollView = ref }}>
                                
                                <View style={Styles.titleContainer}>
                                    <Text style={Styles.title}>
                                        {this.state.title}
                                    </Text>
                                    {this.state.subtitle ?
                                        <Text style={Styles.subtitle}>
                                            {this.state.subtitle}
                                        </Text> : null}
                                </View>
                                
                                {this.state.data.photos && !this.state.data.video_url ?
                                    <View style={Styles.photos}>
                                        {this.state.data.photos.map((item, index) => {
                                            return (
                                                <Image key={index}
                                                    style={[Styles.photo,
                                                        index == self.state.photoActive ?
                                                            null : Styles.hidden]}
                                                    source={{uri: item.photo}} />
                                            );
                                        })}
                                    </View> : null}

                                <View style={Styles.description}>
                                    <Form data={this.state.exerciseInputs} centered={true} />
                                    <Form data={this.state.stepInputs} centered={true} />
                                </View>

                                {this.state.data.video_url && this.state.showVideo ?
                                    <Video videoLoading={this.state.videoLoading}
                                        url={UtilsApi.getYoutubeEmbedUrl(this.state.data.video_url)}
                                    /> : null}

                            </ScrollView>
                        </View> : null}
                </ImageBackground>
            </View>
        );
    }
}

export default Exercise;