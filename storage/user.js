import { Alert } from 'react-native';
import axios from 'axios';
import Api from '../services/api/Api';
import Storage from '../storage/storage';
import NetInfo from '@react-native-community/netinfo';


export default {
    // Admin
    getTrainingPlans: function (clientId, callback) {
        let key = clientId ? 'getTrainingPlans-' + clientId : 'getTrainingPlans';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getTrainingPlans(clientId, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getExercises: function (data, callback) {
        let key = 'getExercises';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getExercises(data, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getExercise: function (data, callback) {
        let key = 'getExercise-' + data.id + '-' + data.photos;

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getExercise(data, function (response) {
                    let data = null;

                    if (response.success) {
                        data = response.data[0];
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback(null);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getClients: function (callback) {
        let key = 'getClients';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getClients(function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getPhysicalEvaluations: function (clientId, callback) {
        let key = clientId ? 'getPhysicalEvaluations-' + clientId : 'getPhysicalEvaluations';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getPhysicalEvaluations(clientId, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let str1 = data[i].date ? data[i].date : window.strings['no_data'];
                        let str2 = data[i].date_next ? data[i].date_next : window.strings['no_data'];
                        data[i].name = str1 + ' / ' + str2;
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getPhysicalEvaluationsQuestions: function (callback) {
        let key = 'getPhysicalEvaluationsQuestions';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getPhysicalEvaluationsQuestions(function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getPhysicalEvaluationEvolution: function (dates, callback) {
        let key = 'getPhysicalEvaluationEvolution-' + dates.start + '-' + dates.end;

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getPhysicalEvaluationEvolution(dates, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getClientsRegisters: function (callback) {
        let key = 'getClientsRegisters';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getClientsRegisters(function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getAlerts: function (callback) {
        let key = 'getAlerts-' + axios.defaults.userId;

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getAlerts(function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    // Admin / Client
    getNutritionPlans: function (clientId, callback) {
        let key = clientId ? 'getNutritionPlans-' + clientId : 'getNutritionPlans';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getNutritionPlans(clientId, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getNutrition: function (clientId, callback) {
        let key = clientId ? 'getNutrition-' + clientId : 'getNutrition';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getNutrition(clientId, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].date) {
                            data[i].info = data[i].date;
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    // Client
    getTrainingPlan: function (data, callback) {
        let key = 'getTrainingPlan-' + axios.defaults.userDbId;

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getTrainingPlan(data, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    },
    getPhysicalEvaluation: function (clientId, callback) {
        let key = clientId ? 'getPhysicalEvaluation-' + clientId : 'getPhysicalEvaluation';

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                Api.getPhysicalEvaluation(clientId, function (response) {
                    let data = [];

                    if (response.success) {
                        data = response.data;
                    } else {
                        if (response.message) {
                            Alert.alert('', response.message);
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let str1 = data[i].date ? data[i].date : window.strings['no_data'];
                        let str2 = data[i].date_next ? data[i].date_next : window.strings['no_data'];
                        data[i].name = str1 + ' / ' + str2;
                    }

                    Storage.setItem(key, data).then(() => {
                        callback(data);
                    });
                });
            } else {
                Storage.getItem(key).then(data => {
                    if (data) {
                        callback(data);
                    } else {
                        callback([]);
                        Alert.alert('', window.strings['no_internet']);
                    }
                });
            }
        });
    }
};