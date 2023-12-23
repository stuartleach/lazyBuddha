import React, {useEffect, useState} from 'react'
import {Animated, Text, View} from 'react-native'
import {Circle, Svg} from 'react-native-svg'
import {activeTheme} from '@/styles/theme'
import {meditationTimerStyles} from '@/styles/theme'

interface CountdownProps {
    timeLeftInMilliseconds: number;
    totalMilliseconds: number;
    circleDiameter: number;
    isRunning: boolean,
}

const Countdown: React.FC<CountdownProps> = (props) => {
    const {timeLeftInMilliseconds, totalMilliseconds, circleDiameter, isRunning} = props
    const progress = totalMilliseconds ? timeLeftInMilliseconds / totalMilliseconds : 0
    const radius = circleDiameter / 2 - 20
    const [strokeWidth, setStrokeWidth] = useState(10)
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - progress)
    const minutes = Math.floor(timeLeftInMilliseconds / 60000)
    const seconds = Math.floor((timeLeftInMilliseconds % 60000) / 1000)
    const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Svg height={circleDiameter} width={circleDiameter} viewBox={`0 0 220 220`}>
                <Circle
                    cx='110'
                    cy='110'
                    r={radius}
                    fill={activeTheme.accentTheme}
                    stroke={activeTheme.backgroundTheme}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx='110'
                    cy='110'
                    r={radius}
                    // fill={hexToRGB(theme.textTheme, 0.1)}
                    fill={activeTheme.accentTheme}
                    stroke={activeTheme.backgroundTheme}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 110 110)`}
                />
            </Svg>
            <View
                style={{
                    position: 'absolute',
                }}
            >
                <Text style={meditationTimerStyles.timeDisplay}>{displayTime}</Text>
            </View>
        </View>
    )
}

export const MeditationTimer = (meditationTimerProps: { height: any; duration: any; playing: any; started: any; timeLeftInMilliseconds: any; timerIsVisible: any; isRunning: any }) => {
    const {height, duration, playing, started, timeLeftInMilliseconds, timerIsVisible, isRunning} = meditationTimerProps
    const [opacityAnim] = useState(new Animated.Value(1)) // Start fully visible

    useEffect(() => {
        if (!timerIsVisible) {
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
    }, [timerIsVisible, opacityAnim])

    return (
        <Animated.View style={[meditationTimerStyles.meditationTimerContainer, {height}, {opacity: opacityAnim}]}>
            <View style={[meditationTimerStyles.smallContainer]}>
                <View style={meditationTimerStyles.countdown}>
                    <Countdown
                        timeLeftInMilliseconds={timeLeftInMilliseconds}
                        totalMilliseconds={duration * 60000}
                        circleDiameter={height}
                        isRunning={isRunning}
                    />
                </View>
            </View>
        </Animated.View>
    )
}
