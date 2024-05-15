import Variables from "../../assets/styles/Variables";

export default {
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    header: {
        marginTop: 10
    },
    empty: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40
    },
    emptyText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.textCommon
    },
    body: {
        marginTop: 10,
        flex: 1
    },
    textColorLabel: {
        color: Variables.colors.gray
    },
    disabled: {
        opacity: 0.5
    },
    photos: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    photo: {
        marginBottom: 10,
        borderRadius: Variables.radius.medium,
        resizeMode: "contain",
        width: 150,
        height: 150
    },
    loading: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        resizeMode: "contain",
        borderRadius: Variables.radius.circle,
        position: "absolute",
        top: 50
    },
    labels: {
        marginTop: 5
    },
    label: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    labelText: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.titleCommon
    },
    labelValue: {
        color: Variables.colors.white,
        fontSize: Variables.fontSizes.titleCommon
    },
};