import { useEffect, useState } from "react";
import './UserBookingPage2.css';

function UserBookingPage2() {
    const authstring = localStorage.getItem('user');
    const auth = JSON.parse(authstring);

    const [allbooking, setAllBooking] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/booking", { method: 'GET' })
            .then((res) => res.json())
            .then((res) => setAllBooking(res));
    }, []);

    let userbooking = allbooking.filter((obj) => auth._id === obj.userid);

    function cancelUserBooking(id, change) {
        fetch(`http://localhost:3030/booking/${id}`, {
            method: "PUT",
            body: JSON.stringify({ change: change }),
            headers: { "Content-Type": "application/json" }
        })
            .then(() => window.location.reload())
            .catch((error) => console.error("Error updating booking:", error));
    }

    let userbookingcards = userbooking.map((obj, index) => {
        return (
            <div key={index} className="container booking-container p-0 mt-4">
                <div className="card booking-card border border-3">
                    <div className="card-body">
                        <h5 className="card-title">Event {index + 1}</h5>
                        <hr />
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Email:</strong> {obj.email}</li>
                            <li className="list-group-item"><strong>Mobile:</strong> {obj.contactno}</li>
                            <li className="list-group-item"><strong>Date:</strong> {obj.date}</li>
                            <li className="list-group-item"><strong>Time:</strong> {obj.time}</li>
                            <li className="list-group-item"><strong>Status:</strong> {obj.status}</li>
                            {(obj.status.toLowerCase() === "pending" || obj.status.toLowerCase() === "approve") &&
                                <li className="list-group-item">
                                    <button onClick={() => cancelUserBooking(obj._id, "cancel")} className="btn btn-danger px-2 py-1">&#10006; Cancel</button>
                                </li>
                            }
                            {obj.status.toLowerCase() === "pending" &&
                                <li className="list-group-item">
                                    <button className="btn btn-success px-2 py-1">&#9998; Edit</button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
            {userbookingcards}
        </div>
    );
}

export default UserBookingPage2;
