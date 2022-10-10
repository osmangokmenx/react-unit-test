import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "./App";
import userEvent from "@testing-library/user-event";

test("renders all fields", () => {
  render(<App />);
  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const error = screen.getByTestId("error-message");
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

test("passowrd input toggle-hide works", async () => {
  render(<App />);

  const showHideButton = screen.getByRole("button", { name: /show/i });
  expect(showHideButton).toBeInTheDocument();

  await userEvent.click(showHideButton);
  expect(showHideButton).toHaveTextContent(/hide/i);
});

test("input validation works", async () => {
  render(<App />);

  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button", { name: /Login/i });
  const error = screen.getByTestId("error-message");

  await userEvent.click(loginButton);

  expect(error).toHaveTextContent(/fill/i);

  await userEvent.type(emailField, "osman");

  await userEvent.click(loginButton);

  expect(error).toHaveTextContent(/fill/i);

  await userEvent.type(passwordField, "osman");
  await userEvent.click(loginButton);

  expect(error).toHaveTextContent(/password/i);

  await userEvent.type(passwordField, "123456");
  await userEvent.click(loginButton);

  expect(error).toHaveTextContent("");
});
