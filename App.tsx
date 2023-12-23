import React, {useCallback, useEffect, useState} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native' // or from 'react-native-paper' or any other UI library you're using
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import {MeditationScreen} from '@/screens/MeditationScreen/MeditationScreen'
import {gradientColors} from '@/styles/theme'
import Svg, {Defs, RadialGradient, Rect, Stop} from 'react-native-svg'
import {Audio} from 'expo-av'
import {loadSound} from "@/utils/soundHooks";

const {width, height} = Dimensions.get('window')

SplashScreen.preventAutoHideAsync().then((r) => console.log('SplashScreen.preventAutoHideAsync()', r))

function App() {
    const [appIsReady, setAppIsReady] = useState(false)
    useEffect(() => {
        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
        })
        async function prepare() {
            try {
                await Font.loadAsync({
                    'Lato-Regular': require('@/assets/fonts/Lato-Regular.ttf'),
                    'Lato-Bold': require('@/assets/fonts/Lato-Bold.ttf'),
                    'Lato-Thin': require('@/assets/fonts/Lato-Thin.ttf'),
                    'Lato-Light': require('@/assets/fonts/Lato-Light.ttf'),
                    'Lato-Black': require('@/assets/fonts/Lato-Black.ttf'),
                })
                await loadSound("Ocean");
                await loadSound("Sea");
                await loadSound("Flow");
                await loadSound("Wave");
            } catch (e) {
                console.warn('this is a warning', e)
            } finally {
                // Tell the application to render
                console.log('Done loading resources, rendering app')
                setAppIsReady(true)
            }
        }

        prepare().then((r) => console.log('prepared & ready for liftoff!'))
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync()
        }
    }, [appIsReady])

    if (!appIsReady) {
        console.log('App is not ready, rendering splash screen')
        return null
    }

    console.log('App is ready, rendering app')

    return (
        <View style={styles.container}>
            {/* SVG for Radial Gradient */}
            <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} style={StyleSheet.absoluteFill}>
                <Defs>
                    <RadialGradient id='grad' cx='50%' cy='50%' r='100%'>
                        {gradientColors.colors.map((color, index) => (
                            <Stop
                                key={index}
                                offset={`${(index * 100) / (gradientColors.colors.length - 1)}%`}
                                stopColor={color}
                                stopOpacity='1'
                            />
                        ))}
                    </RadialGradient>
                </Defs>
                <Rect x={(-1 * width) / 2} y='0' width={width * 2} height={height} fill='url(#grad)'/>
            </Svg>
            <View onLayout={onLayoutRootView} style={styles.content}>
                <MeditationScreen/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
})

export default App
