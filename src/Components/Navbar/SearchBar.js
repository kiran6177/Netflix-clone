import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar(props) {
    const {handleSearch} = props
    const [value,setValue] = useState('')
    const handleChange = (e)=>{
        setValue(e.target.value)
    }

    const searchData = ()=>{
        handleSearch(value)
    }
  return (
    <div className='search-outer'>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={searchData}><i className="fa-solid fa-magnifying-glass"></i></button>
    </div>
  )
}
export default SearchBar
