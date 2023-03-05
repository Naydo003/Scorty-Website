import React from 'react'

function EscortCard({escort}) {


  return (
    <div className='h-[250px] border-4 border-black' key={escort.id}>
      <h3 className='text-2xl'>{escort.name}</h3>
      <p>{escort.age}</p>
      <p>{escort.basePrice}</p>
      <p>{escort.bodyShape}</p>
      <p>{escort.profileHeading}</p>
      <p>{escort.city}</p>
    </div>
  )
}

export default EscortCard