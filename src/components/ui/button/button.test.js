import React from "react";
import { Button } from "./button";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button component', () => {
  test('renders correctly with text', () => {
    render(<Button text={'press'} />);
    const button = screen.getByRole('button'); 
    expect(button).toMatchSnapshot();
  });

  test('renders correctly without text', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toMatchSnapshot();
  });

  test('renders correctly whith loader', () => {
    render(<Button isLoader={true} />);
    const button = screen.getByRole('button');
    expect(button).toMatchSnapshot();
  });

  test('renders correctly while disabled', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toMatchSnapshot();
  });

  test('calls onClick callback when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />)
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  })
});
