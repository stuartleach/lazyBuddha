import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Countdown from './Countdown';

function MeditationTimer(props) {
    const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(props.duration * 60000);
    const { duration, inProgress } = props;
    const intervalRef = useRef(null); // Reference to store the interval ID

    useEffect(() => {
        // Adjust the initial time when the duration changes
        setTimeLeftInMilliseconds(duration * 60000);
    }, [duration]);

    useEffect(() => {
        if (inProgress) {
            // Start the timer only if inProgress is true
            intervalRef.current = timer();
        } else {
            // Clear the interval if inProgress is false
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount
    }, [inProgress]);

    function timer() {
        let elapsedMilliseconds = 0;
        const updateInterval = 50;

        const countdown = setInterval(() => {
            elapsedMilliseconds += updateInterval;
            if (elapsedMilliseconds >= duration * 60000) {
                clearInterval(countdown);
                setTimeLeftInMilliseconds(0);
            } else {
                setTimeLeftInMilliseconds(duration * 60000 - elapsedMilliseconds);
            }
        }, updateInterval);

        return countdown;
    }

    return (
        <View>
            <Countdown
                timeLeftInMilliseconds={timeLeftInMilliseconds}
                totalMilliseconds={duration * 60000}
                duration={duration}
                inProgress={inProgress}
                setTimeLeftInMilliseconds={setTimeLeftInMilliseconds}
            />
        </View>
    );
}

export default MeditationTimer;
