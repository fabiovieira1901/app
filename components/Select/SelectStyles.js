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
	modalTouch: {
		flex: 1
	},
	openSelect: {
		backgroundColor: Variables.colors.white,
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
		height: Variables.sizes.input,
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center",
		padding: 12,
		paddingTop: Variables.isIos ? 9 : 12,
		flexDirection: "row"
	},
	caretSize: Variables.sizes.icon,
	openSelectText: {
		fontSize: Variables.fontSizes.textCommon
	},
	rowsContainer: {
		height: 300
	},
	rowsContainerFilters: {
		height: 250
	},
	rowsContainerFiltersFocus: {
		height: 100
	},
	rows: {
		backgroundColor: Variables.colors.white,
		width: 250,
		borderRadius: Variables.radius.modal
	},
	button: {
		height: Variables.sizes.input,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		textAlign: "center",
		paddingLeft: 5,
		paddingRight: 5
	},
	buttonBorder: {
		borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.borderGray,
        borderBottomStyle: "solid"
	},
	buttonText: {
		fontSize: Variables.fontSizes.textCommon,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		textAlign: "center"
	},
	searchContainer: {
        marginBottom: 10
    },
	textInput: {
        fontSize: Variables.fontSizes.textCommon,
        backgroundColor: Variables.colors.white,
		borderBottomColor: Variables.colors.border,
		borderBottomWidth: 0.5,
		borderTopLeftRadius: Variables.radius.small,
		borderTopRightRadius: Variables.radius.small,
        padding: 12,
		width: 250
	},
	hidden: {
        display: "none"
	},
	filtersContainer: {
		width: 250,
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 10,
		marginBottom: 5,
		marginTop: -10,
		borderBottomColor: Variables.colors.border,
		borderBottomWidth: 0.5
	},
	filterItem: {
		marginTop: 10
	},
	filterTitleText: {
		marginBottom: 5
	},
	filterNameBox: {
		backgroundColor: Variables.colors.white,
        borderRadius: Variables.radius.small,
        borderStyle: "solid",
        borderWidth: 0.5,
		height: Variables.sizes.input,
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center",
		padding: 12,
		flexDirection: "row"
	},
	filterOptions: {
		backgroundColor: Variables.colors.backgroundOpacity,
		elevation: 5,
		zIndex: 5,
		position: "absolute",
		top: 0,
		bottom: 0,
		width: "100%",
		justifyContent: "flex-end",
	},
	filterOptionsContainer: {
		backgroundColor: Variables.colors.white,
		width: "100%"
	},
	filterOption: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 5,
		paddingLeft: 5,
		borderBottomWidth: Variables.sizes.border,
        borderBottomColor: Variables.colors.borderGray,
        borderBottomStyle: "solid"
	},
	multiselectRow: {
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center",
		flexDirection: "row"
	},
	multiselectRowIcon: {
		marginLeft: 5,
		width: 40,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		alignContent: "flex-end",
	},
	buttonTextFlex: {
		flex: 1,
		textAlign: "left"
	},
	multiselectButtons: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderTopWidth: Variables.sizes.border,
		borderColor: Variables.colors.modalBorder,
		borderRadius: Variables.radius.modal,
		borderStyle: "solid"
	},
	multiselectButton: {
		width: '50%',
		borderRadius: 0,
		borderWidth: 0,
		borderColor: Variables.colors.modalBorder,
		backgroundColor: Variables.colors.white
	},
	multiselectButtonCancel: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.danger,
		fontFamily: Variables.fonts.primary,
		marginTop: 0
	},
	multiselectButtonConfirm: {
		fontSize: Variables.fontSizes.textCommon,
		color: Variables.colors.success,
		fontFamily: Variables.fonts.primary,
		marginTop: 0
	},
	multiselectButtonLeft: {
		color: Variables.colors.gray,
		borderRightWidth: Variables.sizes.borderHalf,
		borderBottomLeftRadius: Variables.radius.modal
	},
	multiselectButtonRight: {
		color: Variables.colors.danger,
		borderLeftWidth: Variables.sizes.borderHalf,
		borderBottomRightRadius: Variables.radius.modal
	},
    cursorColor: Variables.colors.cursor
};