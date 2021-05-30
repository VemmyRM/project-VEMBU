import { Link } from "react-router-dom";

//navbar component to render at the top of every page
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">SchoolFinder</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/create">Add a School</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/browse">Browse Schools</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;