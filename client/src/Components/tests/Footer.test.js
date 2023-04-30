import React from 'react'
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';


test('renders Copyrigth', () => {
    render(<Footer />);
    const element = screen.getByTestId('test1');
    expect(element).toBeInTheDocument();
});

test('renders main', () => {
    render(<Footer />);
    const element = screen.getByTestId('test2');
    expect(element).toBeInTheDocument();
});