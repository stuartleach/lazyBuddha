import React, {useEffect, useState} from 'react'
import {Animated, Pressable, Text, View} from 'react-native'
import {controlPanelStyles} from '@/styles/theme'

export function StartButton(props: {
    startSession: () => void
    pauseSession: () => void
    playing: boolean
    testID: string
    started: boolean
    resumeSession: () => void
}) {
    // const {startSession, playing, pauseSession, started, resumeSession} = props

    const {startSession, playing, pauseSession, started, resumeSession} = props

    return (
        <View style={[controlPanelStyles.startButton]}>
            {!playing ? (
                !started ? (
                    <Pressable style={{...controlPanelStyles.startButtonText, width: "100%", height: "100%"}}
                               onPress={startSession}>
                        <Text style={controlPanelStyles.startButtonText}>
                            Start
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable style={{...controlPanelStyles.startButtonText, width: "100%", height: "100%"}}
                               onPress={resumeSession}>
                        <Text style={controlPanelStyles.startButtonText}>
                            Resume
                        </Text>
                    </Pressable>
                )
            ) : (
                <Pressable style={{...controlPanelStyles.startButtonText, width: "100%", height: "100%"}}
                           onPress={pauseSession}>
                    <Text style={controlPanelStyles.startButtonText}>
                        Pause
                    </Text>
                </Pressable>
            )}
        </View>
    )
}

export const ControlButton = (props: { onPress: () => void; testID: string; label: string }) => {
    const {onPress, label, testID} = props
    return (
        // <View style={controlPanelStyles.smallButton}>
            <Pressable style={{...controlPanelStyles.smallButton, width: "100%", height: "100%"}} onPress={onPress}>
                <Text style={controlPanelStyles.smallButtonText}>
                    {label}
                </Text>
            </Pressable>
        // </View>
    )
}

export function ControlPanel(controlPanelProps: {
    playing: any;
    pauseSession: any;
    resetSession: any;
    startSession: any;
    resumeSession: any;
    started: any;
    endSession: any;
    controlPanelIsVisible: any
}) {
    const {
        playing,
        pauseSession,
        resetSession,
        startSession,
        resumeSession,
        started,
        endSession,
        controlPanelIsVisible
    } =
        controlPanelProps

    const [opacityAnim] = useState(new Animated.Value(1)) // Start fully visible

    useEffect(() => {
        if (!controlPanelIsVisible) {
            Animated.timing(opacityAnim, {
                toValue: 0, // Animate to invisible
                duration: 150,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(opacityAnim, {
                toValue: 1, // Animate back to fully visible
                duration: 450,
                useNativeDriver: true,
            }).start()
        }
    }, [controlPanelIsVisible, opacityAnim])

    return (
        <Animated.View style={[controlPanelStyles.controlPanelContainer, {opacity: opacityAnim}]}>
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
                    <View style={{flex: 0.5}}>
                        <Text> </Text>
                    </View>
                    <ControlButton label="Reset" testID='reset-button' onPress={resetSession}/>
                </View>
            </View>
        </Animated.View>
    )
}
