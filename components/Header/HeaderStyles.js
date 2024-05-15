import Variables from "../../assets/styles/Variables";

export default {
    background: {
        backgroundColor: Variables.colors.header,
    },
    color: Variables.colors.white,
    iconColorBackground: Variables.colors.transparent,
    logoContainer: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 40,
        resizeMode: "contain"
    },
    leftImage: {
        height: 100,
        width: 70,
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 5
    },
    leftImageIcon: {
        marginLeft: 10
    },
    rightImage: {
        height: 100,
        width: 70,
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 5
    },
    rightImageIcon: {
        marginRight: 10
    },
    opacityIcon: {
        opacity: 0.5
    },
    backIconSize: 26,
    backIconColor: Variables.colors.white,
    homeIconSize: 35,
    homeIconColor: Variables.colors.secondary,
    menuIconSize: 30,
    menuIconColor: Variables.colors.white,
    userPhoto: {
		width: 30,
		height: 30,
		borderRadius: Variables.radius.circle,
		resizeMode: "cover",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center"
	},
	noUserPhoto: {
		resizeMode: "contain"
	}
};