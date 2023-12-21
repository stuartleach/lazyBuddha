import React, {useCallback, useEffect, useState} from 'react'
import {View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {ConfigPanel} from '@/screens/MeditationScreen/ConfigPanel'
import {ControlPanel} from '@/screens/MeditationScreen/ControlPanel'
import {MeditationTimer} from '@/screens/MeditationScreen/MeditationTimer'
import {useSoundManager} from '@/utils'
import {mainStyles} from '@/styles'
import {useTimerManager} from '@/utils/hooks'


export interface ControlPanelProps {
    playing: boolean;
    started: boolean;
    startSession: () => void;
    pauseSession: () => void;
    resumeSession: () => void;
    resetSession: () => void;
    endSession: () => void;
    testID: string
}

export interface MeditationTimerProps {
    height: any;
    duration: any;
    playing: any;
    timeLeftInMilliseconds: any;
    isRunning: boolean;
    setTimeLeftInMilliseconds: (value: number) => void; // Ensure this is defined as a function
    started: any;
    timerIsVisible: boolean;
    testID: string
}

export interface ConfigPanelProps {
    reset: () => void;
    playing: boolean;
    toggleProgress: () => void;
    duration: number;
    onChangeDuration: (newDuration: React.SetStateAction<number>) => void;
    setDuration: (value) => void;
    soundName: string;
    setSoundName: (soundName: string) => void;
    onChangeSound: (selectedSound: string) => void;
    setTimeLeftInMilliseconds: (value: number) => void; // Ensure this is defined as a function
    testID: string
    timerIsVisible: boolean;
    setTimerIsVisible: (value: boolean) => void;
    onChangeSettings: (value: boolean) => void;
}


export function MeditationScreen() {
    const initialDuration = 2
    const time = useTimerManager(initialDuration)
    const [session, setSession] = useState({
        originalDuration: 2,
        duration: 2,
        started: false,
        timeLeftInMilliseconds: initialDuration * 60000,
        playing: false,
        soundName: 'Ocean',
        circleDiameter: 250,
        resetPressed: false,
    })

    const [timerIsVisible, setTimerIsVisible] = useState(true)

    const {sound, loadSound, unloadSound, fadeIn, fadeOut} = useSoundManager(session.soundName)

    useEffect(() => {
        return time.cleanup
    }, [time.cleanup])

    /*    useEffect(() => {
        loadSound().catch(e => console.warn("Error loading sound:", e));
        return () => {
            unloadSound().catch(e => console.warn("Error unloading sound:", e));
        }
    }, [loadSound, unloadSound]);*/

    useEffect(() => {
        if (sound) {
            session.playing ? fadeIn() : fadeOut()
        }
    }, [session.playing, sound, fadeIn, fadeOut])

    const handleDurationChange = useCallback((newDuration: number) => {
        console.log('Duration changed to', newDuration)
        setSession((prev) => ({
            ...prev,
            originalDuration: newDuration,
            duration: newDuration,
            timeLeftInMilliseconds: newDuration * 60000,
        }))
    }, [])

    const startSession = useCallback(() => {
        console.log('Start session')
        time.startTimer()
        setSession((prev) => ({...prev, started: true, playing: true}))
    }, [])

    const pauseSession = useCallback(() => {
        time.pauseTimer()
        console.log('Pause session')
        setSession((prev) => ({...prev, playing: false}))
    }, [])

    const resumeSession = useCallback(() => {
        time.resumeTimer()
        console.log('Resume session')
        setSession((prev) => ({...prev, playing: true}))
    }, [])

    const resetSession = useCallback(() => {
        time.pauseTimer()
        time.resetTimer()
        setSession((prev) => ({
            ...prev,
            started: false,
            playing: false,
            duration: prev.originalDuration,
            timeLeftInMilliseconds: prev.originalDuration * 60000,
            resetPressed: true,
        }))
    }, [])

    const endSession = useCallback(() => {
        // pauseSession();
        console.log('End session. Show some stats')
        resetSession()
    }, [pauseSession, resetSession])

    const toggleProgress = () => {
        setSession((prevSession) => ({
            ...prevSession,
            playing: !prevSession.playing,
            resetPressed: prevSession.playing ? false : prevSession.resetPressed,
        }))
    }
    const setTimeLeftInMilliseconds = (newTime: any) => {
        setSession((prevSession) => ({
            ...prevSession,
            timeLeftInMilliseconds: newTime,
        }))
    }
    const setSoundName = (newSoundName: any) => {
        setSession((prevSession) => ({
            ...prevSession,
            soundName: newSoundName,
        }))
    }

    const controlPanelProps: ControlPanelProps = {
        playing: session.playing,
        started: session.started,
        startSession: startSession,
        pauseSession: pauseSession,
        resumeSession: resumeSession,
        endSession: endSession,
        resetSession: resetSession,
        testID: 'control-panel',
    }

    const meditationTimerProps: MeditationTimerProps = {
        height: session.circleDiameter,
        duration: session.duration,
        playing: session.playing,
        timeLeftInMilliseconds: session.timeLeftInMilliseconds,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        started: session.started,
        testID: 'meditation-timer',
        isRunning: time.isRunning,
        timerIsVisible: timerIsVisible,
    }

    const handleSettingsChange = () => {
        console.log('Settings changed to something blah blah')
    }

    const configPanelProps: ConfigPanelProps = {
        reset: resetSession,
        playing: session.playing,
        toggleProgress: toggleProgress,
        setDuration: handleDurationChange,
        duration: session.duration,
        onChangeDuration: handleDurationChange,
        setSoundName: setSoundName,
        soundName: session.soundName,
        onChangeSound: setSoundName,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        testID: 'config-panel',
        timerIsVisible: timerIsVisible,
        setTimerIsVisible: setTimerIsVisible,
        onChangeSettings: handleSettingsChange
    }

    return (
        <View style={mainStyles.main}>
            <View style={mainStyles.container}>
                <StatusBar style='auto'/>
                <ControlPanel controlPanelProps={controlPanelProps}/>
                <MeditationTimer meditationTimerProps={meditationTimerProps}/>
                <ConfigPanel configPanelProps={configPanelProps}/>
            </View>
        </View>
    )
}
