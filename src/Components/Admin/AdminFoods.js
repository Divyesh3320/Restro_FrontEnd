import './AdminFoods.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import AdminFoodsAdd from './AdminFoodsAdd';
import AdminFoodsUpdate from './AdminFoodsUpdate';


function AdminFoods(){
    
    const [typeoffood, setTypeoffood] = useState([]);
    const [adminfoods, setadminfoods] = useState([]);
    var [type, setType] = useState("All");
    let list=[]

    function changetype(value){   
        setType(value);
    }

    function Delete(id) {
        fetch("http://localhost:3030/foods/"+id, {
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

    useEffect(() => {
        fetch("http://localhost:3030/menue",{method:'GET'})
           .then((res) => {
             return res.json();
           })
           .then((res) => {
             setTypeoffood(res);
           });
       }, []);

       typeoffood.map((food,index)=>{
        list[index]=food.name.charAt(0).toUpperCase() + food.name.slice(1);
            return(
            <>
            </>
            );
        });

        list.unshift("All")

        let foodslist=list.map((food)=>{
                return(
                    <>
                        <div onClick={()=>{changetype(food.charAt(0).toLowerCase() + food.slice(1))}} className='btn btn-success px-4 mx-5 fw-bold'>
                            {food}
                        </div>
                    </>
                );
            });
    

    useEffect(() => {
        fetch("http://localhost:3030/foods",{method:'GET'})
           .then((res) => {
             return res.json();
           })
           .then((res) => {
             setadminfoods(res);
           });
       }, []);


       let foods=adminfoods.filter((food)=>{

        if(type!=="All" && type!=="all"){
            if(food.type===type){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }  
   });

     console.log("check",foods)

       

       let adminfoodscards=foods.map((food)=>{

        return(
            <>
                <div class="container">
                    <div class="card foodscard-horizontal">
                        {/* <img alt='' src={food.img}/> */}
                        <img className='card-img af-card-img' src={`${food.img}`} alt="Menue imag"/>
                        <div class="card-body cf-card-body">
                            <div className='card-name'>
                                <h3>Name</h3>
                                <p>{food.name}</p>
                            </div>
                            <div className='card-price'>
                                <h3>Price</h3>
                                <p>{food.price}</p>
                            </div>
                        </div>
                        <div class="ml-auto">
                            <button onClick={() => 
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
                                        Delete(food._id)
                                    }
                                })
                                } class="btn c-btn btn-danger">Delete</button>
                            <button 
                                className="btn cf-btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={`#updateFoodModal-${food._id}`}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
  });


    return(
        <>
            <div className="af-header">
                <div className='af-header-search'>
                    {foodslist}
                </div>

                <div className='af-header-add'>
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

            <div className='af-content'>

                {adminfoodscards}

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
                            <AdminFoodsAdd />
                        </div>
                    </div>
                </div>
            </div>            

            {/* Modals for Updating Foods */}
            {foods.map((food) => (
                <div
                    key={`modal-${food._id}`}
                    className="modal fade"
                    id={`updateFoodModal-${food._id}`}
                    tabIndex="-1"
                    aria-labelledby={`updateFoodModalLabel-${food._id}`}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered custom-modal" style={{ maxWidth: "800px", width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center" id={`updateFoodModalLabel-${food._id}`}>
                                    Update Food Item
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AdminFoodsUpdate id={food._id} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AdminFoods;