import React, {useEffect, useRef} from "react";
import {Text, View} from "react-native";
import {TopThirdProps} from "@types";
import {topThirdStyles} from "@styles";
import {Simulate} from "react-dom/test-utils";
import pause = Simulate.pause;
import {LinearGradient} from "expo-linear-gradient";

export function StartButton(props: {
    startSession: () => void;
    pauseSession: () => void;
    playing: boolean;
    testID: string;
    started: boolean;
    resumeSession: () => void;
}) {
    const {startSession, playing, pauseSession, started, resumeSession} = props;
    return (
        <View
            style={[topThirdStyles.startButton]}>
            {!playing ?
                !started ?
                    <Text
                        style={topThirdStyles.startButtonText}
                        onPress={startSession}
                    >
                        Start
                    </Text>
                    :
                    <Text
                        style={topThirdStyles.startButtonText}
                        onPress={resumeSession}
                    >
                        Resume
                    </Text>

                :
                <Text
                    style={topThirdStyles.startButtonText}
                    onPress={pauseSession}
                >
                    Pause
                </Text>
            }
        </View>
    );
}

export const ResetButton = (props: { resetSession: () => void; testID: string }) => {
    const {resetSession} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={resetSession}>Reset</Text>
        </View>
    );
}

export const PauseButton = (props: { pauseSession: () => void; testID: string }) => {
    const {pauseSession} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={pauseSession}>Pause</Text>
        </View>
    );
}
export const ResumeButton = (props: { resumeSession: () => void; testID: string }) => {
    const {resumeSession} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={resumeSession}>Resume</Text>
        </View>
    );
}
export const EndButton = (props: { endSession: () => void; testID: string }) => {
    const {endSession} = props;
    return (
        <View style={topThirdStyles.smallButton}>
            <Text style={topThirdStyles.smallButtonText} onPress={endSession}>End</Text>
        </View>
    );
}

export function TopThird(props: { topThirdProps: TopThirdProps }) {
    const {playing, pauseSession, resetSession, startSession, resumeSession, started, endSession} = props.topThirdProps;


    return (
        <View style={topThirdStyles.topThird}>
            <View style={topThirdStyles.smallContainer}>
                <View style={topThirdStyles.leftHalf}>
                    <StartButton testID="big-start-button" playing={playing} pauseSession={pauseSession}
                                 started={started} startSession={startSession} resumeSession={resumeSession}/>
                </View>
                <View style={topThirdStyles.rightHalf}>
                    {/*<PauseButton testID="pause-button" pauseSession={pauseSession}/>*/}
                    <EndButton testID="end-button" endSession={endSession}/>
                    {/*<ResumeButton testID="resume-button" resumeSession={resumeSession}/>*/}
                    <View style={{flex: 1}}><Text> </Text></View>
                    <ResetButton testID="reset-button" resetSession={resetSession}/>
                </View>
            </View>
        </View>
    );
}
