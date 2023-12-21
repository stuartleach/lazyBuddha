import { Text, View, Animated } from 'react-native'
import { ConfigPanelProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { addUnitsToDuration } from '@/utils'
import { configPanelStyles, controlPanelStyles } from '@/styles'

const SelectionMenu = ({ onChange, setVisible, items }) => {
    const itemsPerColumn = 3
    const columns = []
    for (let i = 0; i < items.length; i += itemsPerColumn) {
        columns.push(items.slice(i, i + itemsPerColumn))
    }
    const [selectedValue, setSelectedValue] = useState('2')
    const handleValueChange = (value: React.SetStateAction<string>) => {
        console.log('value', value)
        setSelectedValue(value)
        onChange(value)
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
                            <View key={Math.random()} style={[controlPanelStyles.smallButton, { marginVertical: 10 }]}>
                                <Text
                                    style={controlPanelStyles.smallButtonText}
                                    onPress={() => {
                                        handlePress(item.value)
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </View>
                        )
                    )}
                </View>
            ))}
        </View>
    )
}

export const ConfigPanel = (props: { configPanelProps: ConfigPanelProps }) => {
    const { onChangeDuration, onChangeSound, duration, soundName, timerIsVisible, setTimerIsVisible } =
        props.configPanelProps
    const [durationSelectionMenuVisible, setDurationSelectionMenuVisible] = useState(false)
    const [soundSelectionMenuVisible, setSoundSelectionMenuVisible] = useState(false)

    useEffect(() => {
        if (durationSelectionMenuVisible || soundSelectionMenuVisible) {
            setTimerIsVisible(false)
            setFlex(2)
        } else {
            setTimerIsVisible(true)
            setFlex(1)
        }
        console.log('durationSelectionMenuVisible', durationSelectionMenuVisible)
    }, [durationSelectionMenuVisible, soundSelectionMenuVisible, setTimerIsVisible])

    const [flex, setFlex] = useState(1)

    const conditionalStyle = () => {
        if (durationSelectionMenuVisible || soundSelectionMenuVisible) {
            return {
                height: '75%',
            }
        } else {
            return {
                height: configPanelStyles.configPanelContainer.height,
            }
        }
    }

    const [heightAnim] = useState(new Animated.Value(0.3)) // Start at 30%

    useEffect(() => {
        if (durationSelectionMenuVisible || soundSelectionMenuVisible) {
            setTimerIsVisible(false)
            Animated.timing(heightAnim, {
                toValue: 0.4, // Animate to 75%
                duration: 300, // Duration of the animation
                useNativeDriver: false, // Height is not supported with native driver
            }).start()
        } else {
            setTimerIsVisible(true)
            Animated.timing(heightAnim, {
                toValue: 0.2, // Animate back to 30%
                duration: 300, // Duration of the animation
                useNativeDriver: false, // Height is not supported with native driver
            }).start()
        }
    }, [durationSelectionMenuVisible, soundSelectionMenuVisible, setTimerIsVisible, heightAnim])

    // TODO: Import these from somewhere else
    const timeItems = [
        { label: '30 seconds', value: '0.5' },
        { label: '1 minute', value: '1' },
        { label: '2 minutes', value: '2' },
        { label: '3 minutes', value: '3' },
        { label: '5 minutes', value: '5' },
        { label: '10 minutes', value: '10' },
    ]

    // TODO: Import these from somewhere else
    const soundItems = [
        { label: 'Ocean', value: 'Ocean' },
        { label: 'Rain', value: 'Rain' },
        { label: 'Forest', value: 'Forest' },
        { label: 'Fire', value: 'Fire' },
        { label: 'Wind', value: 'Wind' },
        { label: 'White Noise', value: 'White Noise' },
        { label: 'Stream', value: 'Stream' },
        { label: 'Birds', value: 'Birds' },
        { label: 'Cafe', value: 'Cafe' },
    ]

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
                        items={timeItems}
                    />
                )}
                {soundSelectionMenuVisible && (
                    <SelectionMenu
                        onChange={onChangeSound}
                        setVisible={setSoundSelectionMenuVisible}
                        items={soundItems}
                    />
                )}
                {!durationSelectionMenuVisible && !soundSelectionMenuVisible && (
                    <>
                        <View style={configPanelStyles.leftHalf}>
                            <View style={configPanelStyles.smallButton}>
                                <Text
                                    style={controlPanelStyles.smallButtonText}
                                    onPress={() => setDurationSelectionMenuVisible(!durationSelectionMenuVisible)}
                                >
                                    {addUnitsToDuration(duration)}
                                </Text>
                            </View>
                        </View>
                        <View style={configPanelStyles.rightHalf}>
                            <View style={configPanelStyles.smallButton}>
                                <Text
                                    style={controlPanelStyles.smallButtonText}
                                    onPress={() => setSoundSelectionMenuVisible(!soundSelectionMenuVisible)}
                                >
                                    {soundName}
                                </Text>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </Animated.View>
    )
}
