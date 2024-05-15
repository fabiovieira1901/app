import React, { Component } from 'react';
import {
    ImageBackground, View, Text, Alert, Image,
    Linking, TouchableOpacity, BackHandler
} from 'react-native';
import axios from 'axios';
import { Camera } from 'expo-camera/legacy';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import Storage from '../../storage/storage';
import Api from '../../services/api/Api';
import ChatApi from '../../services/api/chatApi';
import UtilsApi from '../../services/utils/utils';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { Video } from 'expo-av';
import Styles from './WelcomeStyles';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: false,
            showContent: false
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

        setTimeout(function () {
            self.handleNotifications();
        }, 1000);
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();
    }

    handleBackButton() {
        return true;
    }

    handleNotifications = () => {
        const self = this;

        this.setState({
            loading: true
        });

        (async () => {
            try {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let permissionsStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    permissionsStatus = status;
                }

                let token = null;

                if (permissionsStatus == 'granted') {
                    token = await Notifications.getExpoPushTokenAsync({
                        projectId: axios.defaults.projectId
                    });
                } else {
                    Alert.alert('Por favor ativa a permissão das notificações');
                }

                self.setState({
                    expoToken: token ? token.data : 'no_token'
                });

                setTimeout(function () {
                    window.expoToken = self.state.expoToken;
                    self.main();
                });

            } catch (error) {
                alert(error);
                self.setState({
                    expoToken: 'no_token'
                });
                setTimeout(function () {
                    window.expoToken = self.state.expoToken;
                    self.main();
                });
            }
        })();
    }

    main = () => {
        const self = this;

        Storage.getItem('language').then(language => {
            if (language) {
                window.language = language;
            } else {
                window.language = 'pt';
            }

            Api.getStrings(function (response) {
                if (response.success) {
                    window.strings = response.data;
                    self.requestPhotosPermissions(function () {
                        self.validateUser();
                    });
                } else {
                    self.setState({
                        errorMessage: 'Por favor verifica a tua conexão à internet',
                        loading: false,
                        showContent: false
                    });
                }
            });
        });
    }

    requestPhotosPermissions = async (callback) => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                const { status } = await Camera.requestCameraPermissionsAsync();
                if (status === 'granted') {
                    callback();
                    return true;
                }
            }
            Alert.alert(window.strings['warning'], window.strings['camera_permission_denied'], [{ text: window.strings['close'], onPress: () => callback() }]);
            return true;
        } catch (error) { }
        callback();
    }

    validateUser = () => {
        const self = this;

        Api.getRegisterConfigStruct(function (response) {
            if (response.success) {
                window.developer = response.data ? response.data.dev : false;

                if (window.developer) {
                    axios.defaults.baseUrl = axios.defaults.devBaseUrl;
                }

                Storage.getItem('user').then(userData => {
                    if (userData) {
                        if (userData.password) {
                            self.setState({
                                email: userData.email,
                                password: userData.password,
                                user: userData
                            });

                            UtilsApi.updateAuthorization(userData);
                            return setTimeout(function () {
                                self.login();
                            });
                        }
                    }

                    self.setState({
                        errorMessage: false,
                        loading: false,
                        showContent: true
                    });
                });
            } else {
                self.setState({
                    errorMessage: window.strings['no_internet'],
                    loading: false,
                    showContent: false
                });

                Alert.alert('', response.message);
            }
        });
    }

    login = () => {
        const self = this;
        const userData = {
            email: UtilsApi.encodeEmail(this.state.email),
            password: this.state.password
        };

        Api.login(userData, function (response) {
            if (response.success) {
                Storage.clearStorage();
                self.getUser(userData);
            } else {
                self.setState({
                    errorMessage: false,
                    loading: false,
                    showContent: true
                });
            }
        });
    }

    getUser = (userData) => {
        const self = this;

        this.getEnums(function () {
            Api.getUser(userData, function (response) {
                if (response.success) {
                    response.data.password = userData.password;
                    Storage.setItem('user', response.data).then(() => {
                        self.setState({
                            user: response.data
                        });
                        self.goFirstPage();
                    });
                } else {
                    self.setState({
                        loading: false,
                        showContent: true
                    });
                }
            });
        });
    }

    getEnums = (callback) => {
        const self = this;

        Api.getEnums(function (response) {
            if (response.success) {
                window.enums = response.data;
                callback();
            } else {
                self.setState({
                    loading: false,
                    showContent: true
                });
            }
        });
    }

    goFirstPage = () => {
        const self = this;
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
        Api.updateUser({
            'chat_token': this.state.expoToken
        }, function (response) {
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

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    selectLanguage = (lng) => {
        const self = this;
        window.language = lng;
        Storage.setItem('language', window.language).then(() => {
            self.props.navigation.replace('Welcome');
        });
    }

    render() {
        return (
            <View style={Styles.containerMain}>
                <Loading loadingVisible={this.state.loading} />

                {!this.state.showContent && this.state.errorMessage ?
                    <View>
                        <Text style={Styles.errorMessage}>
                            {this.state.errorMessage}
                        </Text>
                    </View> : null}

                {this.state.showContent ?
                    <ImageBackground
                        style={Styles.background}
                    >
                        <Video source={require("../../assets/images/welcome.mov")}
                            rate={1.0}
                            isMuted={true}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={Styles.backgroundVideo}
                        />
                        <View style={Styles.flex}>
                            <View style={Styles.imageContainer}>
                                <Image style={Styles.image}
                                    source={require('../../assets/images/logo.png')} />
                            </View>
                            <View style={Styles.button}>
                                <Button callback={this.goToLogin}
                                    text={window.strings['login']}
                                    secondary={true}
                                    buttonStyles={Styles.buttonSpace} />
                                <Button callback={this.goToRegister}
                                    text={window.strings['register']} />
                            </View>
                        </View>

                        <View style={Styles.mkgest}>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={function () {
                                    Linking.openURL('https://mkgest.com');
                                }} style={Styles.mkgestButton}>
                                <Image style={Styles.mkgestImage}
                                    source={require('../../assets/images/mkgest.png')} />
                                <Text style={Styles.mkgestText}>
                                    {window.strings['mkgest']}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground> : null}
            </View>
        );
    }
}

export default Welcome;