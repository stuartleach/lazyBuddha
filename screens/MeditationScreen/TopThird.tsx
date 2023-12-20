import {BigStartButtonProps, TopThirdProps} from "@types";
import {StyleSheet, Text, View} from "react-native";
import {hexToRGB} from "@utils";
import React from "react";
import {topThirdStyles} from "@styles";

export function BigStartButton({inProgress, toggleProgress, style}: BigStartButtonProps) {
    return (
        <View style={[topThirdStyles.startButton]}>
            <Text
                style={topThirdStyles.startButtonText}
                onPress={toggleProgress}
            >{inProgress ? "Pause" : "Start"}
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

export const PauseButton = (props: { endSession: () => void; }) => {
    const {endSession} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={endSession}>End</Text>
        </View>)
}
const smallerButtonStyles = StyleSheet.create({
    button: {},
    text: {}
});

const FlexSpacer = () => <View><Text style={{lineHeight: 1}}>{"\n"}</Text></View>;

export function TopThird(props: { topThirdProps: TopThirdProps; }) {
    const {inProgress, toggleProgress, pause, reset} = props.topThirdProps;
    const endSession = () => {
        pause();
        reset();
    }

    return (
        <View style={topThirdStyles.topThird}>
            <View style={topThirdStyles.smallContainer}>
                <View style={topThirdStyles.leftHalf}>
                    <BigStartButton inProgress={inProgress} toggleProgress={toggleProgress}/>
                </View>
                <View style={topThirdStyles.rightHalf}>
                    <PauseButton endSession={endSession}/>
                    {/*<FlexSpacer />*/}
                    <View style={{flex: 1}}><Text> </Text></View>
                    <ResetButton reset={reset}/>
                </View>
            </View>
        </View>
    );
}
