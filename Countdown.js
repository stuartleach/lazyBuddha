import React from 'react';
import {View, Text} from 'react-native';
import {Circle, Svg} from 'react-native-svg';

function Countdown(props) {

    const {timeLeftInMilliseconds, totalMilliseconds, duration, setTimeLeftInMilliseconds} = props;

    if (!timeLeftInMilliseconds) setTimeLeftInMilliseconds(0) // Ensuring a valid number

    // Calculate the progress as a fraction
    const progress = totalMilliseconds ? timeLeftInMilliseconds / totalMilliseconds : 0;

    // Circle properties
    const radius = 100;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(timeLeftInMilliseconds / 60000);
    const seconds = Math.floor((timeLeftInMilliseconds % 60000) / 1000);
    const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Svg height="220" width="220" viewBox="0 0 220 220">
                {/* Background circle */}
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="#ddd"
                    strokeWidth={strokeWidth}
                />
                {/* Foreground circle (progress) */}
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="blue"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 110 110)`}
                />
            </Svg>
            <Text style={{fontSize: 30, position: 'absolute'}}>{displayTime}</Text>
        </View>
    );
}

export default Countdown;
