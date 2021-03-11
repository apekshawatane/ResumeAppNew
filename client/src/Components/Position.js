import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

class Position extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: []
        }
    }

    componentDidMount() {
        axios.get('/position')
            .then(res => {
                const position = res.data;
                this.setState({ position });
            })
            .catch(err => console.log(err.message))
    }



    render() {
        return (
            <div>
<ul>
             {this.state.position.map(app => <li>{app.position} </li>)}
         </ul>
                   
            </div>
           
        );
    }
}

export default Position;