import React, { Component } from 'react';
import {
    BackHandler, View, ImageBackground, Text, Alert, Linking
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import UserStorage from '../../storage/user';
import List from '../../components/List/List';
import Styles from './NotificationsStyles';


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
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

        this.getData();
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

        Api.getAppNotifications(function (response) {
            let items = [];
            if (response.success) {
                for (let i = 0; i < response.data.length; i++) {
                    items.push({
                        id: response.data[i].id,
                        name: UtilsApi.convertUtcDate(response.data[i].date),
                        description: response.data[i].title + '\n' + response.data[i].body
                    });
                }
                items = items.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                Alert.alert('', response.message);
            }
            self.setState({
                data: items,
                loading: false
            });
        });
    }

    render() {
        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_contents.jpg")}
                    style={Styles.background}>
                    <View style={Styles.titleContainer}>
                        <Text style={Styles.title}>
                            {window.strings['notifications']}
                        </Text>
                    </View>
                    <List data={this.state.data}
                        callbackRefresh={this.getData}
                        loading={this.state.loading}
                        emptyMessage={window.strings['notifications_empty']}
                        showDescription={true}
                    />
                </ImageBackground>
            </View>
        );
    }
}

export default Notifications;