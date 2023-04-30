import React from 'react'
import { render, screen } from '@testing-library/react';
import { Login } from '../Login';


test('renders div', () => {
    render(<Login />);
    const element = screen.getByTestId('testA');
    expect(element).toBeInTheDocument();
});

test('renders Label', () => {
    render(<Login />);
    const element = screen.getByTestId('testB');
    expect(element).toBeInTheDocument();
});