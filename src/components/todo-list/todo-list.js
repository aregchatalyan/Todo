import React from 'react';
import './todo-list.css';
import TodoListItem from '../todo-list-item';

const TodoList = ({items, onActiveTab}) => {
    const elements = items.map((item) => {
        const {id, ...itemProps} = item;

        let classNames = 'list-group-item todo-list';
        classNames += item.active ? ' active' : '';

        return (
            <li key={id} className={classNames}>
                <TodoListItem
                    {...itemProps}
                    onActiveTab={() => onActiveTab(id)}/>
            </li>
        );
    });

    return (<ul className="todo-list list-group">{elements}</ul>);
};

export default TodoList;
