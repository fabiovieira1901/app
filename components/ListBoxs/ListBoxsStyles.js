import Variables from "../../assets/styles/Variables";

export default {
    item: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.border,
        borderStyle: "solid",
        borderRadius: Variables.radius.medium,
        backgroundColor: Variables.colors.backgroundPrimary,
        padding: 5,
        margin: 5
    },
    itemImageCol: {
        marginBottom: 5
    },
    itemPhoto: {
        width: 40,
        height: 40,
        borderRadius: Variables.radius.circle,
        resizeMode: "contain"
    },
    itemTitleCol: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    itemTitleText: {
        fontSize: Variables.fontSizes.titleSmall,
        color: Variables.colors.white,
        fontFamily: Variables.fonts.primaryBold,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40
    },
    itemInfoText: {
        marginTop: 5,
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: Variables.fonts.primaryBold
    },
    itemSuccessText: {
        marginTop: 5,
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.success,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: Variables.fonts.primaryBold
    },
    itemDangerText: {
        marginTop: 5,
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.danger,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: Variables.fonts.primaryBold
    },
    icon: {
        marginTop: 5,
        marginBottom: 5
    },
    iconSize: 30,
    iconColor: Variables.colors.white
};