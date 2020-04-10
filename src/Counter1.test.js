import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter1';

function renderCounter() {
  const utils = render(<Counter initialCount={3} maxClicks={4} />);
  const counterButton = utils.getByText(/count/i);
  return { ...utils, counterButton };
}

test('counter is initialized to initial count', () => {
  const { counterButton } = renderCounter();
  expect(counterButton).toHaveTextContent(3);
});

test('When click, counter increments the click', () => {
  const { counterButton } = renderCounter();
  fireEvent.click(counterButton);
  expect(counterButton).toHaveTextContent(4);
});

test('the counter button is disabled when it hit maxClicks', () => {
  const { counterButton } = renderCounter();
  fireEvent.click(counterButton);
  expect(counterButton).toHaveAttribute('disabled');
});

test('the counter button does not increment the count when clicked when it hit the maxClicks', () => {
  const { counterButton } = renderCounter();
  fireEvent.click(counterButton);
  fireEvent.click(counterButton);
  expect(counterButton).toHaveTextContent(4);
});

test('the reset button has been rendered and resets the count when it hit the maxClicks', () => {
  const { counterButton, getByText } = renderCounter();
  fireEvent.click(counterButton);
  fireEvent.click(getByText(/reset/i));
  expect(counterButton).toHaveTextContent('3');
});
