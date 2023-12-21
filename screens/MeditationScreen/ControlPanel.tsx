import React from 'react'
import {Text, View} from 'react-native'
import {ControlPanelProps} from '@/types'
import {controlPanelStyles} from '@/styles'

export interface ControlsProps {
    playing: boolean;
    toggleProgress: () => void;
    reset: () => void;
    onChangeDuration: (newDuration: React.SetStateAction<number>) => void;
    onChangeSound: (newSound: React.SetStateAction<string>) => void;
    setSoundName: (value: (((prevState: {}) => {}) | {})) => void;
}

export function StartButton(props: {
    startSession: () => void
    pauseSession: () => void
    playing: boolean
    testID: string
    started: boolean
    resumeSession: () => void
}) {
    const {startSession, playing, pauseSession, started, resumeSession} = props
    return (
        <View style={[controlPanelStyles.startButton]}>
            {!playing ? (
                !started ? (
                    <Text style={controlPanelStyles.startButtonText} onPress={startSession}>
                        Start
                    </Text>
                ) : (
                    <Text style={controlPanelStyles.startButtonText} onPress={resumeSession}>
                        Resume
                    </Text>
                )
            ) : (
                <Text style={controlPanelStyles.startButtonText} onPress={pauseSession}>
                    Pause
                </Text>
            )}
        </View>
    )
}

export const ControlButton = (props: { onPress: () => void; testID: string; label: string }) => {
    const {onPress, label, testID} = props
    return (
        <View style={controlPanelStyles.smallButton}>
            <Text style={controlPanelStyles.smallButtonText} onPress={onPress}>
                {label}
            </Text>
        </View>
    )
}

export function ControlPanel(props: { controlPanelProps: ControlPanelProps }) {
    const {playing, pauseSession, resetSession, startSession, resumeSession, started, endSession} =
        props.controlPanelProps

    return (
        <View style={controlPanelStyles.controlPanelContainer}>
            <View style={controlPanelStyles.smallContainer}>
                <View style={controlPanelStyles.leftHalf}>
                    <StartButton
                        testID='big-start-button'
                        playing={playing}
                        pauseSession={pauseSession}
                        started={started}
                        startSession={startSession}
                        resumeSession={resumeSession}
                    />
                </View>
                <View style={controlPanelStyles.rightHalf}>
                    <ControlButton label="End" testID='end-button' onPress={endSession}/>
                    <View style={{flex: 1}}>
                        <Text> </Text>
                    </View>
                    <ControlButton label="Reset" testID='reset-button' onPress={resetSession}/>
                </View>
            </View>
        </View>
    )
}
