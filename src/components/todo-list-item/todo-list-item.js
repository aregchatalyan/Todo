import React from 'react';

const TodoListItem = ({id, label, onActiveTab}) => {

    return (
        <span onClick={onActiveTab}>
            {label}
        </span>
    );
};

export default TodoListItem;
