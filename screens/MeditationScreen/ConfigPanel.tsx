import {Animated, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {configPanelStyles, controlPanelStyles} from '@/styles/theme'
import {addUnitsToDuration} from "@/utils/utils";
import {CustomPressable} from "@/components/shared/CustomPressable";


export const timesItems = [
    {label: '30 seconds', value: '0.5'},
    {label: '1 minute', value: '1'},
    {label: '2 minutes', value: '2'},
    {label: '3 minutes', value: '3'},
    {label: '5 minutes', value: '5'},
    {label: '10 minutes', value: '10'},
    // TODO: Add custom value
]

export const soundsItems = [
    {label: 'Ocean', value: 'Ocean'},
    {label: 'Sea', value: 'Sea'},
    {label: 'Flow', value: 'Flow'},
    {label: 'Wave', value: 'Wave'},
    // {label: 'Wind', value: 'Wind'},
    // {label: 'White Noise', value: 'White Noise'},
    // {label: 'Stream', value: 'Stream'},
    // {label: 'Birds', value: 'Birds'},
    // {label: 'Cafe', value: 'Cafe'},
]

export const settingsItems = [
    {label: 'This is a setting', value: "asdfasf"},
    {label: 'This too', value: 'timer'},
    {label: 'Give me data', value: 'sound'},
    {label: 'Hungry', value: 'sounadsfd'},
    {label: 'For data', value: 'asdf'},
]


const SelectionMenu = ({onChange, setVisible, items}) => {

    let itemsPerColumn = 4

    switch (items.length) {
        case 1:
            itemsPerColumn = 1
            break;
        case 2:
            itemsPerColumn = 2
            break;
        case 3:
            itemsPerColumn = 3
            break;
        case 4:
            itemsPerColumn = 2
            break;
        case 5:
            itemsPerColumn = 5
            break;
        case 6:
            itemsPerColumn = 3
            break;
    }

    // const itemsPerColumn = 2
    const columns = []
    for (let i = 0; i < items.length; i += itemsPerColumn) {
        columns.push(items.slice(i, i + itemsPerColumn))
    }
    const handlePress = (value: React.SetStateAction<string>) => {
        onChange(value)
        setVisible(false)
    }
    return (
        <View style={configPanelStyles.selectionMenuRows}>
            {columns.map((column) => (
                <View key={Math.random()} style={configPanelStyles.selectionMenuColumns}>
                    {column.map(
                        (item: {
                            label:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                            value: any
                        }) => (
                            <CustomPressable key={Math.random()} onPress={() => {
                                handlePress(item.value)
                            }} style={[controlPanelStyles.smallButton, {marginVertical: 10}]}>
                                <Text
                                    style={controlPanelStyles.smallButtonText}
                                >
                                    {item.label}
                                </Text>
                            </CustomPressable>
                        )
                    )}
                </View>
            ))}
        </View>
    )
}

export const ConfigPanel = (configPanelProps: {
    onChangeDuration: any;
    onChangeSound: any;
    onChangeSettings: any;
    duration: any;
    soundName: any;
    timerIsVisible: any;
    setTimerIsVisible: any;
    controlPanelIsVisible: any;
    setControlPanelIsVisible: any;
}) => {
    const {
        onChangeDuration,
        onChangeSound,
        onChangeSettings,
        duration,
        soundName,
        timerIsVisible,
        setTimerIsVisible,
        controlPanelIsVisible,
        setControlPanelIsVisible
    } =
        configPanelProps
    const [durationSelectionMenuVisible, setDurationSelectionMenuVisible] = useState(false)
    const [soundSelectionMenuVisible, setSoundSelectionMenuVisible] = useState(false)
    const [settingSelectionMenuVisible, setSettingSelectionMenuVisible] = useState(false)


    const [heightAnim] = useState(new Animated.Value(0.3)) // Start at 30%

    useEffect(() => {
        if (durationSelectionMenuVisible || soundSelectionMenuVisible || settingSelectionMenuVisible) {
            setTimerIsVisible(false)
            setControlPanelIsVisible(false)
            Animated.timing(heightAnim, {
                toValue: 0.95, // Animate to 75%
                duration: 300, // Duration of the animation
                useNativeDriver: false, // Height is not supported with native driver
            }).start()
        } else {
            setTimerIsVisible(true)
            setControlPanelIsVisible(true)
            Animated.timing(heightAnim, {
                toValue: 0.25, // Animate back to 30%
                duration: 300, // Duration of the animation
                useNativeDriver: false, // Height is not supported with native driver
            }).start()
        }
    }, [durationSelectionMenuVisible, soundSelectionMenuVisible, settingSelectionMenuVisible, setTimerIsVisible, heightAnim])


    return (
        // @ts-ignore
        <Animated.View
            style={[
                configPanelStyles.configPanelContainer,
                {
                    height: heightAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'], // Map 0-1 to 0%-100%
                    }),
                },
            ]}
        >
            <View style={configPanelStyles.smallContainer}>
                {durationSelectionMenuVisible && (
                    <SelectionMenu
                        onChange={onChangeDuration}
                        setVisible={setDurationSelectionMenuVisible}
                        items={timesItems}
                    />
                )}
                {soundSelectionMenuVisible && (
                    <SelectionMenu
                        onChange={onChangeSound}
                        setVisible={setSoundSelectionMenuVisible}
                        items={soundsItems}
                    />
                )}
                {settingSelectionMenuVisible && (
                    <SelectionMenu
                        onChange={onChangeSettings}
                        setVisible={setSettingSelectionMenuVisible}
                        items={settingsItems}
                    />
                )}
                {!durationSelectionMenuVisible && !soundSelectionMenuVisible && !settingSelectionMenuVisible && (
                    <View style={{
                        flexDirection: 'column',
                        width: "100%",
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 2,
                        }}>
                            <View style={configPanelStyles.smaller}>
                                <CustomPressable
                                    onPress={() => setDurationSelectionMenuVisible(!durationSelectionMenuVisible)}
                                    style={configPanelStyles.buttonContainer}>
                                    <Text
                                        style={controlPanelStyles.smallButtonText}
                                    >
                                        {addUnitsToDuration(duration)}
                                    </Text>
                                </CustomPressable>
                            </View>
                            <View style={configPanelStyles.smaller}>
                                <CustomPressable style={configPanelStyles.buttonContainer}
                                                 onPress={() => setSoundSelectionMenuVisible(!soundSelectionMenuVisible)}>
                                    <Text
                                        style={controlPanelStyles.smallButtonText}
                                    >
                                        {soundName}
                                    </Text>
                                </CustomPressable>
                            </View>

                        </View>
                        <View style={{
                            ...configPanelStyles.smaller,
                            flex: 1,
                            marginTop: 0,
                        }}>
                            <CustomPressable style={[configPanelStyles.buttonContainer]}
                                             onPress={() => setSettingSelectionMenuVisible(!settingSelectionMenuVisible)}
                            >
                                <Text
                                    style={controlPanelStyles.smallButtonText}
                                >
                                    <Text>Settings</Text>
                                </Text>
                            </CustomPressable>
                        </View>
                    </View>
                )}
            </View>
        </Animated.View>
    )
}