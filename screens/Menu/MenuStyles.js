import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
	container: {
		flex: 1,
		backgroundColor: Variables.colors.background
	},
	background: {
		flex: 1,
		justifyContent: "flex-end",
	},
	secondaryBackground: Variables.secondaryBackground,
	header: {
		alignItems: "flex-start",
		padding: 20,
		paddingTop: 50
	},
	headerLogo: {
    	paddingTop: Dimensions.get('window').height > 650 ? 40 : 15,
		paddingBottom: 0
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
	userName: {
		color: Variables.colors.white,
		fontSize: Variables.fontSizes.titleSmall,
		fontFamily: Variables.fonts.primaryBold,
		textAlign: "center",
		marginTop: 10
	},
	noUserPhoto: {
		resizeMode: "contain"
	},
	body: {
		flex: 1,
		padding: Dimensions.get('window').height > 650 ? 20 : 0,
		marginBottom: 10
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: Dimensions.get('window').height > 650 ? 25 : 15
	},
	iconColor: Variables.colors.iconColor,
	iconSize: 25,
	iconElement: {
		width: 50,
		paddingRight: 20,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center"
	},
	itemText: {
		color: Variables.colors.white,
		fontSize: Variables.fontSizes.titleSmall,
		fontFamily: Variables.fonts.primaryBold
	},
	mkgest: {
		paddingTop: 0,
		padding: 10,
		alignSelf: "center",
        justifyContent: "center",
		textAlign: "center"
	},
	mkgestButton: {
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
		marginTop: 3,
		color: Variables.colors.white,
		fontFamily: Variables.fonts.primaryBold
	}
};