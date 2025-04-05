import React from 'react'
import './Footer.css'
import { Linkedin, Github, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <div className='main-footer'>
            <div className="footer">
                <div className="footer-container">
                    <div className="footer-left">
                    <p>&copy; 2025 My Company</p>
                        <div className='i-icons-footer'>
                            <a href='https://www.linkedin.com/jobs/d3-js-jobs/?currentJobId=4046412375' target="_blank" rel="noopener noreferrer"><Linkedin /></a>
                            <a href='https://github.com/PatricioGabrielFigueroa' target="_blank" rel="noopener noreferrer"><Github /></a>
                            <a href='https://www.facebook.com/100078977411898/posts/%EF%B8%8F-horarios-de-misa-%EF%B8%8Fbuenos-d%C3%ADas-estos-horarios-corresponden-a-las-misas-que-ser%C3%A1/372960165346561/' target="_blank" rel="noopener noreferrer"><Facebook /></a>
                        </div>
                    </div>
                    <div className="footer-right">
                    <ul className="footer-links">
                        <li><a href="#" className='link-footer'>About Us</a></li>
                        <li><a href="#" className='link-footer'>Privacy Policy</a></li>
                        <li><a href="#" className='link-footer'>Terms of Service</a></li>
                        <li><a href="#" className='link-footer'>Contact</a></li>
                    </ul>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Footer