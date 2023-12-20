import React, {useEffect, useRef, useState} from "react";
import {CountdownProps, MeditationTimerProps, MiddleThirdProps} from "@types";
import {hexToRGB, timer} from "@utils";
import {Text, View} from "react-native";
import {Circle, Svg} from "react-native-svg";
import {theme} from "@styles";
import {middleThirdStyles} from "@styles/theme";

const MeditationTimer: React.FC<MeditationTimerProps> = (props) => {
    const intervalRef = useRef<{ start: () => void, pause: () => void, resume: () => void } | null>(null);
    const {duration, playing, circleDiameter, setTimeLeftInMilliseconds, timeLeftInMilliseconds, started, testID: string} = props;

    useEffect(() => {
        setTimeLeftInMilliseconds(duration * 60000);
    }, [duration]);

    useEffect(() => {
        const handleTimer = () => {
            if (playing) {
                if (intervalRef.current) {
                    intervalRef.current.pause();
                }
                intervalRef.current = timer(duration, setTimeLeftInMilliseconds);
                intervalRef.current.start();
            } else {
                if (intervalRef.current) {
                    intervalRef.current.pause();
                }
            }
        };
        handleTimer();
        return () => {
            if (intervalRef.current) intervalRef.current.pause();
        };
    }, [playing, duration, started]);

    return (
        <View style={middleThirdStyles.countdown}>
            <Countdown
                timeLeftInMilliseconds={timeLeftInMilliseconds}
                totalMilliseconds={duration * 60000}
                circleDiameter={circleDiameter}
                playing={playing}
            />
        </View>
    );
}
const Countdown: React.FC<CountdownProps> = (props) => {
    const {timeLeftInMilliseconds, totalMilliseconds, circleDiameter, playing} = props;
    const progress = totalMilliseconds ? timeLeftInMilliseconds / totalMilliseconds : 0;
    const radius = circleDiameter / 2 - 20;
    const [strokeWidth, setStrokeWidth] = useState(10);
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);
    const minutes = Math.floor(timeLeftInMilliseconds / 60000);
    const seconds = Math.floor((timeLeftInMilliseconds % 60000) / 1000);
    const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Svg height={circleDiameter} width={circleDiameter} viewBox={`0 0 220 220`}>
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill={hexToRGB(theme.textTheme, 0.1)}
                    stroke={theme.backgroundTheme}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    // fill={hexToRGB(theme.textTheme, 0.1)}
                    fill={theme.accentTheme}
                    stroke={theme.textTheme}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 110 110)`}
                />
            </Svg>
            <View style={{
                position: "absolute",
            }}>
                <Text style={middleThirdStyles.timeDisplay}>{displayTime}</Text>
            </View>
        </View>
    );
}

export const MiddleThird = (props: { middleThirdProps: MiddleThirdProps }) => {
    const {
        height,
        duration,
        playing,
        setTimeLeftInMilliseconds,
        timeLeftInMilliseconds,
        started
    } = props.middleThirdProps;
    return <View style={[middleThirdStyles.middleThird, {height: height}]}>
        <View style={middleThirdStyles.smallContainer}>
            <MeditationTimer duration={duration} playing={playing} circleDiameter={height} testID="meditation-timer"

                             setTimeLeftInMilliseconds={setTimeLeftInMilliseconds}
                             timeLeftInMilliseconds={timeLeftInMilliseconds} started={started}/>
        </View>
    </View>
}
