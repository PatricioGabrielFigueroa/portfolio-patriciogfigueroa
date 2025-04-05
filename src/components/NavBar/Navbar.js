import React, { useState } from 'react';
import './Navbar.css';
import ToggleButton from '../ToggleButton/ToggleButton';

function Navbar({ theme, setTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToForm = () => {
        const element = document.getElementById('contact-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`n-wrapper ${theme}`}>
            <div className='n-left'>
                <div className='n-name'>Patricio</div>
                <ToggleButton theme={theme} setTheme={setTheme} />
            </div>
            <div className='n-right'>
                <div className='n-list'>
                    {/* Dropdown Menu */}
                    <ul className={menuOpen ? 'active' : ''} style={{ listStyleType: 'none' }}>
                        <li><a href='#intro'>Home</a></li>
                        <li><a href='#services'>Services</a></li>
                        <li><a href='#experience'>Experience</a></li>
                        <li><a href='#works'>Works</a></li>
                        <li><a href='#portfolio'>Portfolio</a></li>
                    </ul>

                    {/* Hamburger Button */}
                    <div
                        className={`hamburguer ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className='bar'></span>
                        <span className='bar'></span>
                        <span className='bar'></span>
                    </div>
                </div>
                <button className='btn n-btn' onClick={scrollToForm}>Contact Me</button>
            </div>
        </div>
    );
}

export default Navbar;