import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
	centeredView: {
		flex: 1,
	},
	background: {
		flex: 1,
	},
	modalView: {
		borderRadius: Variables.radius.null,
		shadowColor: Variables.colors.secondary,
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
		backgroundColor: Variables.colors.backgroundMenu
	},
	header: {
		alignItems: "flex-start",
		padding: 20,
		paddingTop: 50
	},
	headerLogo: {
		paddingTop: Dimensions.get('window').height > 650 ? 40 : 0,
		paddingBottom: 40
	},
	logoImage: {
		height: 80,
		resizeMode: "contain",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: Variables.radius.circle
	},
	userPhoto: {
		width: 110,
		height: 110,
		borderRadius: Variables.radius.circle,
		resizeMode: "cover",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center"
	},
	noUserPhoto: {
		resizeMode: "contain"
	},
	body: {
		flex: 1
	},
	closeIconColor: Variables.colors.white,
	closeButton: {
		color: Variables.colors.red,
		backgroundColor: Variables.colors.red
	},
	button: {
		padding: 10,
		alignSelf: "center",
        justifyContent: "center",
		textAlign: "center",
		flexDirection: "row"
	},
	buttonText: {
		color: Variables.colors.white,
		fontFamily: Variables.fonts.primaryBold,
		fontSize: Variables.fontSizes.textCommon,
		marginLeft: 10
	},
	iconColor: Variables.colors.iconColor,
	iconSize: 25,
	mkgest: {
		padding: 10,
		alignSelf: "center",
        justifyContent: "center",
		textAlign: "center"
	},
	mkgestButton: {
		flexDirection: "row",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center"
	},
	mkgestImage: {
		height: 30,
		width: 30,
		resizeMode: "contain"
	},
	mkgestText: {
		marginLeft: 8,
		color: Variables.colors.white,
		fontFamily: Variables.fonts.primaryBold
	}
};