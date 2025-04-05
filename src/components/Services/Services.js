import React from 'react';
import './Services.css';
// Emojis
import FrontEndImage from '../images/img/frontendlogo.png';
import BackEndImage from '../images/img/backendlogo.png';
import SoftSkillsImage from '../images/img/softskills.png';
//
import { motion } from 'framer-motion';
import Card from '../Card/Card';

const Services = ({id, theme}) => {
    return (
        <div className='services' id={id}>

            {/* Left Side */}
            <div className={`awesome ${theme === 'dark' ? 'dark' : ''}`}>
                <span>My Personal</span>
                <span>Aptitudes</span>
                <span style={{fontWeight: 'bold'}}>
                    This is a summary of the libraries, skills and soft-skills I am capable of.
                    <br />
                    If you are interested, you can press the button below to download my CV.
                </span>
                <button className='btn s-btn'>Download CV</button>
                <div className='blur s-blur1' style={{ background: '#ABF1FF94' }}></div>
            </div>

            {/* Right Side */}
            <div className='cards'>

                {/* Card 1 */}
                <motion.div
                    className='motion-card-container1'
                    style={{ left: '18rem' }}
                    initial={{ opacity: 0, y: 100 }}  // Initial state: hidden below
                    whileInView={{ opacity: 1, y: 0 }}  // Animate to visible and slide up
                    exit={{ opacity: 0, y: 100 }}  // Animate exit state when leaving screen (slide down)
                    transition={{ duration: 0.6 }}  // Animation duration
                    viewport={{ once: false, amount: 0.3 }}  // Trigger animation based on how much is in view (30%)
                >
                    <Card
                        emoji={FrontEndImage}
                        heading={'Frontend Libraries'}
                        detail={'D3, React, AXIOS, Framer Motion, Lucide React, EmailJS, React-Router-Dom.'}
                    />
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    style={{ top: '14rem', left: '-3rem' }}
                    initial={{ opacity: 0, y: 100 }}  // Initial state: hidden below
                    whileInView={{ opacity: 1, y: 0 }}  // Animate to visible and slide up
                    exit={{ opacity: 0, y: 100 }}  // Animate exit state when leaving screen (slide down)
                    transition={{ duration: 0.6 }}  // Animation duration
                    viewport={{ once: false, amount: 0.3 }}  // Trigger animation based on how much is in view (30%)
                >
                    <Card
                        emoji={BackEndImage}
                        heading={'Combined With'}
                        detail={'Node.js, Express.js, Cors, Bcrypt, Multer, Path, MySQL, CookieParser, JSONWebToken, Nodemon, Dotenv.'}
                    />
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    style={{ top: '22rem', left: '18rem' }}
                    initial={{ opacity: 0, y: 100 }}  // Initial state: hidden below
                    whileInView={{ opacity: 1, y: 0 }}  // Animate to visible and slide up
                    exit={{ opacity: 0, y: 100 }}  // Animate exit state when leaving screen (slide down)
                    transition={{ duration: 0.6 }}  // Animation duration
                    viewport={{ once: false, amount: 0.3 }}  // Trigger animation based on how much is in view (30%)
                >
                    <Card
                        emoji={SoftSkillsImage}
                        heading={'Soft Skills'}
                        detail={'Tenacious, Empathic, Strict, and Loyal. My word is my bond, so I am absolutely dedicated to respect yours as well. As an experienced Administrative Assistant, I have never received a complaint on how I treat people. It does not matter the role or position one holds.'}

                    />
                </motion.div>

            </div>

        </div>
    );
};

export default Services;
