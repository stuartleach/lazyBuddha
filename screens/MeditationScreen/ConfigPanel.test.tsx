import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import { ConfigPanel } from '@screens/MeditationScreen/ConfigPanel'
import { ConfigPanelProps } from '@types'

const mockProps: ConfigPanelProps = {
    reset: jest.fn(),
    playing: false,
    toggleProgress: jest.fn(),
    onChangeDuration: jest.fn(),
    setSoundName: jest.fn(),
    onChangeSound: jest.fn(),
    duration: 0.5,
    setDuration: jest.fn(),
    soundName: 'Ocean',
    setTimeLeftInMilliseconds: jest.fn(),
    testID: 'bottom-third',
}

describe('BottomThird', () => {
    it('renders correctly', () => {
        const { getByText } = render(<ConfigPanel configPanelProps={mockProps} />)
        expect(getByText('30 seconds')).toBeTruthy()
        expect(getByText('Ocean')).toBeTruthy()
    })

    it('opens duration selection menu when duration button is pressed', () => {
        const { getByText } = render(<ConfigPanel configPanelProps={mockProps} />)
        fireEvent.press(getByText('30 seconds'))
        expect(getByText('1 minute')).toBeTruthy()
    })

    it('opens sound selection menu when sound button is pressed', () => {
        const { getByText } = render(<ConfigPanel configPanelProps={mockProps} />)
        fireEvent.press(getByText('Ocean'))
        expect(getByText('Rain')).toBeTruthy()
    })

    it('calls onChangeDuration when a duration is selected', () => {
        const { getByText } = render(<ConfigPanel configPanelProps={mockProps} />)
        fireEvent.press(getByText('30 seconds'))
        fireEvent.press(getByText('1 minute'))
        expect(mockProps.onChangeDuration).toHaveBeenCalledWith('1')
    })

    it('calls onChangeSound when a sound is selected', () => {
        const { getByText } = render(<ConfigPanel configPanelProps={mockProps} />)
        fireEvent.press(getByText('Ocean'))
        fireEvent.press(getByText('Rain'))
        expect(mockProps.onChangeSound).toHaveBeenCalledWith('Rain')
    })
})
