import {BigStartButtonProps, TopThirdProps} from "@types";
import {Text, View} from "react-native";
import React from "react";
import {topThirdStyles} from "@styles";
import {setTimeout} from "@testing-library/react-native/build/helpers/timers";

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


export const ResetButton = (props: { resetSession: () => void; }) => {
    const {resetSession} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={resetSession}>Reset</Text>
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

export function TopThird(props: { topThirdProps: TopThirdProps; }) {
    const {inProgress, toggleProgress, pauseSession, resetSession} = props.topThirdProps;
    const endSession = () => {
        pauseSession();
        console.log("end session. show some stats")
        setTimeout(() => {
            resetSession();
        })
    }


    return (
        <View style={topThirdStyles.topThird}>
            <View style={topThirdStyles.smallContainer}>
                <View style={topThirdStyles.leftHalf}>
                    <BigStartButton inProgress={inProgress} toggleProgress={toggleProgress}/>
                </View>
                <View style={topThirdStyles.rightHalf}>
                    <PauseButton endSession={endSession}/>
                    <View style={{flex: 1}}><Text> </Text></View>
                    <ResetButton resetSession={resetSession}/>
                </View>
            </View>
        </View>
    );
}
