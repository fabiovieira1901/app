import axios from 'axios';
import { NativeModules } from 'react-native';
import Utils from '../utils/utils';
import NetInfo from '@react-native-community/netinfo';

const Networking = NativeModules.Networking;


export default {
    getStrings(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Utils.updateAuthorization({
                    email: axios.defaults.adminEmail,
                    password: axios.defaults.adminPassword
                });

                axios.get(axios.defaults.baseUrl + 'translations?lng=' + window.language, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    login(userLogin, callback) {
        Networking.clearCookies(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    Utils.updateAuthorization(userLogin);

                    axios.post(axios.defaults.baseUrl + 'login?pt_id=' + axios.defaults.ptId,
                        userLogin, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': axios.defaults.authorization
                        }
                    }).then((response) => {
                        Utils.processResponse(response, callback);
                    }).catch((response) => {
                        Utils.processResponse(response, callback);
                    });
                } else {
                    callback({
                        success: false,
                        message: window.strings['no_internet']
                    });
                }
            });
        });
    },
    getEnums(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'enums?pt_id=' + axios.defaults.ptId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    register(userInfo, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Utils.updateAuthorization({
                    email: axios.defaults.adminEmail,
                    password: axios.defaults.adminPassword
                });

                userInfo.pt_id = axios.defaults.ptId;

                axios.post(axios.defaults.baseUrl + 'register',
                    userInfo, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getRegisterQuestions(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Utils.updateAuthorization({
                    email: axios.defaults.adminEmail,
                    password: axios.defaults.adminPassword
                });

                axios.get(axios.defaults.baseUrl + 'register_questions?db_id=' + axios.defaults.ptId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getClientRegisterPhotos(id, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'register_photo?filter={"register_id":' + id + ',"pt_id":' + axios.defaults.ptId + '}', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: axios.defaults.authorization,
                    },
                }).then((response) => {
                    Utils.processResponse(response, callback)
                }).catch((response) => {
                    Utils.processResponse(response, callback)
                })
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    newClientRegisterPhotos(photos, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'register_photo',
                    photos, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: axios.defaults.authorization,
                    },
                }).then((response) => {
                    Utils.processResponse(response, callback)
                }).catch((response) => {
                    Utils.processResponse(response, callback)
                })
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getClientsRegisters(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'register?filter={"pt_id":' + axios.defaults.ptId + ',"type":1,"status":0}&order={"id":0}', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getClientRegister(id, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'register?filter={"pt_id": ' + axios.defaults.ptId + ', "id": ' + id + '}', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getAlerts(callback) {
        let userId = axios.defaults.userId;
        let ptId = axios.defaults.ptId;

        axios.get(axios.defaults.baseUrl + 'alerts?id=' + userId + '&pt_id=' + ptId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    validateClient(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let filter = 'id=' + data.userId + '&pt_id=' + axios.defaults.ptId

                if (data.payday) {
                    filter += '&payday=' + data.payday
                }

                axios.post(axios.defaults.baseUrl + 'register_validate?' + filter,
                    {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    registerInvalid(userId, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let filter = 'id=' + userId + '&pt_id=' + axios.defaults.ptId;

                axios.post(axios.defaults.baseUrl + 'register_invalid?' + filter,
                    {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    newClient(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                data.pt_id = parseFloat(axios.defaults.ptId);

                axios.post(axios.defaults.baseUrl + 'user',
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    updateUser(userInfo, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let userId = userInfo.id ? userInfo.id : axios.defaults.userId;

                axios.patch(axios.defaults.baseUrl + 'user?id=' + userId + '&pt_id=' + axios.defaults.ptId,
                    userInfo, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    deleteUser(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.delete(axios.defaults.baseUrl + 'user?id=' + axios.defaults.userId + '&pt_id=' + axios.defaults.ptId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    addUserPhoto(photo, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let id = axios.defaults.userId;
                let ptId = axios.defaults.ptId;

                axios.post(axios.defaults.baseUrl + 'user_photo',
                    {
                        id: id,
                        pt_id: ptId,
                        photo: photo
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    updateUserPhoto(photo, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.patch(axios.defaults.baseUrl + 'user_photo?id=' + axios.defaults.userId + '&pt_id=' + axios.defaults.ptId,
                    {
                        photo: photo
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getUser(user, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'user?filter={"pt_id": ' + axios.defaults.ptId + ',"email": "' + user.email + '"}&photo=0', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processGetUser(response, callback);
                }).catch((response) => {
                    Utils.processGetUser(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getUserPayment(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'user?filter={"pt_id":' + axios.defaults.ptId + ',"id":' + axios.defaults.userId + '}&fields=["paym_check","flags"]&photo=0', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getSettings(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'settings?db_id=' + axios.defaults.userDbId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    updateSettings(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.patch(axios.defaults.baseUrl + 'settings?db_id=' + axios.defaults.userDbId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    resetPassword(userEmail, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Utils.updateAuthorization({
                    email: axios.defaults.adminEmail,
                    password: axios.defaults.adminPassword
                });

                let data = {
                    'email': userEmail,
                    'pt_id': axios.defaults.ptId
                };

                axios.post(axios.defaults.baseUrl + 'password_send',
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    logout(callback) {
        Networking.clearCookies(() => {
            axios.post(axios.defaults.baseUrl + 'logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': axios.defaults.authorization
                }
            }).then((response) => {
                Utils.processResponse(response, callback);
            }).catch((response) => {
                Utils.processResponse(response, callback);
            });
        });
    },
    // Admin
    getTrainingPlans(clientId, callback) {
        let userId = clientId ? clientId : axios.defaults.ptId + '&filter={"base": 1}';

        axios.get(axios.defaults.baseUrl + 'training_plan?db_id=' + userId + '&order={"id":0}', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    newTrainingPlan(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.post(axios.defaults.baseUrl + 'training_plan?db_id=' + userId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    editTrainingPlan(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let id = parseFloat(data.id);
                delete data.id;

                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.patch(axios.defaults.baseUrl + 'training_plan?db_id=' + userId + '&id=' + id,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    deleteTrainingPlan(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let id = data.id;
                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.delete(axios.defaults.baseUrl + 'training_plan?db_id=' + userId + '&id=' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getExercisesPhotos(ids, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'workout_photos?db_id=' + axios.defaults.ptId + '&search={"id":[1],"workout_id":' + JSON.stringify(ids) + '}', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getExercises(data, callback) {
        let photos = data.photos;
        let ids = data.ids;

        axios.get(axios.defaults.baseUrl + 'workout?db_id=' + axios.defaults.ptId + '&photo=' + photos + (ids ? '&search={"id":' + JSON.stringify(ids) + '}' : ''), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getExercise(data, callback) {
        axios.get(axios.defaults.baseUrl + 'workout?db_id=' + axios.defaults.ptId + '&filter={"id": ' + data.id + '}&photo=' + data.photos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    newExercise(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'workout?db_id=' + axios.defaults.ptId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    editExercise(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let id = parseFloat(data.id);
                delete data.id;

                axios.patch(axios.defaults.baseUrl + 'workout?db_id=' + axios.defaults.ptId + '&id=' + id,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    deleteExercise(id, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.delete(axios.defaults.baseUrl + 'workout?db_id=' + axios.defaults.ptId + '&id=' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    newExercisePhotos(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'workout_photos?db_id=' + axios.defaults.ptId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    updateExercisePhotos(workoutId, photos, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.patch(axios.defaults.baseUrl + 'workout_photos?db_id=' + axios.defaults.ptId + '&workout_id=' + workoutId,
                    photos, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    deleteExercisePhotos(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.delete(axios.defaults.baseUrl + 'workout_photos?db_id=' + axios.defaults.ptId + '&workout_id=' + data.workout_id + '&ids=' + JSON.stringify(data.ids), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getUsersPhotos(ids, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let ptId = [axios.defaults.ptId];

                axios.get(axios.defaults.baseUrl + 'user_photo?search={"pt_id": ' + JSON.stringify(ptId) + ', "id":' + JSON.stringify(ids) + '}', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getClients(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'user?search={"type":[1],"pt_id":[' + axios.defaults.ptId + '],"status":[0,1]}&order={"id":0}&photo=0', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getClient(id, callback) {
        axios.get(axios.defaults.baseUrl + 'user?filter={"pt_id": ' + axios.defaults.ptId + ', "id": ' + id + '}&photo=1', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getPhysicalEvaluations(clientId, callback) {
        let userId = clientId ? clientId : axios.defaults.ptId;

        axios.get(axios.defaults.baseUrl + 'physical_evaluation?db_id=' + userId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getPhysicalEvaluationsQuestions(callback) {
        axios.get(axios.defaults.baseUrl + 'parq_questions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getPhysicalEvaluationEvolution(dates, callback) {
        axios.get(axios.defaults.baseUrl + 'phy_eval_evolution?db_id=' + axios.defaults.userDbId + '&start_date=' + dates.start + '&end_date=' + dates.end, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getPhysicalEvaluationPhotos(data, callback) {
        axios.get(axios.defaults.baseUrl + 'physical_eval_photo?db_id=' + data.clientDbId + '&filter={"pe_id":' + data.id + '}', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: axios.defaults.authorization,
            },
        }).then((response) => {
            Utils.processResponse(response, callback)
        }).catch((response) => {
            Utils.processResponse(response, callback)
        })
    },
    newPhysicalEvaluation(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.post(axios.defaults.baseUrl + 'physical_evaluation?db_id=' + userId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    editPhysicalEvaluation(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let id = parseFloat(data.id);
                delete data.id;

                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.patch(axios.defaults.baseUrl + 'physical_evaluation?db_id=' + userId + '&id=' + id,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    deletePhysicalEvaluation(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let id = data.id;
                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.delete(axios.defaults.baseUrl + 'physical_evaluation?db_id=' + userId + '&id=' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    newPhysicalEvaluationPhotos(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'physical_eval_photo?db_id=' + data.dbId,
                    data.photos, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: axios.defaults.authorization,
                    },
                }).then((response) => {
                    Utils.processResponse(response, callback)
                }).catch((response) => {
                    Utils.processResponse(response, callback)
                })
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getNutrition(clientId, callback) {
        const userId = clientId ? clientId : axios.defaults.ptId;
        axios.get(axios.defaults.baseUrl + 'food_plan?db_id=' + userId + '&filter={"status":1}&order={"id":1}', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getFoods(data, callback) {
        axios.get(axios.defaults.baseUrl + 'food?db_id=' + axios.defaults.ptId + '&image=' + (data && data.photo ? '1' : '0') + (data.ids ? '&search={"id":' + JSON.stringify(data.ids) + '}' : ''), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getNotifications(userId, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'notification?db_id=' + userId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false
                });
            }
        });
    },
    getAppNotifications(callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'notifications?db_id=' + axios.defaults.userDbId + '&filter={"type":1}', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false
                });
            }
        });
    },
    // Client
    getTrainingPlan(data, callback) {
        axios.get(axios.defaults.baseUrl + 'training_plan?db_id=' + axios.defaults.userDbId + '&search={"status":[1]' + (data && data.places && data.places.length ? (',"place":' + JSON.stringify(data.places)) : '') + '}&order={"id":1}', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    getRegisterConfigStruct(callback) {
        Networking.clearCookies(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    Utils.updateAuthorization({
                        email: axios.defaults.adminEmail,
                        password: axios.defaults.adminPassword
                    });

                    axios.get(axios.defaults.baseUrl + 'register_config?db_id=' + axios.defaults.ptId, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': axios.defaults.authorization
                        }
                    }).then((response) => {
                        Utils.processResponse(response, callback);
                    }).catch((response) => {
                        Utils.processResponse(response, callback);
                    });
                } else {
                    callback({
                        success: false,
                        message: window.strings['no_internet']
                    });
                }
            });
        });
    },
    getRegister(data, callback) {
        Networking.clearCookies(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    Utils.updateAuthorization({
                        email: axios.defaults.adminEmail,
                        password: axios.defaults.adminPassword
                    });

                    axios.get(axios.defaults.baseUrl + 'register?filter={"pt_id": ' + axios.defaults.ptId + ',"id": ' + data.id + '}&fields=["paym_sub_status","paym_sub_check"]&lng=' + window.language, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': axios.defaults.authorization
                        }
                    }).then((response) => {
                        Utils.processResponse(response, callback);
                    }).catch((response) => {
                        Utils.processResponse(response, callback);
                    });
                } else {
                    callback({
                        success: false,
                        message: window.strings['no_internet']
                    });
                }
            });
        });
    },
    getFeedbackConfig(callback) {
        Networking.clearCookies(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    Utils.updateAuthorization({
                        email: axios.defaults.adminEmail,
                        password: axios.defaults.adminPassword
                    });

                    axios.get(axios.defaults.baseUrl + 'feedback_config?db_id=' + axios.defaults.ptId, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': axios.defaults.authorization
                        }
                    }).then((response) => {
                        Utils.processResponse(response, callback);
                    }).catch((response) => {
                        Utils.processResponse(response, callback);
                    });
                } else {
                    callback({
                        success: false,
                        message: window.strings['no_internet']
                    });
                }
            });
        });
    },
    getPhysicalEvaluation(clientId, callback) {
        let userId = clientId ? clientId : axios.defaults.ptId;

        axios.get(axios.defaults.baseUrl + 'physical_evaluation?db_id=' + userId + '&order={"date":1,"date_next":1}&limit=1', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': axios.defaults.authorization
            }
        }).then((response) => {
            Utils.processResponse(response, callback);
        }).catch((response) => {
            Utils.processResponse(response, callback);
        });
    },
    reportIssue(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'report_issue',
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getContents(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let filter = '';
                if (data && data.ids) {
                    filter = '&search={"id":[' + data.ids + ']}';
                }
                if (data && data.type) {
                    filter = '&search={"type":[' + data.type + ']}';
                }
                if (data && data.excludeType) {
                    filter += '&query=[{"f":"type","q":1,"v":' + data.excludeType + '}]';
                }
                filter += '&image=' + (data && data.photo ? '1' : '0');

                axios.get(axios.defaults.baseUrl + 'content?db_id=' + axios.defaults.ptId + filter, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    sendRegisterPayment(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'register_payment',
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    sendPayment(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                let userId = axios.defaults.ptId;

                if (data.client_id) {
                    userId = data.client_id;
                    delete data.client_id;
                }

                axios.post(axios.defaults.baseUrl + 'payment?db_id=' + userId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    addTrainingPlanProgress(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.post(axios.defaults.baseUrl + 'trng_plan_prog?db_id=' + axios.defaults.userDbId,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    editTrainingPlanProgress(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                const id = data.id;
                delete data.id;
                axios.patch(axios.defaults.baseUrl + 'trng_plan_prog?db_id=' + axios.defaults.userDbId + '&id=' + id + '&lng=' + window.language,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet'],
                    offline: true
                });
            }
        });
    },
    getTrainingPlanProgress(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'trng_plan_prog?db_id=' + axios.defaults.userDbId + '&filter={"workout_id":' + data.workout_id + '}&order={"date":1}&lng=' + window.language, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: axios.defaults.authorization,
                    },
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                })
            } else {
                callback({
                    success: false,
                    message: window.strings['no_internet']
                });
            }
        });
    },
    getShoppingList(data, callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                axios.get(axios.defaults.baseUrl + 'food_list?db_id=' + axios.defaults.userDbId + '&n_id=' + data.id + '&lng=' + window.language, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': axios.defaults.authorization
                    }
                }).then((response) => {
                    Utils.processResponse(response, callback);
                }).catch((response) => {
                    Utils.processResponse(response, callback);
                });
            } else {
                callback({
                    success: false
                });
            }
        });
    },
}
