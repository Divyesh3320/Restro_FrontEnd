import  { useState } from 'react';
import './BookingForm.css';
import { useNavigate } from 'react-router-dom';


function BookingForm(){
    const currentDate = new Date();
const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth());
    const authstring=localStorage.getItem('user');
    const auth = JSON.parse(authstring);
    const [formData, setFormData] = useState({
        userid: auth._id,
        name: '',
        email: '',
        contactno: '',
        description: '',
        time: '',
        date: '',
        bookingdate: currentDateOnly,
        status: 'Pending' 
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitButton = document.querySelector('.booking-submit-btn');
            submitButton.classList.add('loading');

            const res= await fetch("http://localhost:3030/booking",{
                method:"POST",
                body:JSON.stringify(formData),
                headers: {"Content-Type":"application/json"}
              })
      
              var data = await res.json();
      
              console.log("booking data=",data)
            
            
            setFormData({
                userid:auth._id,
                name: '',
                email: '',
                contactno: '',
                description: '',
                time: '',
                date: '',
                bookingdate: currentDateOnly,
                status: 'Pending'
            });
            if(auth.admin == 1){
                navigate("/admin/booking");
            }else{
             navigate("/user/booking");
            }
        } catch (err) {
            console.error('Error submitting booking:', err);
        } finally {
            const submitButton = document.querySelector('.booking-submit-btn');
            submitButton.classList.remove('loading');
        }
    };

    return (
        <div className="bookingform-container">
            <div className='booking-main'>
                <h2 className='text-center mb-2'>Event Booking</h2>
                <form onSubmit={handleSubmit}>
                    <div className="booking-form-group">
                        <label htmlFor="bookingName" className="ps-2 form-label">Name:</label>
                        <input className="form-control rounded-4" id="bookingName" type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="booking-form-group">
                        <label htmlFor="bookingEmail" className="ps-2 form-label">Email:</label>
                        <input className="form-control rounded-4" id='bookingEmail' type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="booking-form-group">
                        <label htmlFor="bookingContactno" className="ps-2 form-label">Contact No:</label>
                        <input className="form-control rounded-4" id='bookingContactno' type="text" name="contactno" value={formData.contactno} onChange={handleChange} required />
                    </div>
                    <div className="booking-form-group">
                        <label htmlFor="bookingDescreption" className="ps-2 form-label">Description:</label>
                        <textarea className="form-control rounded-4" id='bookingDescreption' name="description" cols="50" value={formData.description} onChange={handleChange} required></textarea>
                    </div> 
                    <div className="booking-form-group">
                        <label htmlFor="bookingTime" className="ps-2 form-label">Time:</label>
                        <input className="form-control rounded-4" id='bookingTime' type="time" name="time" value={formData.time} onChange={handleChange} required />
                    </div>
                    <div className="booking-form-group">
                        <label htmlFor="bookingDate" className="ps-2 form-label">Date:</label>
                        <input className="form-control rounded-4" id='bookingDate' type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="booking-submit-btn btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
