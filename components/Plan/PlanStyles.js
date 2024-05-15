import Variables from "../../assets/styles/Variables";

export default {
	headerTitle: {
		color: Variables.colors.white,
		fontSize: Variables.fontSizes.textCommon,
		marginBottom: 20,
		marginTop: 20
	},
	stepCircuit: {
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: Variables.colors.backgroundPrimary,
		borderColor: Variables.colors.tertiary,
		borderStyle: "solid",
		borderWidth: 1,
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	stepCircuitLast: {
		paddingBottom: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomLeftRadius: Variables.radius.small,
		borderBottomRightRadius: Variables.radius.small
	},
	step: {
		paddingBottom: 10
	},
	stepCircuitHeader: {
		padding: 10,
		backgroundColor: Variables.colors.backgroundPrimary,
		borderColor: Variables.colors.tertiary,
		borderStyle: "solid",
		borderTopLeftRadius: Variables.radius.small,
		borderTopRightRadius: Variables.radius.small,
		borderWidth: 1,
		borderBottomWidth: 0,
		flexDirection: "row",
		alignItems: "center"
	},
	stepCircuitHeaderText: {
		color: Variables.colors.white,
		fontFamily: Variables.fonts.primaryBold,
		fontSize: Variables.fontSizes.textCommon
	},
	stepBox: {
		padding: 10,
		backgroundColor: Variables.colors.backgroundPrimary,
		borderColor: Variables.colors.tertiary,
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: Variables.radius.small,
		flexDirection: "row",
		alignItems: "center"
	},
	stepRow: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row"
	},
	stepImageView: {
		marginRight: 10
	},
	stepImage: {
		width: 60,
		height: 60,
		resizeMode: "contain"
	},
	stepText: {
		flex: 1
	},
	stepTextName: {
		color: Variables.colors.white,
		fontFamily: Variables.fonts.primaryBold,
		fontSize: Variables.fontSizes.textCommon
	},
	stepTextValue: {
		color: Variables.colors.white,
		fontSize: Variables.fontSizes.textCommon
	},
	stepTrainExtra: {
		paddingLeft: 20,
		height: "100%",
		flexDirection: "row"
	},
	stepTrainExtraImage: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		height: 30,
		width: 30,
		resizeMode: "contain"
	}
};