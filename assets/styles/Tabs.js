import Variables from "../styles/Variables";

export default {
    tabs: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -5,
        marginRight: -5
    },
    headerTab4: {
        width: "25%",
        paddingLeft: 5,
        paddingRight: 5
    },
    headerTab3: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    headerTab2: {
        width: "50%",
        paddingLeft: 5,
        paddingRight: 5
    },
    tab: {
        color: Variables.colors.white,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        height: Variables.isIos ? 50 : 40,
        borderWidth: Variables.sizes.border,
        borderColor: Variables.colors.white,
        backgroundColor: Variables.colors.tabButton,
        borderStyle: "solid"
    },
    firstTab: {
        borderRadius: Variables.radius.button
    },
    lastTab: {
        borderRadius: Variables.radius.button
    },
    tabActive: {
        backgroundColor: Variables.colors.tabButtonActive,
        color: Variables.colors.white
    },
    tabTextActive: {
        color: Variables.colors.white
    },
    tabText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: Variables.fonts.primaryBold
    },
    tabView: {
        paddingTop: 20,
        flex: 1,
        borderBottomLeftRadius: Variables.radius.button,
        borderBottomRightRadius: Variables.radius.button
    },
    disabled: {
        opacity: 0.5
    }
};