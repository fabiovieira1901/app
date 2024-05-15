import React, { Component } from 'react';
import {
    View, ScrollView, ImageBackground, Text, Linking,
    TouchableOpacity, BackHandler, Alert
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Api from '../../services/api/Api';
import Storage from '../../storage/storage';
import UserStorage from '../../storage/user';
import Menu from '../../components/Menu/Menu';
import ModalSendPayment from '../../components/ModalSendPayment/ModalSendPayment';
import ModalPlans from '../../components/ModalPlans/ModalPlans';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import Styles from './HomeStyles';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            menuVisible: false,
            data: null,
            labels: [],
            alertsDone: false,
            updatePhysicalEvaluation: false,
            paymentVisible: false,
            showSendPayment: false,
            showSubscription: false,
            showVivaWallet: false,
            dataLabels: [{
                id: 'payday',
                icon: 'calendar-alt',
                title: window.strings['next_renovation']
            }, {
                id: 'phy_eval',
                icon: 'calendar-alt',
                title: window.strings['next_physical_evaluation']
            }],
            boxs: [],
            planModalVisible: false,
            sendInitialQuiz: false,
            initialQuizModalVisible: false
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener('header-left-click', () => {
                navigation.navigate('Menu');
            });

            BackHandler.addEventListener('hardwareBackPress', self.handleBackButton);

            self.getData();
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            if (self._unsubscribeEvent) {
                EventRegister.removeEventListener(self._unsubscribeEvent);
            }

            BackHandler.removeEventListener('hardwareBackPress', self.handleBackButton);
        });
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();

        if (this._unsubscribeEvent) {
            EventRegister.removeEventListener(this._unsubscribeEvent);
        }
    }

    handleBackButton() {
        return true;
    }

    getData = () => {
        const self = this;

        Storage.getItem('user').then(userData => {
            if (userData) {
                self.setState({
                    data: userData
                });

                self.getUserPhoto(userData.id);

                UserStorage.getAlerts(function (response) {
                    let showSendPayment = false;
                    let showSubscription = false;
                    let showVivaWallet = false;
                    if (response.payday_proof) {
                        if (userData.paym_cus) {
                            showSubscription = true;
                        } else {
                            showSendPayment = true;
                        }
                    }
                    if (response.vw_payment_update) {
                        showSubscription = true;
                        showSendPayment = false;
                        showVivaWallet = true;
                    }

                    self.setState({
                        labels: self.getLabels(response),
                        updatePhysicalEvaluation: response.update_phy_eval,
                        showSendPayment: showSendPayment,
                        showSubscription: showSubscription,
                        showVivaWallet: showVivaWallet,
                        sendInitialQuiz: response.initial_quiz,
                        initialQuizModalVisible: false
                    });

                    self.checkPaydayAlert(response);
                    setTimeout(function () {
                        self.setState({
                            boxs: self.getBoxs(response)
                        });
                    });

                    setTimeout(function () {
                        self.setState({
                            loading: false
                        });
                        if (response.initial_quiz && !window.initialQuizModalDone) {
                            window.initialQuizModalDone = true;
                            setTimeout(function () {
                                self.setState({
                                    initialQuizModalVisible: response.initial_quiz
                                });
                            }, 500);
                        }
                    }, 500);
                });
            }
        });
    }

    getBoxs = (data) => {
        const self = this;
        const boxs = [];

        boxs.push({
            id: 'training',
            title: window.strings['training_plan'],
            callback: function () {
                self.props.navigation.navigate('TrainingPlans');
            }
        });

        boxs.push({
            id: 'food',
            title: window.strings['nutrition_food'],
            callback: function () {
                self.props.navigation.navigate('Nutrition');
            }
        });

        boxs.push({
            id: 'evolution',
            title: window.strings['evolution'],
            callback: function () {
                self.props.navigation.navigate('PhysicalEvaluations', {
                    showEvolution: true
                });
            }
        });

        boxs.push({
            id: 'physical_evaluations',
            title: window.strings['physical_evaluations'],
            callback: function () {
                self.props.navigation.navigate('PhysicalEvaluations');
            }
        });

        boxs.push({
            id: 'contents',
            title: window.strings['mm_contents'],
            callback: function () {
                self.props.navigation.navigate('Contents');
            }
        });

        boxs.push({
            id: 'supplements',
            title: window.strings['supplements'],
            callback: function () {
                self.props.navigation.navigate('Supplements');
            }
        });

        boxs.push({
            id: 'notifications',
            title: window.strings['notifications'],
            callback: function () {
                self.props.navigation.navigate('Notifications');
            }
        });

        boxs.push({
            id: 'physical_therapy',
            title: window.strings['physical_therapy'],
            callback: function () {
                self.props.navigation.navigate('PhysicalTherapy');
            }
        });

        boxs.push({
            id: 'medical_consultation',
            title: window.strings['medical_consultation'],
            callback: function () {
                Linking.openURL('https://www.instagram.com/saude_a_porta?igsh=bHVrOTB0cWN5OWE=');
            }
        });

        boxs.push({
            id: 'hypnotherapy_consultation',
            title: window.strings['hypnotherapy_consultation'],
            callback: function () {
                Linking.openURL('https://api.whatsapp.com/send?phone=+351910053034');
            }
        });

        return boxs;
    }

    getUserPhoto = (id) => {
        const self = this;

        if (!window.userPhoto) {
            window.userPhoto = ImagesBase64.user;
        }

        Api.getUsersPhotos([id], function (response) {
            if (response.success && response.data &&
                response.data[0] && response.data[0].photo) {

                let photo = response.data[0].photo;

                Storage.getItem('user').then(userData => {
                    if (userData) {
                        userData.photo = photo;
                        window.userPhoto = photo;

                        Storage.setItem('user', userData).then(() => {
                            self.setState({
                                data: userData
                            });
                        });
                    }
                });
            }
        });
    }

    getLabels = (data) => {
        let labels = [];

        for (let i = 0; i < this.state.dataLabels.length; i++) {
            const label = this.state.dataLabels[i];

            if (window.developer && label.id == 'payday') {
                continue;
            }

            labels.push({
                id: label.id,
                color: label.color,
                icon: label.icon,
                title: label.title,
                value: data[this.state.dataLabels[i].id] ? data[this.state.dataLabels[i].id] : window.strings['n_a'],
                info: label.id == 'phy_eval' && data[this.state.dataLabels[i].id] ? this.getUpdatePhyEvalDays(data[this.state.dataLabels[i].id]) : null
            });
        }

        return labels;
    }

    getUpdatePhyEvalDays = (value) => {
        const currentDate = new Date();
        const phyEvalDate = new Date(value);
        const difference = phyEvalDate.getTime() - currentDate.getTime();
        const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

        if (totalDays > 0) {
            return window.strings['can_be_send_in'] + ' ' + totalDays + ' ' + (totalDays > 1 ?
                window.strings['days'].toLowerCase() : window.strings['day'].toLowerCase());
        } else {
            return null;
        }
    }

    checkPaydayAlert = (data) => {
        const self = this;
        let paydayAlert = null;

        if (!this.state.alertsDone) {
            this.setState({
                alertsDone: true
            });

            if (data.payday_warn) {
                paydayAlert = data.payday_warn;
            }

            setTimeout(function () {
                self.getNotifications(paydayAlert);
            });
        }
    }

    getNotifications = (paydayAlert) => {
        let text = '';

        if (paydayAlert) {
            text += '• ' + paydayAlert;
        }

        Api.getNotifications(this.state.data.db_id, function (response) {
            if (response.success) {
                for (let i = 0; i < response.data.length; i++) {
                    if (text != '') {
                        text += '\n';
                    }
                    text += '• ' + response.data[i].body;
                }

                if (text != '') {
                    Alert.alert('', text);
                }
            } else {
                Alert.alert('', response.message);
            }
        });
    }

    menuEvent = (status) => {
        return this.setState({
            menuVisible: status == 'open' ? true : false
        });
    }

    newPhysicalEvaluation = () => {
        this.setState({
            initialQuizModalVisible: false
        });
        this.props.navigation.navigate('NewPhysicalEvaluation', {
            initialQuiz: this.state.sendInitialQuiz
        });
    }

    closeInitialQuizModal = () => {
        this.setState({
            initialQuizModalVisible: false
        });
    }

    openPlanModalModal = () => {
        if (this.state.showVivaWallet) {
            this.openSubscriptionScreen();
        } else {
            this.setState({
                planModalVisible: true
            });
        }
    }

    closePlanModalModal = () => {
        this.setState({
            planModalVisible: false
        });
    }

    openPaymentModal = () => {
        this.setState({
            planModalVisible: false,
            paymentVisible: true
        });
    }

    sendPayment = (image) => {
        const self = this;
        Api.sendPayment({
            client_id: this.state.data.db_id,
            type: 0,
            proof: image
        }, function (response) {
            if (response.success) {
                Alert.alert('', window.strings['proof_payment_sent_successfully']);
                self.getData();
            } else {
                Alert.alert('', response.message);
            }
        });
    }

    openSubscription = () => {
        const self = this;
        this.closePlanModalModal();
        setTimeout(function () {
            self.props.navigation.navigate('Subscription');
        }, 500);
    }

    openSubscriptionScreen = () => {
        this.props.navigation.navigate('Subscription');
    }

    openUserDetails = () => {
        this.props.navigation.navigate('UserDetails');
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.loading} />

                <ImageBackground
                    source={require("../../assets/images/background_welcome.jpg")}
                    style={Styles.background}>

                    <Menu menuVisible={this.state.menuVisible}
                        callbackClose={this.menuEvent} navigation={this.props.navigation} />

                    {this.state.sendInitialQuiz && this.state.initialQuizModalVisible ?
                        <ModalConfirmation
                            text={window.strings['initial_quiz_message']}
                            visible={this.state.initialQuizModalVisible}
                            callbackCancel={this.closeInitialQuizModal}
                            textCancel={window.strings['cancel']}
                            callbackConfirm={this.newPhysicalEvaluation}
                            textConfirm={window.strings['ok']}
                        /> : null}

                    {this.state.paymentVisible ?
                        <ModalSendPayment
                            mainTitle={window.strings['upload_proof_payment']}
                            visible={this.state.paymentVisible}
                            callbackCancel={function () {
                                self.setState({
                                    paymentVisible: false
                                });
                            }}
                            callbackConfirm={function (image) {
                                if (image) {
                                    self.sendPayment(image);
                                    self.setState({
                                        paymentVisible: false
                                    });
                                }
                            }} /> : null}

                    {this.state.planModalVisible ?
                        <ModalPlans
                            visible={this.state.planModalVisible}
                            callbackCancel={this.closePlanModalModal}
                            items={[{
                                text: 'Mbway',
                                callback: this.openPaymentModal
                            }, {
                                text: 'Transferência',
                                callback: this.openPaymentModal
                            }, {
                                text: 'Subscrição',
                                callback: this.openSubscription
                            }, {
                                text: 'Outros meios de pagamento',
                                callback: this.openPaymentModal
                            }]}
                        /> : null}

                    {this.state.data && !this.state.loading ?
                        <ScrollView style={Styles.dataContainer}>
                            <View style={Styles.titleContainer}>
                                <Text style={Styles.title}>
                                    {window.strings['welcome']} {this.state.data.name} !!
                                </Text>
                            </View>

                            {this.state.boxs.length ?
                                <View style={Styles.boxs}>
                                    {this.state.labels.map(item => {
                                        return (
                                            <ImageBackground
                                                key={item.id}
                                                style={Styles.boxRow}
                                                imageStyle={Styles.boxImage}
                                            >
                                                <TouchableOpacity key={item.title}
                                                    activeOpacity={0.8}
                                                    onPress={item.callback}
                                                    style={Styles.boxButton}
                                                >
                                                    <Text style={Styles.boxTitle}>
                                                        {item.id == 'phy_eval' && this.state.sendInitialQuiz ? window.strings['initial_physical_evaluation'] : item.title}
                                                    </Text>
                                                    <Text style={Styles.boxValue}>
                                                        {item.id == 'phy_eval' && this.state.sendInitialQuiz ? window.strings['initial_quiz_message'] : item.value}
                                                    </Text>

                                                    {item.id == 'phy_eval' && item.info && !this.state.updatePhysicalEvaluation && !this.state.sendInitialQuiz ?
                                                        <Text style={Styles.boxValue}>
                                                            {item.info}
                                                        </Text> : null}

                                                    {item.id == 'payday' && (this.state.showSendPayment || this.state.showSubscription) ?
                                                        <View>
                                                            <Button callback={this.openPlanModalModal}
                                                                buttonStyles={Styles.button}
                                                                buttonTextStyles={Styles.buttonText}
                                                                text={window.strings['update']}
                                                            />
                                                        </View> : null}

                                                    {item.id == 'phy_eval' && (this.state.updatePhysicalEvaluation || this.state.sendInitialQuiz) ?
                                                        <View>
                                                            <Button callback={this.newPhysicalEvaluation}
                                                                buttonStyles={Styles.button}
                                                                buttonTextStyles={Styles.buttonText}
                                                                text={window.strings['send']} />
                                                        </View> : null}

                                                </TouchableOpacity>
                                            </ImageBackground>
                                        );
                                    })}
                                    {this.state.boxs.map(item => {
                                        return (
                                            <ImageBackground
                                                key={item.id}
                                                style={Styles.box}
                                                imageStyle={Styles.boxImage}
                                            >
                                                <TouchableOpacity key={item.title}
                                                    activeOpacity={0.8}
                                                    onPress={item.callback}
                                                    style={Styles.boxButton}
                                                >
                                                    <Text style={Styles.boxTitle}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        );
                                    })}
                                </View> : null}

                        </ScrollView> : null}

                </ImageBackground>
            </View>
        );
    }
}

export default Home;