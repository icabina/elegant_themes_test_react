import React, { useEffect, useState } from "react";
import useSWR from "swr"; //stale-while-revalidate

//code for requests, anything that returns a promise

import TodoList from "./components/TodoList";
//import ContactList from "./components/ContactList.test";
import { convert } from "./components/Currency";

const App = () => {
  /*  constructor(props) {
    super(props);

    this.state = {
      title: "",
      todos: [],
    };

    this._onChangeTitle = this._onChangeTitle.bind(this);
    this._onClickAdd = this._onClickAdd.bind(this);
    this._onEnterPressAdd = this._onEnterPressAdd.bind(this);
    this._onCompleteTodo = this._onCompleteTodo.bind(this);
  } */

  let [title, setTitle] = useState({
    id: "",
    titulo: "",
    complete: "",
  });

  let [todos, setTodos] = useState([]);
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    todos = localStorage.getItem("et-todos");
    if (!todos) {
      return;
    }

    setTodos(JSON.parse(todos));
  }, []);

  // componentDidUpdate() {
  //   localStorage.setItem("et-todos", JSON.stringify(this.state.todos));
  // }

  const _onCompleteTodo = (item) => {
    let nuevosTodos = [];
    let index = todos.indexOf(item);

    nuevosTodos.push(...todos);
    // console.log("nuevosTodos[id].complete", nuevosTodos[id].complete);
    nuevosTodos[index].complete = !nuevosTodos[index].complete;
    // console.log("nuevosTodos[id].complete", nuevosTodos[id].complete);
    setTodos(nuevosTodos);
  };

  const _onChangeTitle = (event) => {
    const target = event.target;
    const value = target.value;
    setTitle({ titulo: value });
  };

  const _onEnterPressAdd = (event) => {
    if (13 === event.keyCode) {
      _onClickAdd();
    }
  };

  const _onClickAdd = (event) => {
    setCounter(counter + 1);
    const nuevosTodos = [];
    nuevosTodos.push(...todos);
    nuevosTodos.push({
      id: counter,
      titulo: title.titulo,
      complete: false,
    });
    setTitle({ titulo: "" });

    setTodos(nuevosTodos);

    // this.setState({
    //   title: "",
    //   todos,
    // });
  };

  //*********************************
  const _onDeleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);

    setTodos(newTodos);
  };
  //*********************************

  const _renderHeader = () => {
    // const { title } = this.state;

    return (
      <div className="todos-app-header card-header" data-testid="ap">
        <h2>ToDo</h2>
        <div className="input-group">
          <input
            type="text"
            name="title"
            placeholder="What do you need to do?"
            className="form-control add-new-todo"
            data-testid="add-new-todo"
            onChange={_onChangeTitle}
            onKeyDown={_onEnterPressAdd}
            value={title.titulo}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={_onClickAdd}
            >
              <span
                className=""
                style={{
                  fontSize: "24px",
                  lineHeight: "16px",
                }}
              >
                +
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  //*********************************
  //
  //
  //
  //===============================
  const [base, destination] = ["USD", "CAD"];
  const { data: rate, error } = useSWR([base, destination], convert);

  if (error) console.log(<span>Error!</span>);
  if (!rate) console.log(<span>Loding!</span>);
  //
  //
  //
  //
  //===============================
  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-6 offset-md-3 mt-2">
          <div className="todos-app card">
            {_renderHeader()}

            <div className="card-body">
              <TodoList
                todos={todos}
                onCompleteTodo={_onCompleteTodo}
                onDeleteTodo={_onDeleteTodo}
              />
              {/* <ContactList /> */}
              <div>
                {base} to {destination} = {rate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
