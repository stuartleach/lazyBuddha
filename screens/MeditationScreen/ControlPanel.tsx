import {StyleSheet, Text, View} from "react-native";
import {BigStartButtonProps, ControlsProps} from "../../types";
import React, {useState} from "react";
import RNPickerSelect from "react-native-picker-select";
import {SoundTitle} from "../../utils";
import {fontTheme, theme} from "../../styles/theme";

const buttonRadius = 10;


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
            style={pickerSelectStyles}
        />
    );
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: theme.backgroundTheme,
        borderColor: 'purple',
        borderRadius: buttonRadius,
        color: theme.textTheme,
        paddingRight: 30,
        fontWeight: 'bold',
        fontFamily: fontTheme.bold,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: theme.backgroundTheme,
        borderColor: 'purple',
        borderRadius: buttonRadius,
        color: theme.textTheme,
        paddingRight: 30,
    },
});

export function BigStartButton({inProgress, toggleProgress, style}: BigStartButtonProps) {
    return (
        <View style={[bigStartStyles.button, style]}>
            <Text
                style={bigStartStyles.text}
                onPress={toggleProgress}
            >
                {inProgress ? "Stop" : "Start"}
            </Text>
        </View>
    );
}

const bigStartStyles = StyleSheet.create({
    button: {
        padding: 20,
        margin: 10,
        borderRadius: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontSize: 50,
        fontWeight: 'bold',
    }
});

export const ResetButton = (props) => {
    const {reset} = props;
    return (
        <View>
            <Text style={[controlsStyles.controlsHeaderText, {fontSize: 18 }]} onPress={reset}>Reset</Text>
        </View>
    );
}

export const ControlPanel = (props: ControlsProps) => {
    const {inProgress, toggleProgress, onChangeDuration, onChangeSound, reset} = props;
    return (
        <View style={controlsStyles.pickerContainer}>
            <View style={controlsStyles.picker}>
                {/*<Text style={controlsStyles.controlsHeaderText}>Duration:</Text>*/}
                <DurationPicker onChange={onChangeDuration}/>
            </View>
            <View style={controlsStyles.picker}>
                {/*<Text style={controlsStyles.controlsHeaderText}>Sound:</Text>*/}
                <SoundPicker onChange={onChangeSound}/></View>
        </View>
    );
}
const controlsStyles = StyleSheet.create({
    controlsButton: {},
    controlsHeaderText: {
        fontSize: 14,
        fontFamily: fontTheme.light,
        marginVertical: 10,
        color: theme.textTheme,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    picker: {
        width: '40%',
        padding: 5,
        margin: 10,
        backgroundColor: theme.textTheme,
        opacity: 0.8,
        borderRadius: buttonRadius + 5,
    },
})