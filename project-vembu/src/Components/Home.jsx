import Navbar from "./Navbar";
import { Link } from "react-router-dom";

//homepage components with links to create or browse schools 
const homePage = () => {
    return (
        <div>
            <Navbar />
            <center>
                <div style={{ "zIndex": "20", "textAlign": "left" }}>
                    <img src="https://dreamschools.com/static/media/mainheroimg.59aec240.png" style={{ "position": "absolute", "right": "50px", "zIndex": "-1", "maxWidth": "50%" }} />
                    <div className="welcome container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Welcome to the SchoolFinder!</h1>
                                <h2>Where would you like to go?</h2>
                                <div>
                                    <Link className="btn btn-lg btn-primary home-btn" to="/create">Create</Link>
                                    <Link className="btn btn-lg btn-primary home-btn" to="/browse">Browse</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>

        </div >
    );
}

export default homePage;