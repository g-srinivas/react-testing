import React from "react";

import { render, fireEvent } from "@testing-library/react";
import HiddenMessage from "./hidden-message";

test("Shows the children when checkbox is checked", () => {
  const testMessage = "Test Message";
  const { queryByText, getByLabelText, getByText } = render(
    <HiddenMessage>{testMessage}</HiddenMessage>
  );

  expect(queryByText(testMessage)).toBeNull();
  fireEvent.click(getByLabelText(/show/i));
  expect(getByText(testMessage)).toBeInTheDocument();
});
