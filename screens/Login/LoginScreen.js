import React, { Component } from 'react';
import {
    ScrollView, ImageBackground, View, Text,
    Alert, Image, TouchableOpacity, BackHandler
} from 'react-native';
import axios from 'axios';
import Storage from '../../storage/storage';
import Api from '../../services/api/Api';
import ChatApi from '../../services/api/chatApi';
import UtilsApi from '../../services/utils/utils';
import Button from '../../components/Button/Button';
import FloatInput from '../../components/FloatInput/FloatInput';
import KeyboardFeatures from '../../components/KeyboardFeatures/KeyboardFeatures';
import Loading from '../../components/Loading/Loading';
import Styles from './LoginStyles';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            inputs: {
                email: null,
                password: null
            },
            email: '',
            password: '',
            user: null,
            expoToken: window.expoToken
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', self.handleBackButton);
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', self.handleBackButton);
        });
    }

    handleBackButton() {
        return true;
    }

    updateData = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    login = () => {
        const self = this;

        if (!this.state.loading) {
            Storage.clearStorage();

            this.setState({
                loading: true
            });

            const userData = {
                email: UtilsApi.encodeEmail(this.state.email),
                password: this.state.password
            };

            Api.login(userData, function (response) {
                if (response.success) {
                    self.getUser(userData);
                } else {
                    self.setState({
                        loading: false
                    });
                    Alert.alert('', response.message);
                }
            });
        }
    }

    getUser = (userData) => {
        const self = this;

        Api.getUser(userData, function (response) {
            if (response.success) {
                response.data.password = userData.password;
                
                Api.getEnums(function (responseEnums) {
                    if (responseEnums.success) {
                        window.enums = responseEnums.data;

                        Storage.setItem('user', response.data).then(() => {
                            self.setState({
                                user: response.data
                            });
                            self.goFirstPage();
                        });
                    } else {
                        self.setState({
                            loading: false
                        });
                        Alert.alert('', responseEnums.message);
                    }
                });
            } else {
                self.setState({
                    loading: false
                });
                Alert.alert('', response.message);
            }
        });
    }

    goFirstPage = () => {
        const self = this;
        window.userPhoto = null;
        UtilsApi.refreshUserFields(this.state.user);

        if (axios.defaults.isAdmin) {
            Alert.alert('', window.strings['pt_app_no_access']);
        } else {
            this.updateChatToken(function () {
                self.updateChatUser(function () {
                    self.setState({
                        loading: false
                    });
                    UtilsApi.goTabs(self.props.navigation);
                });
            });
        }
    }

    updateChatToken = (callback) => {
        const payload = {
            'chat_token': this.state.expoToken
        };

        Api.updateUser(payload, function (response) {
            if (response.success) {
                console.log('API PT - chat_token updated');
            } else {
                console.log('API PT - chat_token error');
            }
            callback();
        });
    }

    updateChatUser = (callback) => {
        if (this.state.user.chat_id) {
            ChatApi.updateUser({
                id: this.state.user.chat_id,
                token: this.state.expoToken
            }, function (response) {
                if (response.success) {
                    console.log('API Chat - chat_token updated');
                } else {
                    console.log('API Chat - chat_token error');
                }
                callback();
            });
        } else {
            callback();
        }
    }

    goToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register');
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
                            <ScrollView style={Styles.scroll}>
                                <View>
                                    <Text style={Styles.title}>
                                        {window.strings['screen_login_title']}
                                    </Text>
                                </View>
                                <View style={Styles.inputs}>
                                    <View style={Styles.inputContainer}>
                                        <FloatInput
                                            ref={ref => (this.state.inputs.email = ref)} 
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
                                    <View style={Styles.inputContainer}>
                                        <FloatInput
                                            ref={ref => (this.state.inputs.password = ref)} 
                                            secureTextEntry={true}
                                            attrName='password'
                                            title={window.strings['password']}
                                            value={this.state.password}
                                            callback={this.updateData}
                                            rowStyles={Styles.inputElement}
                                            textInputStyles={Styles.inputText}
                                            titleActiveColor={Styles.labelColor}
                                            titleInactiveColor={Styles.labelColor}
                                        />
                                    </View>
                                    <View style={Styles.forgotPasswordContainer}>
                                        <TouchableOpacity activeOpacity={0.8}
                                            onPress={this.goToForgotPassword}>
                                            <Text style={Styles.forgotPasswordText}>
                                                {window.strings['forgot_password']}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={Styles.buttonLogin}>
                                    <Button callback={this.login}
                                        secondary={true}
                                        text={window.strings['begin_session']} />
                                </View>
                                <View style={Styles.registerContainer}>
                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={this.goToRegister}
                                        style={Styles.registerButton}>
                                        <Text style={Styles.registerText}>
                                            {window.strings['dont_have_account']}
                                        </Text>
                                    </TouchableOpacity>
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

export default Login;