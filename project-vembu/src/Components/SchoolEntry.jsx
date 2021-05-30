import { useEffect, useState } from "react";
import { storage, db } from "../Firebase/index";
import { Link, Redirect } from "react-router-dom";

//component to display one single school entry
const SchoolEntry = ({ id, name, about, location, admissions }) => {

    //state variable to store the image url
    const [url, setUrl] = useState();
    //state variable to hold to redirect url
    const [redirect, setRedirect] = useState();


    //on component mount, fetch image url from cloud storage based on school id
    useEffect(() => {
        storage.ref(`images/${id}`).getDownloadURL().then((url) => {
            setUrl(url);

        })
    }, []);



    //if the redirect is not empty, redirect to that route
    //will check this on every re-render of the component
    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div className="w-50 mt-5">
            <div className="card mt-5" onClick={() => setRedirect(`/schools/${id}`)}>
                <div style={{ "backgroundImage": `url(${url})`, "backgroundSize": "cover" }} className="card-img-top" >
                    <div className="view">
                        <center>
                            <h1>View</h1>
                        </center>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{name} <Link to={`/edit/${id}`} style={{ "position": "absolute", "right": "0", "marginRight": "15px" }} className="btn btn-primary edit-btn">Edit</Link></h5>
                    <br />
                    <p className="card-text">{`${about.substring(0, 150)}...`}</p>
                    <p className="card-text">{`${location.substring(0, 150)}...`}</p>
                    <p className="card-text">{`${admissions.substring(0, 150)}...`}</p>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default SchoolEntry;