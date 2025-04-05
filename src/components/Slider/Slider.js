import React from 'react'
import './Slider.css'
// Man 
import blackMan from './slider-images/man.png'
import whiteMan from './slider-images/manw.png'
// Slider
import img1 from './slider-images/i1.png'
import img2 from './slider-images/i2.png'
import img3 from './slider-images/i3.png'
import img4 from './slider-images/i4.png'
import img5 from './slider-images/i5.png'
import img6 from './slider-images/i6.png'
import img7 from './slider-images/i7.png'

function Slider({ theme }) {
    return (
        <div>
            <div className={`banner`}>
                <div className='slider' style={{'--quantity': 10}}>
                    <div className='item' style={{'--position': 1}}><img src={img1} alt='image-1' /></div>
                    <div className='item' style={{'--position': 2}}><img src={img2} alt='image-2' /></div>
                    <div className='item' style={{'--position': 3}}><img src={img3} alt='image-3' /></div>
                    <div className='item' style={{'--position': 4}}><img src={img4} alt='image-4' /></div>
                    <div className='item' style={{'--position': 5}}><img src={img5} alt='image-5' /></div>
                    <div className='item' style={{'--position': 6}}><img src={img6} alt='image-6' /></div>
                    <div className='item' style={{'--position': 7}}><img src={img7} alt='image-7' /></div>
                </div>

                <div className='content'>
                    <div className='model'>
                        <img src={theme === 'light' ? blackMan : whiteMan} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Slider;