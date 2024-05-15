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
		backgroundColor: Variables.colors.primary,
		borderRadius: Variables.radius.modal,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderStyle: "solid"
	},
	items: {
		paddingTop: 10
	},
	item: {
		backgroundColor: Variables.colors.white,
		marginTop: 20,
		borderRadius: Variables.radius.button,
		backgroundColor: Variables.colors.secondary
	},
	itemText: {
		fontSize: Variables.fontSizes.titleSmall,
		color: Variables.colors.white,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center"
	},
	buttons: {
		marginTop: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderTopWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderStyle: "solid"
	},
	button: {
		width: "100%",
		borderRadius: Variables.radius.modal,
		borderWidth: 0,
		borderColor: Variables.colors.transparent,
		backgroundColor: Variables.colors.primary
	},
	buttonText: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.danger,
		fontFamily: Variables.fonts.primary,
		marginTop: 0
	}
};