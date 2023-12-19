import {StyleSheet, Text, View} from "react-native";
import {BigStartButtonProps, ControlsProps} from "@types";
import React, {useState} from "react";
import RNPickerSelect from "react-native-picker-select";
import {SoundTitle} from "@utils";
import {fontTheme, theme} from "@styles";
import {hexToRGB} from "@utils/themeUtils";


function DurationPicker({onChange}) {
    const [selectedValue, setSelectedValue] = useState("2");
    const handleValueChange = (value: React.SetStateAction<string>) => {
        setSelectedValue(value);
        onChange(value);
    };
    return (
        <View style={{justifyContent: "center"}}>
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
            /></View>
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
        <View style={{
            justifyContent: "center",
        }}>
            <RNPickerSelect
                onValueChange={handleValueChange}
                value={selectedValue}
                items={soundItems}
                style={{...pickerSelectStyles}}
                useNativeAndroidPickerStyle={false}
            /></View>
    );
}

const buttonRadius = 10;


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: buttonRadius,
        color: "white",
        fontWeight: 'bold',
        fontFamily: fontTheme.black,
    },

    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: buttonRadius,
        color: "white",
        fontWeight: 'bold',
        fontFamily: fontTheme.black,
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
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: theme.buttonBackground,
        width: "100%",
        borderColor: hexToRGB(theme.textTheme, 0.1),
        borderStyle: "solid",
    },
    text: {
        textAlign: 'center',
        fontFamily: fontTheme.black,
        color: theme.textTheme,
        fontSize: 50,
        fontWeight: 'bold',
    }
});

export const ResetButton = (props: { reset: () => void; }) => {
    const {reset} = props;
    return (
        <View style={[bigStartStyles.button, resetButtonStyles.button]}>
            <Text style={[controlsStyles.controlsHeaderText, bigStartStyles.text, resetButtonStyles.text]}
                  onPress={reset}>Reset</Text>
        </View>
    );
}

const resetButtonStyles = StyleSheet.create({
    button: {
        width: "100%"
    },
    text: {
        fontSize: 18,
    }
});

export const PauseButton = (props: { pause: () => void; }) => {
    const {pause} = props;
    return (
        <View style={[bigStartStyles.button, resetButtonStyles.button]}>
            <Text style={[controlsStyles.controlsHeaderText, bigStartStyles.text, resetButtonStyles.text]}
                  onPress={pause}>Pause</Text>
        </View>)
        ;
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
        padding: 10,
        margin: 10,
        // backgroundColor: hexToRGB(theme.textTheme, 0.1),
        backgroundColor: theme.buttonBackground,
        opacity: 0.8,
        borderRadius: buttonRadius + 3,
        alignItems: 'center',
    },
})