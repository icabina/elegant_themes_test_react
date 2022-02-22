import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  queryByTestId,
  cleanup,
  waitForElementToBeRemoved,
  getByRole,
} from "@testing-library/react";

import { jest } from "@jest/globals";
//*****************************
import { rest, server } from "./testServer";

//*****************************
import App from "./App";

afterEach(cleanup);
//===================
test("renders todo app", () => {
  render(<App />);
  const title = screen.getByText(/ToDo/i); // capitals or  not
  expect(title).toBeInTheDocument();
});
//===================

test("adds new todos", () => {
  render(<App />);

  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });
  // container.firstChild.className
  expect(screen.getByTestId("add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));
  //after a click in the screen

  expect(screen.getByTestId("todo-list")).toBeInTheDocument();

  expect(
    screen.queryByTestId(document.documentElement, "does-not-exist")
  ).not.toBeInTheDocument();

  expect(screen.getByTestId("todo-list").textContent).toContain(todoText);

  expect(screen.getByTestId("add-new-todo").value).not.toContain(todoText);
});

//===================
test("deletes todos", () => {
  render(<App />);
  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(screen.getByTestId("add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));

  fireEvent.click(screen.getByText(/Delete/i));
  expect(screen.getByTestId("todo-list").textContent).not.toContain(todoText);
});
//===================
test("renders Convert operation", async () => {
  const { findByText } = render(<App />);
  const element = await screen.findByText(/USD to CAD = 1.42/i);
  expect(element).toBeInTheDocument();
});
