import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars,faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


function Navbar(){
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    // console.log(auth.name)
    return(
        <>
            <div className="c-navbar">

                <div className="c-menuicon">
                  <span>
                  <FontAwesomeIcon icon={faBars} /></span>
                </div>

                <div className="c-navlogo">
                    <img alt='' src="./assets/header/kudozlogo1.png"/>
                </div>

                <div className="c-navlinks">
                    <ul className='c-links'>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#menue">Menue</a></li>
                        <li><a href="#event">Events</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>

                <div className="c-usericon">
                    
                    <Link to={!auth?'/login':auth.login==='user'?'/user/profile':'/admin/menue'} style={{ textDecoration: 'none', color: 'inherit' }}> 
                        <div className='login-symbol'>
                            {!auth?<FontAwesomeIcon icon={faUser} />:auth.name.toUpperCase().charAt(0)}
                        </div>
                        {/* <div className='plus-symbol'>
                            +
                        </div> */}
                    </Link>
                </div>
                
            </div>

            
        </>
    )
}
export default Navbar;