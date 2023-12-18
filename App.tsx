import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native'; // or from 'react-native-paper' or any other UI library you're using
import {loadSound} from './utils/soundUtils';
import * as SplashScreen from 'expo-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DarkTheme, NavigationContainer} from "@react-navigation/native";
import * as Font from 'expo-font';
import {Meditation} from "./screens/MeditationScreen/Meditation";
import {styles} from "./styles/theme";

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().then(r => console.log("SplashScreen.preventAutoHideAsync()", r));

const Profile = (navigation: any) => <Text>This is Janeasdfasfasdfasdfasdfasdfasfasfasdfasdfasdfasdfasdfasdfasdf's
    profile</Text>;
const Settings = () => <Text>This is Jane's profdfile</Text>;

function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts
                await Font.loadAsync({
                    /*'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
                    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
                    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
                    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
                    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
                    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
                    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
                    'LexendDeca-Bold': require('./assets/fonts/LexendDeca-Bold.ttf'),
                    'LexendDeca-Light': require('./assets/fonts/LexendDeca-Light.ttf'),
                    'LexendDeca-Thin': require('./assets/fonts/LexendDeca-Thin.ttf'),
                    'LexendDeca-Medium': require('./assets/fonts/LexendDeca-Medium.ttf'),
                    'LexendDeca-SemiBold': require('./assets/fonts/LexendDeca-SemiBold.ttf'),
                    'LexendDeca-ExtraBold': require('./assets/fonts/LexendDeca-ExtraBold.ttf'),
                    'LexendDeca-Black': require('./assets/fonts/LexendDeca-Black.ttf'),
                    'Staatliches-Regular': require('./assets/fonts/Staatliches-Regular.ttf'),
                    'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
                    'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
                    'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
                    'Geologica-SemiBold': require('./assets/fonts/Geologica-SemiBold.ttf'),
                    'Geologica-ExtraBold': require('./assets/fonts/Geologica-ExtraBold.ttf'),
                    'Geologica-Black': require('./assets/fonts/Geologica-Black.ttf'),
                    'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),
                    'Geologica-Thin': require('./assets/fonts/Geologica-Thin.ttf'),
                    'Geologica-ExtraLight': require('./assets/fonts/Geologica-ExtraLight.ttf'),*/
                    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
                    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
                    'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
                    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
                    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
                });

                console.log('Fonts loaded');

                // Pre-load sounds
                await loadSound("Ocean");

                console.log('Sounds loaded');
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
        <View onLayout={onLayoutRootView} style={styles.container}>
            <Meditation/>
            {/*<NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Profile"
                    screenOptions={{
                        headerTintColor: 'white',
                        headerStyle: {backgroundColor: 'tomato'},
                    }}
                >
                    <Stack.Screen
                        name="Meditation"
                        component={Meditation}
                        options={{
                            title: 'Meditation',

                        }}
                        style={styles.container}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            title: 'My profile',
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            gestureEnabled: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>*/}
        </View>
    );
}

export default App;