import React from 'react'

// import NavBarSearch from '../../modules/escortSearch/components/NavBarSearch'
// import FooterMain from '@/modules/escortSearch/components/FooterMain'
import NewEscortForm from '@/modules/escort/components/FormNewEscort'
import NavBarHome from '@/modules/escortSearch/components/NavBarHome'

function AddNewEscort() {


  return (
    <>
      <header>
        <NavBarHome />
      </header>
      <main>
        <div className='h-screen flex flex-col'>
          <div className='medium-container flex-1 overflow-auto'>
            <h1 className='heading'>Become A Model</h1>
            <NewEscortForm />
          </div>
          {/* <FooterMain formId='new-item-form' prevRoute={`/`}  /> */}
        </div>
      </main>
    </>
  )
}

export default AddNewEscort