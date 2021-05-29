import { useEffect, useState } from "react";
import { storage, db } from "../Firebase/index";
import { Link } from "react-router-dom";

//component to display one single school entry
const SchoolEntry = ({ id, name, about, location, admissions }) => {

    //state variable to store the image url
    const [url, setUrl] = useState();

    //on component mount, fetch image url from cloud storage based on school id
    useEffect(() => {
        storage.ref(`images/${id}`).getDownloadURL().then((url) => {
            setUrl(url);

        })
    })

    return (
        <div className="w-50">
            <div className="card mb-5" >
                <img src={url} className="card-img-top" />
                <div className="card-body">
                    <center>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{about}</p>
                        <p className="card-text">{location}</p>
                        <p className="card-text">{admissions}</p>
                        <br />
                        <Link to={`/edit/${id}`} className="btn btn-primary edit-btn">Edit</Link>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default SchoolEntry;