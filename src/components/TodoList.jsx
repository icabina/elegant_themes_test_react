import React from "react";
import map from "lodash/map";

import TodoItem from "./TodoItem";
const TodoList = (props) => {
  let counter = 0;
  return (
    <ul className="list-group todo-list">
      {props.todos.map((item) => (
        <TodoItem
          key={counter++}
          item={item}
          onCompleteTodo={props.onCompleteTodo}
          onDeleteTodo={props.onDeleteTodo}
          value={item.complete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
