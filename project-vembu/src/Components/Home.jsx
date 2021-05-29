import Navbar from "./Navbar";
import { Link } from "react-router-dom";

//homepage components with links to create or browse schools 
const homePage = () => {
    return (
        <div>
            <Navbar />
            <center>
                <div className="welcome">
                    <h1>Welcome to the SchoolFinder!</h1>
                    <h2>Where would you like to go?</h2>
                    <div>
                        <Link className="btn btn-lg btn-primary home-btn" to="/create">Create</Link>
                        <Link className="btn btn-lg btn-primary home-btn" to="/browse">Browse</Link>
                    </div>
                </div>
            </center>

        </div>
    );
}

export default homePage;