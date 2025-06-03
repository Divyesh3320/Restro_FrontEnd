import './UserProfile.css';

import { useNavigate } from 'react-router-dom';
function UserProfile(){

    const Logout=()=>{
        fetch("http://localhost:3030/logout", {
            method: "GET",
            credentials: 'include'  // This is important to send the cookie with the request
        })
        .then(res => res.json())
        .then((data) => {
            if(data === 'logout'){
                navigate('/login')
            }else{
                alert(data)
            }
            console.log("Response from /user:", data);
        })
        .catch((err) => {
            console.error("Error fetching user:", err);
        });
     }

    let navigate=useNavigate()
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    // console.log(auth)
    return(
        <>
            <div className='container-fluid userprofile-container'>

                <div className='userprofile-header row  text-center'>
                    <div className='userprofile-img'>
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.677283386.1704683708&semt=ais" class="rounded-circle" alt="Cinque Terre"/> 
                    </div>
                    <div className='user-name'>
                        {auth.name}
                    </div>
                </div>

                <div className=' font-size ps-4  mt-3'>
                     <span className='label'> Email  :</span>  {auth.email}
                </div>
                
                <hr></hr>

                <div className='text-flex font-size ps-4  mt-3'>
                  <span className='label'>  FullName  :  </span>   {auth.name}
                </div>


                <hr></hr>

                <div className=' font-size ps-4 mt-3'>
                    <span className='label'>Contact No  :</span> 9921618253
                </div>

                <hr></hr>

                <div className='text-center mt-5'>
                    <div className="btn l-btn btn-danger px-4" onClick={()=>{
                        Logout();
                        localStorage.removeItem('user')
                        
                        navigate('/login')
                        }}>Log Out
                    </div>
                </div>

                

               
            </div>

            
        </>
    );
}

export default UserProfile;