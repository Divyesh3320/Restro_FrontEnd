

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Components/Login/login';
import Signup from './Components/Login/sign';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';
import AdminProfile from './Components/Admin/AdminProfile';
import AdminMenue from './Components/Admin/AdminMenue';
import AdminFoods from './Components/Admin/AdminFoods';
import AdminMenueAdd from './Components/Admin/AdminMenueAdd';
import AdminFoodsAdd from './Components/Admin/AdminFoodsAdd';
import AdminMenueUpdate from './Components/Admin/AdminMenueUpdate';
import AdminFoodsUpdate from './Components/Admin/AdminFoodsUpdate';
import UserProfile from './Components/User/UserProfile';
import UserBillsPage from './Components/User/UserBillsPage';
// import UserBookingPage from './Components/User/UserBookingPage';
import UserBookingPage2 from './Components/User/UserBookingPage2';
import UserLikedPage from './Components/User/UserLikedPage';
import BookingForm from './Components/Events/BookingForm';
import AdminEventBooking from './Components/Admin/AdminEventBooking';
import AdminReview from './Components/Admin/AdminReview';
import {GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='179499710765-9o4pl0c3clhhr7tg03v6vjv342lr06fs.apps.googleusercontent.com'>
          <Login></Login>
      </GoogleOAuthProvider>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>

        <Route path='/login' element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<BookingForm />} />

        {/* -----admin part---- */}

        <Route path="/admin" element={<Admin />}>
            <Route index  element={<AdminProfile/>} />
            <Route path="/admin/profile" element={<AdminProfile/>} />
            <Route path="/admin/menue"  element={<AdminMenue/>} />
            <Route path="/admin/foods" element={<AdminFoods/>} />
            <Route path="/admin/eventbooking" element={<AdminEventBooking/>} />
            <Route path="/admin/booking" element={<UserBookingPage2/>} />

            <Route path="/admin/like" element={<UserLikedPage/>} />
            <Route path="/admin/review" element={<AdminReview/>} />
        </Route>
        
        <Route path="/admin/menue/addmenue"  element={<AdminMenueAdd/>} />
        <Route path="/admin/menue/updatemenue/:id"  element={<AdminMenueUpdate/>} />
         
        <Route path="/admin/foods/addfoods"  element={<AdminFoodsAdd/>} />
        <Route path="/admin/foods/updatefoods/:id"  element={<AdminFoodsUpdate/>} />

        {/* -----user part----- */}

        <Route path="/user" element={<User />}>
            <Route index  element={<UserProfile/>} />
            <Route path="/user/profile" element={<UserProfile/>} />
            <Route path="/user/bills"  element={<UserBillsPage/>} />
            <Route path="/user/booking" element={<UserBookingPage2/>} />
            <Route path="/user/like" element={<UserLikedPage/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
