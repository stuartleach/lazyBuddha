import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type CircularProgressProps = {
    strokeWidth: number;
    radius: number;
    backgroundColor: string;
    percentageComplete: number;
};


export const CircularProgress: FC<CircularProgressProps> = ({
                                                                radius,
                                                                strokeWidth,
                                                                backgroundColor,
                                                                percentageComplete,
                                                            }) => {
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;


    return (
        <View style={styles.container}>
            <Svg style={StyleSheet.absoluteFill}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    fill={'transparent'}
                    stroke={backgroundColor}
                    strokeDasharray={circumference}
                    strokeWidth={strokeWidth}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});