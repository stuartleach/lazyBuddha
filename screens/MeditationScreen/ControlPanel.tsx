import React from 'react'
import { Text, View } from 'react-native'
import { ControlPanelProps } from '@types'
import { controlPanelStyles } from '@styles'

export function StartButton(props: {
    startSession: () => void
    pauseSession: () => void
    playing: boolean
    testID: string
    started: boolean
    resumeSession: () => void
}) {
    const { startSession, playing, pauseSession, started, resumeSession } = props
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

export const ResetButton = (props: { resetSession: () => void; testID: string }) => {
    const { resetSession } = props
    return (
        <View style={controlPanelStyles.smallButton}>
            <Text style={controlPanelStyles.smallButtonText} onPress={resetSession}>
                Reset
            </Text>
        </View>
    )
}

export const EndButton = (props: { endSession: () => void; testID: string }) => {
    const { endSession } = props
    return (
        <View style={controlPanelStyles.smallButton}>
            <Text style={controlPanelStyles.smallButtonText} onPress={endSession}>
                End
            </Text>
        </View>
    )
}

export function ControlPanel(props: { controlPanelProps: ControlPanelProps }) {
    const { playing, pauseSession, resetSession, startSession, resumeSession, started, endSession } =
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
                    <EndButton testID='end-button' endSession={endSession} />
                    <View style={{ flex: 1 }}>
                        <Text> </Text>
                    </View>
                    <ResetButton testID='reset-button' resetSession={resetSession} />
                </View>
            </View>
        </View>
    )
}
