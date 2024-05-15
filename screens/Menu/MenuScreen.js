import React, { Component } from "react";
import {
    View, ScrollView, ImageBackground, BackHandler,
    Text, Image, Linking, TouchableOpacity
} from "react-native";
import { EventRegister } from 'react-native-event-listeners';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import ChatApi from '../../services/api/chatApi';
import Storage from '../../storage/storage';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import Styles from './MenuStyles';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            options: []
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener('header-left-click', (data) => {
                self.handleBackButton(navigation);
            });

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', (data) => {
                UtilsApi.backHome(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });

            self.getUserData();
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

    getOptions = () => {
        const options = [];

        options.push({
            id: 'user_details',
            name: window.strings['profile'],
            page: 'UserDetails',
            icon: 'user-cog'
        });
        if (axios.defaults.showSubscription) {
            options.push({
                id: 'subscription',
                name: window.strings['subscription'],
                page: 'Subscription',
                icon: 'credit-card'
            });
        }
        options.push({
            id: 'report_issue',
            name: window.strings['report_issue'],
            page: 'ReportIssue',
            icon: 'bug'
        });
        options.push({
            id: 'terms',
            name: window.strings['terms_and_conditions'],
            callback: 'terms',
            icon: 'file-contract'
        });
        options.push({
            id: 'privacy',
            name: window.strings['privacy_policy'],
            callback: 'privacy',
            icon: 'file-contract'
        });
        options.push({
            id: 'logout',
            name: window.strings['logout'],
            callback: 'logout',
            icon: 'power-off'
        });

        return options;
    }

    getUserData() {
        const self = this;

        Storage.getItem('user').then(userData => {
            self.setState({
                user: userData,
                options: self.getOptions()
            });
        });
    }

    openOption = (option) => {
        const self = this;

        if (option.page) {
            this.props.navigation.navigate(option.page);
        } else {
            if (option.callback == 'terms') {
                Linking.openURL('https://ptclient.mkgest.com/app/milenemartins/terms.pdf');
            }
            if (option.callback == 'privacy') {
                Linking.openURL('https://ptclient.mkgest.com/app/milenemartins/privacy.pdf');
            }
            if (option.callback == 'logout') {
                Storage.getItem('user').then(userData => {
                    Api.updateUser({
                        'chat_token': ''
                    }, function (response) {
                        if (response.success) {
                            console.log('API PT - chat_token updated');
                        } else {
                            console.log('API PT - chat_token error');
                        }
                    });
                    if (userData && userData.chat_id) {
                        ChatApi.updateUser({
                            'id': userData.chat_id,
                            'token': ''
                        }, function (response) {
                            if (response.success) {
                                console.log('API Chat - chat_token updated');
                            } else {
                                console.log('API Chat - chat_token error');
                            }
                        });
                    }
                    Api.logout(function () {
                        Storage.clearStorage();
                        self.props.navigation.replace('Welcome');
                    });
                });
            }
        }
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_menu.jpg")}
                    style={Styles.background}
                >
                    <View style={Styles.headerLogo}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={function () {
                                self.props.navigation.navigate('UserDetails');
                            }}
                        >
                            <Image style={[Styles.userPhoto, ImagesBase64.user == window.userPhoto ? Styles.noUserPhoto : null]}
                                source={{ uri: window.userPhoto }} />

                            {this.state.user ?
                                <Text style={Styles.userName}>
                                    {this.state.user.name}
                                </Text> : null}

                        </TouchableOpacity>
                    </View>

                    <View style={Styles.secondaryBackground}>
                        <ScrollView style={Styles.body}>
                            {this.state.options.map(item => {
                                return (
                                    <View key={item.id}>
                                        <TouchableOpacity activeOpacity={0.8}
                                            onPress={function () {
                                                self.openOption(item)
                                            }} style={Styles.item}
                                        >
                                            <View style={Styles.iconElement}>
                                                <FontAwesome5 name={item.icon}
                                                    size={Styles.iconSize}
                                                    color={Styles.iconColor} />
                                            </View>
                                            <Text style={Styles.itemText}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View style={Styles.mkgest}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={function () {
                                Linking.openURL('https://mkgest.com');
                            }} style={Styles.mkgestButton}>
                            <Image style={Styles.mkgestImage}
                                source={require('../../assets/images/mkgest.png')} />
                            <Text style={Styles.mkgestText}>
                                MKGest - {axios.defaults.appVersion}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Menu;