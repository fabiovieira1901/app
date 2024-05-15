import Variables from "../../assets/styles/Variables";

export default {
	modalView: {
		backgroundColor: Variables.colors.backgroundOpacity,
		borderRadius: Variables.radius.null,
		padding: 35,
		shadowColor: Variables.colors.black,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 5,
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: "center",
		justifyContent: "center"
	},
	centeredView: {
		backgroundColor: Variables.colors.white,
		borderRadius: Variables.radius.modal,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderStyle: "solid"
	},
	mainTitle: {
		textAlign: "left",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: 20,
		paddingBottom: 10
	},
	mainTitleText: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.black,
		fontFamily: Variables.fonts.primaryBold
	},
	element: {
		paddingRight: 20,
		paddingLeft: 20
	},
	buttons: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderTopWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderRadius: Variables.radius.modal,
		borderStyle: "solid"
	},
	button: {
		width: '50%',
		borderRadius: 0,
		borderWidth: 0,
		borderColor: Variables.colors.modalBorder,
		backgroundColor: Variables.colors.white
	},
	buttonDangerText: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.danger,
		fontFamily: Variables.fonts.primary,
		marginTop: 0
	},
	buttonSuccessText: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.success,
		fontFamily: Variables.fonts.primary,
		marginTop: 0
	},
	buttonLeft: {
		color: Variables.colors.gray,
		borderRightWidth: Variables.sizes.borderHalf,
		borderBottomLeftRadius: Variables.radius.modal
	},
	buttonRight: {
		color: Variables.colors.danger,
		borderLeftWidth: Variables.sizes.borderHalf,
		borderBottomRightRadius: Variables.radius.modal
	},
	textInput: {
        fontSize: Variables.fontSizes.textCommon,
		marginTop: Variables.isIos ? 10 : 5,
		borderColor: Variables.colors.border,
        color: Variables.colors.black,
        padding: 12,
		borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5
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
        fontSize: Variables.fontSizes.textCommon,
        marginLeft: 10
    },
    datepickerButtonTextInline: {
        marginLeft: 5
	},
	datepicker: {
		height: 45
	},
	datepickerElement: {
        backgroundColor: Variables.colors.white,
		borderColor: Variables.colors.border,
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
    cursorColor: Variables.colors.cursor
};