import React from 'react'
import { Text, View } from 'react-native'
import { mainStyles } from '@/styles'

export function SettingsScreen() {
    return (
        <View style={mainStyles.main}>
            <View style={mainStyles.container}>
                <View>
                    <Text>Settings</Text>
                </View>
            </View>
        </View>
    )
}
