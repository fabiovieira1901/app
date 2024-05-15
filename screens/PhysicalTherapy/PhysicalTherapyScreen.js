import React, { Component } from 'react';
import { View, Text, BackHandler, ImageBackground } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import UtilsApi from '../../services/utils/utils';
import UserStorage from '../../storage/user';
import Storage from '../../storage/storage';
import Menu from '../../components/Menu/Menu';
import List from '../../components/List/List';
import Styles from './PhysicalTherapyStyles';


class PhysicalTherapy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            loading: true,
            data: null,
            exercises: {}
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
        const items = UtilsApi.getTrainingPlanPlaces();
        const places = [];

        this.setState({
            loading: true
        });

        if (items && items.length) {
            items.forEach(function (item) {
                if (item.type == 'physical_therapy') {
                    places.push(item.value);
                }
            });
        }

        UserStorage.getTrainingPlan({
            places: places
        }, function (response) {
            self.setState({
                loading: false,
                data: response
            });
        });
    }

    open = (item) => {
        const self = this;

        Storage.setItem('client-training-plan', item).then(() => {
            self.props.navigation.navigate('TrainingPlan');
        });
    }

    render() {
        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_training.jpg")}
                    style={Styles.background}
                >
                    <Menu menuVisible={this.state.menuVisible}
                        callbackClose={this.menuEvent} navigation={this.props.navigation} />

                    {this.state.data ?
                        <View style={Styles.titleContainer}>
                            <Text style={Styles.title}>
                                {window.strings['training_plans']}
                            </Text>
                        </View> : null}

                    <List data={this.state.data ? this.state.data : []}
                        callbackRefresh={this.getData}
                        loading={this.state.loading}
                        emptyMessage={window.strings['no_defined_training_plan']}
                        callbackOpen={this.open}
                    />
                </ImageBackground>
            </View>
        );
    }
}

export default PhysicalTherapy;