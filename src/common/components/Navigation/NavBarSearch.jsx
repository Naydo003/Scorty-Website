import React from 'react'
import Link from 'next/link'
import Logo from '../../../../public/next.svg'
// import SearchBar from './SearchBar'
// import ProfileMenu from './ProfileMenu'

function NavBarSearch() {

  let escortId

  const openModal = () => {
    console.log('open a modal withh currency and language settings etc')
  }
  
  return (
    <>
      <div className='h-[100px] w-full flex flex-row items-center sm:justify-between px-5 lg:px-20 bg-[red]'>
        <Link className='hidden sm:block bg-blue-100' href='/'> 
          <Logo className='w-[50px] h-[50px]' />      
        </Link>
        {/* <SearchBar /> */}

        <div className='flex flex-row justify-between sm:space-x-4 sm:justify-end w-full'>
          {escortId ? (
            <Link className='nav-link hidden sm:block' href='/renters-profile/userRenterId'>Manage your Account</Link>      // Not using signOutHandler any more
            ) : (
            <Link className='nav-link hidden sm:block' href='/become-a-model'>Become an Escort</Link>
          )}
          <div>
            <span className='nav-link hidden sm:block' onClick={openModal}>cur</span>tt
          </div>
          
          {/* <ProfileMenu/> */}
        </div>
    </div>
      </>
  )
}

export default NavBarSearch