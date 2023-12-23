import {useCallback, useEffect, useState} from 'react';


import {AVPlaybackSource, Audio, AVPlaybackSourceObject} from 'expo-av';


const sounds = {
    Ocean: require('@/assets/sounds/01_ocean.mp3') as AVPlaybackSource,
    Sea: require('@/assets/sounds/02_sea_iceland.mp3') as AVPlaybackSource,
    Flow: require('@/assets/sounds/03_flow_france.mp3') as AVPlaybackSource,
    Wave: require('@/assets/sounds/04_wave_iceland.mp3') as AVPlaybackSource,
};

export const loadSound = async (soundName: string) => {
    const sound = new Audio.Sound();
    // if sound is already loaded
    if (sound._loaded) {
        return sound;
    }

    try {
        await sound.loadAsync(sounds[soundName] as AVPlaybackSourceObject);
        console.log('Sound loaded!');
        return sound;
    } catch (error) {
        console.error('Error loading sound:', error);
        return null; // Return null instead of throwing an error
    }
}


export const unloadSound = async (sound: Audio.Sound) => {
    if (!sound) return;
    try {
        // Check if sound is loaded before unloading
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
            await sound.unloadAsync();
        }
    } catch (error) {
        console.error('Error unloading sound:', error);
    }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fadeIn = async (sound: Audio.Sound) => {
    if (!sound) return;
    const maxVolume = 1.0;
    let volume = 0.0;
    const step = 0.05;

    await sound.setVolumeAsync(volume);
    await sound.playAsync();

    while (volume < maxVolume) {
        volume = Math.min(volume + step, maxVolume);
        await sound.setVolumeAsync(volume);
        await delay(100);
    }
};

export const fadeOut = async (sound: Audio.Sound) => {
    if (!sound) return;
    const minVolume = 0.0;
    let volume = 1.0;
    const step = 0.05;

    while (volume > minVolume) {
        volume = Math.max(volume - step, minVolume);
        await sound.setVolumeAsync(volume);
        await delay(100);
    }

    await sound.pauseAsync();
};
export const useSoundManager = (soundName: string) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    // Load sound
    useEffect(() => {
        let isCancelled = false;
        const load = async () => {
            const loadedSound = await loadSound(soundName);
            if (!isCancelled && loadedSound) {
                setSound(loadedSound);
            }
        };

        load();

        return () => {
            isCancelled = true;
            unloadSound(sound).catch(e => console.error('Error unloading sound:', e));
        };
    }, [soundName]);

    const fadeInSound = useCallback(async () => {
        if (sound) {
            await fadeIn(sound);
        }
    }, [sound]);

    const fadeOutSound = useCallback(async () => {
        if (sound) {
            await fadeOut(sound);
        }
    }, [sound]);

    return {sound, fadeIn: fadeInSound, fadeOut: fadeOutSound};
};

