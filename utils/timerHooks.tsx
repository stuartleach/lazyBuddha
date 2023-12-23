import {useCallback, useEffect, useRef, useState} from "react";

export const useTimerManager = (initialDurationInMinutes: number) => {
    const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(initialDurationInMinutes * 60000);
    const [timerId, setTimerId] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const targetTime = useRef<number | null>(null);

    const clearTimerInterval = useCallback(() => {
        if (timerId !== null) {
            clearInterval(timerId);
            setTimerId(null);
        }
    }, [timerId]);

    const updateTimer = useCallback(() => {
        if (targetTime.current !== null) {
            const timeLeft = targetTime.current - Date.now();
            if (timeLeft <= 0) {
                clearTimerInterval();
                setTimeLeftInMilliseconds(0);
                setIsRunning(false);
            } else {
                setTimeLeftInMilliseconds(timeLeft);
            }
        }
    }, [clearTimerInterval]);

    const startTimer = useCallback(() => {
        if (!isRunning && targetTime.current === null) {
            setIsRunning(true);
            targetTime.current = Date.now() + timeLeftInMilliseconds;
            updateTimer(); // Update immediately to avoid initial delay
            // Use type assertion here to cast the return type to `number`
            const id = setInterval(updateTimer, 1000) as unknown as number;
            setTimerId(id);
        }
    }, [isRunning, timeLeftInMilliseconds, updateTimer]);

    const pauseTimer = useCallback(() => {
        if (isRunning) {
            clearTimerInterval();
            setIsRunning(false);
            // Adjust targetTime to stop the countdown
            targetTime.current = null;
        }
    }, [isRunning, clearTimerInterval]);

    const resumeTimer = useCallback(() => {
        if (!isRunning && targetTime.current !== null) {
            setIsRunning(true);
            const timeLeft = targetTime.current - Date.now();
            targetTime.current = Date.now() + timeLeft;
            const id = setInterval(updateTimer, 1000) as unknown as number;
            setTimerId(id);
        }
    }, [isRunning, updateTimer]);

    const resetTimer = useCallback(() => {
        clearTimerInterval();
        setIsRunning(false);
        setTimeLeftInMilliseconds(initialDurationInMinutes * 60000);
        targetTime.current = null;
    }, [clearTimerInterval, initialDurationInMinutes]);

    const changeDuration = useCallback((newDurationInMinutes: number) => {
        if (!isRunning) {
            setTimeLeftInMilliseconds(newDurationInMinutes * 60000);
        }
    }, [isRunning]);

    useEffect(() => {
        return clearTimerInterval;
    }, [clearTimerInterval]);

    return {
        timeLeftInMilliseconds,
        isRunning,
        startTimer,
        resumeTimer,
        pauseTimer,
        resetTimer,
        changeDuration
    };
};