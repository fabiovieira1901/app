import Variables from "../../assets/styles/Variables";

export default {
    container: {
        flex: 1,
        paddingBottom: 10
    },
    containerInline: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: -5,
        marginRight: -5,
    },
    containerAdjust: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    row: {
        paddingTop: 0,
        marginBottom: 5,
        borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.transparent,
        borderBottomStyle: "solid"
    },
    rowInline: {
        flexBasis: "50%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    rowTextfieldInline: {
        flexBasis: "100%"
    },
    title: {
        marginBottom: 5
    },
    titleText: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white
    },
    separatorTitle: {
        borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.white,
        borderBottomStyle: "solid",
        marginBottom: 10,
        paddingBottom: 5
    },
    separatorTitleText: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white,
        fontFamily: Variables.fonts.primaryBold
    },
    textInput: {
        fontSize: Variables.fontSizes.textCommon,
        backgroundColor: Variables.colors.white,
        borderColor: Variables.colors.transparent,
        padding: 12,
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        height: Variables.sizes.input,
        borderWidth: 0.5
    },
    inputWithIcon: {
        paddingRight: 45
    },
    textfield: {
        fontSize: Variables.fontSizes.textCommon,
        backgroundColor: Variables.colors.white,
        borderColor: Variables.colors.transparent,
        padding: 12,
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
        textAlignVertical: "top",
        height: 60
    },
    valueContainer: {
        paddingBottom: 5
    },
    datepickerButton: {
        backgroundColor: Variables.colors.white,
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
        height: Variables.sizes.input,
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        padding: 12
    },
    datepickerButtonInline: {
        padding: 5
    },
    datepickerIcon: {
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    caretSize: Variables.sizes.icon,
    datepickerButtonText: {
        fontSize: Variables.fontSizes.textCommon
    },
    datepickerButtonTextInline: {
        marginLeft: 5
    },
    viewRow: {
        borderRadius: Variables.radius.small
    },
    viewRowEdited: {
        backgroundColor: Variables.colors.primary,
        padding: 12
    },
    viewCol: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconEdit: {
        marginRight: 10
    },
    iconEditColor: Variables.colors.white,
    iconSize: Variables.sizes.icon,
    viewRowTitle: {
        fontSize: Variables.fontSizes.titleSmall,
        color: Variables.colors.white,
        fontFamily: Variables.fonts.primaryBold
    },
    viewRowValue: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white
    },
    textColorBlack: {
        color: Variables.colors.black
    },
    borderColorBlack: {
        borderColor: Variables.colors.black
    },
    switchContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5
    },
    switchTitle: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.white,
        fontFamily: Variables.fonts.primaryBold
    },
    switchTitleBlack: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.black,
        fontFamily: Variables.fonts.primaryBold
    },
    switchOff: Variables.colors.danger,
    switchOn: Variables.colors.secondary,
    switchBackgroundOff: Variables.colors.white,
    switchBackgroundOn: Variables.colors.white,
    switchBackground: Variables.colors.white,
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
    textfieldFull: {
        height: 250
    },
    timeSelects: {
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    timeSelect: {
        width: "30%"
    },
    timeSeparator: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.black,
        fontFamily: Variables.fonts.primaryBold
    },
    disabled: {
        opacity: 0.6
    },
    datepicker: {
        backgroundColor: Variables.colors.white,
        elevation: 5,
        zIndex: 5,
        height: 45,
        borderRadius: Variables.radius.small
    },
    datepickerElement: {
        backgroundColor: Variables.colors.white,
        borderColor: Variables.colors.transparent,
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
        height: 45,
        flex: 1,
        width: "100%",
        padding: 0
    },
    datepickerElementIcon: {
        position: "absolute",
        left: 10,
        top: 11,
        marginLeft: 0
    },
    datepickerElementInput: {
        fontSize: Variables.fontSizes.textCommon,
        color: Variables.colors.primary,
        borderColor: Variables.colors.danger,
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        borderWidth: 0,
        height: 44,
        width: "100%",
        position: "absolute",
        left: 37,
        top: 0
    },
    datepickerElementCaret: {
        position: "absolute",
        right: 10,
        top: 12
    },
    calendarSize: Variables.sizes.icon,
    cursorColor: Variables.colors.cursor,
    fullWidth: {
        width: '100%'
    },
    centered: {
        textAlign: "center",
        marginBottom: 5
    }
};