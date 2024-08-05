import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { auth } from '../Firebase'
import { useNavigate, NavLink, Link, Router } from 'react-router-dom'
import './NavBar.css'



function NavBar() {

    const history = useNavigate();


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

            <Navbar bg='dark' data-bs-theme="dark" fixed='top'>

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

            </Navbar>
        </div>
    )
}

export default NavBar
