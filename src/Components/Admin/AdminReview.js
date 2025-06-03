import './AdminReview.css';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

function AdminReview(){

    const [allreview ,setAllreview]=useState([]);
    const [reviewtype,setreviewType]=useState("pending");

    useEffect(() => {
        fetch("http://localhost:3030/review",{method:'GET'})
           .then((res) => {
             return res.json();
           })
           .then((res) => {
             setAllreview(res);
           });
       },[setAllreview]);


       let userreview=allreview.filter((obj)=>{
            if(reviewtype.toLocaleLowerCase()===obj.status.toLocaleLowerCase()){
              return true;
            }else{
              return false;
            }            
       })

       function updatestatususerreview(id,change){
        console.log("ch=",change)

          fetch(`http://localhost:3030/review/${id}`, {
            method: "PUT",
            body: JSON.stringify({change:change}),
            headers: { "Content-Type": "application/json" }
          }).then((res) => {
              window.location.reload();
          }).catch((error) => {
            console.error("Error updating menue:", error);
        });
      
       }

       function reviewDelete(id) {
        fetch("http://localhost:3030/review/"+id, {
          method: "DELETE"
        }).then((res) => {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            }).then((res)=>{
                window.location.reload();
            })

        });;
    }

       let userreviewcards=userreview.map((obj,index)=>{
          return(
            <>
                            <tr>
                                <td class='border-start-0'>{index+1}</td>
                                <td>{obj.favouratefood}</td>
                                <td>{obj.notlikefood}</td>
                                <td>{obj.changes}</td>
                                <td>{obj.othersuzzetion}</td>
                                {/* <td>{obj.status}</td> */}
                                {obj.status.toLowerCase() === "pending" && <td><div onClick={()=>{
                                  updatestatususerreview(obj._id,"save")
                                }} className="btn t-btn btn-success px-2 py-1 text-center"><i class="fa-regular fa-bookmark"></i></div></td>}

                                {obj.status.toLowerCase() === "pending" && <td><div onClick={() => 
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        reviewDelete(obj._id)
                                    }
                                })
                                } className="btn t-btn btn-danger px-2 py-1 text-center"><i class="fa-solid fa-trash"></i></div></td>}
                                {obj.status.toLowerCase() === "save" && <td><div onClick={()=>{
                                  updatestatususerreview(obj._id,"pending")
                                }} className="btn t-btn btn-success px-2 py-1 text-center"><i class="text-dark fa-solid fa-bookmark"></i></div></td>}

                                {obj.status.toLowerCase() === "save" && <td><div onClick={() => 
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        reviewDelete(obj._id)
                                    }
                                })
                                } className="btn t-btn btn-danger px-2 py-1 text-center"><i class=" fa-solid fa-trash"></i></div></td>}                                
                            </tr>
                       

            </>
          )
       })

    return(
        <>
            <div className='cardreviewtype row border border-5 m-0 py-1 text-center'>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setreviewType("pending")
                }}>
                    Pending</div>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setreviewType("save")
                }}>Saved</div>
            </div>

            <div className='reviewcardlist'>
              <div className="container review-container p-0 mt-4">
                  <div className="card review-card  boredr border-3">
                      <table className="table reviewcard-table m-0">
                          <thead>
                              <tr>
                                  <th>No.</th>
                                  <th>Best food</th>
                                  <th>Notlike foods</th>
                                  <th>Changes</th>
                                  <th>Other Suzzetion</th>
                                  {/* <th>Status</th> */}
                                  {reviewtype === "pending" && <th>Save</th>}
                                  {reviewtype === "pending" && <th>Delete</th>} {/* Conditional rendering of Edit column */}
                                  {reviewtype === "save" && <th>unSave</th>} {/* Conditional rendering of Edit column */}
                                  {reviewtype === "save" && <th>Delete</th>}
                              </tr>
                          </thead>
                          <tbody>
                            {userreviewcards}
                          </tbody>
                      </table>
                  </div>
               </div>
            </div>
            
        </>
    );
}

export default AdminReview;