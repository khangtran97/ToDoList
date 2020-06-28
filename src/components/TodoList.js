import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);

        const { deleted, completed } = this.props;
    }

    onDelClicked = () => {
        const { index, delClicked } = this.props;
        delClicked(index);
    }

    onCompleted = () => {
        const { id, completedClicked } = this.props;
        completedClicked(id);
    }
    render() {
        let classname = '';
        if (this.props.deleted) {
            classname = 'todo fall';
        } else if (this.props.completed) {
            classname = 'todo completed';
        } else {
            classname = 'todo';
        }
        return (
            <div className={classname}>
                <li className="todo-item">{this.props.name}</li>
                <button className="check-btn" onClick={this.onCompleted}>
                    <i className="fas fa-check"></i>
                </button>
                <button className="trash-btn" onClick={this.onDelClicked}>
                    <i className='fas fa-trash'></i>
                </button>
            </div>
        )
    }
}

export default TodoList;