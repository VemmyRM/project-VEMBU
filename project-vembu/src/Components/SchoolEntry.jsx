import { useEffect, useState } from "react";
import { storage, db } from "../Firebase/index";
import { Link } from "react-router-dom";

const SchoolEntry = ({ id, name, about, location, admissions }) => {

    const [url, setUrl] = useState();
    useEffect(() => {
        storage.ref(`images/${id}`).getDownloadURL().then((url) => {
            setUrl(url);

        })
    })

    return (
        <div className="col-12">
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