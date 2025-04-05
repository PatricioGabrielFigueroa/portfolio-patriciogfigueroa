import './App.css';
import Navbar from './components/NavBar/Navbar';
import Intro from './components/Intro/Intro.js';
import Services from './components/Services/Services.js';
import Experience from './components/Experience/Experience.js';
import Works from './components/Works/Works.js';
import Portfolio from './components/Portfolio/Portfolio.js';
import ContactForm from './components/ContactForm/ContactForm.js';
import Footer from './components/Footer/Footer.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();

  // Getting the theme from the local storage
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => { // ue for --> Set the current_theme
    localStorage.setItem('current_theme', theme)
  }, [theme])

  useEffect(() => { // ue for --> Adjust scroll-padding top for each component
    
    // Get the current section from the URL
    const currentSection = location.hash;
    document.documentElement.style.scrollPaddingTop = '0'; 

    // Set different scroll-padding-top based on section
    if (currentSection === '#intro') {
      document.documentElement.style.scrollPaddingTop = '15vh';
    } else if (currentSection === '#services') {
      document.documentElement.style.scrollPaddingTop = '15vh';
    } else if (currentSection === '#experience') {
      document.documentElement.style.scrollPaddingTop = '15vh';
    } else if (currentSection === '#works') {
      document.documentElement.style.scrollPaddingTop = '28vh';
    } else if (currentSection === '#portfolio') {
      document.documentElement.style.scrollPaddingTop = '5vh';
    } else if (currentSection === '#footer') {
      document.documentElement.style.scrollPaddingTop = '20vh';
    } else {
      // Default padding if no specific section is targeted
      document.documentElement.style.scrollPaddingTop = '10vh';
    }

    if (currentSection) {
      const element = document.querySelector(currentSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

  }, [location]);

  return (
    <div className={`main ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <div className="hero">
        <div className={`App ${theme}`}>
          <div className="cube c1"></div>
          <div className="cube c2"></div>
          <div className="cube c3"></div>
          <div className="cube c4"></div>
          <div className="cube c5"></div>
          <div className="cube c6"></div>

          {/* Your content components */}
          <Intro id="intro" theme={theme} setTheme={setTheme} />
          <Services id="services" theme={theme} setTheme={setTheme} />
          <Experience id="experience" theme={theme} setTheme={setTheme} />
          <Works id="works" theme={theme} setTheme={setTheme} />
          <Portfolio id="portfolio" theme={theme} setTheme={setTheme} />
          <ContactForm id="contact-form" theme={theme} setTheme={setTheme} />
          <Footer id="footer" theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </div>
  );
}

export default App;
