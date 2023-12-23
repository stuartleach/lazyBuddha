import React, {useCallback, useEffect, useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import {ConfigPanel} from '@/screens/MeditationScreen/ConfigPanel'
import {ControlPanel} from '@/screens/MeditationScreen/ControlPanel'
import {MeditationTimer} from '@/screens/MeditationScreen/MeditationTimer'
import {useSoundManager} from '@/utils/soundHooks'
import {fontTheme, mainStyles} from '@/styles/theme'
import {useTimerManager} from "@/utils/timerHooks";
import {AVPlaybackSource} from "expo-av"
import {Audio} from "expo-av";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import {Text, Button, View, Pressable} from "react-native";




export function MeditationScreen() {
    const initialDuration = 2; // in minutes
    const {
         timeLeftInMilliseconds,
         isRunning,
         startTimer,
         pauseTimer,
         resetTimer,
         changeDuration,
     } = useTimerManager(initialDuration);

     const [session, setSession] = useState({
         originalDuration: initialDuration,
         playing: false,
         soundName: 'Ocean',
         circleDiameter: 250,
         resetPressed: false,
     });

     const [timerIsVisible, setTimerIsVisible] = useState(true);
     const [controlPanelIsVisible, setControlPanelIsVisible] = useState(true);

     const {sound, fadeIn, fadeOut} = useSoundManager(session.soundName);

    /*   useEffect(() => {
           if (session.playing) {
               fadeIn();
           } else {
               fadeOut();
           }
       }, [session.playing, fadeIn, fadeOut]);*/

        // Simplified session management functions
        const toggleSession = useCallback((play) => {
            setSession((prev) => ({...prev, playing: play}));

            if (play) {
                startTimer();
                fadeIn();
            } else {
                pauseTimer();
                fadeOut();
            }
        }, [startTimer, pauseTimer, fadeIn, fadeOut]);


        const resetSession = useCallback(() => {
            resetTimer();
            fadeOut();
            setSession((prev) => ({...prev, playing: false, resetPressed: true}));
        }, [resetTimer, fadeOut]);

        // Updated handleDurationChange
        const handleDurationChange = useCallback((newDuration: number) => {
            changeDuration(newDuration);
            setSession((prev) => ({...prev, originalDuration: newDuration}));
        }, [changeDuration]);

        // Updated setSoundName
        const setSoundName = useCallback((newSoundName: string) => {
            if (session.soundName !== newSoundName) {
                setSession((prevSession) => ({...prevSession, soundName: newSoundName}));
            }
        }, [session.soundName]);

        // Consolidating props for child components
        const controlPanelProps = {
            playing: session.playing,
            started: isRunning,
            startSession: () => toggleSession(true),
            pauseSession: () => toggleSession(false),
            resumeSession: () => toggleSession(true),
            resetSession: resetSession,
            endSession: resetSession,
            testID: 'control-panel',
            controlPanelIsVisible,
        };

        const meditationTimerProps = {
            height: session.circleDiameter,
            duration: session.originalDuration,
            playing: session.playing,
            timeLeftInMilliseconds,
            isRunning,
            started: isRunning,
            timerIsVisible,
            testID: 'meditation-timer',
        };

        const configPanelProps = {
            reset: resetSession,
            playing: session.playing,
            toggleProgress: () => toggleSession(!session.playing),
            setDuration: handleDurationChange,
            duration: session.originalDuration,
            onChangeDuration: handleDurationChange,
            setSoundName,
            soundName: session.soundName,
            onChangeSound: setSoundName,
            testID: 'config-panel',
            timerIsVisible,
            setTimerIsVisible,
            controlPanelIsVisible,
            setControlPanelIsVisible,
            onChangeSettings: () => { /!* implement settings change logic here *!/},
        };

    return (
        <View style={mainStyles.main}>
            <View style={mainStyles.container}>
                <StatusBar style='auto'/>
                <ControlPanel {...controlPanelProps} />
                <MeditationTimer {...meditationTimerProps} />
                <ConfigPanel {...configPanelProps} />
            </View>
        </View>
    );
}
