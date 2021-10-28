import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (
            // <div style={{display:'flex',backgroundColor:'lightgrey'}}>
            //     <h1>Movies Center</h1>
            //     <h3 style={{marginLeft:'5rem',marginTop:'2rem'}}>View Favourites</h3>
            // </div>
            <>
                <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#2827CC'}}>
                    <div className="container-fluid">
                        <Link to="/" style={{textDecoration:'none'}}>
                            <a className="navbar-brand" style={{color:'white'}}>Movies For You</a>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <Link to="/fav" style={{textDecoration:'none'}}>
                                    <a className="nav-link active" aria-current="page" style={{color:'white'}}>Favourites</a>
                                </Link> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar;
