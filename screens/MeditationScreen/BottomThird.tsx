import {Text, View} from "react-native";
import {BottomThirdProps} from "@types";
import React, {useState} from "react";
import {addUnitsToDuration} from "@utils";
import {bottomThirdStyles, topThirdStyles} from "@styles/theme";

const SelectionMenu = ({onChange, setVisible, items}) => {
    const itemsPerColumn = 3;
    const columns = [];
    for (let i = 0; i < items.length; i += itemsPerColumn) {
        columns.push(items.slice(i, i + itemsPerColumn));
    }
    const [selectedValue, setSelectedValue] = useState("2");
    const handleValueChange = (value: React.SetStateAction<string>) => {
        console.log("value", value);
        setSelectedValue(value);
        onChange(value);
    };

    const handlePress = (value: React.SetStateAction<string>) => {
        onChange(value);
        setVisible(false);
    }

    return (
        <View style={bottomThirdStyles.selectionMenuRows}>
            {columns.map(column => (
                <View key={Math.random()} style={bottomThirdStyles.selectionMenuColumns}>
                    {column.map((item: {
                        label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal,
                        value: any
                    }) => (
                        <View key={Math.random()} style={[topThirdStyles.smallButton, {marginVertical: 10}]}>
                            <Text style={topThirdStyles.smallButtonText}
                                  onPress={() => {handlePress(item.value)} }>{item.label}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    )
}

export const BottomThird = (props: {
    bottomThirdProps: BottomThirdProps
}) => {
    const {reset, inProgress, toggleProgress, onChangeDuration, setSoundName, onChangeSound, duration, setDuration, soundName, setTimeLeftInMilliseconds} = props.bottomThirdProps;

    const [durationSelectionMenuVisible, setDurationSelectionMenuVisible] = useState(false);
    const [soundSelectionMenuVisible, setSoundSelectionMenuVisible] = useState(false);

        const timeItems = [
        {label: '30 seconds', value: '0.5'},
        {label: '1 minute', value: '1'},
        {label: '2 minutes', value: '2'},
        {label: '3 minutes', value: '3'},
        {label: '5 minutes', value: '5'},
        {label: '10 minutes', value: '10'},
    ];

    const soundItems = [
        {label: 'Ocean', value: 'Ocean'},
        {label: 'Rain', value: 'Rain'},
        {label: 'Forest', value: 'Forest'},
        {label: 'Fire', value: 'Fire'},
        {label: 'Wind', value: 'Wind'},
        {label: 'White Noise', value: 'White Noise'},
    ];

    return (
        <View style={bottomThirdStyles.bottomThird}>

            {/*{true && <SelectionMenu/>}*/}
            {durationSelectionMenuVisible && <SelectionMenu onChange={onChangeDuration} setVisible={setDurationSelectionMenuVisible} items={timeItems}/>}
            {soundSelectionMenuVisible && <SelectionMenu onChange={onChangeSound} setVisible={setSoundSelectionMenuVisible} items={soundItems}/>}

            {(!durationSelectionMenuVisible && !soundSelectionMenuVisible) &&
            // {false &&
                <View style={bottomThirdStyles.smallContainer}>
                    <View style={bottomThirdStyles.leftHalf}>
                        <View style={bottomThirdStyles.smallButton}>
                            {/*<DurationPicker onChange={onChangeDuration}/>*/}
                            <Text style={topThirdStyles.smallButtonText}
                                  onPress={() => setDurationSelectionMenuVisible(!durationSelectionMenuVisible)}>{addUnitsToDuration(duration)}</Text>
                        </View>
                    </View>
                    <View style={bottomThirdStyles.rightHalf}>
                        <View style={bottomThirdStyles.smallButton}>
                            {/*<SoundPicker onChange={onChangeSound}/>*/}
                            <Text style={topThirdStyles.smallButtonText}
                                  onPress={() => setSoundSelectionMenuVisible(!soundSelectionMenuVisible)}>{soundName}</Text>
                        </View>

                    </View>
                </View>
            }

        </View>
    );
}

