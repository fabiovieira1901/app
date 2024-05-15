import Variables from "../../assets/styles/Variables";

export default {
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
        color: Variables.colors.white,
        marginBottom: 10
    },
    text: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon,
    },
	circle: {
		height: 25,
		width: 25,
		borderRadius: Variables.radius.circle,
        borderWidth: 2,
        marginRight: 25,
		borderColor: Variables.colors.borderRow,
		alignItems: "center",
		justifyContent: "center"
	},
	checkedCircle: {
		width: 19,
		height: 19,
		borderRadius: Variables.radius.circle,
		backgroundColor: Variables.colors.checked
	}
};