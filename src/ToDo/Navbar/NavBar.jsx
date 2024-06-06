import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { auth } from '../Firebase'
import { useNavigate,Link } from 'react-router-dom'


function NavBar() {

    const history = useNavigate();


    const [user, setUser] = useState(null)

    useEffect(() => {
        const login = () => auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.displayName)
                console.log("name=",user.displayName)
            }
            else {
                setUser(null)
            }
        })

        return () => login()
    })

    const signout= ()=>{
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

                    <Nav >
                        <Nav.Link href="/Home">Home</Nav.Link>
                        {
                            user ? (
                                <div className='d-flex justify-content-center align-items-center '>
                                    <Nav.Link >{user}</Nav.Link>
                                    <Nav.Link onClick={signout}>Logout</Nav.Link>
                                </div>
                            ) : (
                                <div className='d-flex justify-content-center align-items-center '>
                                    <Nav.Link href="/Login">Login</Nav.Link>
                                    <Link href="./Register">Register</Link>
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
