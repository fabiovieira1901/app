import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../services/utils/utils';


export default {
    getItem: async function (key) {
        let item = await AsyncStorage.getItem(key);

        if (item) {
            return JSON.parse(item);
        } else {
            return null;
        }
    },
    setItem: async function (key, value) {
        if (key == 'user') {
            Utils.updateAuthorization(value);
        }

        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    updateItem: async function (key, value) {
        let item = await AsyncStorage.getItem(key);
        let parseData;

        if (item) {
            parseData = JSON.parse(item);
        } else {
            parseData = {};
        }
        
        for (const keyValue in value) {
            parseData[keyValue] = value[keyValue];
        }
        
        return await AsyncStorage.setItem(key, JSON.stringify(parseData));
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    },
    clearStorage: async function () {
        return await AsyncStorage.removeItem('user');
    }
};