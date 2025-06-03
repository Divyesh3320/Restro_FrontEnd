import './UserLikedPage.css';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLikedPage(){
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    let navigate = useNavigate();

    const [likefoodlist, setlikeFoodlist] = useState([]);
    const [userlike, setuserLike] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/foods",{method:'GET'})
           .then((res) => {
             return res.json();
           })
           .then((res) => {
            setlikeFoodlist(res);
           });
       }, []);

       useEffect(() => {
        fetch("http://localhost:3030/user/"+auth._id,{method:'GET'})
           .then((res) => {
             return res.json();
           })
           .then((res) => {
             setuserLike(res);
           });
       }, [auth._id]);  


       let foods=likefoodlist.filter((food)=>{
        if(userlike.includes(food._id)){
            return true;
        }else{
            return false;
        }
        });

    const updateLike = (foodId) => {
        if (userlike.includes(foodId)) {
            let index = userlike.indexOf(foodId);
            userlike.splice(index, 1);
            fetch(`http://localhost:3030/user/${auth._id}`, {
                method: "PUT",
                body: JSON.stringify(userlike),
                headers: { "Content-Type": "application/json" }
              }).then((res) => {
                // navigate("/user/like");
                window.location.reload();
              })
        } else {
            userlike.push(foodId)
            fetch(`http://localhost:3030/user/${auth._id}`, {
                method: "PUT",
                body: JSON.stringify(userlike),
                headers: { "Content-Type": "application/json" }
              }).then((res) => {
                // navigate("/user/like");
                window.location.reload();
              })
        }
    }

    let likefoodlistcards=foods.map((food)=>{
        return(
            <>
                <div key={food._id} class="card c-likefoodlistcard">
                    <div class="c-likecard-img">
                        <img key={food._id}  src={`${food.img}`} class="card-img-top " alt="..."/>
                    </div>
                    
                    <div class="likecard-body">
                        <p key={food._id} class="likecard-text likelistcardtext">
                            ₹{food.price}<br/>{food.name}
                        </p>

                        <div class="like-likebutton">
                            {userlike.includes(food._id)===false && <p onClick={()=>{
                                updateLike(food._id)
                            }}><i class="fa-regular fa-heart"></i></p>}

                            {userlike.includes(food._id)===true && <p onClick={()=>{
                                updateLike(food._id)
                            }}><i style={{color:"red"}} class="fa-solid fa-heart"></i></p>}
                        </div>

                    </div>
                </div>
            </>
        );
    });

    return(
        <>
            <div className='userlikepage'>
                <div className='likefoodlist'>
                    {likefoodlistcards}
                </div>
            </div>      
        </>
    );
}

export default UserLikedPage;