import './review.css';
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';


function Review(){

    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);

    const [reviewData, setreviewData] = useState({
        favouratefood:'',
        notlikefood:'',
        changes:'',
        othersuzzetion:'',
        status:'pending'
      });
    
      const handlereviewChange = e => {
        const { name, value } = e.target;
        setreviewData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handlereviewSubmit = async (e) => {
        e.preventDefault();
    
        if(auth){
        // console.log(reviewData)
    
            await fetch("http://localhost:3030/review",{
              method:"POST",
              body:JSON.stringify(reviewData),
              headers: {"Content-Type":"application/json"}
            })
    
            // var data = await res.json();

            alert("Review Submitted Successfully")
    
            // console.log(data)

            setreviewData({
                favouratefood:'',
                notlikefood:'',
                changes:'',
                othersuzzetion:'',
                status:'pending'
              })

            }else{
                alert("Login Require");

                setreviewData({
                    favouratefood:'',
                    notlikefood:'',
                    changes:'',
                    othersuzzetion:'',
                    status:'pending'
                  })
            }
      };

    return(
        <>
            <div className="review-content">

                <div className="review-text">
                    Give your Review
                </div>

                <div className="review-form">
                    <form onSubmit={handlereviewSubmit}>
                        <div className="mb-3">
                            <label htmlFor="favouratefood" className="label ps-2 form-label">Best Test Foods</label>
                            <input type="text" className="input form-control rounded-4" id="favouratefood" name="favouratefood" value={reviewData.favouratefood} onChange={handlereviewChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="notlikefood" className="label ps-2 form-label">Worst Test Foods</label>
                            <input type="text" className="input form-control rounded-4" id="notlikefood" name="notlikefood" value={reviewData.notlikefood} onChange={handlereviewChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="changes" className="label ps-2 form-label">What Changes Require In Food</label>
                            <input type="text" className="input form-control rounded-4" id="changes" name="changes" value={reviewData.changes} onChange={handlereviewChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="othersuzzetion" className="label ps-2 form-label">Any Other Suzzetion</label>
                            <textarea rows="5" type="text" className=" form-control rounded-4" id="othersuzzetion" name="othersuzzetion" value={reviewData.othersuzzetion} onChange={handlereviewChange} required />
                        </div>

                         <div className='text-center mt-4'>  
                            <button type="submit" className="button btn btn-primary px-5">Submit</button>
                        </div> 
                    </form>
                </div>
            </div>
        </>
    );
}

export default Review;