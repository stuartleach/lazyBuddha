import React from "react";
import {ViewStyle} from 'react-native';


interface BigStartButtonProps {
    inProgress: boolean;
    toggleProgress: () => void;
    style?: ViewStyle;
}

interface BuddhaButtonProps {
    title: string,
    action: () => void,
    selected?: boolean,
    className?: string,
    style?: ViewStyle
}

interface ControlsProps {
    inProgress: boolean;
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
}

interface MiddleThirdProps {
    height: any;
    duration: any;
    playing: any;
    timeLeftInMilliseconds: any;
    setTimeLeftInMilliseconds: (value: number) => void; // Ensure this is defined as a function
    started: any;
}

interface BottomThirdProps {
    reset: () => void;
    inProgress: boolean;
    toggleProgress: () => void;
    duration: number;
    onChangeDuration: (newDuration: React.SetStateAction<number>) => void;
    setDuration: (value) => void;
    soundName: string;
    setSoundName: (soundName: string) => void;
    onChangeSound: (selectedSound: string) => void;
    setTimeLeftInMilliseconds: (value: number) => void; // Ensure this is defined as a function
}

interface TopThirdProps {
    inProgress: boolean;
    toggleProgress: () => void;
    pause: () => void;
    reset: () => void;
}