import React from "react";

/* class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this._onCompleteCheck = this._onCompleteCheck.bind(this);
  }

  _onCompleteCheck(event) {
    const { id, onComplete } = this.props;

    onComplete(id);
  }

  _renderCheckbox() {
    const { complete } = this.props;
    const attrs = {};

    if (complete) {
      attrs.checked = "checked";
    }

    return (
      <div className="col-2 todo-item__checkbox">
        <input
          type="checkbox"
          className="form-control"
          onChange={this._onCompleteCheck}
          {...attrs}
        />
      </div>
    );
  } */

const TodoItem = (props) => {
  // this._onCompleteCheck = this._onCompleteCheck.bind(this);
  // const onCompleteCheck = () => {
  // //data has many inputs.name === each data property name, replace the one sent dynamicay by name atribute

  // };

  /*   const onCompleteCheck = (event) => {
    const { id, onComplete } = props.title;
    onComplete(id);
  }; */

  const _renderCheckbox = () => {
    const { complete } = props.item;
    const attrs = {};

    if (complete) {
      attrs.checked = "checked";
    } else {
      attrs.checked = "";
    }

    return (
      <div className="col-2 todo-item__checkbox">
        <input
          type="checkbox"
          className="form-control"
          onChange={() => {
            // alert("hey");
            props.onCompleteTodo(props.item);
          }}
          {...attrs}
        />
      </div>
    );
  };

  return (
    <li className="list-group-item todo-item">
      <div className="row">
        {_renderCheckbox()}
        <div className="col-10 todo-item__title">
          <h3>
            {props.item.id}. {props.item.titulo}
          </h3>
          <p>{props.item.complete ? "complete" : "not-complete"}</p>

          <button
            onClick={() => props.onDeleteTodo(props.item.id)}
            className="deleteBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
