import { render } from '@testing-library/react-native'
// import babel test utils
import '@testing-library/jest-native/extend-expect'
import React from 'react'
import { MeditationTimer } from '@screens/MeditationScreen/MeditationTimer'

describe('MeditationTimer', () => {
    it('renders correctly', () => {
        const mockProps = {
            meditationTimerProps: {
                height: 100,
                duration: 1,
                playing: false,
                setTimeLeftInMilliseconds: jest.fn(),
                timeLeftInMilliseconds: 60000,
                started: false,
                testID: 'middle-third',
                isRunning: false,
            },
        }
        const { getByTestId } = render(<MeditationTimer {...mockProps} />)
    })
})

console.log('Hello World')
