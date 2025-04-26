import React from "react";
import './Experience.css';

const Experience = ({id, theme}) => {
    return (
        <div className={`experience ${theme}`} id={id}>

            <div className={`achievements ${theme}`}>
                <div className={`circles ${theme}`}>+2000</div>
                    <span>Hours In</span>
                    <span>Certifications</span>
            </div>

            <div className={`achievements ${theme}`}>
                <div className={`circles ${theme}`}>+20</div>
                    <span>Projects</span>
                    <span>Developed</span>
            </div>

            <div className={`achievements ${theme}`}>
                <div className={`circles ${theme}`}>3</div>
                    <span>Complete Websites</span>
                    <span>For Startups</span>
            </div>

        </div>
    )
}

export default Experience