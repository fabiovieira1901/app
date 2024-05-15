import Variables from "../../assets/styles/Variables";

export default {
    rowInline: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.border,
        borderBottomStyle: "solid",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rowNoInline: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.border,
        borderBottomStyle: "solid",
        alignItems: "flex-start"
    },
    col: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: Variables.radius.circle,
        marginRight: 10
    },
    title: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white,
        width: 200
    },
    titleNoInline: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.secondary
    },
    icon: {
        marginRight: 10
    },
    value: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white,
        flexShrink: 1
    },
    valueRow: {
        marginTop: 5
    },
    iconColor: Variables.colors.plusIcon,
    iconSize: Variables.sizes.icon
};