import React, {useEffect, useRef, useState} from "react";
import {CountdownProps, MeditationTimerProps} from "../../types";
import {timer} from "../../utils/timerUtils";
import {Text, View} from "react-native";
import {Circle, Svg} from "react-native-svg";
import {fadeIn, fadeOut, loadSound} from "../../utils/soundUtils";
import {StatusBar} from "expo-status-bar";
import {BigStartButton, ControlPanel, ResetButton} from "./ControlPanel";
import {StyleSheet} from "react-native";
import {fontTheme, styles, theme} from "../../styles/theme";
import {reset} from "react-native-svg/lib/typescript/lib/Matrix2D";
import {WaveLine} from "../../components/shared/WaveLine";
import {Wave} from "../../assets/audio";


const MeditationTimer: React.FC<MeditationTimerProps> = (props) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const {duration, inProgress, circleDiameter, setTimeLeftInMilliseconds, timeLeftInMilliseconds} = props;
    useEffect(() => {
        setTimeLeftInMilliseconds(duration * 60000);
    }, [duration]);

    useEffect(() => {
        const handleTimer = () => {
            if (inProgress) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = timer(duration, setTimeLeftInMilliseconds);
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        };
        handleTimer();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [inProgress, duration]); // Dependency on both inProgress and duration

    return (
        <View style={{justifyContent: "flex-start", alignContent: "flex-start", height: "100%"}}>
            <Countdown
                timeLeftInMilliseconds={timeLeftInMilliseconds}
                totalMilliseconds={duration * 60000}
                circleDiameter={circleDiameter}
                inProgress={inProgress}
            />
        </View>
    );
}
const Countdown: React.FC<CountdownProps> = (props) => {
    const {timeLeftInMilliseconds, totalMilliseconds, circleDiameter, inProgress} = props;
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
                    fill="none"
                    stroke={theme.backgroundTheme}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
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

export function Meditation() {
    const [originalDuration, setOriginalDuration] = useState(2); // New state for original duration
    const [duration, setDuration] = useState(originalDuration);
    const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState<number>(duration * 60000);
    const [inProgress, setInProgress] = useState(false);
    const [soundName, setSoundName] = useState("Ocean"); // Default sound is 'Ocean'
    const [sound, setSound] = useState(null);
    const [circleDiameter, setCircleDiameter] = useState(250);
    const handleDurationChange = (newDuration: React.SetStateAction<number>) => {
        setOriginalDuration(newDuration);
        setDuration(newDuration);
        resetTimer()
    };
    const resetTimer = () => {
        console.log("timer is being reset");
        setInProgress(false); // Stop the timer
        setDuration(originalDuration); // Reset duration to original duration
        setTimeLeftInMilliseconds(originalDuration * 60000); // Reset the time left to the new duration
    };

    useEffect(() => {
        loadSound(soundName).then(setSound).catch(e => console.log("--->loadsound error", e));
        return sound ? () => sound.unloadAsync() : undefined;
    }, [soundName]);

    useEffect(() => {
        const handleSound = async () => {
            if (inProgress) {
                await fadeIn(sound);
            } else {
                await fadeOut(sound);
            }
        };
        handleSound().then(r => console.log("handleSound()", r));
    }, [inProgress, sound]);


    function handleSoundChange(selectedSound: string) {
        setSoundName(selectedSound);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StatusBar style="auto"/>
                <BigStartButton inProgress={inProgress} toggleProgress={() => setInProgress(!inProgress)}/>
            </View>

            <View style={[styles.timer, {height: circleDiameter}]}>
                <MeditationTimer duration={duration} inProgress={inProgress} circleDiameter={circleDiameter}
                                 setTimeLeftInMilliseconds={setTimeLeftInMilliseconds}
                                 timeLeftInMilliseconds={timeLeftInMilliseconds}/>
            </View>
            <View style={{position: "relative", marginTop: -30}}>
                <ResetButton reset={resetTimer}></ResetButton>
            </View>
            <View style={{
                position: "absolute",
                bottom: "14%",
            }}>
                <ControlPanel reset={resetTimer} inProgress={inProgress}
                              toggleProgress={() => setInProgress(!inProgress)}
                              onChangeDuration={handleDurationChange} setSoundName={setSoundName}
                              onChangeSound={handleSoundChange}/>
            </View>
        </View>
    );
}

