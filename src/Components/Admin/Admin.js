import './Admin.css';
import { Outlet,Link } from "react-router-dom";

function Admin(){
    return(
        <>
            <div className='admin-header'>
                <div className='admin-logo'>
                <Link to="/"> <img alt='' src="../assets/header/kudozlogo1.png"/></Link>
                </div>
                <div className='admin-text'>
                    Admin Pannel
                </div>
            </div>

            <div className='admin-content'>
                <div className='admin-leftbar'>
                    
                    <div className='left-box a-profile'>
                        <Link to="/admin/profile" className='nav-link' > Profile</Link>
                     </div>
                    
                    <div className='left-box a-profile'>
                        <Link to="/admin/menue" className='nav-link' >Menue</Link>
                    </div>
                    
                    <div className='left-box a-profile'>
                        <Link to="/admin/foods" className='nav-link' >Foods</Link>
                    </div>

                    <div className='left-box a-profile'>
                        <Link to="/admin/booking" className='nav-link' >Booking</Link>
                    </div>

                    <div className='left-box a-profile'>
                        <Link to="/admin/eventbooking" className='nav-link' >Event Booking</Link>
                    </div>
                    
                    <div className='left-box a-profile'>
                        <Link to="/admin/like" className='nav-link' >Like</Link>
                    </div>

                    <div className='left-box a-profile'>
                        <Link to="/admin/review" className='nav-link' >Review</Link>
                    </div>

                </div>
                <div className='admin-rightbar'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Admin