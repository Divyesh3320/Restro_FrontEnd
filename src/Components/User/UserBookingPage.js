import './UserBookingPage.css';
import { useEffect, useState } from "react";

function UserBookingPage(){
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);

    const [allbooking ,setAllBooking]=useState([]);
    // const [userbooking ,setUserBooking]=useState([]);

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
            if(auth._id===obj.userid){
              return true;
            }else{
              return false;
            }
       })

       function cancleuserbooking(id,change){
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
                                {(obj.status.toLowerCase() === "pending" || obj.status.toLowerCase() === "approve") && <th>Cancel</th>}
                                {obj.status.toLowerCase() === "pending" && <th>Edit</th>} {/* Conditional rendering of Edit column */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{obj.email}</td>
                                <td>{obj.contactno}</td>
                                <td>{obj.date}</td>
                                <td>{obj.time}</td>
                                <td>{obj.status}</td>
                                {(obj.status.toLowerCase() === "pending" || obj.status.toLowerCase() === "approve") && <td><div onClick={()=>{
                                  cancleuserbooking(obj._id,"cancle")
                                }} className="btn t-btn btn-danger px-2 py-1 text-center">&#10006;</div></td>}
                                {obj.status.toLowerCase() === "pending" && <td><div className="btn t-btn btn-success px-2 py-1 text-center">&#9998;</div></td>}
                            </tr>
                        </tbody>
                  </table>
                </div>
              </div>

            </>
          )
       })

    return(
        <>
            {userbookingcards}
        </>
    );
}

export default UserBookingPage;