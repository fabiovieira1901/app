import Variables from "../../assets/styles/Variables";

export default {
    container: {
        flex: 1,
        paddingBottom: 20
    },
    title: {
        marginBottom: 2
    },
    titleText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon,
        fontFamily: Variables.fonts.primaryBold
    },
    valueText: {
        color: Variables.colors.secondary,
        fontFamily: Variables.fonts.primaryBold,
        fontSize: Variables.fontSizes.textCommon
    },
    valuesContainer: {
        backgroundColor: Variables.colors.primary,
        height: 70,
        paddingTop: 15,
        padding: 10
    },
    values: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    lineStart: {
        position: "absolute",
        left: 0,
        top: 0,
        alignItems: "center"
    },
    lineStartDown: {
        top: 12
    },
    lineStartUp: {
        top: -10
    },
    lineEnd: {
        position: "absolute",
        right: 0,
        top: 0,
        alignItems: "center"
    },
    lineEndDown: {
        top: 14
    },
    lineEndUp: {
        top: -12
    },
    valuePoint: {
        height: 10,
        width: 10,
        borderRadius: Variables.radius.circle,
        backgroundColor: Variables.colors.white
    },
    line: {
        position: "absolute",
        left: 0,
        top: 24,
        flex: 1,
        height: 5,
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8
    },
    lineDown: {
        top: 26,
        transform: [{ rotate: '5deg' }]
    },
    lineUp: {
        transform: [{ rotate: '-5deg' }]
    },
    lineColor: {
        flex: 1,
        backgroundColor: Variables.colors.white
    },
    emptyNoDataText: {
        color: Variables.colors.gray,
        fontSize: Variables.fontSizes.textCommon,
        paddingTop: 20,
        textAlign: "center"
    },
    emptyText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon,
        paddingTop: 30,
        textAlign: "center"
    }
};