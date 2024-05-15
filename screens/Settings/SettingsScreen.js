import React, { Component } from 'react';
import {
    ScrollView, View, ImageBackground,
    Text, Alert, BackHandler
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import KeyboardFeatures from '../../components/KeyboardFeatures/KeyboardFeatures';
import Form from '../../components/Form/Form';
import Styles from './SettingsStyles';

var detectChanges = false;

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ready: false,
            inputs: [{
                key: 'payday_alert',
                id: 'payday_alert',
                title: window.strings['payment_alert_days'],
                type: 'input',
                inputType: 'numeric',
                value: ''
            }, {
                key: 'phy_eval_alert',
                id: 'phy_eval_alert',
                title: window.strings['physical_evaluations_alert_days'],
                type: 'input',
                inputType: 'numeric',
                value: ''
            }]
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

            detectChanges = false;

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
        if (detectChanges) {
            this.setState({
                changesConfirmation: true
            });
        } else {
            navigation.goBack(null);
        }

        return true;
    }

    getData() {
        const self = this;

        Api.getSettings(function (response) {
            if (response.success) {
                self.setData(response.data);
            } else {
                self.setData(null);
                Alert.alert('', response.message);
            }

            self.setState({
                loading: false,
                ready: true
            });
        });
    }

    setData = (data) => {
        for (let i = 0; i < this.state.inputs.length; i++) {
            let value = this.state.inputs[i].type == 'switch' ? false : '';

            if (data) {
                for (let d = 0; d < data.length; d++) {
                    if (data[d].name == this.state.inputs[i].id) {
                        value = data[d].value;
                        break;
                    }
                }
            }
            
            this.state.inputs[i].value = value;
        }

        this.setState({
            inputs: this.state.inputs
        });
    }

    updateData = (attrName, value) => {
        for (let i = 0; i < this.state.inputs.length; i++) {
            if (this.state.inputs[i].id == attrName) {
                this.state.inputs[i].value = value;
                break;
            }
        }

        this.setState({
            inputs: this.state.inputs
        });

        detectChanges = true;
    }

    saveSettings = () => {
        const self = this;

        if (!this.state.loading) {
            this.setState({
                loading: true
            });

            Api.updateSettings(this.getSettings(), function (response) {
                self.setState({
                    loading: false
                });

                if (response.success) {
                    self.props.navigation.goBack(null);
                } else {
                    Alert.alert('', response.message);
                }
            });
        }
    }

    getSettings = () => {
        let data = [];

        for (let i = 0; i < this.state.inputs.length; i++) {
            let value = this.state.inputs[i].value;

            data.push({
                name: this.state.inputs[i].id,
                value: value
            });
        }

        return data;
    }

    render() {
        return (
            <KeyboardFeatures>
            {() => (
                <View style={Styles.container}>
                    <ImageBackground style={Styles.background}>
                        <Loading loadingVisible={this.state.loading} />

                        <View style={[Styles.padding, Styles.titleContainer]}>
                            <Text style={Styles.title}>
                                {window.strings['settings']}
                            </Text>
                        </View>

                        {this.state.ready ?
                            <View>
                                <ScrollView style={Styles.scroll}>
                                    <View style={Styles.padding}>
                                        <Form callback={this.updateData}
                                            data={this.state.inputs} />

                                        <View style={Styles.buttonContainer}>
                                            <Button callback={this.saveSettings}
                                                text={window.strings['save']} />
                                        </View>
                                    </View>
                                </ScrollView>
                            </View> : null}

                    </ImageBackground>
                </View>
            )}
            </KeyboardFeatures>
        );
    }
}

export default Settings;