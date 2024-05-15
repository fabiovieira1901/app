import axios from 'axios';
import AppJson from '../../app.json';


window.strings = {}
axios.defaults.baseUrl = AppJson.expo.extra.url;
axios.defaults.devBaseUrl = AppJson.expo.extra.devUrl;
axios.defaults.chatUrl = AppJson.expo.extra.chatUrl;
axios.defaults.ptId = parseFloat(AppJson.expo.extra.ptId);
axios.defaults.adminEmail = AppJson.expo.extra.adminEmail;
axios.defaults.adminPassword = AppJson.expo.extra.adminPassword;
axios.defaults.authorization = null;
axios.defaults.appVersion = AppJson.expo.version;
axios.defaults.projectId = AppJson.expo.extra.eas.projectId;
axios.defaults.devEmails = ['simaoferreira24694@gmail.com', 'test@mkgest.com', 'dev@mkgest.com'];
axios.defaults.timeout = 30000;