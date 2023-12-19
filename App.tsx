import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native'; // or from 'react-native-paper' or any other UI library you're using
import {loadSound} from '@utils';
import * as SplashScreen from 'expo-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import {Meditation} from "@screens/MeditationScreen/Meditation";
import {styles, theme} from "@styles";

SplashScreen.preventAutoHideAsync().then(r => console.log("SplashScreen.preventAutoHideAsync()", r));
export const buttonRadius = 10;

function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'Lato-Regular': require('@fonts/Lato-Regular.ttf'),
                    'Lato-Bold': require('@fonts/Lato-Bold.ttf'),
                    'Lato-Thin': require('@fonts/Lato-Thin.ttf'),
                    'Lato-Light': require('@fonts/Lato-Light.ttf'),
                    'Lato-Black': require('@fonts/Lato-Black.ttf'),
                });
                await loadSound("Ocean");
            } catch (e) {
                console.warn("this is a warning", e);
            } finally {
                // Tell the application to render
                console.log('Done loading resources, rendering app');
                setAppIsReady(true);
            }
        }

        prepare()
    }, []);


    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        console.log('App is not ready, rendering splash screen');
        return null;
    }

    console.log('App is ready, rendering app')

    return (
        <View onLayout={onLayoutRootView} style={{
            flex: 1,
            backgroundColor: theme.backgroundTheme,
            alignItems: 'center',
            width: "100%",
        }}>
            <Meditation/>
        </View>
    );
}

export default App;