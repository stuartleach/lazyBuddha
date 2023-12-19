import {StyleSheet, Text, View} from "react-native";
import {BigStartButtonProps, BottomThirdProps, ControlsProps} from "@types";
import React, {useState} from "react";
import RNPickerSelect from "react-native-picker-select";
import {SoundTitle} from "@utils";
import {bottomThirdStyles, pickerSelectStyles} from "@styles/theme";


function DurationPicker({onChange}) {
    const [selectedValue, setSelectedValue] = useState("2");
    const handleValueChange = (value: React.SetStateAction<string>) => {
        setSelectedValue(value);
        onChange(value);
    };
    return (
        <RNPickerSelect
            onValueChange={handleValueChange}
            value={selectedValue}
            items={[
                {label: '30 seconds', value: '30'},
                {label: '1 minute', value: '1'},
                {label: '2 minutes', value: '2'},
                {label: '3 minutes', value: '3'},
                {label: '5 minutes', value: '5'},
                {label: '10 minutes', value: '10'},
            ]}
            style={pickerSelectStyles}
        />
    );
}

const SoundPicker = ({onChange}) => {
    const soundNames = Object.keys(SoundTitle);
    const [selectedValue, setSelectedValue] = useState("Ocean");
    const handleValueChange = (value: string) => {
        setSelectedValue(value);
        onChange(value);
    };
    const soundItems = soundNames.map(sound => ({label: sound, value: sound}));
    return (

        <RNPickerSelect
            onValueChange={handleValueChange}
            value={selectedValue}
            items={soundItems}
            style={{...pickerSelectStyles}}
            useNativeAndroidPickerStyle={false}
        />
    );
}


export const BottomThird = (props: {
    bottomThirdProps: BottomThirdProps
}) => {
    const {reset, inProgress, toggleProgress, onChangeDuration, setSoundName, onChangeSound} = props.bottomThirdProps;
    return (
        <View style={bottomThirdStyles.bottomThird}>
            <View style={bottomThirdStyles.leftHalf}>
                <View style={bottomThirdStyles.smallButton}>
                    <DurationPicker onChange={onChangeDuration}/>
                </View>
            </View>
            <View style={bottomThirdStyles.rightHalf}>
                <View style={bottomThirdStyles.smallButton}>
                    <SoundPicker onChange={onChangeSound}/>
                </View>
            </View>
        </View>
    );
}

