import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { auth } from '../Firebase'


function NavBar() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const login = () => onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
            }
            else {
                setUser(null)
            }
        })

        return () => login()
    })

    const signout= ()=>{
        signOut(auth)
    }





    return (
        <div>

            <Navbar bg='dark' data-bs-theme="dark" fixed='top'>

                <Container fluid>

                    <Navbar.Brand>
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
                                    <Nav.Link href="./Register">Regisor</Nav.Link>
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
