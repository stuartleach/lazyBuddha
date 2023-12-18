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
    inProgress: boolean;
}

interface MeditationTimerProps {
    duration: number;
    inProgress: boolean;
    circleDiameter: number;
    timeLeftInMilliseconds: number;
    setTimeLeftInMilliseconds: React.Dispatch<React.SetStateAction<number>>;
}


