import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Timer from '../Timer';

describe('<Timer />', function() {
  test('at default state, all buttons are disabled except for those that add seconds', function() {
    render(<Timer />);

    expect(screen.getByRole('button', { name: '' })).toBeVisible();
  });
});