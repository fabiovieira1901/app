import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    ImageBackground, BackHandler
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import UtilsApi from '../../services/utils/utils';
import UserStorage from '../../storage/user';
import Storage from '../../storage/storage';
import List from '../../components/List/List';
import Menu from '../../components/Menu/Menu';
import PhysicalEvaluationsEvolution from '../../components/PhysicalEvaluationsEvolution/PhysicalEvaluationsEvolution';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import Styles from './PhysicalEvaluationsStyles';


class PhysicalEvaluations extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        const showEvolution = route.params && route.params.showEvolution ? true : false;
        this.state = {
            menuVisible: false,
            tab: showEvolution ? 'evolution' : 'list',
            evolution: [],
            evolutionLoading: true,
            physicalEvaluations: [],
            physicalEvaluationsLoading: true
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
        UserStorage.getPhysicalEvaluations(axios.defaults.userDbId, function (response) {
            self.setState({
                physicalEvaluations: response,
                physicalEvaluationsLoading: false
            });
        });
    }

    showTab = (tab) => {
        this.setState({
            tab: tab
        });
    }

    openPhysicalEvaluation = (item) => {
        this.props.navigation.navigate('PhysicalEvaluation', {
            data: item
        });
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <Menu menuVisible={this.state.menuVisible}
                    callbackClose={this.menuEvent} navigation={this.props.navigation} />

                <ImageBackground
                    source={require("../../assets/images/background_physical.jpg")}
                    style={Styles.background}>

                    <View style={Styles.titleContainer}>
                        <Text style={Styles.title}>
                            {window.strings['physical_evaluations']}
                        </Text>
                    </View>

                    <View style={Styles.containerView}>
                        <View style={Styles.dataContainer}>
                            <View style={Styles.tabs}>
                                <View style={Styles.headerTab}>
                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={function () {
                                            self.showTab('list')
                                        }}
                                        style={[Styles.tab, Styles.firstTab, this.state.tab == 'list' ? Styles.tabActive : null]}>
                                        <Text style={[Styles.tabText, this.state.tab == 'list' ? Styles.tabTextActive : null]}>
                                            {window.strings['list']}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Styles.headerTab}>
                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={function () {
                                            self.showTab('evolution')
                                        }}
                                        style={[Styles.tab, Styles.lastTab, this.state.tab == 'evolution' ? Styles.tabActive : null]}>
                                        <Text style={[Styles.tabText, this.state.tab == 'evolution' ? Styles.tabTextActive : null]}>
                                            {window.strings['evolution']}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {this.state.tab == 'list' ?
                                <View style={Styles.tabView}>
                                    <List search={false}
                                        data={this.state.physicalEvaluations}
                                        callbackRefresh={this.getData}
                                        loading={this.state.physicalEvaluationsLoading}
                                        callbackOpen={this.openPhysicalEvaluation} />
                                </View> : null}

                            {this.state.tab == 'evolution' ?
                                <View style={Styles.tabView}>
                                    {this.state.physicalEvaluationsLoading ?
                                        <List search={false}
                                            data={[]}
                                            loading={this.state.physicalEvaluationsLoading}
                                        /> :
                                        <PhysicalEvaluationsEvolution
                                            data={this.state.physicalEvaluations}
                                            client={axios.defaults.userDbId}
                                        />
                                    }
                                </View> : null}

                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default PhysicalEvaluations;