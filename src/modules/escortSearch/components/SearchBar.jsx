
import React from 'react'

function SearchBar(props) {


  return (
    <div className='h-6 min-w-[40px] w-full justify-center border border-black rounded-full' onClick={props.onClick}>
      <p className='inline-block'>{props.location} | </p>
      <p className='inline-block'>{props.priceRange} | </p>
      <p className='inline-block'>{props.age} </p>
      <p className='inline-block' >...</p>
      
    </div>
  )
}

export default SearchBar