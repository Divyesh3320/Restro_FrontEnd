
import './App.css';
import React from "react";
import Navbar from './Components/Navbar/Navbar';
import Slider from './Components/Slider/Slider';
import Event from './Components/Events/Event';
import Gallery from './Components/Gallery/Gallery';
import Menue from './Components/Menue/Menue';
import Review from './Components/Review/Review';
import Footer from './Components/Footer/Footer';



function Home() {
  return (
    <>
      <Navbar/>
      <Slider/>
      <Menue/>
      <Event/>
      <Gallery/>
      <Review/>
      <Footer/>
     </> 
  );
}

export default Home;