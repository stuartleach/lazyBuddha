import {hexToRGB} from "@utils";

export const theme = {
    backgroundTheme: "#8D97CB",
    textTheme: "#ffffff",
    fontFamily: "Lato",
    buttonBackground: hexToRGB("#fffffff", 0.1),
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
