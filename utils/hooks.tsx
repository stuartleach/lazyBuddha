import {useState, useEffect, useCallback} from 'react';
import {Audio} from 'expo-av';


import Ocean from '@/assets/sounds/01_ocean.mp3';
import Sea from '@/assets/sounds/02_sea_iceland.mp3';
import Flow from '@/assets/sounds/03_flow_france.mp3';
import Wave from '@/assets/sounds/04_wave_iceland.mp3';


export const SoundTitle = {
    Ocean: Ocean,
    Sea: Sea,
    Flow: Flow,
    Wave: Wave,
};

export const useSoundManager = (soundName: string) => {
    const [sound, setSound] = useState(null);

    // Function to load sound
    const loadSound = useCallback(async () => {
        console.log(`Loading sound: ${soundName}`);
        const {sound: newSound} = await Audio.Sound.createAsync(SoundTitle[soundName]);
        setSound(newSound);
    }, [soundName]);

    // Function to unload sound
    const unloadSound = useCallback(async () => {
        console.log('Unloading sound');
        if (sound) {
            await sound.unloadAsync();
        }
    }, [sound]);

    // Function to fade in sound
    const fadeIn = useCallback(async () => {
        if (sound) {
            // Implement fade in logic here
            console.log('Fading in sound');
        }
    }, [sound]);

    // Function to fade out sound
    const fadeOut = useCallback(async () => {
        if (sound) {
            // Implement fade out logic here
            console.log('Fading out sound');
        }
    }, [sound]);

    // Effect to handle sound unloading on component unmount
    useEffect(() => {
        return () => {
            unloadSound().then(() => console.log('Sound unloaded')).catch(e => console.error('Error unloading sound:', e));
        };
    }, [unloadSound]);

    return {sound, loadSound, unloadSound, fadeIn, fadeOut};
};


export const useTimerManager = (initialDurationInMinutes: number) => {
    const initialDurationInMilliseconds = initialDurationInMinutes * 60000;
    const [duration, setDuration] = useState(initialDurationInMilliseconds);
    const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(initialDurationInMilliseconds);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const clearTimerInterval = useCallback(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [intervalId]);

    const startTimer = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            const id = window.setInterval(() => {
                setTimeLeftInMilliseconds((prevTime) => {
                    const newTime = prevTime - 1000;
                    if (newTime <= 0) {
                        clearTimerInterval();
                        setIsRunning(false);
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
            setIntervalId(id);
        }
    }, [isRunning, clearTimerInterval]);

    const pauseTimer = useCallback(() => {
        if (isRunning) {
            clearTimerInterval();
            setIsRunning(false);
        }
    }, [isRunning, clearTimerInterval]);

    const resumeTimer = startTimer

    const resetTimer = useCallback(() => {
        pauseTimer();
        setTimeLeftInMilliseconds(duration);
    }, [pauseTimer, duration]);

    const changeDuration = useCallback((newDurationInMinutes: number) => {
        if (!isRunning) {
            const newDurationInMilliseconds = newDurationInMinutes * 60000;
            setDuration(newDurationInMilliseconds);
            setTimeLeftInMilliseconds(newDurationInMilliseconds);
        }
    }, [isRunning]);

    // Cleanup function to clear the interval when the component using this hook unmounts
    const cleanup = useCallback(() => {
        clearTimerInterval();
    }, [clearTimerInterval]);

    return {
        timeLeftInMilliseconds,
        isRunning,
        startTimer,
        resumeTimer,
        pauseTimer,
        resetTimer,
        changeDuration,
        cleanup
    };
};
