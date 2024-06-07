import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import Nav1 from '../Navbar/NavBar'
import './login.css'
import Spinner from '../Component/Spinner/Spinners'



function Login() {


    const history = useNavigate();

    const [buttonDisable, setButtonDisable] = useState(false)
    const [notFound, setNotFound] = useState(true)
    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const [errorEmptyInput, setErrorEmptyInput] = useState({
        userEmptyInput: "",
        passwordEmptyInput: ""
    })


    // const history = useNavigate()

    const erroeHandal = () => {
        console.log(value);

        if (!value.email) {
            setErrorEmptyInput((e) => {
                return { ...e, userEmptyInput: "please enter email" }
            })
        }

        if (!value.password) {
            setErrorEmptyInput((e) => {
                return { ...e, passwordEmptyInput: "please enter password" }
            })
        }

        if (value.email && value.password) {
            setButtonDisable(true)

            try {
                signInWithEmailAndPassword(auth, value.email, value.password)
                    .then(() => {
                        history('/home');
                    })

                    .catch((error) => {
                        console.error(error);
                        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                            alert('Please enter a valid email or password');
                            setButtonDisable(false)
                            
                        }
                        
                        else if (error.code === 'auth/invalid-credential') {
                            setButtonDisable(false)
                            setNotFound(false);
                        }
                        
                        else if (error.code === 'auth/too-many-requests') {
                            setButtonDisable(false)
                            alert(
                                'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
                            );
                        }
                    });

            }

            catch (error) {
                console.error(error);
            }
        }


    }
    console.log(notFound)

    !notFound && (

        setTimeout(() => {
            setNotFound(true);

        }, 5000)
    )


    return (
        <div>
            <Nav1 />
            <div className='main  container-fluid d-flex align-items-center justify-content-center min-vh-100 w-100'>
                <div className="card form ">
                    <div className='card-header text-center'>
                        <h3>Login</h3>
                    </div>


                    {

                        !notFound && (

                            <div className='popup position-absolute   ms-5 text-danger' style={{ top: "2.4rem" }}>
                                <div className="text-center">
                                    <h6 className='text-center'>Email Not Registor  ❌ </h6>
                                </div>
                            </div>

                        )
                    }



                    <div className='card-body'>

                        <div className='  d-flex flex-column was-validated '>

                            <div className="form-group">
                                <label htmlFor="" className='mb-1 '>Email</label>
                                <input type="email" className='form-control' onChange={(event) => setValue((e) => ({ ...e, email: event.target.value }))} placeholder='Enter Email' required />
                                <div className="invalid-feedback position-absolute">{errorEmptyInput.userEmptyInput}</div>
                            </div>

                            <div className='form-group'>
                                <label htmlFor="" className='mt-4 mb-1'>Password</label>
                                <input type="password " className='form-control' onChange={(event) => { setValue((e) => ({ ...e, password: event.target.value })) }} placeholder='Enter Password' required />
                                <div className="invalid-feedback position-absolute" >{errorEmptyInput.passwordEmptyInput}</div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='button-hover btn fw-bold text-light overflow-hidden ' onClick={erroeHandal}>
                                    {
                                        !buttonDisable ? (
                                            <p>Login</p>
                                        ) : (

                                            <Spinner/>
                                        )

                                    }
                                    <div className='bg '></div>
                                </button>
                            </div>
                            <p className='mt-2'>Your Not  <Link to="../register">Registor</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
