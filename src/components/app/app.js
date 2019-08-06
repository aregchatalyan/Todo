import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

import ItemDone from '../item-done';
import TodoList from '../todo-list';
import TodoItem from '../todo-item';
import SearchPanel from '../search-panel';
import ItemAddForm from '../item-add-form';
import ListAddForm from '../list-add-form';
import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        items: [
            {id: 1, label: 'Private', active: false},
            {id: 2, label: 'Work', active: false},
            {id: 3, label: 'Training', active: false},
            {id: 4, label: 'Friends', active: false}
        ],
        list: [
            {id: 1, itemId: 2, label: 'Ask for a raise', done: false},
            {id: 2, itemId: 2, label: 'Scream at my co-workers', done: false},
            {id: 3, itemId: 2, label: 'Send out the recent paperwork', done: false},
            {id: 4, itemId: 2, label: 'Buy a present for my Boss', done: false},
            {id: 5, itemId: 2, label: 'Watch funny videos on youtube when nobody is looking', done: false}

        ],
        activeList: [],
        search: '',
        activeTab: null
    };

    onItemAdded = (label) => {
        if(label)
        this.setState((state) => {
            const item = {
                id: ++this.maxId,
                label,
                active: false
            };;
            return {items: [...state.items, item]};
        })
    };

    onListAdded = (label) => {
        if(label)
        this.setState((state) => {
            const item = {
                id: ++this.maxId,
                itemId: this.state.activeTab,
                label,
                done: false
            };

            return {
                activeList: [...state.activeList, item],
                list: [...state.list, item]
            };
        })
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];
        const item = {...arr[idx], [propName]: value};
        return [
            ...arr.slice(0, idx),
            item,
            ...arr.slice(idx + 1)
        ];
    };

    onActiveTab = (id) => {

        this.setState((state) => {
            const list = state.list.filter((item) => {
                return item.itemId === id
            });

            state.items.map((item)=>item.active = false)
            const items = this.toggleProperty(state.items, id, 'active');

            return {
                activeList: list,
                activeTab: id,
                items
            };
        });
    };

    onToggleDone = (id) => {
        this.setState((state) => {
            const activeList = this.toggleProperty(state.activeList, id, 'done');
            const list = this.toggleProperty(state.list, id, 'done');
            return {activeList, list};
        });
    };

    onSearchChange = (search) => {
        this.setState({search});
    };

    searchItems(items, search) {
        if (search.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    }

    componentDidMount = () => {
        this.onActiveTab(2)
    }

    render() {
        const {items, search, activeList} = this.state;
        const doneCount = activeList.filter((item) => item.done).length;
        const toDoCount = activeList.length;
        const visibleItems = this.searchItems(items, search);

        return (
            <div className="container todo-app">
                <div className="row app-content">
                    <div className="col-md-4 p-0 border">
                        <h4 className="m-2">Todo Lists</h4>
                        <div className="search-panel d-flex">
                            <SearchPanel
                                onSearchChange={this.onSearchChange}/>
                        </div>
                        <TodoList
                            items={visibleItems}
                            onActiveTab={this.onActiveTab}
                            onListAdded={this.onListAdded}/>
                        <ItemAddForm
                            onItemAdded={this.onItemAdded}/>
                    </div>
                    <div className="col-md-8 border">
                        <div className="row d-flex justify-content-between px-3">
                            <h1>Work</h1>
                            <ItemDone toDo={toDoCount} done={doneCount}/>
                        </div>
                        <TodoItem
                            items={activeList}
                            onToggleDone={this.onToggleDone}/>
                        <ListAddForm
                            onListAdded={this.onListAdded}/>
                    </div>
                </div>
            </div>
        );
    };
}
