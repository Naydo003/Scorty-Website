// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from '../../../database/db'





export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      console.log(req.body.newEscortData)
      const { newName, newPrivateEmail } = req.body.newEscortData

      try {
        const newEscort = await prisma.escort.create({
        data: {
          name: newName,
          privateEmail: newPrivateEmail
        },
      }
      ) 
      res.status(201).json(newEscort)
      } catch (err) {
        console.log(err)
      }
      break

    case 'PATCH':         // This could go in [escortId] but might optimise that for edits


      console.log('PAATCHHHHHHHHHHH')
      console.log(req.body.updateData)

      // const yew = JSON.parse(req.body.updateData.age)
      let { name, privateEmail, privatePhoneNumber, homeAddress, plan, workingAddress, suburb, city, meetsWith, activities, 
        specialCategory, age, bodyShape, height, hairColour, pubicHair, ethnicity, nationality, languages, education, smoker, drinker, 
        dressSize, braSize, shoeSize, favColour, favCuisine, birthday, basePrice, escortPrices, deposit, preferredContactMethod, 
        whatsApp, publicPhone, publicEmail, links, incallAddress, outcalls, worksWithRequested, worksWithAccepted, 
        generalCancellationPolicy, description, question1, answer1, question2, answer2, question3, answer3,} = req.body.updateData       // age and other int may have to be parsed. They are currently strings.
      
        if (age) age = JSON.parse(req.body.updateData.age)
        if (height) height = JSON.parse(req.body.updateData.height)


        // for following... turn onject into array and for each if the value is true push onto the respective array.
        // This array is in the format required by prisma
        let meetsWithData = []
        let activitiesData = []
        let linkData = []


        let meetsWithArr = Object.entries(meetsWith)
        meetsWithArr.forEach((mwo, idx) => {
          if ( mwo[1] === true ) {
            let singleMWOData = { meetsWith: { connectOrCreate: {
                    where: {
                      name: mwo[0],
                    },
                    create: {
                      name: mwo[0],
                    }, } } }
            meetsWithData.push(singleMWOData)
          }
        })

        let activitiesArr = Object.entries(activities)
        activitiesArr.forEach((activity, idx) => {

          if ( activity[1] === true ) {
            let singleActivityData = { activity: { connectOrCreate: {
                    where: {
                      name: activity[0],
                    },
                    create: {
                      name: activity[0],
                    }, } } }
            console.log(singleActivityData.activity)
            activitiesData.push(singleActivityData)
          }
        })

        // Turns links object into array and then creates a single link data object that can be pushed onto the link data array. 
        // This array is in the format required by prisma.
        let linksArr = Object.values(links)
        linksArr.forEach((link) => {
          let singleLinkData = { linkMedia: link.media, linkUrl: link.url }
          linkData.push(singleLinkData)
        })


        console.log("meetsWithData")

        console.log(meetsWithData)

        console.log("Activities ****************************************************")

        console.log(activitiesData)


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
            create: meetsWithData,
          },
          activities: activitiesData && {            // if there is a meetsWith detected in req, create from the manufactured array
            create: activitiesData,
          },
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
          escortPrices,
          deposit,
          preferredContactMethod,
          whatsApp,
          publicPhone,
          publicEmail,
          links: links && {
            createMany: {
              data: linkData 
            }
          },
          incallAddress,
          outcalls,
          worksWithRequested,
          worksWithAccepted,
          generalCancellationPolicy,
          description,
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

    case 'GET':

      try {
        const escorts = await prisma.escort.findMany()
        res.status(201).json(escorts)
      } catch (err) {
        console.log(err)
      }
      break

    default:
      res.setHeader('Allow', ['POST', 'PATCH', 'GET'])
  }

}
