import React from 'react'
import Spinner  from "react-bootstrap/Spinner";

function Spinners() {
    return (
        <div>
            <Spinner animation="border" role="status" style={{ height: "15px", width: "15px" }}>
                <span className="visually-hidden" >Loading...</span>
            </Spinner>
        </div>
    )
}

export default Spinners