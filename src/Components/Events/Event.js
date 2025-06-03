import './Event.css';
import { Link } from "react-router-dom";

function Event(){
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    return(
        <>
            <div id='event' className='c-event-content'>

                <div className='c-event-heading'>
                    Organize your Event in our restaturant
                </div>

                <div className='c-enevts'>

                    <div className='c-event-img'>

                    <div id="demo2" class="carousel slide c-event-carousel" data-bs-ride="carousel" data-interval="0.5">
                        <div class="carousel-indicators c-indicators">
                        <button type="button" data-bs-target="#demo2" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#demo2" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo2" data-bs-slide-to="2"></button>
                        </div>


                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img className='' src="./assets/Event/event3.webp" alt="Los Angeles" class="d-block" />
                            
                        </div>
                        <div class="carousel-item">
                            <img src="./assets/Event/event1.webp" alt="Chicago" class="d-block"/>
                             
                        </div>
                        <div class="carousel-item">
                            <img src="./assets/Event/birthdaytable.jpeg" alt="New York" class="d-block" />
                              
                        </div>
                    </div>


                        <button class="carousel-control-prev" type="button" data-bs-target="#demo2" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#demo2" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                        </button>
                </div>
                    </div>

                    <div className='c-event-booking'>
                        
                            <h1>Event Booking</h1>
                            <p className='event-booking-para'>Books your events like Birthday Party,Custom Party,Private Party in our restaturent</p>
                            <Link to={!auth?'/login':'/booking'}>
                            <div className='book-btn'>
                               Book 
                            </div>
                            </Link>
                        
                    </div>

                </div>
            </div>
        </>
    );
}

export default Event;