import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class ApplicationSubmitted extends Component {
    render() {
    return(
        <div>
        <h1>Application Submitted Successfully</h1>
        </div>
    )
    }
};

export default withRouter(ApplicationSubmitted);