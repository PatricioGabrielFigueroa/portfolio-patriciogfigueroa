import React from 'react'
import './Intro.css'
import { Linkedin, Github, Facebook } from 'lucide-react';
import SmoothZoomCircle from '../d3/smoothzoomcircle/SmoothZoomCircle.js';
import Slider from '../Slider/Slider.js'

function Intro({id, theme, setTheme}) {
    return (
        <div className={`intro ${theme}`} id={id}>

            <div className='i-left'>
                <div className={`i-name ${theme}`}>
                    <span>Hi! I am</span>
                    <span>Patricio Gabriel Figueroa</span>
                    <span>Full-Stack Developer who specialize in D3, React and MySQL.</span>
                </div>

                <button className='btn i-btn'>Hire Me</button>

                <div className='i-icons'>
                <a href='https://www.linkedin.com/jobs/d3-js-jobs/?currentJobId=4046412375' target="_blank" rel="noopener noreferrer"><Linkedin /></a>
                <a href='https://github.com/PatricioGabrielFigueroa' target="_blank" rel="noopener noreferrer"><Github /></a>
                <a href='https://www.facebook.com/100078977411898/posts/%EF%B8%8F-horarios-de-misa-%EF%B8%8Fbuenos-d%C3%ADas-estos-horarios-corresponden-a-las-misas-que-ser%C3%A1/372960165346561/' target="_blank" rel="noopener noreferrer"><Facebook /></a>
                </div>

            </div>

            <div className='i-right'>
                <Slider theme={theme}/>
            </div>  

        </div>
    )
}

export default Intro