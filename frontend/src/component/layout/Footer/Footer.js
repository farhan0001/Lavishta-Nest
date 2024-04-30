import React from 'react';
import { IoLogoApple } from "react-icons/io5";
import { FaLinkedin, FaGooglePlay } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS Mobile Phone</p>
        <div id='d-img'>
          <FaGooglePlay className='d-store' fontSize="3vmax" />
          <IoLogoApple className='d-store' fontSize="4vmax"/>
        </div>
      </div>
      <div className='midFooter'>
        <h1>LAVISHTA</h1>
        <p id='comp-p'>Ease Your Way of Shopping</p>
        <p>Copyrights 2024 &copy; LAVISHTA</p>
      </div>
      <div className='rightFooter'>
        <h4>Follow us</h4>
        <a href="www.linkedin.com/in/md-farhan-quamar-86a136198"><FaLinkedin /></a>
      </div>
    </footer>
  )
}

export default Footer