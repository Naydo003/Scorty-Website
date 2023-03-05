import React from 'react'
import Link from 'next/link'

function QuickSearchLinksBar() {
  return (
    <div className='h-[30px] w-full flex flex-row space-x-5 bg-black'>
      <Link className='nav-link text-white' href='/location/melbourne' >Brisbane</Link>
      <Link className='nav-link text-white' href='/location/sydney' >Sydney</Link>
      <Link className='nav-link text-white' href='/location/melbourne' >Melbourne</Link>
      <Link className='nav-link text-white' href='/location/melbourne' >Gold Coast</Link>
      <Link className='nav-link text-white' href='/location/melbourne' >Adelaide</Link>
      <Link className='nav-link text-white' href='/location/melbourne' >Perth</Link>
      <Link className='nav-link text-white' href='/location/melbourne' >Hobart</Link>
      <Link className='nav-link text-white' href='/location/melbourne' >Darwin</Link>
    </div>
  )
}

export default QuickSearchLinksBar