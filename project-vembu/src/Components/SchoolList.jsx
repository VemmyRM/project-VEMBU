import SchoolEntry from "./SchoolEntry";
import react, { useEffect, useState } from "react";
import { storage, db } from "../Firebase/index";
import Navbar from "./Navbar";

const SchoolList = (props) => {

    const [schools, setSchools] = useState([]);


    //function to retrive values from the database
    const getSchoolsList = () => {
        db.collection('schools')
            .onSnapshot(snap => {
                const schoolList = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSchools(schoolList);
            });
    };

    const getImages = (id) => {
        storage.ref(`images/${id}`).getDownloadURL()
            .then((url) => {
                console.log(url);
                return url;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const setImages = () => {
        schools.forEach((school) => {
            school.image = getImages(school.id);
        })
    }


    useEffect(() => {
        getSchoolsList();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {schools.map((school) => {
                        return <SchoolEntry id={school.id} name={school.name} about={school.about} location={school.location} admissions={school.admissions} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default SchoolList;