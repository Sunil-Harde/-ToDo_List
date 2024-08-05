import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from "react-bootstrap/Spinner";

function Data(props) {

    const [show, setShow] = useState([])
    const [spin, setSping] = useState(false)


    const db = getFirestore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, `${props.user}`));
                const tempData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    timestamp: doc.data().timestamp
                }));
                setShow(tempData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    })


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, `${props.user}`, id));
            setShow((prevState) => prevState.filter((item) => item.id !== id));
            setSping(true)
        } catch (error) {
            console.error("Error deleting document: ", error);
        }


    }





    return (
        <div>
            {
                props.userName ? (

                    <div className='row'>
                        {show.map((item, index) => (
                            <div className='col-lg-4 col-md-6 mb-4 d-flex justify-content-center align-content-center' key={index}>
                                <div className="card card-home">
                                    <div className="card-header">
                                        <h4>{item.title}</h4>
                                    </div>

                                    <div className="card-body">
                                        <p style={{ overflow: 'overlay', height: '78px' }}>{item.description}</p>
                                    </div>

                                    <div className="card-footer">

                                        <button className="btn btn-success ..." style={{ margin: "2px" }}>
                                            <FontAwesomeIcon icon={faCheckDouble} />
                                        </button>

                                        <button className="btn btn-secondary" style={{ margin: "2px" }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>

                                        <button className="btn btn-danger" style={{ margin: "2px" }} onClick={() => handleDelete(item.id)}>                            
                                                <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (

                    spin ? (
                        <div className='d-flex align-items-center justify-content-center max-vh-100' >
                            <p className='spin'></p>
                        </div>
                    ) : (
                        <div className='d-flex align-items-center justify-content-center max-vh-100' >
                            <h3 className=''>Please Login</h3>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Data