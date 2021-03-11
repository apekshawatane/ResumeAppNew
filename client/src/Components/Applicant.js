import React, { Component } from 'react';
import axios from '../utils/axios';
// import BootstrapTable from 'react-bootstrap-table-next'; 
import ReactTable from "react-table"; 
import { useTable } from 'react-table';
// import "react-table/react-table.css";  
import { Button, Form, FormControl } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Applicant extends Component {

    constructor(props) {
        super(props);
        let loggedIn = false;
        // const {
        //     getTableProps,
        //     getTableBodyProps,
        //     headerGroups,
        //     rows,
        //     prepareRow,
        //   } = useTable({
        //     columns,
        //     data,
        //   });
    
        
        this.state = {
            applicant: [],
            loggedIn,
        };

        this.logout = this.logout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    async componentDidMount() {
        axios.get('/applicant/viewApplicant')
            .then(res => {
                const applicant = res.data;
                this.setState({ applicant: res.data });
                console.log("applicants", applicant);
                // const fName = res.data;
                // this.setState({ fName: res.data.firstName });
                // console.log("firstnames", fName); 
            })
            .catch(err => console.log(err.message))

            // if (!("Notification" in window)) {
            //     console.log("This browser does not support desktop notification");
            //   } else {
            //       console.log("hello");
            //     Notification.requestPermission();
            //   }

        }
        
        handleDelete = (event) => {
            // event.preventDefault();
            const id = event.target.id;
           console.log(id);
           
        // // const url = 'http://localhost:5000/applicant/deleteApplicant/:id';
        // // if(window.confirm("Are you sure you want to delete this applicant?")){
            axios.delete('/applicant/deleteApplicant/' + id)
            .then((res) => {
                console.log(res.data);
               
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
        
download_file = (event) => {
    // event.preventDefault();
    const id = event.target.id;
axios.get('/applicant/viewApplicant/' + id)
.then((res) => {
    const data = (res.data);
    this.setState({data});
    // const filepath = path.join(__dirname, "./uploads") + "/" + req.body.file;
            // res.download(filepath);
    // fileDownload(data, '/uploads/05-module5_practical_assignment (1).pdf');
   
// fileDownload(data, filepath);

        // let url = window.URL.createObjectURL(new Blob([res.data]));
        // // let url = 'http://localhost:5000/uploads/' + file;
        // let a = document.createElement('a');
        // a.href = url;
        // // a.download = url;
        // a.setAttribute('download', '');
        // document.body.appendChild(a);
        // a.click();
    });

}


handleSearch = (e) => {
 this.setState({
     inputValue: e.target.value
 })
}

logout() {
localStorage.removeItem("cool-jwt");
this.setState({
    loggedIn: true
})
// this.props.history.push('/');
}

    render() {
        if(this.state.loggedIn === true){
            return <Redirect to='/' />
        }  

        // const columns = [
        //     {
        //         Header: "Applicant ID",
        //         accessor: "id"
        //     },
        //     {
        //         Header: "Last Name",
        //         accessor: "lastName"
        //     },
        //     {
        //         Header: "First Name",
        //         accessor: "firstName"
        //     },
        //     {
        //         Header: "Email",
        //         accessor: "email"
        //     },
        //     {
        //         Header: "Position",
        //         accessor: "position"
        //     },
        // ]

        const data = [
            this.state.applicant
        ]
        console.log(data);

        return (
<div>

    {/* <ReactTable
        columns={columns}
    >

    </ReactTable> */}

        

            
                <div>
                <Form inline className="mt-10">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleSearch} />
      <Button variant="outline-success">Search</Button>
    </Form>
                </div>

                <table className="table mt-5 text-center text-black">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Delete</th>
                            <th>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.applicant.map((app) => (
                            <tr key={app.id}>
                                <td>{app.firstName}</td>
                                <td>{app.lastName}</td>
                                <td>{app.email}</td>
                                <td>{app.position}</td>
                        <td>{app.file}</td>

                                 <td>
                                    <button className="btn btn-danger" 
                                    onClick={this.handleDelete} 
                                // onClick={this.flagData}
                                    id={app.id}>
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-primary" 
                                    onClick={this.download_file} 
                                    id={app.id}
                                    // href="http://localhost:5000/${app.file}"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table> 

                <button className="btn btn-primary" onClick={this.logout}>Logout</button>

           </div> 
        );
    }
}

export default Applicant;