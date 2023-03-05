import React from 'react'

import FormEditDetails from '@/modules/escort/components/FormEditDetails'
import NavBarSearch from '@/modules/escortSearch/components/NavBarHome'
import NavBarHome from '@/modules/escortSearch/components/NavBarHome'


function edit({escort}) {
  return (
    <>
      <header>
        <NavBarHome />
      </header>
      <main>
        <div className='medium-container flex-1 overflow-auto'>
            <h1 className='heading'>Make any changes and then hit Save...</h1>
            <FormEditDetails escort={escort} />
        </div>
      </main>
    </>
  )
}

export default edit



export async function getServerSideProps(context) {
  
  let escortId = JSON.parse(context.params.escortId) 
  // escortId = 41          // Need to remove or 32
  console.log("getting ssP's")
  const escortDetails = await prisma.escort.findUnique({
    where: {
      id: escortId,
    },
    include: {
      links: {
        select: {
          linkMedia: true,
          linkUrl: true
        },
      },
      meetsWith: {
        select: {
          meetsWith: true,          // with the id, maybe useful for a consistent order??? but probs just make alphabetical.
        },
      },
      activities: {
        select: {
          activity: {
            select: {
              name: true,          // without the id
            }
          },
        },
      },
      incallPrices: {
        select: {
          time: true,
          price: true,
          includesInfo: true
        },
      },
      outcallPrices: {
        select: {
          time: true,
          price: true,
          includesInfo: true
        },
      },
    }
  })

  return {
    props: {
      escort: JSON.parse(JSON.stringify(escortDetails))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}