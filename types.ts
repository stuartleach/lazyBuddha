import React from "react";
import {ViewStyle} from 'react-native';

export interface BuddhaButtonProps {
    title: string,
    action: () => void,
    selected?: boolean,
    className?: string,
    style?: ViewStyle
}

export interface ControlsProps {
    playing: boolean;
    toggleProgress: () => void;
    reset: () => void;
    onChangeDuration: (newDuration: React.SetStateAction<number>) => void;
    onChangeSound: (newSound: React.SetStateAction<string>) => void;
    setSoundName: (value: (((prevState: {}) => {}) | {})) => void;
}

export interface CountdownProps {
    timeLeftInMilliseconds: number;
    totalMilliseconds: number;
    circleDiameter: number;
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
}

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