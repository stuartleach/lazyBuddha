import React, {useEffect, useRef, useState} from "react";
import {CountdownProps, MeditationTimerProps} from "@types";
import {Text, View} from "react-native";
import {Circle, Svg} from "react-native-svg";
import {StatusBar} from "expo-status-bar";
import {BigStartButton, ControlPanel, PauseButton, ResetButton} from "./ControlPanel";
import {StyleSheet} from "react-native";
import {fadeIn, fadeOut, hexToRGB, loadSound, timer} from "@utils";
import {fontTheme, styles, theme} from "@styles";


const MeditationTimer: React.FC<MeditationTimerProps> = (props) => {
    const intervalRef = useRef<{ start: () => void, pause: () => void, resume: () => void } | null>(null);
    const {duration, playing, circleDiameter, setTimeLeftInMilliseconds, timeLeftInMilliseconds, started} = props;
    useEffect(() => {
        setTimeLeftInMilliseconds(duration * 60000);
    }, [duration]);

    useEffect(() => {
        const handleTimer = () => {
            if (playing) {
                if (intervalRef.current) {
                    intervalRef.current.pause();
                }
                intervalRef.current = timer(duration, setTimeLeftInMilliseconds);
                intervalRef.current.start();
            } else {
                if (intervalRef.current) {
                    intervalRef.current.pause();
                }
            }
        };
        handleTimer();
        return () => {
            if (intervalRef.current) intervalRef.current.pause();
        };
    }, [playing, duration, started]);


    return (
        <View style={{justifyContent: "flex-start", alignContent: "flex-start", height: "100%"}}>
            <Countdown
                timeLeftInMilliseconds={timeLeftInMilliseconds}
                totalMilliseconds={duration * 60000}
                circleDiameter={circleDiameter}
                playing={playing}
            />
        </View>
    );
}
const Countdown: React.FC<CountdownProps> = (props) => {
    const {timeLeftInMilliseconds, totalMilliseconds, circleDiameter, playing} = props;
    const progress = totalMilliseconds ? timeLeftInMilliseconds / totalMilliseconds : 0;
    const radius = circleDiameter / 2 - 20;
    const [strokeWidth, setStrokeWidth] = useState(10);
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);
    const minutes = Math.floor(timeLeftInMilliseconds / 60000);
    const seconds = Math.floor((timeLeftInMilliseconds % 60000) / 1000);
    const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Svg height={circleDiameter} width={circleDiameter} viewBox={`0 0 220 220`}>
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill={hexToRGB(theme.textTheme, 0.1)}
                    stroke={theme.backgroundTheme}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill={hexToRGB(theme.textTheme, 0.1)}
                    stroke={theme.textTheme}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 110 110)`}
                />
            </Svg>
            <View style={{
                position: "absolute",
            }}>
                <Text style={timeDisplayStyle.text}>{displayTime}</Text>
            </View>
        </View>
    );
}

const timeDisplayStyle = StyleSheet.create({
    text: {
        // color: 'white',
        fontFamily: fontTheme.light,
        color: theme.textTheme,
        textAlign: "center",
        fontSize: 36,
        fontWeight: 'bold',
    }
})


function TopThird(props: { topThirdProps: { inProgress: any; toggleProgress: any; pause: any; reset: any; }; }) {
    const {inProgress, toggleProgress, pause, reset} = props.topThirdProps;
    return <View style={{
        top: "15%",
        justifyContent: "space-between",
    }}><View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "40%",
    }}>
        <BigStartButton inProgress={inProgress} style={{
            height: "75%", justifyContent: "center",
        }} toggleProgress={toggleProgress}/>
        <View style={{
            flexDirection: "column",
            justifyContent: "space-between",
            width: "90%",
        }}>
            <PauseButton pause={pause}/>
            <ResetButton reset={reset}/>
        </View>
    </View>
    </View>;
}

function MiddleThird(props: {
    middleThirdProps: {
        height: any;
        duration: any;
        playing: any;
        timeLeftInMilliseconds: any;
        setTimeLeftInMilliseconds: any;
        started: any;
    }
}) {

    const {
        height,
        duration,
        playing,
        timeLeftInMilliseconds,
        setTimeLeftInMilliseconds,
        started
    } = props.middleThirdProps;
    return <View style={[{
        position: "absolute",
        top: "40%",
    }, {height: height}]}>
        <MeditationTimer duration={duration} playing={playing} circleDiameter={height}
                         setTimeLeftInMilliseconds={setTimeLeftInMilliseconds}
                         timeLeftInMilliseconds={timeLeftInMilliseconds} started={started}/>
    </View>;
}

function BottomThird(props: {
    bottomThirdProps: {
        reset: any;
        inProgress: any;
        toggleProgress: any;
        onChangeDuration: any;
        setSoundName: any;
        onChangeSound: any;
    };
}) {
    const {reset, inProgress, toggleProgress, onChangeDuration, setSoundName, onChangeSound} = props.bottomThirdProps;
    return <View style={{
        position: "absolute",
        bottom: "14%",
    }}>
        <ControlPanel reset={reset} inProgress={inProgress}
                      toggleProgress={toggleProgress}
                      onChangeDuration={onChangeDuration} setSoundName={setSoundName}
                      onChangeSound={onChangeSound}/>
    </View>;
}

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

    const topThirdProps = {
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

    const middleThirdProps = {
        height: circleDiameter,
        duration: duration,
        playing: playing,
        timeLeftInMilliseconds: timeLeftInMilliseconds,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        started: started
    };

    const bottomThirdProps = {
        reset: reset,
        inProgress: playing,
        toggleProgress: () => setPlaying(!playing),
        onChangeDuration: handleDurationChange,
        soundName: setSoundName,
        onChangeSound: handleSoundChange,
        setTimeLeftInMilliseconds: setTimeLeftInMilliseconds,
        setSoundName: setSoundName,
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundTheme,
            alignItems: 'center',
            width: "100%",
        }}>
            <StatusBar style="auto"/>
            <TopThird topThirdProps={topThirdProps}/>
            <MiddleThird middleThirdProps={middleThirdProps}/>
            <BottomThird bottomThirdProps={bottomThirdProps}/>
        </View>
    );
}

