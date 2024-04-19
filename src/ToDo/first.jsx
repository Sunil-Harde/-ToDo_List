import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './first.css'
import Nav from './Navbar/NavBar'


function first() {
    return (

        <div>
            <Nav />
            <div className='container-fluid main1'>
                <div className=' d-flex justify-content-center align-items-center  form-control-lg  min-vh-100'>
                    <div className="card form p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "transparent"}}>

                        <h1 className=''>Schedule Your</h1>
                        <h1>Daily Task With</h1>
                        <h1 className='text-success'>ToDo List</h1>

                        <div className="d-flex gap-4 ">
                            <Link to="./Login"><button className='btn btn-primary '> Login</button></Link>
                            <Link to="./register"><button className=' btn btn-danger'> SingIn</button></Link>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default first
