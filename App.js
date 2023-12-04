import React, {useState} from 'react';
import {View, Button, Text, ImageBackground, Image} from 'react-native'; // or from 'react-native-paper' or any other UI library you're using
import MeditationTimer from './components/MeditationTimer';
import {StatusBar} from 'expo-status-bar';
import tw from 'tailwind-react-native-classnames';
// import from assets
// import from components
import BackgroundImage from './assets/BackgroundZenCircle.png';
import SplashImage from './assets/splash.png';
import IconImage from './assets/icon.png';
import OceanSound from './assets/Ocean.wav';
import BeepSound from './assets/Beep.mp3';
import {Audio} from 'expo-av'; // Import Audio from expo-av
import {useEffect} from 'react';
import Flower from './assets/Flower.png';
import favicon from './assets/favicon.png';
import {Raleway_200ExtraLight, Raleway_200ExtraLight as Raleway} from "@expo-google-fonts/raleway";
import {Quicksand_300Light, Quicksand_300Light as Quicksand} from "@expo-google-fonts/quicksand";

import {useFonts} from 'expo-font';
// import {Asset as Font} from "expo-asset";

const BuddhaButton = (props) => {
    const {title, action, selected, className} = props;
    return (
        <View className={` text-white text-l font-black bg-blue-500 p-1.5 m-1 rounded ${className}`}>
            <Text className="text-white text-l font-black" onPress={action}>{title}</Text>
        </View>
    )
};

function App() {
    const [duration, setDuration] = useState(2); // Initialize the duration state
    const [inProgress, setInProgress] = useState(false); // Initialize the inProgress state
    const [sound, setSound] = useState(null); // Initialize the sound state
    const fadeDuration = 2000; // Duration of the fade in milliseconds
    /*
        const [fontsLoaded] = useFonts({
            Raleway_200ExtraLight,
            Quicksand_300Light,
        });
        if (!fontsLoaded) {
            return <Text>Loading...</Text>;
        }*/

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
        if (!sound) return; // Add this check
        const maxVolume = 1.0;
        let volume = 0.0;
        const step = 0.1; // Volume increases by 0.1 each time
        sound.setVolumeAsync(volume).catch((error) => {
                console.log(error);
            }
        );
        sound.playAsync().catch((error) => {
                console.log(error);
            }
        );
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
        if (!sound) return; // Add this check
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
            flex: 2, backgroundColor: '#395569',
        }}>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: "20%"}}>
                {/* Header Section */}
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginVertical: 10
                }}>
                    Choose a duration:
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <View className="flex-col">
                        <BuddhaButton title="1 Min" action={() => setDuration(1)}/>
                        <BuddhaButton title="2 Mins" action={() => setDuration(2)}/>
                        <BuddhaButton title="5 Mins" action={() => setDuration(5)}/>
                    </View>
                    <View className="flex-col">
                        <BuddhaButton title="10 Mins" action={() => setDuration(10)}/>
                        <BuddhaButton title="20 Mins" action={() => setDuration(20)}/>
                        <BuddhaButton title="30 Mins" action={() => setDuration(30)}/>
                    </View>
                </View>
                <BuddhaButton className="m-0" title={inProgress ? "Stop" : "Start"}
                              action={() => setInProgress(!inProgress)}/>
                <StatusBar style="auto"/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {/* Meditation Timer */}
                <MeditationTimer duration={duration} inProgress={inProgress}/>
            </View>
        </View>
    );
}

export default App;