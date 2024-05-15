import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import Styles from './HeaderStyles';


let utils = {
    getEmpty: function () {
        return <View />;
    },
    getLogo: function () {
        return <TouchableOpacity style={Styles.logoContainer}
            onPress={function () {
                EventRegister.emit('home-click');
            }}
        >
            <Image
                source={require('../../assets/images/logo_header.png')}
                style={Styles.logo} />
        </TouchableOpacity>;
    },
    getMenuIcon: function () {
        return <TouchableOpacity activeOpacity={0.8}
            onPress={function () {
                EventRegister.emit('header-left-click');
            }}
            style={Styles.leftImage}>
            <SvgIcon icon={'tab_menu'} />
        </TouchableOpacity>
    },
    getBackIcon: function () {
        return <TouchableOpacity activeOpacity={0.8}
            onPress={function () {
                EventRegister.emit('header-left-click');
            }}
            style={Styles.leftImage}>
            <FontAwesome name="chevron-left"
                style={Styles.leftImageIcon}
                size={Styles.backIconSize}
                color={Styles.backIconColor} />
        </TouchableOpacity>
    },
    getHomeIcon: function () {
        return <TouchableOpacity activeOpacity={0.8}
            onPress={function () {
                EventRegister.emit('home-click');
            }}
            style={Styles.rightImage}>
            <Entypo name="home"
                style={Styles.rightImageIcon}
                size={Styles.homeIconSize}
                color={Styles.homeIconColor} />
        </TouchableOpacity>
    }
};

export default {
    onlyLogo: {
        headerShown: true,
        headerTintColor: Styles.color,
        headerStyle: Styles.background,
        headerTitle: function () {
            return utils.getLogo();
        },
        headerLeft: function () {
            return utils.getEmpty();
        },
        headerRight: function () {
            return utils.getEmpty();
        }
    },
    onlyMenu: {
        headerShown: true,
        headerTintColor: Styles.color,
        headerStyle: Styles.background,
        headerTitle: function () {
            return utils.getLogo();
        },
        headerLeft: function () {
            return utils.getMenuIcon();
        },
        headerRight: function () {
            return utils.getHomeIcon();
        }
    },
    home: {
        headerShown: true,
        headerTintColor: Styles.color,
        headerStyle: Styles.background,
        headerTitle: function () {
            return utils.getLogo();
        },
        headerLeft: function () {
            return utils.getMenuIcon();
        },
        headerRight: function () {
            return utils.getEmpty();
        }
    },
    onlyBackButton: {
        headerShown: true,
        headerTintColor: Styles.color,
        headerStyle: Styles.background,
        headerTitle: function () {
            return utils.getEmpty();
        },
        headerLeft: function () {
            return utils.getBackIcon();
        },
        headerRight: function () {
            return utils.getEmpty();
        }
    },
    backButton: {
        headerShown: true,
        headerTintColor: Styles.color,
        headerStyle: Styles.background,
        headerTitle: function () {
            return utils.getLogo();
        },
        headerLeft: function () {
            return utils.getBackIcon();
        },
        headerRight: function () {
            return utils.getHomeIcon();
        }
    }
};