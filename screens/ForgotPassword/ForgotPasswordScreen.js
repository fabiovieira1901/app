import React, { Component } from 'react';
import {
    ScrollView, View, ImageBackground, Text,
    Image, Alert, TouchableOpacity
} from 'react-native';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Button from '../../components/Button/Button';
import FloatInput from '../../components/FloatInput/FloatInput';
import KeyboardFeatures from '../../components/KeyboardFeatures/KeyboardFeatures';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import Loading from '../../components/Loading/Loading';
import Styles from './ForgotPasswordStyles';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: ''
        }
    }

    updateData = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    goBack = () => {
        this.props.navigation.goBack(null);
    }

    resetPassword = () => {
        const self = this;

        if (!this.state.loading) {
            if (this.state.email) {
                this.setState({
                    loading: true
                });

                Api.resetPassword(UtilsApi.encodeEmail(this.state.email), function(response) {
                    self.setState({
                        loading: false
                    });
    
                    if (response.success) {
                        self.props.navigation.replace('ForgotPasswordSuccess');
                    } else {
                        Alert.alert('', response.message);
                    }
                });
            } else {
                Alert.alert('', window.strings['missing_email']);
            }
        }
    }

    render() {
        return (
            <KeyboardFeatures>
            {() => (
                <View style={Styles.container}>
                    <Loading loadingVisible={this.state.loading} />

                    <ImageBackground style={Styles.background}>
                        <View style={Styles.imageContainer}>
                            <Image style={Styles.image}
                                source={require('../../assets/images/logo.png')} />
                        </View>
                        <View style={Styles.secondaryBackground}>
                            <ScrollView>
                                <View>
                                    <View style={Styles.backContainer}>
                                        <TouchableOpacity activeOpacity={0.8}
                                            onPress={this.goBack}
                                            style={Styles.buttonBack}>
                                            <SvgIcon style={Styles.buttonImage} icon={'back'} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={Styles.title}>
                                        {window.strings['recover_password']}
                                    </Text>
                                </View>
                                <View style={Styles.inputs}>
                                    <View style={Styles.inputContainer}>
                                        <FloatInput
                                            attrName='email'
                                            title={window.strings['email']}
                                            value={this.state.email}
                                            callback={this.updateData}
                                            rowStyles={Styles.inputElement}
                                            textInputStyles={Styles.inputText}
                                            titleActiveColor={Styles.labelColor}
                                            titleInactiveColor={Styles.labelColor}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={Styles.subtitle}>
                                        {window.strings['access_your_email_receive_access_data']}
                                    </Text>
                                </View>
                                <View style={Styles.buttonForgotPassword}>
                                    <Button callback={this.resetPassword}
                                        secondary={true}
                                        text={window.strings['recover']} />
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

export default ForgotPassword;