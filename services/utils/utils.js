import ImagesBase64 from '../../assets/images/ImagesBase64';
import Base64 from '../base64/base64';
import axios from 'axios';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';


export default {
    updateAuthorization: function (user) {
        axios.defaults.authorization = 'Basic ' + Base64.btoa(user.email + ':' + user.password);
    },
    refreshUserFields: function (user) {
        axios.defaults.userDbId = parseFloat(user.db_id);
        axios.defaults.userId = parseFloat(user.id);
        axios.defaults.isAdmin = user.type == 0 ? true : false;
        axios.defaults.showSubscription = axios.defaults.devEmails.indexOf(user.email) == -1 ? true : false;
    },
    processResponse: function (response, callback) {
        try {
            const responseData = response && response.request && response.request.response ? JSON.parse(response.request.response) : {
                success: false,
                message: window.strings && window.strings['server_connection_failed'] ? window.strings['server_connection_failed'] : 'Problemas de conexão ao servidor. Aguarda um pouco por favor e tenta novamente.',
                offline: true
            };
            const data = responseData ? responseData.data : null;
            callback({
                success: responseData ? responseData.success : false,
                error: responseData ? responseData.error : null,
                data: data,
                message: responseData ? responseData.message : '',
                offline: responseData && responseData.offline ? true : false
            });
        } catch (error) {
            callback({
                success: false,
                message: response && response.request && response.request.response === '' ? (window.strings && window.strings['no_internet'] ? window.strings['no_internet'] : 'Por favor verifica a tua conexão à internet') : error.message,
            });
        }
    },
    processGetUser: function (response, callback) {
        try {
            const responseData = response && response.request && response.request.response ? JSON.parse(response.request.response) : {
                success: false,
                message: window.strings && window.strings['server_connection_failed'] ? window.strings['server_connection_failed'] : 'Problemas de conexão ao servidor. Aguarda um pouco por favor e tenta novamente.',
                offline: true
            };
            const data = responseData && responseData.data ? responseData.data : null;
            const userData = data ? this.encodeUser(data[0]) : null;
            if (userData) {
                callback({
                    success: responseData ? responseData.success : false,
                    data: userData,
                    message: responseData ? responseData.message : '',
                    offline: responseData && responseData.offline ? true : false
                });
            } else {
                callback({
                    success: false,
                    message: window.strings['server_connection_failed'],
                    offline: responseData && responseData.offline ? true : false
                });
            }
        } catch (error) {
            callback({
                success: false,
                message: response && response.request && response.request.response === '' ? (window.strings && window.strings['no_internet'] ? window.strings['no_internet'] : 'Por favor verifica a tua conexão à internet') : error.message,
            });
        }
    },
    encodeUser: function (data) {
        if (data) {
            data.photo = data.photo ? data.photo : ImagesBase64.user;
            this.refreshUserFields(data);
        }
        return data;
    },
    getGenders: function () {
        return this.getEnumsValue('genders')
    },
    getMuscularGroups: function () {
        return this.getEnumsValue('muscle_groups')
    },
    getExerciseTypes: function () {
        return this.getEnumsValue('workout_types')
    },
    getExerciseSeries: function () {
        return this.getEnumsValue('workout_series')
    },
    getTrainingPlanPlaces: function () {
        return this.getEnumsValue('trng_plan_places')
    },
    getFoodTypes: function () {
        return this.getEnumsValue('food_types')
    },
    getContentTypes: function () {
        return this.getEnumsValue('content_types')
    },
    getPhyEvalTypes: function () {
        return this.getEnumsValue('feedback_types')
    },
    getDailyWeightDays: function () {
        return this.getEnumsValue('daily_weight_days')
    },
    getPaymentMethods: function () {
        return this.getEnumsValue('payment_methods')
    },
    getEnumsValue: function (name) {
        const enums = JSON.parse(JSON.stringify(window.enums));
        if (enums && enums[name]) {
            for (let i = 0; i < enums[name].length; i++) {
                if (enums[name][i].name && window.strings[enums[name][i].name]) {
                    enums[name][i].name = window.strings[enums[name][i].name]
                }
            }
            return enums[name];
        } else {
            return [];
        }
    },
    getYoutubeEmbedUrl: function (url) {
        if (url.indexOf('/embed/') > -1 ||
            url.indexOf('.imagekit') > -1 ||
            url.indexOf('storageapi.mkgest') > -1 ||
            url.indexOf('.mkgest.') > -1
        ) {
            return url;
        }
        url = url.trim();
        let videoId = '';
        let splitId = url.split('v=')[1];
        if (splitId) {
            let ampersandPosition = splitId.indexOf('&');

            if (ampersandPosition != -1) {
                videoId = splitId.substring(0, ampersandPosition);
            } else {
                videoId = splitId;
            }
        } else {
            splitId = url.split('.be/')[1];

            if (splitId) {
                videoId = splitId;
            }
        }
        if (url.indexOf('/shorts/') > -1) {
            videoId = url.split('/shorts/')[1];
        }
        return 'https://www.youtube.com/embed/' + videoId;
    },
    getYoutubeVideoThumbnail: function (url) {
        if (url.indexOf('/embed/') > -1 ||
            url.indexOf('.imagekit') > -1 ||
            url.indexOf('storageapi.mkgest') > -1 ||
            url.indexOf('.mkgest.') > -1
        ) {
            return url;
        }
        url = url.trim();
        let videoId = '';
        let splitId = url.split('v=')[1];
        if (splitId) {
            let ampersandPosition = splitId.indexOf('&');

            if (ampersandPosition != -1) {
                videoId = splitId.substring(0, ampersandPosition);
            } else {
                videoId = splitId;
            }
        } else {
            splitId = url.split('.be/')[1];

            if (splitId) {
                videoId = splitId;
            }
        }
        if (url.indexOf('/shorts/') > -1) {
            videoId = url.split('/shorts/')[1];
        }
        if (videoId.indexOf('?') > -1) {
            videoId = videoId.split('?')['0'];
        }
        return 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    },
    splitArray: function (array, size) {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
            const last = chunked_arr[chunked_arr.length - 1];
            if (!last || last.length === size) {
                chunked_arr.push([array[i]]);
            } else {
                last.push(array[i]);
            }
        }
        return chunked_arr;
    },
    convertUtcDate: function (date, format) {
        try {
            if (date.indexOf(':') > -1) {
                let utcDate = date.replace(' ', 'T');
                if (utcDate.split(':').length < 3) {
                    utcDate += ':00';
                }
                utcDate += 'Z';
                if (format) {
                    return moment(utcDate).utcOffset(moment().utcOffset()).format(format);
                } else {
                    return moment(utcDate).utcOffset(moment().utcOffset()).format('YYYY-MM-DD HH:mm');
                }
            } else {
                return date;
            }
        } catch (error) {
            return date;
        }
    },
    encodeEmail: function (email) {
        return email.toLowerCase().replace(new RegExp(" *$"), '');
    },
    hasInternet: function (callback) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    goTabs: function (navigation) {
        navigation.replace('Home');
    },
    backHome: function (navigation) {
        navigation.replace('Home');
    }
}