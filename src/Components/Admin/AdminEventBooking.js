import './AdminEventBooking.css';
import { useEffect, useState } from "react";

function AdminEventBooking(){
    // const authstring=localStorage.getItem('user');
    // const auth = JSON.parse(authstring);

    const [allbooking ,setAllBooking]=useState([]);
    const [type,setType]=useState("pending");

    useEffect(() => {
        fetch("http://localhost:3030/booking",{method:'GET'})
           .then((res) => {
             return res.json();
           })
           .then((res) => {
             setAllBooking(res);
           });
       },[setAllBooking]);


       let userbooking=allbooking.filter((obj)=>{
            if(type.toLocaleLowerCase()===obj.status.toLocaleLowerCase()){
              return true;
            }else{
              return false;
            }            
       })

       function updatestatususerbooking(id,change){
        console.log("ch=",change)

          fetch(`http://localhost:3030/booking/${id}`, {
            method: "PUT",
            body: JSON.stringify({change:change}),
            headers: { "Content-Type": "application/json" }
          }).then((res) => {
              window.location.reload();
          }).catch((error) => {
            console.error("Error updating menue:", error);
        });
      
       }

       let userbookingcards=userbooking.map((obj,index)=>{
          return(
            <>

                            <tr>
                                <td>{obj.email}</td>
                                <td>{obj.contactno}</td>
                                <td>{obj.date}</td>
                                <td>{obj.time}</td>
                                <td>{obj.status}</td>
                                {obj.status.toLowerCase() === "pending" && <td><div onClick={()=>{
                                  updatestatususerbooking(obj._id,"approve")
                                }} className="btn t-btn btn-success px-2 py-1 text-center">&#10004;</div></td>}

                                {obj.status.toLowerCase() === "pending" && <td><div onClick={()=>{
                                  updatestatususerbooking(obj._id,"notapprove")
                                }} className="btn t-btn btn-danger px-2 py-1 text-center">&#10006;</div></td>}

                                {obj.status.toLowerCase() === "approve" && <td><div onClick={()=>{
                                  updatestatususerbooking(obj._id,"notapprove")
                                }} className="btn t-btn btn-success px-2 py-1 text-center">&#10004;</div></td>}
                                
                                {obj.status.toLowerCase() === "approve" && <td><div onClick={()=>{
                                  updatestatususerbooking(obj._id,"complate")
                                }} className="btn t-btn btn-success px-2 py-1 text-center">&#10004;</div></td>}
                            </tr>
            </>
          )
       })

    return(
        <>
            <div className='cardtype row border border-5 m-0 py-1 text-center'>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setType("pending")
                }}>
                    Pending</div>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setType("approve")
                }}>Approved</div>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setType("notapprove")
                }}>notApproved</div>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setType("complate")
                }}>Complated</div>
                <div className='col fs-5 btn btn-secondary mx-3 py-2' onClick={()=>{
                    setType("cancle")
                }}>Cancle</div>
            </div>

            <div className='bookingcardlist'>
              <div className="container booking-container p-0 mt-4">
                  <div className="card booking-card  boredr border-3">
                      <table className="table card-table m-0">
                          <thead>
                              <tr>
                                  <th>Email</th>
                                  <th>ContactNo</th>
                                  <th>Date</th>
                                  <th>Time</th>
                                  <th>Status</th>
                                  {type === "pending" && <th>Approve</th>}
                                  {type === "pending" && <th>Approve</th>} {/* Conditional rendering of Edit column */}
                                  {type === "approve" && <th>Notapprove</th>} {/* Conditional rendering of Edit column */}
                                  {type === "approve" && <th>Complate</th>}
                              </tr>
                          </thead>
                          <tbody>
                            {userbookingcards}
                          </tbody>
                      </table>
                  </div>
               </div>
            </div>
            
        </>
    );
}

export default AdminEventBooking;