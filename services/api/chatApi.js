import axios from 'axios';
import Utils from '../utils/utils';
import NetInfo from '@react-native-community/netinfo';
import Base64 from '../base64/base64';


export default {
    getAuthorization: function () {
        const date = new Date();
        const year = parseInt(date.getUTCFullYear());
        const month = parseInt(date.getUTCMonth()) + 1;
        const day = parseInt(date.getUTCDate());
        const hour = parseInt(date.getUTCHours());
        const isEven = !(hour % 2);
        let user = null;
        let password = null;
        
        if (isEven) {
            user = year + month + day + hour;
            password = (year * month) + (day * hour);
        } else {
            user = year - month - day - hour;
            password = (year * day) - (month * hour);
        }

        user = Base64.btoa(String(user));
        password = Base64.btoa(String(password));

        return 'Basic ' + Base64.btoa(user + ':' + password);
    },
    updateUser(data, callback) {
        const self = this

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                const id = data.id;
                delete data.id;

                axios.patch(axios.defaults.chatUrl + 'user?id=' + id,
                    data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': self.getAuthorization()
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
}
