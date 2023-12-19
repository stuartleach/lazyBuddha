import {hexToRGB} from "@utils";
import {StyleSheet} from "react-native";

export const theme = {
    backgroundTheme: "#8D97CB",
    textTheme: "#ffffff",
    fontFamily: "Lato",
    // buttonBackground: hexToRGB("#fffffff", 0.1),
    buttonBackground: hexToRGB("#C9D3FF", 0.3),
    accentTheme: hexToRGB("#C9D3FF", 0.1),


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
        width: "90%",
        justifyContent: "space-between",
        borderRadius: 10,
        height: "80%",
    }
})



export const topThirdStyles = StyleSheet.create({
    topThird: {
        height: "25%", // Change this to 60% to make topThird take up 60% of the screen
        width: "100%",
        top: "0%",
        backgroundColor: theme.accentTheme,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        // position: "relative"
        position: "absolute",
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
        flex: 3,
        alignItems: "center",
        marginRight: 10,
        marginVertical: 10,
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
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontSize: 50,
        fontWeight: 'bold',
    },
    smallButton: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: theme.buttonBackground,

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



export const middleThirdStyles = StyleSheet.create({
    middleThird: {
        flex: 1,
        // height: "40%",
        // width: "40%",
        // padding: "10%",
        // backgroundColor: theme.accentTheme,
        borderRadius: 1000,
        flexDirection: "row",
        position: "absolute",
        bottom: "27%",
        justifyContent: "center",
        alignItems: "center",
    },
    countdown: {
        justifyContent: "flex-start",
        alignContent: "flex-start",
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
        backgroundColor: theme.accentTheme,
        borderRadius: 10,
        // position: "absolute",
        // height: "10%",
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        justifyContent: "flex-end",
    },
    leftHalf: {
        flex: 1,
        margin: 10,
    },
    rightHalf: {
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
        // width: "100%",
        // height: "100%",
        borderColor: hexToRGB(theme.textTheme, 0.1),
        borderStyle: "solid",
        justifyContent: "center",
    },
    startButtonText: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontSize: 50,
        fontWeight: 'bold',
    },
    smallButton: {
        // width: "100%",
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
