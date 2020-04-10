import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter1';

let getByText, counterButton;

beforeEach(() => {
  const utils = render(<Counter initialCount={3} maxClicks={4} />);
  getByText = utils.getByText;
  counterButton = getByText(/count/i);
});

test('counter is initialized to initial count', () => {
  expect(counterButton).toHaveTextContent(3);
});

test('When click, counter increments the click', () => {
  fireEvent.click(counterButton);
  expect(counterButton).toHaveTextContent(4);
});

test('the counter button is disabled when it hit maxClicks', () => {
  fireEvent.click(counterButton);
  expect(counterButton).toHaveAttribute('disabled');
});

test('the counter button does not increment the count when clicked when it hit the maxClicks', () => {
  fireEvent.click(counterButton);
  fireEvent.click(counterButton);
  expect(counterButton).toHaveTextContent(4);
});

test('the reset button has been rendered and resets the count when it hit the maxClicks', () => {
  fireEvent.click(counterButton);
  fireEvent.click(getByText(/reset/i));
  expect(counterButton).toHaveTextContent('3');
});
