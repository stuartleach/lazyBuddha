import React, {useEffect, useState} from "react";
import {BottomThirdProps, MiddleThirdProps, TopThirdProps} from "@types";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {BottomThird} from "@screens/MeditationScreen/BottomThird";
import {TopThird} from "@screens/MeditationScreen/TopThird";
import {MiddleThird} from "@screens/MeditationScreen/MiddleThird";
import {fadeIn, fadeOut, loadSound} from "@utils";
import {mainStyles} from "@styles";


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

    const resetSession = () => {
        setPlaying(false); // Stop the timer
        setDuration(originalDuration); // Reset duration to original duration
        setTimeLeftInMilliseconds(originalDuration * 60000); // Reset the time left to the new duration
        setResetPressed(true); // Add this line
    };

    const pauseSession = () => {
        setPlaying(false);
    };

    const startSession = () => {
        setStarted(true);
        setPlaying(true);
    }

    const endSession = () => {
        pauseSession();
        console.log("end session. show some stats")
        setTimeout(() => {
            resetSession();
        })
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
        pauseSession: pauseSession,
        resetSession: resetSession,
        endSession: endSession,
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
        reset: resetSession,
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

