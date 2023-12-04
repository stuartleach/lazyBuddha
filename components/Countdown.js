import React from 'react';
import {View, Text, Image} from 'react-native';
import {Circle, Svg} from 'react-native-svg';
import Flower from "../assets/Flower.png";

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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            {/* <Svg height="220" width="220" viewBox="0 0 220 220">
                 Background circle
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                />
                 Foreground circle (progress)
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="black"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 110 110)`}
                />
            </Svg>*/}

            <Image
                source={Flower} // Set the source of the background image
                resizeMode={'contain'}
                style={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    // height: '70%',
                    // opacity: 0.2,
                    // top: '-20%',
                    // left: '25%',
                    zIndex: -1
                }} // Set image style
                // className="absolute top-0 left-0 w-full h-full w-min"
            />

            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                {displayTime}
            </Text>
        </View>
    );
}

export default Countdown;
