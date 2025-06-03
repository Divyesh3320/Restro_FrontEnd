import './Menue.css';
import './Menuefoods.css';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Menue(){

    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    let navigate = useNavigate();

    const [typeoffood, setTypeoffood] = useState([]);
    const [foodlist, setFoodlist] = useState([]);
    var [type, setType] = useState("pizza");
    const [like, setLike] = useState([]);
    // const fname=["pizza","burger","chines","dhosha"];
    let fname=[]
    
// console.log("caaa")
    function changetype(index){
        // console.log("tt=",fname[index])
        setType(fname[index]);   
    
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

        useEffect(() => {
            if (!auth===false) {
              fetch("http://localhost:3030/user/" + auth._id, { method: 'GET' })
                .then((res) => res.json())
                .then((res) => {
                  setLike(res);
                });
            }
          }, []);
      
      let listtypeoffood=typeoffood.map((food,index)=>{
                fname[index]=food.name;
            return(
                <>
                    <div className='type-of-foodcard' onClick={()=>{changetype(index)}}>

                            <div className='type-card-img'>
                                <img alt='' src={food.img}/>
                            </div>
                            <div className='type-card-name'>
                                {/* {food.name} */}
                                {food.name.charAt(0).toUpperCase() + food.name.slice(1)}
                            </div>    
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
            setFoodlist(res);
           });
       }, []);


          let foods=foodlist.filter((food)=>{
            console.log("t1=",food.type,"t2=",type)
                    if(food.type.toUpperCase()===type.toUpperCase()){
                        
                        return true;
                    }else{
                        return false;
                    }
               });

               const updateLike = (foodId) => {
                if(!auth===false){
                    if (like.includes(foodId)) {
                        let index = like.indexOf(foodId);
                        like.splice(index, 1);
                        fetch(`http://localhost:3030/user/${auth._id}`, {
                            method: "PUT",
                            body: JSON.stringify(like),
                            headers: { "Content-Type": "application/json" }
                          }).then((res) => {
                            navigate("/");
                          })
                    } else {
                        like.push(foodId)
                        fetch(`http://localhost:3030/user/${auth._id}`, {
                            method: "PUT",
                            body: JSON.stringify(like),
                            headers: { "Content-Type": "application/json" }
                          }).then((res) => {
                            navigate("/");
                          })
                    }
                }else{
                    alert("Login is Require for Like")
                }   
            }     

    let foodlistcards=foods.map((food)=>{
        
        return(
            <>
                <div key={food._id} class="card c-foodlistcard">
                    <div class="c-card-img">
                        <img key={food._id}  src={food.img} class="card-img-top " alt="..."/>
                    </div>
                    
                    <div class="card-body">
                        <p key={food._id} class="card-text listcardtext">
                            ₹{food.price}<br/>{food.name}
                        </p>

                        <div class="likebutton">
                            {like.includes(food._id)===false && <p onClick={()=>{
                                updateLike(food._id)
                            }}><i class="fa-regular fa-heart"></i></p>}

                            {like.includes(food._id)===true && <p onClick={()=>{
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
        <div id='menue' className='menue-main'>
            <div className='menue-heading'>
                <span className='text'>Search your food</span>
            </div>

            <div className='typeoffood'>
                {listtypeoffood}
            </div>

        </div>  

        <hr></hr>

        <div className='type-of-foodname'>{type.charAt(0).toUpperCase() + type.slice(1)}</div>

        <div className='menuefoods'>
            <div className='foodlist'>
                {foodlistcards}
            </div>
        </div>
    </>
    );
}

export default Menue;