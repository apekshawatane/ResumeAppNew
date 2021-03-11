import React, { Component } from 'react';
import axios from '../utils/axios';



class ApplicantPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            position: [],
            selectValue: '',
            isSubmit: false,
            file: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileChange = this.fileChange.bind(this);
    }

    componentDidMount() {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
          } else {
              console.log("hello");
            Notification.requestPermission();
          }


        axios.get('/position')
            .then(res => {
                const position = res.data;
                this.setState({ position });
            })
            .catch(err => console.log(err.message))
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange = event => {
        this.setState({ selectValue: event.target.value });
        console.log(this.state.selectValue);
    }

    fileChange = event => {
        this.setState({ file: event.target.files[0] });
    }

    handleSubmit = event => {
        event.preventDefault();
        //For file upload
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('email', this.state.email);
        formData.append('position', this.state.selectValue);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                
            }
        };

        console.log(this.state);
        axios.post('/applicant/addApplicant', formData, config)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    this.setState({ isSubmit: true });
                    new Notification('Application Submitted Successfully');
                    this.props.history.push(`/`);
                }

            })
            .catch(err => {
                console.log(err.message);
            })
    };


    render() {

        // if (this.state.isSubmit) {
        //     // redirect to home if signed up
        //     return <Redirect to = {{ pathname: "" }} />;
        //   }

        const { firstName, lastName, email, position } = this.state;

        let positionList = position.length > 0
            && position.map((item, i) => {
                return (
                    <option key={i} value={item.position}>{item.position}</option>
                )

            }, this);


        return (


            <div className="container mt-5 dflex">
                <h1>APPLICANT FORM</h1>
                
                <form className=" border border-light p-5" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            First Name:
            </label>
                        <input type="text" name="firstName" className="form-control" value={firstName}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>
                            Last Name:
            </label>
                        <input type="text" name="lastName" className="form-control" value={lastName}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>
                            Email:
            </label>
                        <input type="text" name="email" className="form-control" value={email}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>
                            Position:
            </label>
                        {/* <input type="text" name="position" className="form-control" value={position}
                        onChange={this.changeHandler} /> */}

                        {/* <select multiple={false} value={this.state.selectedPosition}
                            onChange={(e) => this.setState({ selectedPosition: e.target.value, validationError: e.target.value === "" ? "You must select a position" : "" })}
                        >
                            {this.state.position.map((position) => <option key={position.value} value={position.value}>{position.display}</option>)}

                        </select> */}
                        <div className="dropdown">
                            {/* <select multiple={false} onChange={this.handleChange} name="position">
                                {positionList}
                            </select> */}
                            <button class="btn dropdown-toggle" 
                            type="button" id="dropdownMenuButton"
                             data-toggle="dropdown" aria-haspopup="true" 
                             aria-expanded="false" onChange={this.handleChange} name="position">
                                 Positions
                            </button>
<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
<a className="dropdown-item">
    {positionList}
</a>
</div>

                        </div>


                    </div>
                    {/* <div style={{ color: 'red', marginTop: '5px' }}>
                        {this.state.validationError}
                    </div> */}

                    <div className="form-group">
                        <label>
                            Resume:
                        </label>
                        <input type="file" name="file" onChange={this.fileChange} />
                    </div>
<div>
                        <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                </form>
                
            </div>


        )

    }
}


export default ApplicantPost;