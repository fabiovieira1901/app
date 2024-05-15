import Variables from "../../assets/styles/Variables";

export default {
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
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
};