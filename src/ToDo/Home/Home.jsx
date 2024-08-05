import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFirestore, addDoc, collection, getDocs, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'
import { Dropdown } from 'react-bootstrap'
import Model from 'react-modal'
import { auth } from '../Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Modal from 'react-modal' // Changed from "Model" to "Modal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Nav1 from '../Navbar/NavBar'
import Pop from '../Component/Model/Pop'
import Spinner from "react-bootstrap/Spinner";
import Data from './Data/Data'

import './home.css'

Modal.setAppElement('#root');

function Home() {

    const [user, setUser] = useState(null)
    const [userName, setUsername] = useState(null)
    const [title, setTitle] = useState("")
    const [data, setData] = useState("")
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState([])
    const [spin, setSping] = useState(true)
    const [error, setError] = useState({
        titleError: "",
        dataError: ""
    })




    const history = useNavigate()
    const db = getFirestore()

    useEffect(() => {

        const login = () => onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
                setUsername(user.displayName)
            }
            else {
                setUser(null)
            }
        })

        login()

    }, [db, user]);


    console.log(user);



    // console.log(user);
    const submit = async () => {


        if (!data || !title) {

            if (!title) {
                setError((e) => {
                    return { ...e, titleError: "Plese Enter Title" }
                })
            }

            if (!data) {
                setError((e) => {
                    return ({ ...e, dataError: "Please Enter Description" })
                })
            }
        }

        else {

            try {
                const doc = await addDoc(collection(db, `${user}`), {
                    title: title,
                    description: data,
                    timestamp: serverTimestamp()
                });
                setPopUp(false)
            }

            catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

    }

    // setTimeout(() => {
    //     setSping(false)
    // }, 5000);


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, `${user}`, id));
            setShow((prevState) => prevState.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting document: ", error);

        }
    }

    console.log(user)
    return (
        <div>
            <Nav1 />
            <div className='all d-flex flex-column align-items-center justify-content-center container-fluid'>

                <div className='drop d-md-flex justify-content-center align-items-center'>

                    <div className='d-sm-flex justify-content-center align-items-center'>
                        <div className='your-task'>
                            <h2 className='me-3'>Your Task</h2>
                        </div>

                        <div className=''>
                            <input type="text-area" className='form-control' placeholder='search Task' />

                        </div>
                    </div>

                    <div className='buttons aaa d-flex justify-content-center align-items-center ms-3'>

                        <div className='me-3 '>

                            <button className='button-hover btn btn-primary fw-bold text-light overflow-hidden' onClick={() => { setPopUp(true) }}>
                                <p>Add Task</p>
                                <div className='bg'></div>
                            </button>

                        </div>

                        <div className=''>
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown-basic" className='button-hover btn-primary fw-bold text-light overflow-hidden '>All Task
                                    <div className='bg'></div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ background: "#23c2ba" }}>
                                    <Dropdown.Item eventKey="X" >In-comepleteTask</Dropdown.Item>
                                    <Dropdown.Item eventKey="X">Complete Task</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>

                        </div>
                    </div>
                </div>


                <Model isOpen={popUp} onRequestClose={() => setPopUp(false)} className="model" >
                    {
                        userName ? (

                            <div className=" d-flex align-items-center justify-content-center flex-column model">

                                <div className='card'>

                                    <div className="card-header">
                                        <h3 className='text-center'>Add Task</h3>
                                    </div>

                                    <div className=' was-validated card-body d-flex justify-content-center align-items-center flex-column'>

                                        <div className="title me-5">
                                            <label htmlFor="">Title</label>
                                            <input type="text" className='form-control mt-2' onChange={(e) => setTitle(e.target.value)} required />
                                            <div className="invalid-feedback">{error.titleError}</div>
                                        </div>

                                        <div className="discription mt-4 me-5">
                                            <label htmlFor="" className=''>Discription</label>
                                            <textarea name="" className='form-control mt-2 ' onChange={(e) => setData(e.target.value)} required></textarea>
                                            <div className="invalid-feedback">{error.dataError}</div>
                                        </div>
                                    </div>

                                    <div className="card-footer mt-3 d-flex justify-content-center align-items-center " >
                                        <button className='btn btn-success' style={{ margin: "10px", marginLeft: "36px" }} onClick={submit}>Submit</button>
                                        <button className='btn btn-danger me-5 card-button' style={{ margin: "10px", marginLeft: "28px" }} onClick={() => setPopUp(false)}>Close</button>
                                    </div>

                                </div>
                            </div >
                        ) : (

                            <div className='d-flex justify-content-center align-items-center min-vh-100 '>
                                <div className="card d-flex justify-content-center align-items-center p-3 " style={{ height: "150px" }}>
                                    <div className='card-body fw-bold text-center'>Please Login</div>
                                    <button className='btn  card-button  fw-bold' onClick={() => setPopUp(false)}>Close</button>
                                </div>
                            </div>

                        )
                    }
                </Model >

            </div >

            <div className='container'>
                <Data userName={userName} db={db} user={user} />
            </div>

        </div >


    )
}

export default Home

