import React, { Component } from 'react';
import {
    View, Text, ImageBackground, Alert,
    TouchableOpacity, BackHandler
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import UtilsApi from '../../services/utils/utils';
import Storage from '../../storage/storage';
import Menu from '../../components/Menu/Menu';
import List from '../../components/List/List';
import Styles from './NutritionDayStyles';


class NutritionDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            loading: true,
            name: '',
            data: null
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

    menuEvent = (status) => {
        return this.setState({
            menuVisible: status == 'open' ? true : false
        });
    }

    getData = () => {
        const self = this;

        this.setState({
            loading: true
        });

        Storage.getItem('client-nutrition-day').then(data => {
            self.setState({
                data: data.day,
                loading: false
            });
        });
    }

    open = (meal) => {
        const self = this;

        Storage.setItem('client-nutrition-meal', {
            meal: meal
        }).then(() => {
            self.props.navigation.navigate('NutritionMeal');
        });
    }

    openDescription = () => {
        Alert.alert('', this.state.data.description);
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_nutrition.jpg")}
                    style={Styles.background}>
                    <Menu menuVisible={this.state.menuVisible}
                        callbackClose={this.menuEvent} navigation={this.props.navigation} />

                    {this.state.data ?
                        <View style={Styles.titleContainer}>
                            <Text style={Styles.title}>
                                {this.state.data.name}
                            </Text>
                        </View> : null}

                    <List data={this.state.data ? this.state.data.meals : []}
                        loading={this.state.loading}
                        emptyMessage={window.strings['no_defined_meals']}
                        callbackOpen={this.open} />

                    {this.state.data && this.state.data.description ?
                        <TouchableOpacity style={Styles.description}
                            activeOpacity={0.8}
                            onPress={this.openDescription}
                        >
                            <Text style={Styles.descriptionText}
                                numberOfLines={3}
                            >
                                {this.state.data.description}
                            </Text>
                        </TouchableOpacity> : null}

                </ImageBackground>
            </View>
        );
    }
}

export default NutritionDay;