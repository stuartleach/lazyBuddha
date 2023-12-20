import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';


import Ocean from '@sounds/01_ocean.mp3';
import Sea from '@sounds/02_sea_iceland.mp3';
import Flow from '@sounds/03_flow_france.mp3';
import Wave from '@sounds/04_wave_iceland.mp3';


export const SoundTitle = {
    Ocean: Ocean,
    Sea: Sea,
    Flow: Flow,
    Wave: Wave,
};


const useSoundManager = (soundName: string) => {
  const [sound, setSound] = useState(null);

  // Function to load sound

  const loadSound = async () => {
    console.log(`Loading sound: ${soundName}`);
    const { sound } = await Audio.Sound.createAsync(
      // Replace with your sound file source based on soundName
      SoundTitle[soundName]
    );
    setSound(sound);
  };

  // Function to unload sound
  const unloadSound = async () => {
    console.log('Unloading sound');
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  // Function to fade in sound
  const fadeIn = async (sound) => {
    if (sound) {
      // Implement fade in logic here
      console.log('Fading in sound');
    }
  };

  // Function to fade out sound
  const fadeOut = async (sound) => {
    if (sound) {
      // Implement fade out logic here
      console.log('Fading out sound');
    }
  };

  // Effect to handle sound unloading on component unmount
  useEffect(() => {
    return () => {
      unloadSound().then(r => console.log('Sound unloaded'));
    };
  }, [sound]);

  return { sound, loadSound, unloadSound, fadeIn, fadeOut };
};

export default useSoundManager;