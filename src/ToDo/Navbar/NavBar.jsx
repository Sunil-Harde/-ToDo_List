import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { auth } from '../Firebase'
import { useNavigate, NavLink } from 'react-router-dom'
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

                    <Navbar.Brand href='/'>
                        Brand text
                    </Navbar.Brand>

                    <Nav className='Nav'>
                        <NavLink to="/Home" className="NavLink">Home</NavLink>
                        {
                            user ? (
                                <div className='d-flex justify-content-center align-items-center '>
                                    <NavLink className="NavLink">{user}</NavLink>
                                    <NavLink className="NavLink" onClick={signout}>Logout</NavLink>
                                </div>
                            ) : (
                                <div className='d-flex justify-content-center align-items-center '>
                                    <NavLink className="NavLink" to="/Login">Login</NavLink>
                                    <NavLink className="NavLink" to="/Register">Register</NavLink>
                                </div>
                            )
                        }
                    </Nav>

                </Container>

            </Navbar>
        </div>
    )
}

export default NavBar
