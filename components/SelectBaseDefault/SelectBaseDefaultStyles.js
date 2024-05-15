import Variables from "../../assets/styles/Variables";

export default {
	modalView: {
		backgroundColor: Variables.colors.backgroundOpacity,
		borderRadius: Variables.radius.null,
		alignItems: "center",
		shadowColor: Variables.colors.background,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 5,
		position: "absolute",
		top: Variables.isIos ? 20 : 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: "center",
		justifyContent: "center"
	},
	centeredView: {
		backgroundColor: Variables.colors.background,
		borderRadius: Variables.radius.modal,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.primary,
		borderStyle: "solid",
		flex: 1
	},
	list: {
		backgroundColor: Variables.colors.background,
		flex: 1
	},
	row: {
		height: Variables.sizes.input,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.borderGray,
        borderBottomStyle: "solid"
	},
	rowText: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.white
	},
	searchContainer: {
		marginBottom: 10
    },
	textInput: {
        fontSize: Variables.fontSizes.textCommon,
        backgroundColor: Variables.colors.white,
		borderBottomColor: Variables.colors.white,
		borderBottomWidth: 0.5,
		borderTopLeftRadius: Variables.radius.smallInput,
		borderTopRightRadius: Variables.radius.smallInput,
		color: Variables.colors.primary,
        padding: 12
	},
	hidden: {
        display: "none"
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
		width: "100%",
		borderRadius: 0,
		borderWidth: 0,
		borderColor: Variables.colors.white,
		backgroundColor: Variables.colors.primary
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
		borderBottomLeftRadius: Variables.radius.modal
	},
	buttonRight: {
		color: Variables.colors.danger,
		borderBottomRightRadius: Variables.radius.modal
	},
    cursorColor: Variables.colors.cursor
};