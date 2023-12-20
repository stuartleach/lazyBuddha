import React, {useEffect, useRef, useState} from "react";
import {
    BigStartButtonProps,
    BottomThirdProps,
    CountdownProps,
    MeditationTimerProps,
    MiddleThirdProps,
    TopThirdProps
} from "@types";
import {Text, View} from "react-native";
import {Circle, Svg} from "react-native-svg";
import {StatusBar} from "expo-status-bar";
import {BottomThird} from "./BottomThird";
import {StyleSheet} from "react-native";
import {fadeIn, fadeOut, hexToRGB, loadSound, timer} from "@utils";
import {fontTheme, styles, theme} from "@styles";
import {TopThird} from "@screens/MeditationScreen/TopThird";
import {MiddleThird} from "@screens/MiddleThird";
import {mainStyles} from "@styles/theme";


export function Meditation() {
    const [originalDuration, setOriginalDuration] = useState(2); // New state for original duration
    const [duration, setDuration] = useState(originalDuration);
    const [started, setStarted] = useState(false); // New state for original duration
    const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState<number>(duration * 60000);
    const [playing, setPlaying] = useState(false);
    const [soundName, setSoundName] = useState("Ocean"); // Default sound is 'Ocean'
    const [sound, setSound] = useState(null);
    const [circleDiameter, setCircleDiameter] = useState(250);
    const [resetPressed, setResetPressed] = useState(false); // Add this line

    const reset = () => {
        setPlaying(false); // Stop the timer
        setDuration(originalDuration); // Reset duration to original duration
        setTimeLeftInMilliseconds(originalDuration * 60000); // Reset the time left to the new duration
        setResetPressed(true); // Add this line
    };

    const pause = () => {
        setPlaying(false);
    };

    const start = () => {
        setStarted(true);
        setPlaying(true);
    }

    const handleDurationChange = (newDuration: React.SetStateAction<number>) => {
        setOriginalDuration(newDuration);
        setDuration(newDuration);
    };

    useEffect(() => {
        loadSound(soundName).then(setSound).catch(e => console.warn(e));
        return sound ? () => sound.unloadAsync() : undefined;
    }, [soundName]);

    useEffect(() => {
        const handleSound = async () => {
            if (playing) {
                await fadeIn(sound);
            } else {
                await fadeOut(sound);
            }
        };
        handleSound().catch(e => console.warn(e));
    }, [playing, sound]);

    function handleSoundChange(selectedSound: string) {
        setSoundName(selectedSound);
    }

    const topThirdProps: TopThirdProps = {
        inProgress: playing,
        toggleProgress: () => {
            setPlaying(!playing);
            if (playing) {
                setResetPressed(false); // Add this line
            }
        },
        pause: pause,
        reset: reset
    };

    const middleThirdProps: MiddleThirdProps = {
        height: circleDiameter,
        duration: duration,
        playing: playing,
        timeLeftInMilliseconds: timeLeftInMilliseconds,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        started: started
    };

    const bottomThirdProps: BottomThirdProps = {
        reset: reset,
        inProgress: playing,
        toggleProgress: () => setPlaying(!playing),
        setDuration: setDuration,
        duration: duration,
        onChangeDuration: handleDurationChange,
        setSoundName: setSoundName,
        soundName: soundName,
        onChangeSound: handleSoundChange,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
    }


    return (
        <View style={mainStyles.main}>
            <View style={mainStyles.container}>
                <StatusBar style="auto"/>
                <TopThird topThirdProps={topThirdProps}/>
                <MiddleThird middleThirdProps={middleThirdProps}/>
                <BottomThird bottomThirdProps={bottomThirdProps}/>
            </View>
        </View>
    );
}

