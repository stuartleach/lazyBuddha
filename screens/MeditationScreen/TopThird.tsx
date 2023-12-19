import {BigStartButtonProps, TopThirdProps} from "@types";
import {StyleSheet, Text, View} from "react-native";
import {hexToRGB} from "@utils";
import React from "react";
import {topThirdStyles} from "@styles/theme";

export function BigStartButton({inProgress, toggleProgress, style}: BigStartButtonProps) {
    return (
        <View style={[topThirdStyles.startButton]}>
            <Text
                style={topThirdStyles.startButtonText}
                onPress={toggleProgress}
            >{inProgress ? "Stop" : "Start"}
            </Text>
        </View>
    );
}


export const ResetButton = (props: { reset: () => void; }) => {
    const {reset} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={reset}>Reset</Text>
        </View>
    );
}

export const PauseButton = (props: { pause: () => void; }) => {
    const {pause} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={pause}>Pause</Text>
        </View>)
}
const smallerButtonStyles = StyleSheet.create({
    button: {},
    text: {}
});

export function TopThird(props: { topThirdProps: TopThirdProps; }) {
    const {inProgress, toggleProgress, pause, reset} = props.topThirdProps;
    return (
        <View style={topThirdStyles.topThird}>
            <View style={topThirdStyles.leftHalf}>
                <BigStartButton inProgress={inProgress} toggleProgress={toggleProgress}/>
            </View>
            <View style={topThirdStyles.rightHalf}>
                <PauseButton pause={pause}/>
                <ResetButton reset={reset}/>
            </View>
        </View>
    );
}
