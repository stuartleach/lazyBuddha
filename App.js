import React, {useState} from 'react';
import {View, Button, Text, ImageBackground} from 'react-native'; // or from 'react-native-paper' or any other UI library you're using
import MeditationTimer from './MeditationTimer';
import {StatusBar} from 'expo-status-bar';
import tw from 'tailwind-react-native-classnames';
// import from assets
// import from components
import BackgroundImage from './assets/BackgroundZenCircle.png';
import OceanSound from './assets/Ocean.wav';
import BeepSound from './assets/Beep.mp3';
import {Audio} from 'expo-av'; // Import Audio from expo-av
import {useEffect} from 'react';

import favicon from './assets/favicon.png';

function App() {
    const [duration, setDuration] = useState(2); // Initialize the duration state
    const [inProgress, setInProgress] = useState(false); // Initialize the inProgress state
    const [sound, setSound] = useState(null); // Initialize the sound state

    const fadeDuration = 2000; // Duration of the fade in milliseconds

    useEffect(() => {
        const loadSound = async () => {
            const {sound} = await Audio.Sound.createAsync(OceanSound);
            setSound(sound);
        };


        loadSound().catch((error) => {
                console.log(error);
            }
        );


        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const fadeIn = async () => {
        const maxVolume = 1.0;
        let volume = 0.0;
        const step = 0.1; // Volume increases by 0.1 each time

        sound.setVolumeAsync(volume).catch((error) => {
                console.log(error);
            }
        );;
        sound.playAsync().catch((error) => {
                console.log(error);
            }
        );;

        const interval = setInterval(async () => {
            volume += step;
            if (volume >= maxVolume) {
                volume = maxVolume;
                clearInterval(interval);
            }
            await sound.setVolumeAsync(volume);
        }, 20); // Adjust interval duration as needed
    };

    const fadeOut = async () => {
        const minVolume = 0.0;
        let volume = 1.0; // Assuming the current volume is max
        const step = 0.1;

        const interval = setInterval(async () => {
            volume -= step;
            if (volume <= minVolume) {
                volume = minVolume;
                clearInterval(interval);
                sound.pauseAsync();
            }
            await sound.setVolumeAsync(volume);
        }, 20); // Adjust interval duration as needed
    };

    useEffect(() => {
        if (inProgress) {
            let fadeInError = fadeIn();
        } else {
            let fadeOutError = fadeOut();
        }
    }, [inProgress]);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}><ImageBackground
            source={BackgroundImage} // Set the source of the background image
            style={{
                flex: 1,
                justifyContent: 'top',
                alignItems: 'center',
                paddingTop: "20%",
            }}><Text>Choose a duration:</Text>
            <View style={{flexDirection: 'row',}}>
                <Button title="1 Min" onPress={() => setDuration(1)}/>
                <Button title="2 Mins" onPress={() => setDuration(2)}/>
                <Button title="5 Mins" onPress={() => setDuration(5)}/>
                <StatusBar style="auto"/>
            </View>
            <View className="font-black">
                <Button className="text-4xl text-red-900" title={inProgress ? "Stop" : "Start"}
                        onPress={() => setInProgress(!inProgress)}>Start</Button>
            </View>
            <View className="justify-center" style={{flexDirection: 'row', marginTop: "40%"}}>
                <MeditationTimer duration={duration} inProgress={inProgress}/>
            </View>
        </ImageBackground>
        </View>
    );
}

export default App;
