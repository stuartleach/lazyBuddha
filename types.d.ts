import React from "react";
import {ViewStyle} from 'react-native';


interface BuddhaButtonProps {
    title: string,
    action: () => void,
    selected?: boolean,
    className?: string,
    style?: ViewStyle
}

interface ControlsProps {
    playing: boolean;
    toggleProgress: () => void;
    reset: () => void;
    onChangeDuration: (newDuration: React.SetStateAction<number>) => void;
    onChangeSound: (newSound: React.SetStateAction<string>) => void;
    setSoundName: (value: (((prevState: {}) => {}) | {})) => void;
}

interface CountdownProps {
    timeLeftInMilliseconds: number;
    totalMilliseconds: number;
    circleDiameter: number;
    playing: boolean;
}

interface MeditationTimerProps {
    started: boolean;
    duration: number;
    playing: boolean;
    circleDiameter: number;
    timeLeftInMilliseconds: number;
    setTimeLeftInMilliseconds: React.Dispatch<React.SetStateAction<number>>;
    testID: string;
}

interface MiddleThirdProps {
    height: any;
    duration: any;
    playing: any;
    timeLeftInMilliseconds: any;
    setTimeLeftInMilliseconds: (value: number) => void; // Ensure this is defined as a function
    started: any;
    testID: string
}

interface BottomThirdProps {
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
}

interface TopThirdProps {
    playing: boolean;
    startSession: () => void;
    pauseSession: () => void;
    resumeSession: () => void;
    resetSession: () => void;
    endSession: () => void;
    testID: string
}