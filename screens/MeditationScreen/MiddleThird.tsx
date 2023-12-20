import React, {useEffect, useRef, useState} from "react";
import {CountdownProps, MeditationTimerProps, MiddleThirdProps} from "@types";
import {hexToRGB, timer} from "@utils";
import {Text, View} from "react-native";
import {Circle, Svg} from "react-native-svg";
import {theme} from "@styles";
import {middleThirdStyles} from "@styles/theme";
import {useTimerManager} from "@utils/hooks";

const MeditationTimer: React.FC<MeditationTimerProps> = ({
                                                             timeLeftInMilliseconds,
                                                             duration,
                                                             circleDiameter,
                                                         }) => {

    return (
        <View style={middleThirdStyles.countdown}>
            <Countdown
                timeLeftInMilliseconds={timeLeftInMilliseconds}
                totalMilliseconds={duration * 60000}
                circleDiameter={circleDiameter}
            />
        </View>
    );
};
const Countdown: React.FC<CountdownProps> = (props) => {
    const {timeLeftInMilliseconds, totalMilliseconds, circleDiameter} = props;
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

export const MiddleThird: React.FC<{ middleThirdProps: MiddleThirdProps }> = ({middleThirdProps}) => {
    const {height, duration, playing, started, timeLeftInMilliseconds} = middleThirdProps;

    return (
        <View style={[middleThirdStyles.middleThird, {height}]}>
            <View style={middleThirdStyles.smallContainer}>
                <MeditationTimer
                    duration={duration}
                    circleDiameter={height}
                    started={started}
                    timeLeftInMilliseconds={timeLeftInMilliseconds}
                    testID="meditation-timer"
                />
            </View>
        </View>
    );
};