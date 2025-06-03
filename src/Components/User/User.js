import './User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {  faUser } from '@fortawesome/free-solid-svg-icons';
import { Outlet,Link } from "react-router-dom";

function User(){
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    return(
        <>

        {/* ----user nav---- */}

        <div className="user-navbar">

        <Link to="/">
            <div className="user-menuicon">
             <FontAwesomeIcon className='back-icon'  icon={faArrowLeft} />
            </div>
        </Link>    

            <div className="user-navlogo">
               <Link to="/"><img alt='' src="../assets/header/kudozlogo1.png"/></Link>
            </div>

            <div className="user-navlinks">
                <ul className='user-links'>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#menue">Menue</a></li>
                    <li><a href="#event">Events</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>

            <div className="user-usericon">
                {/* <img alt='' src="./assets/header/profileicon.png"/> */}
                <Link to={!auth?'/login':auth.login==='user'?'/user/profile':'/admin/menue'} style={{ textDecoration: 'none', color: 'inherit' }}> 
                    <div className='login-symbol'>
                        {!auth?<FontAwesomeIcon icon={faUser} />:auth.name.toUpperCase().charAt(0)}
                    </div>
                </Link>
            </div>

        </div>



        {/* ---user content -----     */}

            <div className='user-content'>
                <div className='user-leftbar'>
                    
                    <div className='btn u-btn  u-left-box u-profile'>
                        <Link to="/user/profile" className='nav-link' > Profile</Link>
                     </div>
                    
                    {/* <div className='btn u-btn u-left-box u-profile'>
                        <Link to="/user/bills" className='nav-link' >Bills</Link>
                    </div> */}
                    
                    <div className='btn u-btn u-left-box u-profile'>
                        <Link to="/user/booking" className='nav-link' >Booking</Link>
                    </div>
                    
                    <div className='btn u-btn u-left-box u-profile'>
                        <Link to="/user/like" className='nav-link' >Liked</Link>
                    </div>
                </div>
                <div className='user-rightbar'>
                    <Outlet />
                </div>
            </div>

            

            
        </>
    )
}

export default User