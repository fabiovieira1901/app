import React, { Component } from 'react';
import {
    ScrollView, View, ImageBackground, Text,
    Alert, BackHandler, Platform
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import KeyboardFeatures from '../../components/KeyboardFeatures/KeyboardFeatures';
import Form from '../../components/Form/Form';
import Styles from './ReportIssueStyles';


class ReportIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            inputs: [{
                key: 'issue',
                id: 'issue',
                title: window.strings['title'],
                type: 'input',
                value: ''
            }, {
                key: 'description',
                id: 'description',
                title: window.strings['description'],
                type: 'textfield',
                fullPage: true,
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
    }

    reportIssue = () => {
        const self = this;

        if (!this.state.loading) {
            this.setState({
                loading: true
            });

            Api.reportIssue(this.getReportIssue(), function (response) {
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

    getReportIssue = () => {
        let data = {
            'pt_id': axios.defaults.ptId,
            'user_id': axios.defaults.userId,
            'platform': Platform.OS + ' / v' + Platform.constants.Version + ' / ' + Platform.constants.Model,
            'app_version': axios.defaults.appVersion,
            'issue': '',
            'description': ''
        };

        for (let i = 0; i < this.state.inputs.length; i++) {
            data[this.state.inputs[i].id] = this.state.inputs[i].value;
        }
        
        return data;
    }

    render() {
        return (
            <KeyboardFeatures>
            {() => (
                <View style={Styles.container}>
                    <Loading loadingVisible={this.state.loading} />

                    <ImageBackground style={Styles.background}>

                        <View style={[Styles.padding, Styles.titleContainer]}>
                            <Text style={Styles.title}>
                                {window.strings['report_issue']}
                            </Text>
                        </View>

                        <View>
                            <ScrollView style={Styles.scroll}>
                                <View style={Styles.padding}>
                                    <Form callback={this.updateData}
                                        data={this.state.inputs} />

                                    <View style={Styles.buttonContainer}>
                                        <Button callback={this.reportIssue}
                                            text={window.strings['send']} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            )}
            </KeyboardFeatures>
        );
    }
}

export default ReportIssue;