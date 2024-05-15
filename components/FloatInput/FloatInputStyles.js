import Variables from "../../assets/styles/Variables";

export default {
	container: {
        width: "100%",
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
        height: Variables.sizes.input,
        marginVertical: 4,
        backgroundColor: Variables.colors.white
    },
    textInput: {
        fontSize: Variables.fontSizes.titleSmall,
        marginTop: Variables.isIos ? 7 : 5,
        color: Variables.colors.black,
        paddingTop: 12,
        paddingRight: 12,
        paddingLeft: 12
    },
    textPasswordInput: {
        paddingRight: 45
    },
    textInputWithoutTitle: {
        fontSize: Variables.fontSizes.titleSmall,
        marginTop: 5,
        color: Variables.colors.black,
        paddingTop: 6,
        paddingRight: 12,
        paddingLeft: 12
    },
    titleStyles: {
        position: "absolute",
        left: 4
    },
    disabledInput: {
        opacity: 0.6
    },
    passwordIconSize: Variables.sizes.icon,
    passwordIconColor: Variables.colors.white,
    passwordIcon: {
        position: 'absolute',
        height: Variables.sizes.input,
        width: 30,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        top: 0,
        right: 0
    },
    animatedTextY: Variables.isIos ? 11 : 14,
    cursorColor: Variables.colors.cursor
};