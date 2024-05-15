import Variables from "../../assets/styles/Variables";

export default {
    container: {
        flex: 1
    },
    searchContainer: {
        marginBottom: 10
    },
    hidden: {
        display: "none"
    },
    rowItem: {
        padding: 15,
        borderRadius: Variables.radius.button,
        borderColor: Variables.colors.tertiary,
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: Variables.colors.backgroundPrimary,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: Variables.radius.small,
        elevation: 5,
    },
    wrapBoxs: {
        marginLeft: -10,
        marginRight: -10
    },
    box: {
        flexBasis: "50%",
        padding: 10
    },
    boxRowItem: {
        height: 140
    },
    boxItemTitleCol: {
        flex: 1,
        alignItems: "center"
    },
    itemTitleCol: {
        flex: 1
    },
    itemIconCol: {
        width: 0
    },
    itemIconColSortable: {
        width: 0,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    itemInfoText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon,
        marginTop: 5
    },
    itemMessageText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon,
        marginTop: 5
    },
    itemDangerText: {
        color: Variables.colors.danger,
        fontSize: Variables.fontSizes.textCommon
    },
    itemTitleText: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.primaryBold,
        fontSize: Variables.fontSizes.textCommon
    },
    iconColor: Variables.colors.iconColor,
    itemImageCol: {
        width: 50
    },
    itemPhoto: {
        width: 40,
        height: 40,
        borderRadius: Variables.radius.circle,
        resizeMode: "contain"
    },
    itemImage: {
        marginBottom: 10,
        width: "100%"
    },
    itemImageElement: {
        height: 120,
        resizeMode: "contain"
    },
    textInput: {
        fontSize: Variables.fontSizes.textCommon,
        backgroundColor: Variables.colors.white,
		borderColor: Variables.colors.transparent,
        padding: 12,
		borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
        height: Variables.sizes.input,
        paddingRight: 45
    },
    emptyList: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40
    },
    emptyListText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon
    },
    inputIconSize: Variables.sizes.icon,
    inputIconColor: Variables.colors.gray,
    inputIcon: {
        position: "absolute",
        height: Variables.sizes.input,
        width: 30,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        top: 0,
        right: 0
    },
    successText: {
        color: Variables.colors.success
    },
    dangerText: {
        color: Variables.colors.danger
    },
    warningText: {
        color: Variables.colors.warning
    },
    defaultText: {
        color: Variables.colors.default
    },
    rowDisabled: {
        opacity: 0.6
    },
    sortableIcons: {
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10
    },
    sortIcon: {
        padding: 5
	},
    sortIconSize: 23,
	sortIconColor: Variables.colors.gray,
    cursorColor: Variables.colors.cursor
};