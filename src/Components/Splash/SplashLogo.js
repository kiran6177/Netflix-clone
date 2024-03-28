import React from 'react'
import './Splash.css'
import Loader from '../Loader/loader'

function SplashLogo({exiting}) {

  return (
    <div className={`splash ${exiting ? 'exiting' : ''}`}>
        <div className='netflix-logo'>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h4>NETFLIX</h4>
        <Loader/>
    </div>
  )
}
export default SplashLogo