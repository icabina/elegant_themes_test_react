import {
  render,
  screen,
  fireEvent,
  getByTestId,
  queryByTestId,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

afterEach(cleanup);
//===================
test("renders todo app", () => {
  render(<App />);
  const title = screen.getByText(/ToDo/i);
  expect(title).toBeInTheDocument();
});
//===================

test("adds new todos", () => {
  const { container } = render(<App />);

  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(container.querySelector(".add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));

  expect(container.querySelector(".todo-list").textContent).toContain(todoText);
  expect(container.querySelector(".add-new-todo").value).not.toContain(
    todoText
  );
});

//===================
test("deletes todos", () => {
  const { container } = render(<App />);
  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(container.querySelector(".add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));
  // expect(container.querySelector(".todo-list").textContent).toContain(todoText);
  // expect(container.querySelector(".add-new-todo").value).not.toContain(
  //   todoText
  // );
  fireEvent.click(screen.getByText(/Delete/i));
  expect(container.querySelector(".todo-list").textContent).not.toContain(
    todoText
  );
});
