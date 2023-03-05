import EscortCard from '@/modules/escortSearch/components/EscortCard'
import NavBarHome from '@/modules/escortSearch/components/NavBarHome'
import React from 'react'
import { prisma } from '@/database/db'


function Location({escorts}) {

  return (  
    <>
      <header>
        <NavBarHome />
      </header>
      <main>

        <div className='w-full max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {escorts.map(escort => (
            <EscortCard key={escort.id} escort={escort} />
          ))}
        </div>



      </main>
    </>
  )
}

export default Location


export async function getServerSideProps(context) {
  
  console.log('context')
  console.log(context.params)


  const {location} = context.params
  console.log("getting ssP's")
  const escorts = await prisma.escort.findMany({
    where: {
      city: location,
    },
    select: {
      id: true,
      name: true,
      age: true,
      city: true,
      bodyShape: true,
      profileHeading: true,
      basePrice: true
    }
  })


  return {
    props: {
      escorts: JSON.parse(JSON.stringify(escorts))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}