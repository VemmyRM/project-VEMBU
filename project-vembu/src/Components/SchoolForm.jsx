import { useState } from "react";
import { Redirect } from "react-router-dom";
import { storage, db } from "../Firebase/index";
import Navbar from "./Navbar";


//component to display a form to create a new school
const SchoolForm = () => {

    //state variables to store the value of each field
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [admissions, setAdmissions] = useState("");
    const [image, setImage] = useState(null);

    //state variable to hold to redirect url
    const [redirect, setRedirect] = useState();


    //if the redirect is not empty, redirect to that route
    //will check this on every re-render of the component
    if (redirect) {
        return <Redirect to={redirect} />;
    }


    //on form submit, prevent defualt submit behaviour and upload the data to the firestore
    const handleSubmit = (e) => {
        e.preventDefault();
        uploadSchoolData();
    }

    //function to upload form data to the firestore
    const uploadSchoolData = () => {
        db.collection("schools").add({
            name: name,
            about: about,
            location: location,
            admissions: admissions,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                handleFileUpload(docRef.id);
                setName("");
                setAbout("");
                setLocation("");
                setAdmissions("");
                setImage(null);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    }

    //function to handle adding a new file to the file input
    const handleFileAdd = (event) => {
        if (event.target.files[0]) {
            //saving the file to the state
            setImage(event.target.files[0]);
        }
        console.log("File added!");
    };

    //fuction to handle uploading a file to the cloud db
    const handleFileUpload = (id) => {
        //upload image is image not null
        storage
            .ref(`images/${id}`)
            .put(image)
            .on(
                "state_changed",
                (snapshot) => { },
                (error) => {
                    console.log(error);
                },
                () => {
                    console.log("success!");
                    setRedirect("/browse");
                }
            );
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <form>
                    <div className="mb-5">
                        <h1>Enter your details</h1>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">School Name</label>
                        <input type="text" className="form-control form-control-lg" id="schoolName" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolAbout" className="form-label">About</label>
                        <textarea className="form-control form-control-lg" id="schoolAbout" onChange={(e) => setAbout(e.target.value)} value={about} ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolLocation" className="form-label"> Location </label>
                        <textarea className="form-control form-control-lg" id="schoolLocation" onChange={(e) => setLocation(e.target.value)} value={location} ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolAdmissions" className="form-label"> Admissions </label>
                        <textarea className="form-control form-control-lg" id="admissions" onChange={(e) => setAdmissions(e.target.value)} value={admissions} ></textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="formFileLg" className="form-label">Please upload an image</label>
                        <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileAdd} />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary btn-lg mt-3 form-btn">Submit</button>
                </form>
            </div >
        </div>

    );
}

export default SchoolForm;