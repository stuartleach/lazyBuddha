import { render } from '@testing-library/react-native';
import React from 'react';
import { MeditationScreen } from '@screens/MeditationScreen/MeditationScreen';

describe('MeditationScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<MeditationScreen />);
        expect(getByTestId('top-third')).toBeTruthy();
        expect(getByTestId('middle-third')).toBeTruthy();
        expect(getByTestId('bottom-third')).toBeTruthy();
    });
});