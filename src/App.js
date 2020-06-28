import React, { Component } from 'react';
import './App.css';
import ListTask from './components/List'
import { TASK_STATUS } from './common/constant'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: '1', name: 'Task1', isCompleted: false, isDeleted: false },
        { id: '2', name: 'Task2', isCompleted: false, isDeleted: false }
      ],
      name: '',
      filterList: []
    };

    this.isChangedName = this.isChangedName.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    this.setState({filterList: [...this.state.tasks]})
  }

  addTask = (event) => {
    event.preventDefault();
    const currentTasks = this.state.tasks;
    let id = this.state.name + Math.floor(Math.random() * 10);
    currentTasks.push({ id: id, name: this.state.name, isCompleted: false, isDeleted: false });
    this.setState({ tasks: currentTasks }, () => this.refetchTasksList());
  }



  // deleteTaskHandler = taskIndex => {
  //   // const persons = this.state.persons.slice();
  //   const tasks = [...this.state.tasks];
  //   tasks.splice(taskIndex, 1);
  //   this.setState({ tasks: tasks });
  // };

  addClassDelete = taskIndex => {
    const tasks = [...this.state.tasks];
    tasks[taskIndex].isDeleted = true;
    this.setState({ tasks: tasks });
    setTimeout(() => {
      const tasks = [...this.state.tasks];
      tasks.splice(taskIndex, 1);

      this.setState({ tasks }, () => this.refetchTasksList());
    }, 500);
  }

  completedTaskHandler = id => {
    const taskIndex = this.state.tasks.findIndex(t => {
      return t.id === id;
    });

    const currentTask = { ...this.state.tasks[taskIndex] }

    if (currentTask.isCompleted === false) {
      currentTask.isCompleted = true;
    } else {
      currentTask.isCompleted = false;
    }

    const cloneTasks = [...this.state.tasks];
    cloneTasks[taskIndex] = currentTask;
    this.setState({ tasks: cloneTasks }, () => this.refetchTasksList());

    
  }

  refetchTasksList = () => {
    this.setState({filterList: [...this.state.tasks]})
  }

  isChangedName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  renderFilterList = (tasks, filterCondition) => {
    const filterConditionParseToInt = parseInt(filterCondition);
    if (filterConditionParseToInt === 1) return tasks;
    const isCompletedTasks = filterConditionParseToInt === 2;
    const filtered = tasks.filter(task => task.isCompleted === isCompletedTasks);
    return filtered;
  }

  onChangeFilterHandler = changedValue => {
    const { tasks } = this.state;
    const filterCondition = changedValue.target.value
    console.log('changedValue', filterCondition);
    
    this.setState({
      filterList: this.renderFilterList(tasks, filterCondition)
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
            <select name="todos" className="filter-todo" onChange={(value) => this.onChangeFilterHandler(value)}>
              {
                TASK_STATUS.map(taskStatus => (
                  <option key={taskStatus.id} value={taskStatus.id}>
                    {taskStatus.name}
                  </option>
                ))
              }
            </select>
          </div>
        </form>
        <ListTask
          addClassDelete={this.addClassDelete}
          completedTaskHandler={this.completedTaskHandler}
          taskslist={this.state.filterList}
        />
      </div>
    );
  }
}

export default App;
