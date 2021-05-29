import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db, storage } from "../Firebase/index";
import { Redirect } from "react-router-dom";

const Edit = (props) => {

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [admissions, setAdmissions] = useState("");
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState();
    const [url, setUrl] = useState("");


    const fetchData = () => {
        db.collection("schools").doc(`${props.match.params.id}`).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data())
                setName(doc.data().name);
                setAbout(doc.data().about);
                setLocation(doc.data().location);
                setAdmissions(doc.data().admissions);
                storage.ref(`images/${props.match.params.id}`).getDownloadURL().then((url) => {
                    setUrl(url);

                })
                console.log("fetched!");
                console.log(doc);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        updateSchoolData();
    }

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    const updateSchoolData = () => {
        db.collection("schools").doc(`${props.match.params.id}`).update({
            name: name,
            about: about,
            admissions: admissions,
            location: location
        })
            .then((id) => {
                console.log("Document successfully updated!");
                handleFileUpload(id);
                setRedirect("/browse");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }
    const handleFileAdd = (event) => {
        if (event.target.files[0]) {
            //saving the file to the state
            setImage(event.target.files[0]);
        }
        console.log("File added!");
    };

    const handleFileUpload = (id) => {
        //upload image is image not null
        if (!image) {
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
                    }
                );
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <form>
                    <div className="mb-5">
                        <h1>Edit your School</h1>
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
                        <label htmlFor="formFileLg" className="form-label">Leave this field blank to continue using your current image</label>
                        <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileAdd} />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary btn-lg mt-3 form-btn">Submit</button>
                </form>
            </div >
        </div>
    );
}

export default Edit;