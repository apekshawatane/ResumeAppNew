import React, { Component } from 'react';
import {Redirect, Switch} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import Home from './Home';


class Logout extends Component{
    constructor() {
        super();
        //token remove
        localStorage.removeItem("cool-jwt");
    }

    render() {
    
            return <Redirect to='/' />
           
}
}

export default Logout;