import { prisma } from '../../../database/db'





export default async function handler(req, res) {

  const escortId = JSON.parse(req.query.escortId)

  switch (req.method) {

    case 'GET':
      console.log("GET")
      console.log(req.query)

      try {
        const escortDetails = await prisma.escort.findUnique({
          where: {
            id: escortId,
          },
        })
      console.log(escortDetails)
      res.status(201).json(escortDetails)
      } catch (err) {
        console.log(err)
      }
      break

      case 'PATCH':
        console.log("PATCH")
        console.log(req.body.updateData)
        
  
        let { name, privateEmail, privatePhoneNumber, homeAddress, plan, workingAddress, suburb, city, meetsWith, incalls, outcalls, activities, 
          specialCategory, age, bodyShape, height, hairColour, pubicHair, ethnicity, nationality, languages, education, smoker, drinker, 
          dressSize, braSize, shoeSize, favColour, favCuisine, birthday, basePrice, incallPrices, outcallPrices, priceInfo, deposit, preferredContactMethod, 
          whatsApp, publicPhone, publicEmail, contactInstructions, links, incallAddress, worksWithRequested, worksWithAccepted, 
          generalCancellationPolicy, profileHeading, aboutMe, question1, answer1, question2, answer2, question3, answer3,} = req.body.updateData       // age and other int may have to be parsed. They are currently strings.
        
          if (age) age = JSON.parse(req.body.updateData.age)
          if (height) height = JSON.parse(req.body.updateData.height)

          console.log(incallPrices)

          if (incallPrices) {
            incallPrices.forEach((price, idx) => {
          console.log(incallPrices[idx])

              incallPrices[idx].price = JSON.parse(incallPrices[idx].price)
            })
          }
          if (outcallPrices) {
            outcallPrices.forEach((price, idx) => {
              outcallPrices[idx].price = JSON.parse(outcallPrices[idx].price)
            })
          }
  
  
          // for following... turn onject into array and for each if the value is true push onto the respective array.
          // This array is in the format required by prisma
          let meetsWithData = []
          let activitiesData = []
          let linkData = []
  
  
          if (meetsWith) {
            meetsWith.forEach((mwo, idx) => {
              let [key] = Object.keys(mwo)
              if ( mwo[key] === true ) {
                let singleMWOData = { meetsWith: { connectOrCreate: {
                        where: {
                          name: key,
                        },
                        create: {
                          name: key,
                        }, } } }
                meetsWithData.push(singleMWOData)
              }
            })
          }

          if (activities) {
            activities.forEach((activity, idx) => {
              let [key] = Object.keys(activity)
    
              if ( activity[key] === true ) {
                let singleActivityData = { activity: { connectOrCreate: {
                        where: {
                          name: key,
                        },
                        create: {
                          name: key,
                        }, } } }
                console.log(singleActivityData.activity)
                activitiesData.push(singleActivityData)
              }
            })
          }
  
          // Turns links object into array and then creates a single link data object that can be pushed onto the link data array. 
          // This array is in the format required by prisma.

          // links.forEach((link) => {
          //   let singleLinkData = { linkMedia: link.media, linkUrl: link.url }
          //   linkData.push(singleLinkData)
          // })
  
  
          console.log("meetsWithData")
  
          console.log(meetsWithData)
  
  
          const escortId  = req.body.escortId
  
        
  
        
        try {const updatedEscort = await prisma.escort.update({
          where: {
            id: escortId
          },
          data: {
            name,
            privateEmail,
            privatePhoneNumber,
            homeAddress,
            // identificationDoc1url: updateData.identificationDoc1url,
            // identificationDoc2url: updateData.identificationDoc2url,
            // identifyingImageUrl: updateData.identifyingImageUrl,
            plan,
            // usingDepositSystem: updateData.usingDepositSystem,
            // numberOfDepositsForMonth: updateData.numberOfDepositsForMonth,
            // totalNumOfDeposits: updateData.totalNumOfDeposits,
            // reviewService: updateData.reviewService,
            // ourReview: updateData.ourReview,
            // bookingService: updateData.bookingService,
            // transactionCount: updateData.transactionCount,
            // availableNowService: updateData.availableNowService,
            // escortSafeService: updateData.escortSafeService,
            // flags: updateData.flags,
            // accountBlacklistedOn: updateData.accountBlacklistedOn,
            workingAddress,
            suburb,
            city,
            // suburbCoordinates: updateData.suburbCoordinates,
            age,
            // photos: updateData.photos,
            meetsWith: meetsWithData && {            // if there is a meetsWith detected in req, create from the manufactured array
              deleteMany: {},
              create: meetsWithData
            },
            incalls,
            outcalls,
            activities: activitiesData && {            // if there is a meetsWith detected in req, create from the manufactured array
              deleteMany: {},
              create: activitiesData,
            },
            incallPrices: incallPrices && {
              deleteMany: {},
              createMany: {
                data: incallPrices
              }
            },
            outcallPrices: outcallPrices && {
              deleteMany: {},
              createMany: {
                data: outcallPrices
              }
            },
            priceInfo,
            specialCategory,
            bodyShape,
            height,
            hairColour,
            pubicHair,
            ethnicity,
            nationality,
            languages,
            education,
            smoker,
            drinker,
            dressSize,
            braSize,
            shoeSize,
            favColour,
            favCuisine,
            birthday,
            basePrice,
            deposit,
            preferredContactMethod,
            whatsApp,
            publicPhone,
            publicEmail,
            contactInstructions,
            links: links && {
              deleteMany: {},
              createMany: {
                data: links 
              }
            },
            worksWithRequested,
            worksWithAccepted,
            generalCancellationPolicy,
            profileHeading,
            aboutMe,
            question1,
            answer1,
            question2,
            answer2,
            question3,
            answer3, 
          },
          include: {
            meetsWith: true,
            links: true,
          },
        }
        ) 
        res.status(201).json(updatedEscort)
        } catch (err) {
          console.log(err)
        }
        break
    default:
      res.setHeader('Allow', ['POST', 'PATCH', 'GET'])
  }

}



// Not the deleteMany then createMany should be changed to upsertMany() in the future. unfortunately Prisma doesn't have upsertMany.