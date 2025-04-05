import React, { useState, useEffect } from 'react'
import './Works.css'
//
import freeCodeCamp from './img/fcc.png'
import Anglia from './img/anglia.png'
import Excel from './img/excel.png'
import GrowWithGoogle from './img/growwithgoogle.jpg'
import Office365 from './img/office-365.png'

function Works({id, theme}) {

    const [ isHovered, setIsHovered ] = useState(false)
    const [secId, setSecId ] = useState()

    const handleMouseEnter = (e) => {
        setIsHovered(true)
        setSecId(e.target.id)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
        setSecId(null)
    }

    return (
        <div className='works' id={id}>
            <div className={`awesome ${theme === 'dark' ? 'dark' : ''}`}>
                <span>More About</span>
                <span>My Knowledge</span>
                <span>
                    {'\u2728'}Autodidact
                    <br />
                    {'\u2728'}C1 English Level
                    <br />
                    {'\u2728'}Experienced using Excel
                    <br />
                    {'\u2728'}Experienced using Word and Writing
                    <br />
                    or Redacting Documents, and presentations on PowerPoint.
                </span>
                <button className='btn s-btn'>Press Me</button>
                <div className='blur s-blur1' style={{ background: '#ABF1FF94'}}></div>
            </div>

                {/* R Side*/}
                <div className='w-right'>

                    <div className={`w-main-circle ${theme}`}>

                        <div className='w-sec-circle' id='circle-1' onMouseEnter={(e) => {
                            handleMouseEnter(e)
                        }} onMouseLeave={handleMouseLeave}>
                            <img src={freeCodeCamp} alt='' className='works-img-1' />
                            {isHovered && secId === 'circle-1' && (
                                <div className='tooltip-works'>This was my main source of information, and my starting point. I have not paid for any other courses. 
                                </div>
                            )}
                        </div>

                        <div className='w-sec-circle' id='circle-2' onMouseEnter={(e) => {
                            handleMouseEnter(e)
                        }} onMouseLeave={handleMouseLeave}>
                            <img src={Anglia} alt='' className='works-img-2' />
                            {isHovered && secId === 'circle-2' && (
                                <div className='tooltip-works'>My English proficiency is at a C1 level according to Anglia Examinations. I have been teaching English to native Spanish speakers since 2015.</div>
                            )}
                        </div>

                        <div className='w-sec-circle' id='circle-3' onMouseEnter={(e) => {
                            handleMouseEnter(e)
                        }} onMouseLeave={handleMouseLeave}>
                            <img src={GrowWithGoogle} alt='' className='works-img-3'/>
                            {isHovered && secId === 'circle-3' &&(
                                <div className='tooltip-works'>Familiar with all the Google Apps to increment productivity, such as Sheets, Locker Studio, Keep, Classrom, and finally I have been studying from GrowWithGoogle or former Activate.</div>
                            )}
                        </div>

                        <div className='w-sec-circle' id='circle-4' onMouseEnter={(e) => {
                            handleMouseEnter(e)
                        }} onMouseLeave={handleMouseLeave}>
                            <img src={Excel} alt='' className='works-img-4'/>
                            {isHovered && secId === 'circle-4' &&(
                                <div className='tooltip-works'>My current work demands vast knowledge within this field, so I've plenty of experience using this tool for more than 5 years.</div>
                            )}
                        </div>

                        <div className='w-sec-circle' id='circle-5' onMouseEnter={(e) => {
                            handleMouseEnter(e)
                        }} onMouseLeave={handleMouseLeave}>
                            <img src={Office365} alt='' className='works-img-5'/>
                            {isHovered && secId === 'circle-5' && (
                                <div className='tooltip-works'>As an skilled user in regard to PowerPoint and Word, I can confidently say I can make the most of Office 365 as a whole. No difficulties come along when I make elegant presentations, or when I have to write formally.</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default Works