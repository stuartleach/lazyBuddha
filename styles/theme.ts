import {StyleSheet} from "react-native";
import {hexToRGB} from "@/utils/utils";


const themes = {
    "ocean": {
        backgroundRaw: "#46A9CA",
        backgroundAltRaw: "#38BAF0",
        textRaw: "#1A142F",
        buttonBackgroundRaw: "#81C7DD",
        accentRaw: "#FEFADC",
    },
    "forest": {
        backgroundRaw: "#2B2D42",
        backgroundAltRaw: "#1C1F2B",
        textRaw: "#8D99AE",
        buttonBackgroundRaw: "#EF233C",
        accentRaw: "#D90429",
    },
    "fire": {
        backgroundRaw: "#FFBA08",
        backgroundAltRaw: "#FAA307",
        textRaw: "#03071E",
        buttonBackgroundRaw: "#F48C06",
        accentRaw: "#E85D04",
    },
    "wind": {
        backgroundRaw: "#ffffff",
        backgroundAltRaw: "#d2d2d2",
        textRaw: "#232323",
        buttonBackgroundRaw: "#e5e5e5",
        accentRaw: "#968a8a",
    },
    "sky": {
        backgroundRaw: "#40719b",
        backgroundAltRaw: "#0D3B66",
        textRaw: "#ffffff",
        buttonBackgroundRaw: "#406e95",
        accentRaw: "#5367a1",
    },
    "whiteNoise": {
        backgroundRaw: "#ffffff",
        backgroundAltRaw: "#ffffff",
        textRaw: "#000000",
        buttonBackgroundRaw: "#cb9595",
        accentRaw: "#8d4c65",
    },
    "cafe" : {
        backgroundRaw: "#726f61",
        backgroundAltRaw: "#3f2a2a",
        textRaw: "#efeeef",
        buttonBackgroundRaw: "#75665c",
        accentRaw: "#ffedcd",
    }
}

const themeSelection = "ocean";

export const activeColorsRaw = {
    backgroundRaw: themes[themeSelection].backgroundRaw,
    backgroundAltRaw: themes[themeSelection].backgroundAltRaw,
    textRaw: themes[themeSelection].textRaw,
    buttonBackgroundRaw: themes[themeSelection].buttonBackgroundRaw,
    accentRaw: themes[themeSelection].accentRaw,
}

export const activeTheme = {
    backgroundRaw: activeColorsRaw.backgroundRaw,
    backgroundAltRaw: activeColorsRaw.backgroundAltRaw,
    buttonBackgroundRaw: activeColorsRaw.buttonBackgroundRaw,
    backgroundTheme: hexToRGB(activeColorsRaw.backgroundRaw, 1),
    textTheme: activeColorsRaw.textRaw,
    fontFamily: "Lato",
    buttonBackground: hexToRGB(activeColorsRaw.buttonBackgroundRaw, 0.5),
    accentTheme: hexToRGB(activeColorsRaw.accentRaw, 0.1),
}

export const fontTheme = {
    bold: activeTheme.fontFamily + "-Bold",
    regular: activeTheme.fontFamily + "-Regular",
    light: activeTheme.fontFamily + "-Light",
    thin: activeTheme.fontFamily + "-Thin",
    medium: activeTheme.fontFamily + "-Medium",
    semiBold: activeTheme.fontFamily + "-SemiBold",
    extraBold: activeTheme.fontFamily + "-ExtraBold",
    black: activeTheme.fontFamily + "-Black",
}
export const gradientColors = {
    colors: [activeColorsRaw.backgroundRaw, activeColorsRaw.backgroundAltRaw, activeTheme.accentTheme]
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
        height: "95%",
        // padding: 10,
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 10,
    }
})

export const controlPanelStyles = StyleSheet.create({
    controlPanelContainer: {
        width: "100%",
        borderRadius: 10,
        // flex: 1,
        height: "30%",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    smallContainer: {
        backgroundColor: activeTheme.accentTheme,
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
        backgroundColor: activeTheme.buttonBackground,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    startButtonText: {
        textAlign: 'center',
        justifyContent: "center",
        fontFamily: fontTheme.black,
        color: activeTheme.textTheme,
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
        backgroundColor: activeTheme.buttonBackground,
    },
    smallButtonText: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: activeTheme.textTheme,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export const meditationTimerStyles = StyleSheet.create({
    meditationTimerContainer: {
        // flex: 1,
        borderRadius: 1000,
        top: "35%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
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
        // color: hexToRGB(activeColorsRaw.textRaw, 0.5),
        color: activeColorsRaw.textRaw,
        textAlign: "center",
        fontSize: 36,
    },
});

export const configPanelStyles = StyleSheet.create({
    configPanelContainer: {
        borderRadius: 10,
        width: "100%",
        // flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "absolute",
        bottom: 0,
        height: "30%",
        alignItems: "center",
    },
    smallContainer: {
        backgroundColor: activeTheme.accentTheme,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1,
        margin: 10,
        height: "100%",
    },
    selectionMenuRows: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: activeTheme.buttonBackground,
        borderRadius: 10,
        height: "100%",
        zIndex: 10,
        justifyContent: "space-between",
        // marginVertical: 10,
    },
    selectionMenuColumns: {
        flexDirection: 'column',
        marginHorizontal: 10,
        flex: 1,
        height: "100%",
        width: "80%",
        justifyContent: "space-between"
    },

    smaller: {
        // flexDirection: "column",
        // justifyContent: "center",
        flex: 1,
        margin: 10,
    },

    buttonContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: activeTheme.buttonBackground,
        borderColor: hexToRGB(activeTheme.textTheme, 0.1),
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: activeTheme.textTheme,
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