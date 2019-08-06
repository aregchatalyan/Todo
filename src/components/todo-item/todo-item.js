import React from 'react';

import './todo-item.css';

const TodoItem = ({items, onToggleDone}) => {

    const todo = items.map((item) => {
        let classNames = 'todo-item';

        classNames += item.done ? ' done' : '';
        return (
            <li key={item.id} className="list-group-item text-left">
                <span className={classNames}>
                    <input type="checkbox" defaultChecked={item.done} className="check" onClick={() => onToggleDone(item.id)}/>
                    <span className="todo-item-label ml-1">
                        {item.label}
                    </span>
                </span>
            </li>
        );
    });

    return (
        <ul className="todo-list list-group">
            {todo}
        </ul>
    );
};

export default TodoItem;
