import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import Nav1 from '../Navbar/NavBar'
import './login.css'
import Home from '../Home/Home';


function Login(props) {

    const history = useNavigate();

    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        usernameerror: "",
        passworderror: ""
    })


    // const history = useNavigate()

    const erroeHandal = () => {
        console.log(value);

        if (!value.email) {
            setError((e) => {
                return { ...e, usernameerror: "please enter email" }
            })
        }

        if (!value.password) {
            setError((e) => {
                return { ...e, passworderror: "please enter password" }
            })
        }

        signInWithEmailAndPassword(auth, value.email, value.password)
            .then(() => {
                history('/home')
            })
            .catch((error) => {
                console.error("error" + error)
                if ("Firebase: Error (auth/invalid-credential)." === error.massage || "Firebase: Error (auth/invalid-email)." === error.message) {
                    alert("Please Enter Valid Email or Password")
                }

                else if ("Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)" === error.massage) {
                    alert("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
                }
            }
            )

    }


    return (
        <div>
            <Nav1 />
            <div className='main  container-fluid d-flex align-items-center justify-content-center min-vh-100 w-100'>
                <div className="card form ">
                    <div className='card-header text-center'>
                        <h3>Login</h3>
                    </div>
                    <div className='card-body'>

                        <div className='  d-flex flex-column was-validated '>

                            <div className="form-group">
                                <label htmlFor="" className='mb-1 '>Email</label>
                                <input type="email" className='form-control' onChange={(event) => setValue((e) => ({ ...e, email: event.target.value }))} placeholder='Enter Email' required />
                                <div className="invalid-feedback position-absolute">{error.usernameerror}</div>
                            </div>

                            <div className='form-group'>
                                <label htmlFor="" className='mt-4 mb-1'>Password</label>
                                <input type="password " className='form-control' onChange={(event) => { setValue((e) => ({ ...e, password: event.target.value })) }} placeholder='Enter Password' required />
                                <div className="invalid-feedback position-absolute" >{error.passworderror}</div>
                            </div>


                            <button className='btn btn-success ' onClick={erroeHandal}>Login</button>
                            <p className='mt-2'>Your Not  <Link to="../register">Registor</Link></p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login
