import Variables from "../../assets/styles/Variables";

export default {
	modalView: {
		backgroundColor: Variables.colors.backgroundOpacity,
		borderRadius: Variables.radius.null,
		padding: 35,
		alignItems: "center",
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
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Variables.colors.white,
		borderRadius: Variables.radius.modal,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderStyle: "solid"
	},
	text: {
		marginTop: 20,
		fontSize: Variables.fontSizes.textCommon,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		alignContent: "center"
	},
	textElement: {
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		alignContent: "center"
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
	threeButton: {
		width: '33.33%',
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
	buttonThirdText: {
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
	buttonThird: {
		color: Variables.colors.danger,
		borderLeftWidth: Variables.sizes.borderHalf,
		borderBottomRightRadius: Variables.radius.modal
	}
};