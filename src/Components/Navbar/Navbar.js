import React, { useState } from 'react'
import './Navbar.css'
import SearchBar from './SearchBar'

function Navbar(props) {
  const {handleViewSearch} = props
  const [showSearch,setShowSearch] = useState(false)
  const openSearch = ()=>{
    setShowSearch(true)
  }
  const handleSearch = (value)=>{
    setShowSearch(false)
    handleViewSearch(value)
  }
  return (
    <div className='navbar'>
        <div className='nav-left'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt="" />
        </div>
        <div className='nav-right'>
            {showSearch ? <SearchBar handleSearch={handleSearch}/> : <button onClick={openSearch}><i className="fa-solid fa-magnifying-glass"></i></button>}
            <img src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt="" />
        </div>
    </div>
  )
}

export default Navbar
