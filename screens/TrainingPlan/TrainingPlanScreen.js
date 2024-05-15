import React, { Component } from 'react';
import {
    Text, View, BackHandler, Platform, Alert,
    ImageBackground, TouchableOpacity
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import * as Print from "expo-print";
import * as Sharing from 'expo-sharing';
import { FontAwesome } from '@expo/vector-icons';
import UtilsApi from '../../services/utils/utils';
import UserStorage from '../../storage/user';
import Storage from '../../storage/storage';
import List from '../../components/List/List';
import Loading from '../../components/Loading/Loading';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import Styles from './TrainingPlanStyles';


class TrainingPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pdfLoading: false,
            data: null,
            exercises: {}
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

            self.getData();
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

    getData = () => {
        const self = this;

        this.setState({
            loading: true
        });

        Storage.getItem('client-training-plan').then(data => {
            self.setState({
                loading: false,
                data: data
            });
        });
    }

    open = (item) => {
        const self = this;

        Storage.setItem('client-training', {
            trainingPlan: this.state.data,
            data: item
        }).then(() => {
            self.props.navigation.navigate('TrainingExercises');
        });
    }

    exportPdf = () => {
        const self = this;

        this.setState({
            pdfLoading: true
        });

        this.getExercises(function () {
            if (Platform.OS === 'ios') {
                self.sharePdf();
            } else {
                self.printPdf();
            }
        });
    }

    printPdf = () => {
        const self = this;
        try {
            (async () => {
                const html = self.getPdf();
                const { uri } = await Print.printToFileAsync({ html });

                await Print.printAsync({
                    uri: uri
                });

                self.setState({
                    pdfLoading: false
                });
            })();
        } catch (error) {
            Alert.alert('', window.strings['export_pdf_not_available']);
        }
    }

    sharePdf = () => {
        const self = this;
        try {
            (async () => {
                const html = self.getPdf();
                const { uri } = await Print.printToFileAsync({ html });

                await Sharing.shareAsync(uri);

                self.setState({
                    pdfLoading: false
                });
            })();
        } catch (error) {
            Alert.alert('', window.strings['export_pdf_not_available']);
        }
    }

    getPdf = () => {
        let html = '';
        let name = this.state.data ? this.state.data.name : window.strings['training_plan'];

        html += `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        html += '<title>' + name + '</title>';
        html += `
                <style>
                    body {
                        font-size: 20px;
                        color: black;
                    }

                    h1 {
                        text-align: center;
                        font-size: 35px;
                    }

                    .pdf-logo {
                        text-align: center;
                    }

                    .pdf-logo img {
                        height: 80px;
                    }

                    .pdf-empty {
                        text-align: center;
                        margin-top: 40px;
                    }

                    .pdf-title {
                        font-size: 26px;
                        font-weight: bold;
                    }

                    .pdf-row-item {
                        margin-bottom: 20px;
                    }

                    .pdf-name {
                        font-weight: bold;
                        font-size: 26px;
                        margin-top: 20px;
                        margin-bottom: 5px;
                        color: #000;
                    }

                    .pdf-row-info {
                        margin-bottom: 20px;
                    }

                    .pdf-text-bold {
                        font-weight: bold;
                        text-decoration: underline;
                        margin-top: 15px;
                        margin-bottom: 5px;
                        color: #000;
                    }

                    .pdf-text-center {
                        text-align: center;
                    }

                    .pdf-link {
                        margin-top: 10px;
                    }

                    .pdf-image {
                        padding: 10px 0;
                        text-align: center;
                    }

                    .pdf-image img {
                        width: 200px;
                    }
                </style>
            </head>
            <body>`;
        html += '<div class="pdf-logo"><img src="' + ImagesBase64.logo + '" /></div>';
        html += '<h1>' + name + '</h1>';

        if (this.state.data && this.state.data.days && this.state.data.days.length) {
            for (let i = 0; i < this.state.data.days.length; i++) {
                html +=
                    '<div class="pdf-row-item">' +
                    '<div class="pdf-name">' + this.state.data.days[i].name + '</div>' +
                    '<div>';

                for (let e = 0; e < this.state.data.days[i].steps.length; e++) {
                    const step = this.state.data.days[i].steps[e];
                    html +=
                        '<div class="pdf-row-info">' +
                        '<div class="pdf-text-bold">' +
                        (this.state.exercises[step.workout_id] ? this.state.exercises[step.workout_id].name : '') +
                        '</div>' +
                        (this.state.exercises[step.workout_id] && this.state.exercises[step.workout_id].photos && this.state.exercises[step.workout_id].photos[0] && this.state.exercises[step.workout_id].photos[0].photo ?
                            '<div class="pdf-image">' +
                            '<img src="' + this.state.exercises[step.workout_id].photos[0].photo + '" />' +
                            '</div>' : '') +
                        '<div class="pdf-text pdf-text-center">' +
                        this.getStepInfo(step) +
                        '</div>' +
                        (this.state.exercises[step.workout_id] ?
                            '<div class="pdf-text pdf-text-center">' +
                            this.state.exercises[step.workout_id].description +
                            '</div>' : '') +
                        (this.state.exercises[step.workout_id] && this.state.exercises[step.workout_id].video_url ?
                            '<div class="pdf-link">' +
                            '<a href="' + this.state.exercises[step.workout_id].video_url + '" target="_blank">' +
                            this.state.exercises[step.workout_id].video_url +
                            '</a>' +
                            '</div>' : '') +
                        '</div>';
                }

                html += '</div></div>';
            }
        } else {
            html += '<div class="pdf-empty">' +
                window.strings['no_defined_training_plan'] + '</div> ';
        }

        html += `
            </body>
            </html>
        `;

        return html;
    }

    getExercises = (callback) => {
        const self = this;

        if (this.state.data && this.state.data.days) {
            let ids = [];

            for (let i = 0; i < this.state.data.days.length; i++) {
                for (let e = 0; e < this.state.data.days[i].steps.length; e++) {
                    ids.push(this.state.data.days[i].steps[e].workout_id);
                }
            }

            if (ids.length) {
                UserStorage.getExercises({
                    photos: 1,
                    ids: ids
                }, function (response) {
                    let exercises = {};

                    for (let i = 0; i < response.length; i++) {
                        exercises[response[i].id] = response[i];
                    }

                    self.setState({
                        exercises: exercises
                    });

                    setTimeout(function () {
                        callback();
                    })
                });
            }
        } else {
            callback();
        }
    }

    getStepInfo = (step) => {
        let info = '';

        if (step.repeat_id) {
            info += step.repeat_id + ' ' + window.strings['series'] + ' / ';
        } else if (step.repeatId) {
            info += step.repeatId + ' ' + window.strings['series'] + ' / ';
        }

        if (step.value) {
            info += step.value + ' / ';
        } else if (step.repeat) {
            info += step.repeat + ' ' + window.strings['reps'] + ' / ';
        }

        if (step.weight) {
            info += step.weight + ' ' + window.strings['kg'] + ' / ';
        }

        if (step.rest) {
            info += step.rest + ' ' + window.strings['rest'].toLowerCase() + ' / ';
        }

        info = info.substring(0, info.length - 2);

        return info;
    }

    openDescription = () => {
        Alert.alert('', this.state.data.details);
    }

    render() {
        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.pdfLoading} />

                <ImageBackground
                    source={require("../../assets/images/background_training.jpg")}
                    style={Styles.background}
                >
                    {this.state.data ?
                        <View style={Styles.titleContainer}>
                            <Text style={Styles.title}>
                                {this.state.data ? this.state.data.name : window.strings['training_plan']}
                            </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={this.exportPdf}
                                style={Styles.button}>
                                <FontAwesome name="file-pdf-o"
                                    size={Styles.buttonIconSize}
                                    color={Styles.buttonIconColor} />
                            </TouchableOpacity>
                        </View> : null}

                    <List data={this.state.data ? this.state.data.days : []}
                        callbackRefresh={this.getData}
                        loading={this.state.loading}
                        emptyMessage={window.strings['no_defined_training_plan']}
                        callbackOpen={this.open} />

                    {this.state.data && this.state.data.details ?
                        <TouchableOpacity style={Styles.description}
                            activeOpacity={0.8}
                            onPress={this.openDescription}
                        >
                            <Text style={Styles.descriptionText}
                                numberOfLines={3}
                            >
                                {this.state.data.details}
                            </Text>
                        </TouchableOpacity> : null}

                </ImageBackground>
            </View>
        );
    }
}

export default TrainingPlan;