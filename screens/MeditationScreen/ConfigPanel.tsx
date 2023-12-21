import {Text, View, Animated} from 'react-native'
import {ConfigPanelProps} from '@/screens/MeditationScreen/MeditationScreen'
import React, {useEffect, useState} from 'react'
import {addUnitsToDuration} from '@/utils'
import {configPanelStyles, controlPanelStyles} from '@/styles'
import {settingsItems, soundsItems, timesItems} from "@/screens/MeditationScreen/consts";

const SelectionMenu = ({onChange, setVisible, items}) => {
    const itemsPerColumn = 3
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
                            <View key={Math.random()} style={[controlPanelStyles.smallButton, {marginVertical: 10}]}>
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








const NestedMenu = ({ menuItems, onSelect, path = [] }) => {
  const [currentMenu, setCurrentMenu] = useState(menuItems);
  const [menuStack, setMenuStack] = useState([]);

  const handleItemSelect = (item) => {
    if (item.subItems) {
      setMenuStack([...menuStack, currentMenu]);
      setCurrentMenu(item.subItems);
    } else {
      onSelect([...path, item.label]);
    }
  };

  const handleBack = () => {
    const previousMenu = menuStack.pop();
    setMenuStack(menuStack);
    setCurrentMenu(previousMenu);
  };

  return (
    <View>
      {menuStack.length > 0 && (
        <Text onPress={handleBack}>Back</Text>
      )}
      {currentMenu.map((item, index) => (
        <Text key={index} onPress={() => handleItemSelect(item)}>
          {item.label}
        </Text>
      ))}
    </View>
  );
};


<NestedMenu
  menuItems={yourNestedMenuStructure}
  onSelect={(path) => console.log('Selected path:', path)}
/>








export const ConfigPanel = (props: { configPanelProps: ConfigPanelProps }) => {
    const {onChangeDuration, onChangeSound, onChangeSettings, duration, soundName, timerIsVisible, setTimerIsVisible} =
        props.configPanelProps
    const [durationSelectionMenuVisible, setDurationSelectionMenuVisible] = useState(false)
    const [soundSelectionMenuVisible, setSoundSelectionMenuVisible] = useState(false)
    const [settingSelectionMenuVisible, setSettingSelectionMenuVisible] = useState(false)


    const [heightAnim] = useState(new Animated.Value(0.3)) // Start at 30%

    useEffect(() => {
        if (durationSelectionMenuVisible || soundSelectionMenuVisible || settingSelectionMenuVisible) {
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
                            // width: 200,
                            flex: 2,
                        }}>
                            <View style={configPanelStyles.half}>
                                <View style={configPanelStyles.buttonContainer}>
                                    <Text
                                        style={controlPanelStyles.smallButtonText}
                                        onPress={() => setDurationSelectionMenuVisible(!durationSelectionMenuVisible)}
                                    >
                                        {addUnitsToDuration(duration)}
                                    </Text>
                                </View>
                            </View>
                            <View style={configPanelStyles.half}>
                                <View style={configPanelStyles.buttonContainer}>
                                    <Text
                                        style={controlPanelStyles.smallButtonText}
                                        onPress={() => setSoundSelectionMenuVisible(!soundSelectionMenuVisible)}
                                    >
                                        {soundName}
                                    </Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            ...configPanelStyles.half,
                            flex: 1,
                            marginTop: 0,
                        }}>
                            <View style={configPanelStyles.buttonContainer}>
                                <Text
                                    style={controlPanelStyles.smallButtonText}
                                    onPress={() => setSettingSelectionMenuVisible(!settingSelectionMenuVisible)}
                                >
                                    <Text>Settings</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Animated.View>
    )
}

const menuItems = [
  {
    label: 'Menu 1',
    subItems: [
      { label: 'Submenu 1-1' },
      { label: 'Submenu 1-2' },
    ],
  },
    {
        label: 'Menu 2',
        subItems: [
        { label: 'Submenu 2-1' },
        { label: 'Submenu 2-2' },
        ],
    },
    {
        label: 'Menu 3',
        subItems: [
        { label: 'Submenu 3-1' },
        { label: 'Submenu 3-2' },
        ],
    },
];