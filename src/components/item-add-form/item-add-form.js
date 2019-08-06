import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {label} = this.state;
        this.setState({label: ''});
        const cb = this.props.onItemAdded || (() => {});
        cb(label);
    };

    render() {
        return (
            <form
                className="item-add-panel d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                       className="form-control new-item-label"
                       value={this.state.label}
                       onChange={this.onLabelChange}
                       placeholder="Enter new list name"/>

                <button type="submit"
                        className="btn btn-success rounded-circle">+
                </button>
            </form>
        );
    }
}
