import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BuddhaButtonProps } from '@types'

export const BuddhaButton: React.FC<BuddhaButtonProps> = (props: BuddhaButtonProps) => {
    const { title, action, selected, style } = props
    return (
        <View style={[selected ? styles.buttonSelected : styles.button, style]}>
            <Text style={styles.text} onPress={action}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#17021A',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'column',
    },
    buttonSelected: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
