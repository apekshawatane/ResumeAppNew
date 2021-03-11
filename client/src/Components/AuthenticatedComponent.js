import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {getJwt} from '../helpers/jwt';
import axios from '../utils/axios';

class AuthenticatedComponent extends Component {
constructor(props) {
     super(props);

     this.state = {
        // userName: this.userName,
        // password: this.password,
        manager: undefined
     }
}

componentDidMount() {
    const jwt = getJwt();
    if(!jwt) {
        this.props.history.push('/manager');
    } else {

    axios.post('/manager/login', {headers:{Authorization: `Bearer ${jwt}`}})
    .then(res => 
        this.setState({
        manager: res.data,
        
    }),
    // this.props.history.push('/Protect')
    )
    .catch(err => {
        localStorage.removeItem('cool-jwt');
        this.props.history.push('/manager');
    })
}
}

    render() {
        if(this.state.manager === undefined){
            return (
                <div><h1>Loading....</h1></div>
            );
        }

        return(
<div>
    {this.props.children}
</div>
        );
    }
}

export default withRouter(AuthenticatedComponent);