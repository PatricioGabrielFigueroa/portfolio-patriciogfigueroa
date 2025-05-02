import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [contactName, setContactName] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactName(formData.name);
  
    // Make sure reCAPTCHA script is loaded
    if (!window.grecaptcha) {
      console.error('reCAPTCHA not loaded');
      return;
    }
  
    // Request token from Google reCAPTCHA v3
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('YOUR_SITE_KEY', { action: 'submit' }).then((token) => {
        const data = {
          ...formData,
          'g-recaptcha-response': token // this is what EmailJS uses to verify
        };
  
        emailjs.send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          data,
          process.env.REACT_APP_PUBLIC_KEY
        ).then(() => {
          setStatus(true);
          setFormData({ name: '', email: '', message: '' });
        }).catch((err) => {
          console.error('Email failed:', err);
          setStatus(false);
        });
      });
    });
  };
  

  return (
    <div id="contact-form" className={theme}>
      {!status && (
        <>
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit" className="form-btn">
              <span>SEND EMAIL</span>
            </button>
          </form>
        </>
      )}
      {status && (

        <div className='main-response'>
        <p className='response-p'>
          Dear {contactName}, I've received your email. I'll contact you as soon as possible. God bless you.
        </p>

        <div className="cf-tooltip-container">
          <span className="cf-tooltip">Thank you! &#127775;
          </span>
          <span className="text">@</span>
        </div>
    
        </div>
      )}
    </div>
  );
};

export default ContactForm;
