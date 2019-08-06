import React from 'react';
import './item_done.css';

const ItemDone = ({toDo, done}) => {
    return (
        <div className="app-header d-flex">
            <h2>{done} of {toDo} Done</h2>
        </div>
    );
};

export default ItemDone;
