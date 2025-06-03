import './Slider.css';

function Slider(){
    return(
        <>
            <div id="home" className='c-main'>
                <div id="demo" class="carousel slide" data-bs-ride="carousel" data-interval="0.5">
                        <div class="carousel-indicators c-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                        </div>


                    <div class="carousel-inner">
                        <div class="carousel-item active c-page1">
                            <img className='c-page1-img' src="./assets/slider/bgfood1.png" alt="Los Angeles" class="d-block" />
                            <div className='c-p1-text'>
                                <span className='c-welcome'>Welcome</span><br/>
                                <span className='c-to'>To</span><br/>
                                <span className='c-kudoz'>Kudoz Restro</span>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="./assets/slider/slider2.jpg" alt="Chicago" class="d-block"/> 
                        </div>
                        <div class="carousel-item">
                            <img src="./assets/slider/slider3.webp" alt="New York" class="d-block" />  
                        </div>
                    </div>

                        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                        </button>
                </div>
            </div>
        </>
    );
}

export default Slider;