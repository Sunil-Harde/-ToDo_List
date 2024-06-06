import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import Nav1 from '../Navbar/NavBar'
import Spinner from 'react-bootstrap/Spinner';


function Register() {

    const [buttonDisable, setButtonDisable] = useState(false)
    const [value, setValue] = useState({
        firstname: "",
        email: "",
        password: ""
    })
    console.log(value.firstname);

    const history = useNavigate();

    function submit(e) {
        e.preventDefault()

        if (!value.firstname || !value.email || !value.password) {
            alert('Please Enter All Values')
            return;
        }

        setButtonDisable(true)
        createUserWithEmailAndPassword(auth, value.email, value.password)
            .then((res) => {
                history('/Home')
                const user = res.user
                updateProfile(user, {
                    displayName: value.firstname
                })
                console.log(res, "authData")
            })
            .catch((error) => {
                if ("Firebase: Error (auth/email-already-in-use)." === error.message) {
                    alert("Email id Alredy Exist ")
                    setButtonDisable(false)

                }
            })

        console.log(value);
    }

    return (
        <div>
            <Nav1 />
            <div className='container-fluid  d-flex flex-column justify-content-center align-items-center min-vh-100 ' style={{ backgroundImage: "url(https://cdn.pixabay.com/photo/2014/12/16/16/19/smartphone-570507_1280.jpg)", backgroundSize: "cover", borderRightWidth: 100, backgroundPositionX: "center" }}>
                <div className='card mb-lg-5 shadow-lg form '>
                    <div className='card-header text-center'>
                        <h2>Register</h2>
                    </div>

                    <div className="card-body text-black">
                        <Form className='d-flex flex-column was-validated'>
                            <div>
                                <label htmlFor="" className='mb-1'>Name</label>
                                <input type="text" className='form-control' onChange={(event) => setValue({ ...value, firstname: event.target.value })} placeholder='First Name' required />
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="" className='mb-1'>Email</label>
                                <input type="email" className='form-control' onChange={(event) => setValue({ ...value, email: event.target.value })} placeholder='Password' required />
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="" className='mb-1'>Password</label>
                                <input type="password" className='form-control' onChange={(event) => setValue({ ...value, password: event.target.value })} placeholder='Password' required />
                            </div>

                            <div className='d-flex justify-content-center align-items-center ' id='button-hover-div'>
                                <button className='button-hover btn fw-bold text-light overflow-hidden ' onClick={submit} >

                                    {
                                        !buttonDisable ? (
                                            <p>Register</p>
                                        ) : (

                                            <Spinner animation="border" role="status" style={{ height: "15px", width: "15px" }}>
                                                <span className="visually-hidden" >Loading...</span>
                                            </Spinner>
                                        )

                                    }

                                    <div className='bg'></div>
                                </button>
                            </div>
                            <p className='text-light'>Already have an account? <Link to="../Login" className='fs-5'>Login</Link></p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
