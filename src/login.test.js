import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Login from "./login";

test("allows the user to login successfully", async () => {
  const fakeUserResponse = { token: "fake_user_token" };
  jest.spyOn(window, "fetch").mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse),
    });
  });

  const { getByLabelText, getByText, findByRole } = render(<Login />);

  fireEvent.change(getByLabelText(/username/i), {
    target: { value: "Srinivas" },
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: "Gandikota" },
  });

  fireEvent.click(getByText(/submit/i));
  const alert = await findByRole("alert");
  // .toHaveTextContent() comes from jest-dom's assertions
  // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
  // but jest-dom will give you better error messages which is why it's recommended
  expect(alert).toHaveTextContent(/congrats/i);
  expect(window.localStorage.getItem("token")).toEqual(fakeUserResponse.token);
});
