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
import Styles from './SupplementsStyles';


class Supplements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            supplementType: 100,
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

        UserStorage.getNutrition(axios.defaults.userDbId, function (response) {
            const nutrition = response[0];
            if (nutrition) {
                try {
                    let supplements = [];

                    nutrition.days.forEach(function (day) {
                        if (day.meals) {
                            day.meals.forEach(function (meal) {
                                if (meal.extra_data) {
                                    try {
                                        const mealSupplements = JSON.parse(meal.extra_data).supplements;
                                        if (mealSupplements) {
                                            supplements = supplements.concat(mealSupplements);
                                        }
                                    } catch (error) {}
                                }
                            });
                        }
                    });

                    if (supplements && supplements.length) {
                        self.getSupplements(supplements);
                    } else {
                        self.setState({
                            loading: false
                        });
                    }

                } catch (error) {
                    self.setState({
                        loading: false
                    });
                }
            } else {
                self.setState({
                    loading: false
                });
            }
        });
    }

    getSupplements = (supplements) => {
        const self = this;

        if (supplements && supplements.length && supplements[0].id) {
            const payload = {
                ids: [],
                photo: true
            };

            supplements.forEach(function (sup) {
                if (sup && sup.id) {
                    payload.ids.push(sup.id);
                }
            });

            Api.getContents(payload, function (response) {
                const items = [];

                if (response.success) {
                    for (let i = 0; i < response.data.length; i++) {
                        items.push({
                            id: response.data[i].id,
                            photo: response.data[i].image,
                            name: response.data[i].name,
                            description: response.data[i].description,
                            url: response.data[i].url
                        });
                    }
                } else {
                    Alert.alert('', response.message);
                }
    
                self.setState({
                    data: items,
                    loading: false
                });
            });
        } else {
            self.setState({
                data: [],
                loading: false
            });
        }
    }

    openItem = (item) => {
        if (item.url) {
            if (item.url.indexOf('https://www.') == -1 &&
                item.url.indexOf('https') == -1 &&
                item.url.indexOf('www') == -1
            ) {
                item.url = 'https://www.' + item.url;
            }
            Linking.openURL(item.url);
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_contents.jpg")}
                    style={Styles.background}>
                    <View style={Styles.titleContainer}>
                        <Text style={Styles.title}>
                            {window.strings['supplements']}
                        </Text>
                    </View>

                    <List data={this.state.data}
                        callbackRefresh={this.getData}
                        loading={this.state.loading}
                        emptyMessage={window.strings['Supplements_empty']}
                        callbackOpen={this.openItem}
                    />
                </ImageBackground>
            </View>
        );
    }
}

export default Supplements;