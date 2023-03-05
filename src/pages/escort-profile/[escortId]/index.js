import React, {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { contactMethodTitleMap, drinkerTitleMap, educationTitleMap, escortActivitiesTitleMap, ethnicityTitleMap, linkMediaTitleMap, meetsWithOptionsTitleMap, questionsTitleMap, smokerTitleMap, specialCategoryTitleMap, timeframeTitleMap } from '@/modules/escort/utils/escort-enumerables'

import axios from 'axios'


import { EscortContext } from '@/common/contexts/escort-context'
import NavBarHome from '@/modules/escortSearch/components/NavBarHome'


export default function index({escort}) {            //   need index() if using client side fetching
  // const [ escort, setEscort ] = useState(null)      // CSF only
  let router = useRouter()
  const { escortId, escortName, escortEmail } = useContext(EscortContext)

  // console.log(escort)
  // console.log(escort.links)



  const escortIdTemp = 12

  // useEffect(() => {
  //   async function getEscort() {
  //     try {
  //       const result = await axios.get(`/api/escorts/${escortIdTemp}`)
  //       console.log(result.data)
  //       setEscort(result.data)
  //     } catch {
  //       console.log('fucked')
  //     }
  //   }
  //   getEscort()

  // }, [] )                
   // May need to add dependency router.query.id and router.isReady  see https://www.youtube.com/watch?v=aprLiG34b50    i don't think so because their id is being pulled from the route url, mine is provided by context / auth
    // Nevermind, using url instend of query now

    

              




  return (
    <>
      <header>
        <NavBarHome />
      </header>
      <main>
        <div>
          <h1>Hello {escortName}</h1>
          {/* need to include loading screen here, only with client side rendering I think */}
          {escort && <div>                                      
            <p>Name in DB: {escort.name}</p>
            <p>Private Email: {escort.privateEmail}</p>
            <p>Age: {escort.age}</p>
    
            <p>Height: {escort.height}</p>
            <p>Body Shape: {escort.bodyShape}</p>
            <p>Hair Colour: {escort.hairColour}</p>
            <p>Pubic Hair: {escort.pubicHair}</p>
            <p>Ethnicity: {ethnicityTitleMap[escort.ethnicity]}</p>
            <p>Nationality: {escort.nationality}</p>
            <p>Languages: {escort.languages}</p>
            <p>Education: {educationTitleMap[escort.education]}</p>
            <p>Smoker: {smokerTitleMap[escort.smoker]}</p>
            <p>Drinker: {drinkerTitleMap[escort.drinker]}</p>



            

            <p>***************************************************************</p>
            <p>Special Category: {specialCategoryTitleMap[escort.specialCategory]}</p>

            <p>Meets With: </p>
            <ol>
              {escort.meetsWith.map((mw, idx) => {
                let mwName = mw.meetsWith.name
                return <li key={idx} >{meetsWithOptionsTitleMap[mwName]}</li>
              })}
            </ol>

            <p>Activities: </p>
            <ol>
              {escort.activities.map((act, idx) => {
                let actName = act.activity.name
                return <li key={idx} >{escortActivitiesTitleMap[actName]}</li>
              })}
            </ol>

            <p>Incall Prices: </p>

            {escort.incallPrices.map((price, idx) => (
                <div key={idx} className='flex flew-rox space-x-4'>
                  <p >{timeframeTitleMap[price.time]}</p>
                  <p >{price.price}</p>
                  <p >{price.includesInfo}</p>

                </div>
            ))}

            <p>Outcall Prices: </p>

            {escort.outcallPrices.map((price, idx) => (
                <div key={idx} className='flex flew-rox space-x-4'>
                  <p >{timeframeTitleMap[price.time]}</p>
                  <p >{price.price}</p>
                  <p >{price.includesInfo}</p>

                </div>
            ))}


            <p>Base Price: {escort.basePrice}</p>

            <p>Additional Payment Instructions: {escort.priceInfo}</p>



            <p>***************************************************************</p>

            <p>Preferred Contact Method: {contactMethodTitleMap[escort.preferredContactMethod]}</p>
            
            <p>WhatsApp: {escort.whatsapp}</p>
            <p>Public Phone: {escort.publicPhone}</p>
            <p>PublicEmail: {escort.publicEmail}</p>

            <p>Links: </p>
            {escort.links.map((link, idx) => (
                <div key={idx} className='flex flew-rox space-x-8'>
                  <p >{linkMediaTitleMap[link.linkMedia]}</p>
                  <p >{link.linkUrl}</p>
                </div>
            ))}


            <p>***************************************************************</p>
            <p>profileHeading: {escort.profileHeading}</p>
            <p>aboutMe: {escort.aboutMe}</p>
            <p>Question 1: {questionsTitleMap[escort.question1]}</p>
            <p>Answer 1: {escort.answer1}</p>
            <p>Question 2: {questionsTitleMap[escort.question2]}</p>
            <p>Answer 2: {escort.answer2}</p>
            <p>Question 3: {questionsTitleMap[escort.question3]}</p>
            <p>Answer 3: {escort.answer3}</p>
          </div>}
          
            <p>***************************************************************</p>

          <Link className='nav-link hidden sm:block' href={`/escort-profile/${escortId}/edit`} >Edit</Link>



        </div>
      </main>
    </>
  )
}




export async function getServerSideProps(context) {
  
  const escortId = JSON.parse(context.params.escortId)
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