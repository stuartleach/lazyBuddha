import React, {useCallback, useEffect, useState} from "react";
import {View} from "react-native";
import {BottomThirdProps, MiddleThirdProps, TopThirdProps} from "@types";
import {StatusBar} from "expo-status-bar";
import {BottomThird} from "@screens/MeditationScreen/BottomThird";
import {TopThird} from "@screens/MeditationScreen/TopThird";
import {MiddleThird} from "@screens/MeditationScreen/MiddleThird";
import {fadeIn, fadeOut, loadSound, useSoundManager} from "@utils";
import {mainStyles} from "@styles";

export function MeditationScreen() {
    const [session, setSession] = useState({
        originalDuration: 2,
        duration: 2,
        started: false,
        timeLeftInMilliseconds: 120000,
        playing: false,
        soundName: "Ocean",
        circleDiameter: 250,
        resetPressed: false
    });

    const {sound, loadSound, unloadSound, fadeIn, fadeOut} = useSoundManager(session.soundName);

    useEffect(() => {
        if (sound) {
            session.playing ? fadeIn(sound) : fadeOut(sound);
        }
    }, [session.playing, sound, fadeIn, fadeOut]);

    useEffect(() => {
        // Call loadSound and handle any potential promise rejections
        loadSound().catch(e => console.warn("Error loading sound:", e));

        // Return a cleanup function that does not return a promise
        return () => {
            unloadSound().catch(e => console.warn("Error unloading sound:", e));
        };
    }, [loadSound, unloadSound]);

    const handleDurationChange = (newDuration: number) => {
        setSession(prev => ({
            ...prev,
            originalDuration: newDuration,
            duration: newDuration,
            timeLeftInMilliseconds: newDuration * 60000
        }));
    };

    const startSession = useCallback(() => {
        setSession(prev => ({...prev, started: true, playing: true}));
    }, []);

    const pauseSession = useCallback(() => {
        setSession(prev => ({...prev, playing: false}));
    }, []);

    const resumeSession = useCallback(() => {
        setSession(prev => ({...prev, playing: true}));
    }, []);

    const resetSession = useCallback(() => {
        setSession(prev => ({
            ...prev,
            playing: false,
            duration: prev.originalDuration,
            timeLeftInMilliseconds: prev.originalDuration * 60000,
            resetPressed: true
        }));
    }, []);

    const endSession = useCallback(() => {
        pauseSession();
        console.log("End session. Show some stats");
        setTimeout(resetSession, 1000); // Delay for reset to simulate end session process
    }, [pauseSession, resetSession]);

    const toggleProgress = () => {
        setSession(prevSession => ({
            ...prevSession,
            playing: !prevSession.playing,
            resetPressed: prevSession.playing ? false : prevSession.resetPressed
        }));
    };

    const setTimeLeftInMilliseconds = (newTime: any) => {
        setSession(prevSession => ({
            ...prevSession,
            timeLeftInMilliseconds: newTime
        }));
    };

    const setSoundName = (newSoundName: any) => {
        setSession(prevSession => ({
            ...prevSession,
            soundName: newSoundName
        }));
    };

    const topThirdProps: TopThirdProps = {
        playing: session.playing,
        startSession: startSession,
        pauseSession: pauseSession,
        resumeSession: resumeSession,
        endSession: endSession,
        resetSession: resetSession,
        testID: "top-third"
    };

    const middleThirdProps: MiddleThirdProps = {
        height: session.circleDiameter,
        duration: session.duration,
        playing: session.playing,
        timeLeftInMilliseconds: session.timeLeftInMilliseconds,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        started: session.started,
        testID: "middle-third"
    };

    const bottomThirdProps: BottomThirdProps = {
        reset: resetSession,
        playing: session.playing,
        toggleProgress: toggleProgress,
        setDuration: (newDuration: any) => setSession(prev => ({...prev, duration: newDuration})),
        duration: session.duration,
        onChangeDuration: handleDurationChange,
        setSoundName: setSoundName,
        soundName: session.soundName,
        onChangeSound: (newSound: any) => setSoundName(newSound),
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        testID: "bottom-third"
    };


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

