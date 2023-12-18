export const timer = (duration: number, setTimeLeftInMilliseconds: (value: number) => void) => {
    let elapsedMilliseconds = 0; // Move inside the function
    const updateInterval = 50;   // This can also be moved inside if it's not used elsewhere

    const countdown = setInterval(() => {
        elapsedMilliseconds += updateInterval;
        if (elapsedMilliseconds >= duration * 60000) {
            clearInterval(countdown);
            setTimeLeftInMilliseconds(0);
        } else {
            setTimeLeftInMilliseconds(duration * 60000 - elapsedMilliseconds);
        }
    }, updateInterval);

    return countdown;
};
