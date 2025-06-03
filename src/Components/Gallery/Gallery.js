import './Gallery.css';

function Gallery(){
    return(
        <>
            <div id='gallery' className='gallery-tex'>
                Gallery
            </div>

            <div class='main-gallery'>
                <div className='gallery-part1'>
                    <div className='gimgbox1 g-img-1'></div>
                    <div className='gimgbox2 g-img-2'></div>
                    <div className='gimgbox3 g-img-3'></div>
                </div>
                <div class='gallery-part2'>
                    <div class='gimgbox g-img-4'></div>
                    <div class='gimgbox g-img-5'></div>
                    <div class='gimgbox g-img-6'></div>
                </div>
            </div>
        </>
    );
}

export default Gallery;