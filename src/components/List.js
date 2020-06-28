import React, { Component } from "react";
import TodoList from './TodoList';

class ListTask extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { addClassDelete, completedTaskHandler, taskslist } = this.props;
    return (
      <div className="todo-container">
        <ul className="todo-list">
          {taskslist.map((task, index) => (
            <TodoList
              name={task.name}
              key={task.id}
              id={task.id}
              completed={task.isCompleted}
              deleted={task.isDeleted}
              index={index}
              delClicked={addClassDelete}
              completedClicked={completedTaskHandler}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ListTask;
