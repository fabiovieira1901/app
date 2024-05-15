import { Platform, Dimensions } from 'react-native';

export default {
    isIos: Platform.OS === 'ios' ? true : false,
    fonts: {
        primary: "font-regular",
        primaryBold: "font-bold"
    },
    fontSizes: {
        screenTitle: Dimensions.get('window').height > 650 ? 24 : 21,
        titleCommon: Dimensions.get('window').height > 650 ? 19 : 16,
        titleSmall: Dimensions.get('window').height > 650 ? 15 : 12,
        textCommon: Dimensions.get('window').height > 650 ? 14 : 11,
        textSmallLogin: Dimensions.get('window').height > 650 ? 13 : 11,
        textSmall: 11
    },
    colors: {
        transparent: "transparent",
        primary: "#000",
        secondary: "#e32e28",
        tertiary: "#e32e28",
        buttonBackground: "#e32e28",
        buttonBorder: "#e32e28",
        buttonText: "#fff",
        buttonSecondaryBackground: "#e32e28",
        buttonSecondaryBorder: "#e32e28",
        buttonSecondaryText: "#fff",
        iconColor: "#e32e28",
        header: "#000",
        black: "#000",
        white: "#fff",
        gray: "#a0a0a0",
        green: "#0a6838",
        background: "#000",
        webviewBackground: "000",
        backgroundOpacity: "rgba(0, 0, 0, 0.8)",
        backgroundOpacityText: "rgba(255, 255, 255, 0.85)",
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ff9f19",
        default: "#ededf1",
        info: "#fff",
        delete: "#ff3737",
        backgroundMenu: "#000",
        border: "#fff",
        borderRow: "#fff",
        borderGray: "#ddd",
        borderBold: "#fff",
        checked: "#0a6838",
        blue: "#006593",
        backgroundPrimary: "rgba(0, 0, 0, 0.6)",
        backgroundBox: "rgba(227, 46, 40, 0.8)",
        title: "#fff",
        infoIcon: "#fff",
        plusIcon: "#fff",
        saveIcon: "#fff",
        deleteIcon: "#dc3545",
        modalBorder: "#DCDCDC",
        cursor: "#a0a0a0",
        tabActive: "#e32e28",
        tabInactive: "#fff",
        tabButton: "rgba(0, 0, 0, 0.8)",
        tabButtonActive: "#e32e28"
    },
    sizes: {
        border: 1,
        borderHalf: 0.5,
        icon: 20,
        buttonIcon: 30,
        input: 45
    },
    radius: {
        null: 0,
        smallInput: 6,
        small: 4,
        medium: 8,
        modal: 8,
        button: 15,
        circle: 1000,
        progressBar: 50
    },
    back: {
        imageMarginTop: Platform.OS === 'ios' ? 10 : 6
    },
    spaceTop: Dimensions.get('window').height > 650 ? 100 : 20,
    tab: {
        circle: {
            backgroundColor: "#000",
            borderColor: "transparent",
            borderRadius: 1000,
            borderStyle: "solid",
            borderWidth: 0.5,
            width: 40,
            height: 40,
            alignSelf: "center",
            alignItem: "center",
            justifyContent: "center",
            textAlign: "center"
        },
        active: {
            backgroundColor: "#000"
        },
        icon: {
            position: "absolute",
            top: 9,
            left: 9.4
        }
    },
    secondaryBackground: {
        backgroundColor: "transparent",
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 80
    }
};