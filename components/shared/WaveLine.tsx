import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const WaveLine = () => {
    const waveAnim = useSharedValue(0)

    React.useEffect(() => {
        waveAnim.value = withRepeat(withTiming(5, { duration: 2000 }), -1, true)
    }, [])

    const generateWavePath = (width: number, height: number, amplitude: number, frequency: number, phase: number) => {
        let path = `M 0 ${height / 2}`
        for (let x = 0; x <= width; x++) {
            const y = height / 2 + amplitude * Math.sin(((2 * Math.PI) / frequency) * x + phase)
            path += ` L ${x} ${y}`
        }
        return path
    }

    const animatedProps = useAnimatedProps(() => ({
        d: generateWavePath(300, 100, 20, 100, waveAnim.value),
    }))

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Svg height='100' width='300'>
                <AnimatedPath animatedProps={animatedProps} fill='none' stroke='blue' strokeWidth='2' />
            </Svg>
        </View>
    )
}
