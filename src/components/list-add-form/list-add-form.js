import React, {Component} from 'react';

import './list-add-form.css';

export default class ListAddForm extends Component {

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
        const cb = this.props.onListAdded || (() => {});
        cb(label);
    };

    render() {
        return (
            <form
                className="list-add-panel d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                       className="form-control new-list-label"
                       value={this.state.label}
                       onChange={this.onLabelChange}
                       placeholder="Enter new Todo"/>

                <button type="submit"
                        className="btn btn-success rounded-circle">+
                </button>
            </form>
        );
    }
}