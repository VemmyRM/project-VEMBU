import SchoolEntry from "./SchoolEntry";
import react, { useEffect, useState } from "react";
import { storage, db } from "../Firebase/index";
import Navbar from "./Navbar";

//component that renders a list of schools
const SchoolList = (props) => {

    //state variable to hold an array of all the schools
    const [schools, setSchools] = useState([]);


    //function to retrive all schools from the database and set state
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

    useEffect(() => {
        getSchoolsList();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <center>
                        {schools.map((school) => {
                            return <SchoolEntry id={school.id} name={school.name} about={school.about} location={school.location} admissions={school.admissions} />
                        })}
                    </center>
                </div>
            </div>
        </div>
    );
}

export default SchoolList;