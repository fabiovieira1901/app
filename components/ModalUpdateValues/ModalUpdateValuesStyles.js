import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

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
		alignItems: "center"
	},
	centeredView: {
		backgroundColor: Variables.colors.white,
		borderRadius: Variables.radius.modal,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderStyle: "solid",
		maxHeight: Dimensions.get('window').height - 100
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
	errorMessage: {
		marginTop: 10,
		marginBottom: 10
	},
	errorMessageText: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.danger,
        textAlign: "center"
	},
	title: {
		marginTop: 10,
		marginBottom: 5,
		paddingLeft: 20,
		paddingRight: 20
	},
	titleText: {
		fontSize: Variables.fontSizes.titleCommon,
		color: Variables.colors.black,
		fontFamily: Variables.fonts.primaryBold,
        textAlign: "center"
	}
};