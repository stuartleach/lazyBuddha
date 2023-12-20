import { render } from '@testing-library/react-native';
// import babel test utils
import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { MiddleThird } from '@screens/MeditationScreen/MiddleThird';

describe('MiddleThird', () => {
    it('renders correctly', () => {
        const mockProps = {
            middleThirdProps: {
                height: 100,
                duration: 1,
                playing: false,
                setTimeLeftInMilliseconds: jest.fn(),
                timeLeftInMilliseconds: 60000,
                started: false
            }
        };

        const { getByTestId } = render(<MiddleThird {...mockProps} />);
        expect(getByTestId('meditation-timer')).toBeTruthy();
    });
});