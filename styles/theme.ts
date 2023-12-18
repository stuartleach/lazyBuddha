import {StyleSheet} from "react-native";

export const theme = {
    backgroundTheme: "#706D9F",
    textTheme: "white",
    fontFamily: "Lato",
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundTheme,
        // backgroundColor: '#ADACE9',
        // backgroundColor: "black",
        alignItems: 'center'
    },
    header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        // margin: "20%"
        marginTop: "23%",
    },
    headerText: {
        color: '#17021A',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    timer: {
        alignItems: 'center',
        position: "absolute",
        top: "33%",
    },
})