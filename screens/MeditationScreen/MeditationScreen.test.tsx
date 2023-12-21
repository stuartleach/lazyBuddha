import { render } from '@testing-library/react-native'
import React from 'react'
import { MeditationScreen } from '@screens/MeditationScreen/MeditationScreen'

describe('MeditationScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<MeditationScreen />)
        expect(getByTestId('control-panel')).toBeTruthy()
        expect(getByTestId('meditation-timer')).toBeTruthy()
        expect(getByTestId('config-panel')).toBeTruthy()
    })
})
