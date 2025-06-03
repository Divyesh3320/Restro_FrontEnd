import './AdminMenue.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import AdminMenueAdd from './AdminMenueAdd'; // Import the Add Component
import AdminMenueUpdate from './AdminMenueUpdate'; // Import the Update Component

function AdminMenue() {
    const [adminmenue, setAdminMenue] = useState([]);

    // Function to handle delete
    function Delete(id) {
        fetch("http://localhost:3030/menue/" + id, {
            method: "DELETE"
        }).then(() => {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        });
    }

    // Fetch menu data on component load
    useEffect(() => {
        fetch("http://localhost:3030/menue", { method: 'GET' })
            .then((res) => res.json())
            .then((res) => {
                setAdminMenue(res);
            });
    }, []);

    // Map through adminmenue data to create cards
    let adminMenueCards = adminmenue.map((food) => {
        return (
            <div className="container" key={food._id}>
                <div className="card card-horizontal">
                    <img className='card-img am-card-img' src={`${food.img}`} alt="Menu item" />
                    <div className="card-body c-card-body">
                        <div className='card-name'>
                            <h3>Name</h3>
                            <p>{food.name}</p>
                        </div>
                        <div className='card-price'>
                            <h3>Price</h3>
                            <p>$500</p>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <button
                            onClick={() => {
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
                                        Delete(food._id);
                                    }
                                });
                            }}
                            className="btn c-btn btn-danger"
                        >
                            Delete
                        </button>
                        <button className="btn c-btn btn-primary" 
                            data-bs-toggle="modal"
                            data-bs-target={`#updateMenuModal-${food._id}`}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="am-header">
                <div className='header-search'>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <form className="d-flex">
                                    <input className="form-control me-1 p-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-primary" type="submit">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='header-add'>
                    {/* Button to trigger modal */}
                    <button
                        className="btn btn-primary px-5"
                        data-bs-toggle="modal"
                        data-bs-target="#addMenuModal"
                    >
                        Add
                    </button>
                </div>
            </div>

            <hr className='p-0 m-0' />

            <div className='am-content'>
                {adminMenueCards}
            </div>

            {/* Modal for Adding Menu */}
            <div
                className="modal fade "
                id="addMenuModal"
                tabIndex="-1"
                aria-labelledby="addMenuModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered custom-modal"   style={{ maxWidth: "800px", width: "100%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                                <h5 className="modal-title w-100 text-center" id="addMenuModalLabel">Add Menu</h5>     
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <AdminMenueAdd />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals for Updating Menu */}
            {adminmenue.map((food) => (
                <div
                    key={`modal-${food._id}`}
                    className="modal fade"
                    id={`updateMenuModal-${food._id}`}
                    tabIndex="-1"
                    aria-labelledby={`updateMenuModalLabel-${food._id}`}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered custom-modal" style={{ maxWidth: "800px", width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center" id={`updateMenuModalLabel-${food._id}`}>
                                    Update Menu
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AdminMenueUpdate id={food._id} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default AdminMenue;












// import './AdminMenue.css';
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from 'sweetalert2'


// function AdminMenue() {

//     const [adminmenue, setadminmenue] = useState([]);


//     function Delete(id) {
//         fetch("http://localhost:3030/menue/" + id, {
//             method: "DELETE"
//         }).then((res) => {
//             Swal.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//             }).then((res)=>{
//                 window.location.reload();
//             })

//         });
//     }


//     useEffect(() => {
//         fetch("http://localhost:3030/menue", { method: 'GET' })
//             .then((res) => {
//                 return res.json();
//             })
//             .then((res) => {
//                 setadminmenue(res);
//             });
//     }, []);

//     let adminmenuecards = adminmenue.map((food, index) => {


//         return (
//             <>
//                 <div class="container">
//                     <div class="card card-horizontal">
//                         <img className='card-img am-card-img' src={`.${food.img}`} alt="Menue imag" />
//                         <div class="card-body c-card-body">
//                             <div className='card-name'>
//                                 <h3>Name</h3>
//                                 <p>{food.name}</p>
//                             </div>
//                             <div className='card-price'>
//                                 <h3>Price</h3>
//                                 <p>$500</p>
//                             </div>
//                         </div>
//                         <div class="ml-auto">
//                             <button onClick={() => {
//                                 Swal.fire({
//                                     title: "Are you sure?",
//                                     text: "You won't be able to revert this!",
//                                     icon: "warning",
//                                     showCancelButton: true,
//                                     confirmButtonColor: "#3085d6",
//                                     cancelButtonColor: "#d33",
//                                     confirmButtonText: "Yes, delete it!"
//                                 }).then((result) => {
//                                     if (result.isConfirmed) {
//                                         Delete(food._id)
//                                     }
//                                 });
//                             }} class="btn c-btn btn-danger">Delete</button>
//                             <button class="btn c-btn btn-primary">
//                                 <Link to={`/admin/menue/updatemenue/${food._id}`} className='nav-link' >
//                                     Edit
//                                 </Link>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     });


//     return (
//         <>
//             <div className="am-header">

//                 <div className='header-search'>
//                     <div class="container">
//                         <div class="row justify-content-center">
//                             <div class="col">
//                                 <form class="d-flex">
//                                     <input class="form-control me-1 p-2" type="search" placeholder="Search" aria-label="Search" />
//                                     <button class="btn btn-outline-primary" type="submit">Search</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>



//                 <div className='header-add'>
//                     <Link to="/admin/menue/addmenue" className='nav-link' >
//                         <button class="btn btn-primary px-5">
//                             add
//                         </button>
//                     </Link>
//                 </div>

               
//             </div>

//             <hr className='p-0 m-0' />

//             <div className='am-content'>

//                 {adminmenuecards}

//             </div>
//         </>
//     )
// }

// export default AdminMenue;