export const timer = (duration: number, setTimeLeftInMilliseconds: (value: number) => void) => {
    let elapsedMilliseconds = 0;
    const updateInterval = 50;
    let countdown: NodeJS.Timeout;
    let isRunning = false;

    const start = () => {
        isRunning = true;
        countdown = setInterval(() => {
            elapsedMilliseconds += updateInterval;
            if (elapsedMilliseconds >= duration * 60000) {
                clearInterval(countdown);
                setTimeLeftInMilliseconds(0);
                isRunning = false;
            } else {
                setTimeLeftInMilliseconds(duration * 60000 - elapsedMilliseconds);
            }
        }, updateInterval);
    };

    const pause = () => {
        if (isRunning) {
            clearInterval(countdown);
            isRunning = false;
        }
    };

    const resume = () => {
        if (!isRunning) {
            start();
        }
    };

    return { start, pause, resume };
};

export const addUnitsToDuration = (duration: number) => {
    if (duration == 1) {
        return `${duration} minute`;
    }
    if (duration < 1) {
        return `${duration * 60} seconds`;
    }
    return `${duration} minutes`;
}