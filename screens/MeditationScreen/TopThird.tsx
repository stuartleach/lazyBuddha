import React, {useEffect, useRef} from "react";
import {Text, View} from "react-native";
import {TopThirdProps} from "@types";
import {topThirdStyles} from "@styles";

export function StartButton(props: { startSession: () => void; playing: boolean; testID: string }) {
    const {startSession, playing} = props;
    return (
        <View style={[topThirdStyles.startButton]}>
            <Text
                style={topThirdStyles.startButtonText}
                onPress={startSession}
            >
                {playing ? "Pause" : "Start"}
            </Text>
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
    const {playing, pauseSession, resetSession, startSession, resumeSession} = props.topThirdProps;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const endSession = () => {
        pauseSession();
        console.log("End session. Show some stats");
        timeoutRef.current = setTimeout(() => {
            resetSession();
        }, 1000); // Assuming a 1-second delay
    };

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <View style={topThirdStyles.topThird}>
            <View style={topThirdStyles.smallContainer}>
                <View style={topThirdStyles.leftHalf}>
                    <StartButton testID="big-start-button" playing={playing} startSession={startSession}/>
                </View>
                <View style={topThirdStyles.rightHalf}>
                    <PauseButton testID="pause-button" pauseSession={pauseSession}/>
                    <EndButton testID="end-button" endSession={endSession}/>
                    <ResumeButton testID="resume-button" resumeSession={resumeSession}/>
                    <View style={{flex: 1}}><Text> </Text></View>
                    <ResetButton testID="reset-button" resetSession={resetSession}/>
                </View>
            </View>
        </View>
    );
}
