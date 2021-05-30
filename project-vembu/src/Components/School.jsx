import { useEffect, useState } from "react";
import { storage, db } from "../Firebase/index";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const School = (props) => {

    //state variables for each field
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [admissions, setAdmissions] = useState("");
    const [url, setUrl] = useState("");

    const id = props.match.params.id;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        db.collection("schools").doc(`${props.match.params.id}`).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data())
                setName(doc.data().name);
                setAbout(doc.data().about);
                setLocation(doc.data().location);
                setAdmissions(doc.data().admissions);
                storage.ref(`images/${id}`).getDownloadURL().then((url) => {
                    setUrl(url);
                })
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    return (
        <div>
            <Navbar />
            <img src={`${url}`} style={{ "width": "100%", "height": "400px", "overflow": "hidden", "objectFit": "cover", "borderBottom": "5px black" }} />
            <div className="container">
                <h1 className="mt-5 mb-5">{name}</h1>
                <div className="row" >
                    <div className="col-2">
                        <h2>Location</h2>
                    </div>
                    <div className="col-10">
                        <p>{location}</p>
                    </div>
                </div>
                <hr />
                <div className="row" >
                    <div className="col-2">
                        <h2>About</h2>
                    </div>
                    <div className="col-10">
                        <p>{about}</p>
                    </div>
                </div>
                <hr />
                <div className="row mb-5" >
                    <div className="col-2">
                        <h2>Admissions</h2>
                    </div>
                    <div className="col-10">
                        <p>{admissions}</p>
                    </div>
                </div>
                <div className="row mb-5">
                    <center>
                        <Link to={`/edit/${id}`} className="btn btn-primary edit-btn">Update</Link>
                    </center>
                </div>
            </div>
        </div >
    );
}

export default School;