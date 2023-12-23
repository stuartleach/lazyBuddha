import React from "react";
import {Pressable} from "react-native";

type CustomPressableProps = {
    children: React.ReactNode;
    style?: any;
    onPress: () => void;
    key?: number;
};
export const CustomPressable: React.FC<CustomPressableProps> = ({children, onPress, style}) => {
    return (
        <Pressable style={style} onPress={onPress}>
            {children}
        </Pressable>
    );
};