import React, { Component } from 'react';
import {
    View, ImageBackground, Text, TouchableOpacity,
    BackHandler, Alert
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Storage from '../../storage/storage';
import UserStorage from '../../storage/user';
import Loading from '../../components/Loading/Loading';
import Plan from '../../components/Plan/Plan';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import ModalUpdateValues from '../../components/ModalUpdateValues/ModalUpdateValues';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import Styles from './TrainingExercisesStyles';


class TrainingExercises extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            plan: null,
            exercises: [],
            exercisesWithPhotos: [],
            trainingPlan: {},
            trainExtraEnabled: true,
            trainExtra: {
                image: ImagesBase64.trainWeight,
                fields: [{
                    key: 'load',
                    id: 'load',
                    title: window.strings['load_kg'],
                    type: 'input',
                    numericType: 'float',
                    inputType: 'numeric',
                    value: ''
                }, {
                    key: 'reps',
                    id: 'reps',
                    title: window.strings['reps'],
                    type: 'input',
                    numericType: 'integer',
                    inputType: 'numeric',
                    value: ''
                }, {
                    key: 'notes',
                    id: 'notes',
                    title: window.strings['notes'],
                    type: 'textfield',
                    value: ''
                }]
            }
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

        Storage.getItem('client-training').then(data => {
            self.setState({
                trainingPlan: data.trainingPlan,
                data: data.data
            });
            if (window.lastAction != 'close-exercise' || !self.state.exercises.length) {
                self.getExercises(data.data);
            }
            window.lastAction = null;
        });
    }

    getExercises = (data) => {
        const self = this;
        let ids = [];

        for (let i = 0; i < data.steps.length; i++) {
            if (ids.indexOf(data.steps[i].workout_id) == -1) {
                ids.push(data.steps[i].workout_id);
            }
        }

        UserStorage.getExercises({
            photos: 0,
            ids: ids
        }, function (response) {
            const data = [];
            const ids = [];

            for (let i = 0; i < response.length; i++) {
                const photo = response[i].photos && response[i].photos[0] ?
                    response[i].photos[0].photo : getCachePhoto(response[i].id);

                ids.push(response[i].id);
                data.push({
                    id: response[i].id,
                    value: response[i].id,
                    label: response[i].name,
                    video_url: response[i].video_url,
                    photo: photo ? photo : ImagesBase64.loading
                });
            }

            self.setState({
                loading: false,
                exercises: data
            });
            self.getExercisesPhotos(ids);
        });

        function getCachePhoto(id) {
            if (self.state.exercises) {
                for (let i = 0; i < self.state.exercises.length; i++) {
                    if (self.state.exercises[i].id == id) {
                        return self.state.exercises[i].photo;
                    }
                }
            }
            return null;
        }
    }

    getExercisesPhotos = (exercisesIds) => {
        const self = this;
        const splitIds = UtilsApi.splitArray(exercisesIds, 5);

        getPhotos(0);

        function getPhotos(index) {
            if (splitIds[index]) {
                Api.getExercisesPhotos(splitIds[index], function (response) {
                    setPhotos(response, splitIds[index]);
                    getPhotos(index + 1);
                });
            }
        }

        function setPhotos(response, ids) {
            const photos = {};

            if (response.success) {
                for (let i = 0; i < response.data.length; i++) {
                    photos[response.data[i].workout_id] = response.data[i].photo;
                }
            }

            for (let i = 0; i < self.state.exercises.length; i++) {
                const id = self.state.exercises[i].id;
                if (ids.indexOf(id) > -1) {
                    self.state.exercises[i].photo = photos[id] ? photos[id] : ImagesBase64.training;
                }
            }

            self.setState({
                exercises: self.state.exercises
            });
            self.state.plan.refresh(self.state.exercises);
        }
    }

    openExercise = (item) => {
        const self = this;
        const exerciseId = item.workout_id;

        if (exerciseId > 0) {
            const exercise = this.state.exercises.find(function (exer) {
                return exer.id === exerciseId;
            });

            if (this.state.exercisesWithPhotos.indexOf(exerciseId) > -1) {
                open(exercise);
            } else {
                this.setState({
                    loading: true
                });

                UserStorage.getExercise({
                    photos: exercise.video_url ? 0 : 4,
                    id: exerciseId
                }, function (response) {
                    for (let i = 0; i < self.state.exercises.length; i++) {
                        if (self.state.exercises[i].id == response.id) {
                            self.state.exercises[i] = response;
                            self.state.exercisesWithPhotos.push(exerciseId);
                            break;
                        }
                    }
                    self.setState({
                        exercises: self.state.exercises,
                        exercisesWithPhotos: self.state.exercisesWithPhotos
                    });
                    open(response);
                });
            }
        }

        function open(data) {
            Storage.setItem('exercise', {
                title: data.name,
                subtitle: self.state.plan.getValueString(item),
                step: item,
                exercise: data
            }).then(() => {
                self.setState({
                    loading: false
                });
                self.props.navigation.navigate('Exercise');
            });
        }
    }

    openTrainExtra = (step, dataToUpdate) => {
        const self = this;
        const exercise = this.state.exercises.find(function (item) {
            return item.id == step.workout_id;
        });
        const extraFieldsActive = {
            data: step,
            name: exercise ? exercise.label : null,
            idToUpdate: dataToUpdate ? dataToUpdate.id : null
        };

        this.setState({
            loading: true
        });

        this.resetExtraFields(dataToUpdate);

        Api.getTrainingPlanProgress({
            workout_id: step.workout_id
        }, function (response) {
            self.setState({
                loading: false,
            });
            if (response.success) {
                extraFieldsActive.progress = response.data;
                setTimeout(function () {
                    self.setState({
                        extraFieldsActive: extraFieldsActive
                    });
                }, 500);
            } else {
                Alert.alert('', response.message);
            }
        });
    }

    updateExtraFields = (data) => {
        const self = this;
        const payload = {
            tp_id: this.state.extraFieldsActive.data.trng_plan_id,
            tpd_id: this.state.extraFieldsActive.data.trng_plan_day_id,
            tpds_id: this.state.extraFieldsActive.data.id,
            workout_id: this.state.extraFieldsActive.data.workout_id
        };

        for (let i = 0; i < data.length; i++) {
            if (!data[i].value && data[i].value !== 0) {
                return false;
            } else {
                if (data[i].type == 'input') {
                    if (data[i].numericType == 'float') {
                        data[i].value = data[i].value.replace(',', '.');
                        payload[data[i].id] = parseFloat(data[i].value);
                    } else {
                        payload[data[i].id] = parseInt(data[i].value);
                    }
                } else {
                    payload[data[i].id] = data[i].value;
                }
            }
        }

        if (this.state.extraFieldsActive.idToUpdate) {
            payload.id = this.state.extraFieldsActive.idToUpdate;
            Api.editTrainingPlanProgress(payload, function (response) {
                if (response.success) {
                    self.resetExtraFields();
                    setTimeout(function () {
                        Alert.alert('', window.strings['data_sent_successfully']);
                    }, 500);
                } else {
                    Alert.alert('', response.message);
                }
            });
        } else {
            Api.addTrainingPlanProgress(payload, function (response) {
                if (response.success) {
                    self.resetExtraFields();
                    setTimeout(function () {
                        Alert.alert('', window.strings['data_sent_successfully']);
                    }, 500);
                } else {
                    Alert.alert('', response.message);
                }
            });
        }

        this.setState({
            extraFieldsActive: false
        });
    }

    resetExtraFields = (data) => {
        for (let i = 0; i < this.state.trainExtra.fields.length; i++) {
            this.state.trainExtra.fields[i].value = data && data[this.state.trainExtra.fields[i].id] ? data[this.state.trainExtra.fields[i].id].toString() : '';
        }
        this.setState({
            trainExtra: this.state.trainExtra
        });
    }

    getTrainingPlan = () => {
        let trainingPlan = JSON.parse(JSON.stringify(this.state.trainingPlan));

        trainingPlan.id = this.state.trainingPlan.id;
        trainingPlan.client_id = axios.defaults.userDbId;
        trainingPlan.base = 0;

        return trainingPlan;
    }

    closeExtraFields = () => {
        this.resetExtraFields();
        this.setState({
            extraFieldsActive: false
        });
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.loading} />

                <ImageBackground
                    source={require("../../assets/images/background_training.jpg")}
                    style={Styles.background}
                >
                    {this.state.trainExtraEnabled && this.state.extraFieldsActive ?
                        <ModalUpdateValues
                            visible={this.state.extraFieldsActive ? true : false}
                            title={this.state.extraFieldsActive.name}
                            data={this.state.trainExtra.fields}
                            extraView={!this.state.extraFieldsActive.idToUpdate ? getProgressView() : null}
                            clickOutsideCloseKeyboard={true}
                            inline={true}
                            callbackCancel={function () {
                                self.closeExtraFields();
                            }}
                            callbackConfirm={function (data) {
                                self.updateExtraFields(data);
                            }}
                        /> : null}

                    {this.state.data ?
                        <View style={Styles.titleContainer}>
                            <Text style={Styles.title}>
                                {this.state.data.name}
                            </Text>
                        </View> : null}

                    <View style={Styles.containerList}>
                        {this.state.data && this.state.exercises.length ?
                            <Plan
                                ref={function (plan) {
                                    if (!self.state.plan) {
                                        self.setState({
                                            plan: plan
                                        });
                                    }
                                }}
                                data={this.state.data}
                                trainExtra={this.state.trainExtraEnabled ? {
                                    callback: this.openTrainExtra,
                                    image: this.state.trainExtra.image,
                                    fields: this.state.trainExtra.fields,
                                    unit: this.state.trainExtra.unit
                                } : null}
                                openCallback={this.openExercise}
                                exercises={this.state.exercises}
                            /> : <Text style={Styles.emptyText}>
                                {window.strings['no_training']}
                            </Text>}
                    </View>
                </ImageBackground>
            </View>
        );

        function getProgressView() {
            if (self.state.extraFieldsActive.progress && self.state.extraFieldsActive.progress.length) {
                return (
                    <View style={Styles.progressView}>
                        <View>
                            <Text style={Styles.progressViewTitle}>
                                {window.strings['historic']}
                            </Text>
                        </View>
                        {self.state.extraFieldsActive.progress.map((item, index) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8}
                                    key={index}
                                    style={Styles.progressViewItem}
                                    onPress={function () {
                                        self.closeExtraFields();
                                        setTimeout(function () {
                                            self.openTrainExtra({
                                                'trng_plan_id': item.tp_id,
                                                'trng_plan_day_id': item.tpd_id,
                                                'id': item.tpds_id,
                                                'workout_id': item.workout_id
                                            }, item);
                                        }, 500);
                                    }}
                                >
                                    <View>
                                        <Text style={Styles.progressViewItemDate}>
                                            {item.date}
                                        </Text>
                                        <Text style={Styles.progressViewItemValue}>
                                            {item.load}kg | {item.reps}reps
                                        </Text>
                                        {item.notes ?
                                            <Text style={Styles.progressViewItemValue}>
                                                {item.notes}
                                            </Text> : null}
                                    </View>
                                    <View style={Styles.progressViewItemIcon}>
                                        <SvgIcon icon={'edit'} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                );
            }
        }
    }
}

export default TrainingExercises;