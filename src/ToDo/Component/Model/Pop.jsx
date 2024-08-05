




// import React, { useState } from 'react'
// import { addDoc, collection, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'
// import Model from 'react-modal'
// import Spinner from "react-bootstrap/Spinner";

// function Pop(props) {
//     const [pupop, setPupop] = useState(true)
//     const [title, setTitle] = useState("")
//     const [data, setData] = useState("")
//     const [error, setError] = useState({
//         titleError: "",
//         dataError: ""
//     })


//     const submit = async () => {


//         if (!data || !title) {

//             if (!title) {
//                 setError((e) => {
//                     return { ...e, titleError: "Plese Enter Title" }
//                 })
//             }

//             if (!data) {
//                 setError((e) => {
//                     return ({ ...e, dataError: "Please Enter Description" })
//                 })
//             }
//         }

//         else {

//             try {
//                 const doc = await addDoc(collection(props.db, `${props.user}`), {
//                     title: title,
//                     description: data,
//                     timestamp: serverTimestamp()
//                 });
//                 setPupop(false)
//             }

//             catch (error) {
//                 console.error("Error fetching data: ", error);
//             }
//         }

//     }



//     return (
//         <div>
//             <Model isOpen={props.popUp} onRequestClose={() => setPupop(false)} className="model" >
//                 {
//                     props.userName ? (

//                         <div className=" d-flex align-items-center justify-content-center flex-column model">

//                             <div className='card'>

//                                 <div className="card-header">
//                                     <h3 className='text-center'>Add Task</h3>
//                                 </div>

//                                 <div className=' was-validated card-body d-flex justify-content-center align-items-center flex-column'>

//                                     <div className="title me-5">
//                                         <label htmlFor="">Title</label>
//                                         <input type="text" className='form-control mt-2' onChange={(e) => setTitle(e.target.value)} required />
//                                         <div className="invalid-feedback">{error.titleError}</div>
//                                     </div>

//                                     <div className="discription mt-4 me-5">
//                                         <label htmlFor="" className=''>Discription</label>
//                                         <textarea name="" className='form-control mt-2 ' onChange={(e) => setData(e.target.value)} required></textarea>
//                                         <div className="invalid-feedback">{error.dataError}</div>
//                                     </div>
//                                 </div>

//                                 <div className="card-footer mt-3 d-flex justify-content-center align-items-center " >
//                                     <button className='btn btn-success' style={{ margin: "10px", marginLeft: "36px" }} onClick={submit} >Submit</button>
//                                     <button className='btn btn-danger me-5 card-button' style={{ margin: "10px", marginLeft: "28px" }} onClick={() => setPupop(false)}>Close</button>
//                                 </div>

//                             </div>
//                         </div >
//                     ) : (

//                         <div className='d-flex justify-content-center align-items-center min-vh-100 '>
//                             <div className="card d-flex justify-content-center align-items-center p-3 " style={{ height: "150px" }}>
//                                 <div className='card-body fw-bold text-center'>Please Login</div>
//                                 <button className='btn  card-button  fw-bold' onClick={() => setPupop(false)} >Close</button>
//                             </div>
//                         </div>

//                     )
//                 }
//             </Model >
//         </div>
//     )
// }

// export default Pop