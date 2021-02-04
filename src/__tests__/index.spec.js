import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "../overmind";
import { Main } from "../App";

test("allows to go to dashboard", async () => {
  const overmind = createOvermind(config, { devtools: false });

  render(
    <Provider value={overmind}>
      <Main />
    </Provider>
  );

  const usernameInput = screen.getByTestId("username-input");
  const passwordInput = screen.getByTestId("password-input");
  const submitBtn = screen.getByTestId("submit-btn");

  fireEvent.change(usernameInput, { target: { value: "pablito" } });
  fireEvent.change(passwordInput, { target: { value: "clavounclavito" } });
  fireEvent.click(submitBtn);

  expect(await screen.findByText("Hola, pablito")).toBeInTheDocument();
});

test("renders a error message when no credentials", async () => {
  const overmind = createOvermind(config, { devtools: false });

  render(
    <Provider value={overmind}>
      <Main />
    </Provider>
  );

  const usernameInput = screen.getByTestId("username-input");
  const passwordInput = screen.getByTestId("password-input");
  const submitBtn = screen.getByTestId("submit-btn");

  fireEvent.change(usernameInput, { target: { value: "" } });
  fireEvent.change(passwordInput, { target: { value: "" } });
  fireEvent.click(submitBtn);

  expect(await screen.findByText(/lame/i)).toBeInTheDocument();
});
