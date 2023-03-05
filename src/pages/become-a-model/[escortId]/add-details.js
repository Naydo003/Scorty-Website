import React from 'react'
import { useRouter } from 'next/router'
import FormAddDetails from '@/modules/escort/components/FormAddDetails'
import NavBarHome from '@/modules/escortSearch/components/NavBarHome'
import FormEditDetails from '@/modules/escort/components/FormEditDetails'


// We could use local styles here if need
// import styles from '../../../styles/create-item.module.css'
// would need to use className={styles.mediumContainer}

function AddDetails() {

  let router = useRouter()
  const userRenterId = 6


  return (

      <div className='h-screen flex flex-col'>
        <header>
          <NavBarHome />
        </header>
        <main>
        <div className='medium-container flex-1 overflow-auto'>
          <h1 className='heading'>Become A Model</h1>
          <FormEditDetails escort={{}} />
        </div>
        </main>
        {/* <FooterCreateItem formId='new-item-form' prevRoute={`/`}  /> */}
      </div>
  )
}

export default AddDetails






// const activitiesShort = [
//   'Blow Jobs',
//   'Anal Fisting'
// ]


// const activitiesLong = [
//   {name: 'blowJobs', label: 'Blow Jobs', description: 'Blow jobs are amazing... '},
//   {name: 'analFisting', label: 'Anal Fisting', description: 'Anal fisting is amazing... '},
//   ...
// ]

