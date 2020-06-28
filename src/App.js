import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: '1', name: 'Task1', isCompleted: false, isDeleted: false },
        { id: '2', name: 'Task2', isCompleted: false, isDeleted: false }
      ],
      name: ''
    };

    this.isChangedName = this.isChangedName.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask = (event) => {
    event.preventDefault();
    const currentTasks = this.state.tasks;
    let id = this.state.name + Math.floor(Math.random() * 10);
    currentTasks.push({ id: id, name: this.state.name, isCompleted: false, isDeleted: false });
    this.setState({ tasks: currentTasks });

  }

  deleteTaskHandler = taskIndex => {
    // const persons = this.state.persons.slice();
    const tasks = [...this.state.tasks];
    tasks[taskIndex].isDeleted = true;
    tasks.splice(taskIndex, 1);
    this.setState({ tasks: tasks });
  };

  completedTaskHandler = id => {
    const taskIndex = this.state.tasks.findIndex(t => {
      return t.id === id;
    });

    const task = { ...this.state.tasks[taskIndex] }

    if (task.isCompleted === false) {
      task.isCompleted = true;
      const tasks = [...this.state.tasks];
      tasks[taskIndex] = task;

      this.setState({ tasks: tasks });
    } else {
      task.isCompleted = false;
      const tasks = [...this.state.tasks];
      tasks[taskIndex] = task;

      this.setState({ tasks: tasks });
    }

  }

  isChangedName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Todo List Javascript</h1>
        </header>

        <form>
          <input type="text" className="todo-input" maxLength="40" onChange={this.isChangedName} />
          <button className="todo-button" onClick={(event) => { this.addTask(event) }}>
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
            <select name="todos" className="filter-todo">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </form>
        <div className="todo-container">
          <ul className="todo-list">
            {
              this.state.tasks.map((task, index) =>
                <TodoList
                  name={task.name}
                  key={task.id}
                  id={task.id}
                  completed={task.isCompleted}
                  deleted={task.isDeleted}
                  index={index}
                  delClicked={taskIndex => this.deleteTaskHandler(taskIndex)}
                  completedClicked={this.completedTaskHandler}
                />
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
