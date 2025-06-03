// Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-5">
            <div className="container">
                <div className="footer-container">
                    <div className="location">
                        <h4>Location & Hours</h4>
                        <p>123 Main Street, City, Country</p>
                        <p>Mon - Fri: 9am - 10pm</p>
                        <p>Sat - Sun: 10am - 11pm</p>
                    </div>
                    <div className="contactinfo">
                        <h4>Contact</h4>
                        <p>Phone: +123 456 7890</p>
                        <p>Email: info@example.com</p>
                    </div>
                    {/* <div className="col-md-4">
                        
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
