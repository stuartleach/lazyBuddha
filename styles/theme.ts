import {hexToRGB} from "@utils";
import {StyleSheet} from "react-native";

export const theme = {
    backgroundTheme: "#8D97CB",
    textTheme: "#ffffff",
    fontFamily: "Lato",
    buttonBackground: "#A4AEDE",
    accentTheme: "#8F9ACD",
}

export const fontTheme = {
    bold: theme.fontFamily + "-Bold",
    regular: theme.fontFamily + "-Regular",
    light: theme.fontFamily + "-Light",
    thin: theme.fontFamily + "-Thin",
    medium: theme.fontFamily + "-Medium",
    semiBold: theme.fontFamily + "-SemiBold",
    extraBold: theme.fontFamily + "-ExtraBold",
    black: theme.fontFamily + "-Black",
}

export const mainStyles = StyleSheet.create({
    main: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        position: "absolute",
        height: "85%",
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 10,
    }
})

export const topThirdStyles = StyleSheet.create({
    topThird: {
        width: "100%",
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    smallContainer: {
        backgroundColor: theme.accentTheme,
        borderRadius: 10,
        flexDirection: "row",
        height: "70%",
        justifyContent: "space-between",
        flex: 1,
        margin: 10,
    },
    leftHalf: {
        flexDirection: "row",
        alignItems: "center",
        flex: 4,
        marginLeft: 10,
        marginVertical: 10,
    },
    rightHalf: {
        margin: 10,
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 2,
        alignItems: "center",
    },
    startButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        backgroundColor: theme.buttonBackground,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    startButtonText: {
        textAlign: 'center',
        justifyContent: "center",
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontSize: 50,
        fontWeight: 'bold',
    },
    smallButton: {
        width: "100%",
        flex: 3,
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.buttonBackground,
    },
    smallButtonText: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export const middleThirdStyles = StyleSheet.create({
    middleThird: {
        flex: 1,
        borderRadius: 1000,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    },
    smallContainer: {
        borderRadius: 10,
        flexDirection: "row",
        height: "30%",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
    countdown: {
        justifyContent: "center",
        alignContent: "center",
        height: "100%"
    },
    timeDisplay: {
        fontFamily: fontTheme.regular,
        color: theme.textTheme,
        textAlign: "center",
        fontSize: 36,
        fontWeight: 'bold',
    },
    smallButton: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: theme.buttonBackground,
        borderColor: hexToRGB(theme.textTheme, 0.1),
    },
    smallButtonText: {
        paddingVertical: 15,
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export const bottomThirdStyles = StyleSheet.create({
    bottomThird: {
        borderRadius: 10,
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",

    },
    selectionMenuRows: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#939ED0",
        borderRadius: 10,
        height: "100%",
        zIndex: 10,
        justifyContent: "space-between",
        marginVertical: 10,
    },
    selectionMenuColumns: {
        flexDirection: 'column',
        marginHorizontal: 10,
        flex: 1,
        height: "100%",
        width: "80%",
        justifyContent: "space-between"
    },
    smallContainer: {
        backgroundColor: theme.accentTheme,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1,
        margin: 10,
        height: "50%",
    },
    leftHalf: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        margin: 10,
    },
    rightHalf: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        margin: 10,
    },
    startButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        backgroundColor: theme.buttonBackground,
        borderColor: hexToRGB(theme.textTheme, 0.1),
        borderStyle: "solid",
        justifyContent: "center",
    },
    smallButton: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: theme.buttonBackground,
        borderColor: hexToRGB(theme.textTheme, 0.1),
    },
    smallButtonText: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontWeight: 'bold',
        fontSize: 18,
    }
});


export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
        fontFamily: fontTheme.black,
    },

    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
        fontFamily: fontTheme.black,
    },
});