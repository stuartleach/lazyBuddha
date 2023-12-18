import {Audio, AVPlaybackSource} from 'expo-av';


import Ocean from '../assets/audio/01_ocean.mp3';
import Sea from '../assets/audio/02_sea_iceland.mp3';
import Flow from '../assets/audio/03_flow_france.mp3';
import Wave from '../assets/audio/04_wave_iceland.mp3';


export const SoundTitle = {
    Ocean: Ocean,
    Sea: Sea,
    Flow: Flow,
    Wave: Wave,
};




export const loadSound = async (soundName: string) => {
    console.log("loadSound soundname====",soundName);
    const sound = new Audio.Sound();
    try {
        await sound.loadAsync(SoundTitle[soundName]);
        console.log("loadSound success",soundName)
        return sound;
    } catch (error) {
        console.log("loadSound error",error);
        return null;
    }
};

export const fadeIn = async (sound: Audio.Sound) => {
    if (!sound) return;
    const maxVolume = 1.0;
    let volume = 0.0;
    const step = 0.1;
    await sound.setVolumeAsync(volume);
    await sound.playAsync();
    const interval = setInterval(async () => {
        volume += step;
        if (volume >= maxVolume) {
            volume = maxVolume;
            clearInterval(interval);
        }
        await sound.setVolumeAsync(volume);
    }, 20);
};

export const fadeOut = async (sound: Audio.Sound) => {
    if (!sound) return;
    const minVolume = 0.0;
    let volume = 1.0;
    const step = 0.1;
    const interval = setInterval(async () => {
        volume -= step;
        if (volume <= minVolume) {
            volume = minVolume;
            clearInterval(interval);
            await sound.pauseAsync();
        }
        await sound.setVolumeAsync(volume);
    }, 20);
};

