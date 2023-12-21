import { render } from '@testing-library/react-native'
import React from 'react'
import { ControlPanel } from '@screens/MeditationScreen/ControlPanel'

describe('TopThird', () => {
    it('renders correctly', () => {
        const mockProps = {
            topThirdProps: {
                playing: false,
                startSession: jest.fn(),
                pauseSession: jest.fn(),
                resumeSession: jest.fn(),
                resetSession: jest.fn(),
                endSession: jest.fn(),
                testID: 'top-third',
            },
        }

        const { getByText } = render(<ControlPanel {...mockProps} />)
        expect(getByText('Start')).toBeTruthy()
        expect(getByText('End')).toBeTruthy()
        expect(getByText('Reset')).toBeTruthy()
    })
})
