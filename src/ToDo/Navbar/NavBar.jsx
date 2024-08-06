import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { auth } from '../Firebase'
import { useNavigate, NavLink, Link, Router } from 'react-router-dom'
import './NavBar.css'



function NavBar() {

    const history = useNavigate();

    const [navClick, setNavClick] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const login = () => auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.displayName)
                console.log("name=", user.displayName)
            }
            else {
                setUser(null)
            }
        })
        login();
    })

    const signout = () => {
        history('/Login')
        signOut(auth)
    }


    return (
        <div>

            {/* <Navbar bg='dark' data-bs-theme="dark" fixed='top'>

                <Container fluid>

                    <Navbar.Brand className='' href='/'>
                        Brand text
                    </Navbar.Brand>

                    <div className='Nav'>
                        <NavLink to="/Home" className="NavLink">Home</NavLink>
                        {
                            user ? (
                                <div className='Nav1'>
                                    <NavLink className="NavLink">{user}</NavLink>
                                    <NavLink className="NavLink" onClick={signout}>Logout</NavLink>
                                </div>
                            ) : (
                                <div className='Nav1'>
                                    <NavLink className="NavLink" to="/Login">Login</NavLink>
                                    <NavLink className="NavLink" to="/Register">Register</NavLink>
                                </div>
                            )
                        }
                    </div>

                </Container>

            </Navbar> */}

            <div>
                <div className=''>

                    <div className={navClick ? "nav shadow-sm d-flex fixed-top px-5 bg-dark align-items-center justify-content-between fixed-top text-light" : " nav-click shadow-sm d-flex fixed-top px-5 bg-dark align-items-center justify-content-between fixed-top text-light"}>

                        <div className="logo d-flex align-items-center justify-content-center ">
                            <NavLink className="NavLink" to='/'>To<span className='text-info'>Do</span></NavLink>

                        </div>

                        <div className='nav-items mt-md-2 d-flex flex-column flex-md-row  align-items-center  justify-content-md-center  gap-4 bg-dark'>
                            <div className="nav-item d-flex flex-column flex-md-row  align-items-md-center  justify-content-md-center  gap-4 bg-dark ">
                                <div className="">
                                    <NavLink to="/Home" className="NavLink">Home</NavLink>
                                </div>

                                {
                                    user ? (
                                        <div className='d-flex flex-column flex-md-row  align-items-md-center mt-1  justify-content-center gap-4 '>
                                            <NavLink className="NavLink">{user}</NavLink>
                                            <NavLink className="NavLink" onClick={signout}>Logout</NavLink>
                                        </div>
                                    ) : (
                                        <div className='d-flex flex-column flex-md-row  align-items-md-center  justify-content-center gap-4 '>
                                            <NavLink className="NavLink" to="/Register">Register</NavLink>
                                            <NavLink className="NavLink" to="/Login">Login</NavLink>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="lines d-flex d-md-none flex-column" onClick={() => setNavClick(!navClick)} >
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
