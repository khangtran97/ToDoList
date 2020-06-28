import React, { Component } from 'react';

import Aux from '../hoc/Aux';

class Task extends Component {
    render() {
        return (
            <Aux>
                <li className="todo-item">{this.props.name}</li>
                <button className="check-btn" >
                    <i className="fas fa-check"></i>
                </button>
                <button className="trash-btn">
                    <i className='fas fa-trash'></i>
                </button>
            </Aux>
        )
    }
}

export default Task;