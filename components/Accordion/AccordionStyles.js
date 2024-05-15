import Variables from "../../assets/styles/Variables";

export default {
    rowItem: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.borderRow,
        borderBottomStyle: "solid",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    itemTitleCol: {
        flex: 1
    },
    itemIconCol: {
        width: 30,
        justifyContent: "flex-end"
    },
    itemTitleText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon
    },
    itemDescription: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.borderRow,
        borderBottomStyle: "solid"
    },
    itemDescriptionText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon
    },
    iconColor: Variables.colors.secondary,
    iconInfoColor: Variables.colors.infoIcon,
    iconSize: Variables.sizes.icon,
    itemImageCol: {
        width: 30
    }
};