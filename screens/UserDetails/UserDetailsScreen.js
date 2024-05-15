import React, { Component } from 'react';
import {
    ScrollView, View, ImageBackground,
    Text, Alert, BackHandler
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Storage from '../../storage/storage';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import Photo from '../../components/Photo/Photo';
import KeyboardFeatures from '../../components/KeyboardFeatures/KeyboardFeatures';
import Form from '../../components/Form/Form';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import Styles from './UserDetailsStyles';

var detectChanges = false;

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ready: false,
            showPhotoContainer: false,
            changesConfirmation: false,
            email: '',
            name: '',
            mobile_phone: '',
            birth_date: '',
            password: '',
            passwordConfirmation: '',
            gender: '',
            photo: '',
            photoModified: false,
            newPhoto: false,
            inputs: [{
                key: 'user-email',
                id: 'email',
                title: window.strings['email'],
                type: 'input',
                inputType: 'email',
                disabled: true
            }, {
                key: 'user-name',
                id: 'name',
                title: window.strings['name'],
                type: 'input'
            }, {
                key: 'user-mobile_phone',
                id: 'mobile_phone',
                title: window.strings['mobile_phone'],
                type: 'input',
                inputType: 'mobile_phone'
            }, {
                key: 'user-birth_date',
                id: 'birth_date',
                title: window.strings['birth_date'],
                type: 'datepicker',
                onlyPreviousDates: true
            }, {
                key: 'user-gender',
                id: 'gender',
                title: window.strings['gender'],
                type: 'select',
                items: UtilsApi.getGenders()
            }, {
                key: 'user-password',
                id: 'password',
                title: window.strings['password'],
                type: 'input',
                isPassword: true
            }, {
                key: 'user-passwordConfirmation',
                id: 'passwordConfirmation',
                title: window.strings['confirm_password'],
                type: 'input',
                isPassword: true
            }],
            genders: UtilsApi.getGenders(),
            deleteAccountConfirmation: false
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener(
                'header-left-click', () => {
                    self.handleBackButton();
            });

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', (data) => {
                UtilsApi.backHome(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton();
                return true;
            });

            detectChanges = false;
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
                self.handleBackButton();
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

    handleBackButton() {
        if (detectChanges) {
            this.setState({
                changesConfirmation: true
            });
        } else {
            this.exitPage();
        }

        return true;
    }

    exitPage() {
        const self = this;

        this.setState({
            showPhotoContainer: false
        });

        setTimeout(function () {
            self.props.navigation.goBack(null);
        }, 200);
    }

    getUserData() {
        const self = this;

        Storage.getItem('user').then(userData => {
            self.setState({
                email: userData.email,
                name: userData.name,
                mobile_phone: userData.mobile_phone,
                birth_date: userData.birth_date,
                gender: userData.gender.toString(),
                password: userData.password,
                passwordConfirmation: userData.password,
                photo: userData.photo,
                newPhoto: ImagesBase64.user == userData.photo ? true : false
            });

            self.setData(userData, true);
            self.setState({
                loading: false,
                ready: true
            });

            setTimeout(function () {
                self.setState({
                    showPhotoContainer: true
                });
            }, 200);
        });
    }

    setData = (userData, initial) => {
        for (let i = 0; i < this.state.inputs.length; i++) {
            if (userData[this.state.inputs[i].id] != undefined) {
                this.state.inputs[i].value = userData[this.state.inputs[i].id];
            }

            if (initial && this.state.inputs[i].id == 'passwordConfirmation') {
                this.state.inputs[i].value = this.state.password;
            }
        }

        this.setState({
            inputs: this.state.inputs
        });
    }

    updateData = (attrName, value) => {
        this.setState({ [attrName]: value });

        let newEntry = {};
        newEntry[attrName] = value;
        this.setData(newEntry);

        detectChanges = true;
    }

    receivePhoto = (photoBase64) => {
        this.setState({
            photo: photoBase64,
            photoModified: true
        });

        detectChanges = true;
    }

    saveDetails = () => {
        const self = this;

        if (!this.state.loading && this.validateFields()) {
            this.setState({
                loading: true
            });

            const dataToSave = this.getData();

            Api.updateUser(dataToSave, function (response) {
                if (response.success) {
                    response.data.password = dataToSave.password;
                    response.data.photo = self.state.photo;
                    UtilsApi.updateAuthorization(response.data);

                    let userData = UtilsApi.encodeUser(response.data);
                    if (self.state.photo && self.state.photoModified) {
                        self.updatePhoto(userData);
                    } else {
                        self.saveUser(userData);
                    }
                } else {
                    self.setState({
                        loading: false
                    });

                    Alert.alert('', response.message);
                }
            });
        }
    }

    updatePhoto = (userData) => {
        const self = this;

        if (this.state.newPhoto) {
            Api.addUserPhoto(this.state.photo, function (response) {
                afterRequest(response)
            });
        } else {
            Api.updateUserPhoto(this.state.photo, function(response) {
                afterRequest(response)
            });
        }

        function afterRequest(response) {
            if (response.success) {
                userData.photo = self.state.photo;
                window.userPhoto = self.state.photo;
                self.saveUser(userData);
            } else {
                self.saveUser(userData);
                Alert.alert('', response.message);
            }
        }
    }

    saveUser = (data) => {
        const self = this;

        Storage.setItem('user', data).then(() => {
            self.setState({
                loading: false
            });
            self.exitPage();
        });
    }

    getData = () => {
        let user = {
            'name': this.state.name,
            'mobile_phone': this.state.mobile_phone,
            'birth_date': this.state.birth_date,
            'gender': parseFloat(this.state.gender),
            'password': this.state.password
        };

        return user;
    }

    validateFields = () => {
        if (this.state.name && this.state.email &&
            this.state.mobile_phone && this.state.birth_date &&
            this.state.password && this.state.passwordConfirmation) {
            
            if (this.state.password == this.state.passwordConfirmation) {
                return true;
            } else {
                Alert.alert('', window.strings['password_distinct_error']);
            }

        } else {
            Alert.alert('', window.strings['fields_to_be_filled']);
            return false;
        }
    }

    changesConfirm = () => {
        this.setState({
            changesConfirmation: false
        });
        this.exitPage();
    }

    changesCancel = () => {
        this.setState({
            changesConfirmation: false
        });
    }

    openDeleteAccount = () => {
        this.setState({
            deleteAccountConfirmation: true
        });
    }

    deleteAccountCancel = () => {
        this.setState({
            deleteAccountConfirmation: false
        });
    }

    deleteAccountConfirm = () => {
        const self = this;

        this.setState({
            deleteAccountConfirmation: false
        });

        Api.deleteUser(function (response) {
            if (response.success) {
                Storage.clearStorage();
                self.props.navigation.replace('Welcome');
            } else {
                Alert.alert('', response.message);
            }
        });
    }

    render() {
        return (
            <KeyboardFeatures>
            {() => (
                <View style={Styles.container}>
                    <Loading loadingVisible={this.state.loading} />

                    <ImageBackground style={Styles.background}>

                        <ModalConfirmation
                            text={window.strings['want_leave_without_saving']}
                            visible={this.state.changesConfirmation}
                            callbackCancel={this.changesCancel}
                            callbackConfirm={this.changesConfirm}
                        />

                        <ModalConfirmation
                            text={window.strings['delete_account_message_confirmation']}
                            visible={this.state.deleteAccountConfirmation}
                            callbackCancel={this.deleteAccountConfirm}
                            callbackConfirm={this.deleteAccountCancel}
                            textCancel={window.strings['delete_account']}
                            textConfirm={window.strings['cancel']}
                        />

                        <ScrollView style={Styles.scroll}>
                            <View style={[Styles.padding, Styles.titleContainer]}>
                                <Text style={Styles.title}>
                                    {window.strings['profile']}
                                </Text>
                            </View>

                            {this.state.ready ?
                                <View style={Styles.photoContainer}>
                                    {this.state.showPhotoContainer ?
                                        <Photo callback={this.receivePhoto}
                                            photo={this.state.photo}
                                            width={150} height={150} /> : null}
                                </View> : null}

                            {this.state.ready ?
                                <View style={Styles.padding}>
                                    <Form callback={this.updateData}
                                        data={this.state.inputs} />

                                    <View style={Styles.buttonContainer}>
                                        <Button callback={this.saveDetails}
                                            text={window.strings['save']} />
                                        <Button callback={this.openDeleteAccount}
                                            buttonStyles={Styles.buttonDeleteAccount}
                                            text={window.strings['delete_account']} />
                                    </View>
                                </View> : null}
                        </ScrollView>
                    </ImageBackground>
                </View>
            )}
            </KeyboardFeatures>
        );
    }
}

export default UserDetails;