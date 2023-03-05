import React, {useState, useContext, useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { linkMedia, hairColour, eyeColour, bodyShape, pubicHair, ethnicity, education, meetsWithOptions, questions, specialCategory, escortActivities, meetsWithOptionsInitialState, escortActivitiesInitialState, contactMethod, smoker, drinker } from '../utils/escort-enumerables'
import { EscortContext } from '@/common/contexts/escort-context'

import Input from '@/common/components/FormElements/Input'
import Select from '@/common/components/FormElements/Select'
import Checkbox from '@/common/components/FormElements/Checkbox'

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN
} from '@/common/utilities/validators'
import { deleteIncompleteLinks, isActivitiesDirty, isLinksDirty, isMeetsWithDirty, isPricesDirty, modifyUnpairedQuestions } from '../utils/formData-cleanup-functions'
import Price from '@/common/components/FormElements/Price'

const priceReducer = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  let idx = action.id.substring(action.id.indexOf('[') + 1, action.id.indexOf(']'))

  switch (action.type) {
    case 'CHANGE':
      let field = action.id.substring(action.id.indexOf('.') + 1)
      newState[idx][field] = action.value
      break
    case 'ADD':
      if (idx === 'end') {
        newState.push({ time: '', price: '', includesInfo: ''})
      } else {
        newState.splice(idx, 0, { time: '', price: '', includesInfo: ''})
      }
      action.setValue(action.list, newState)
      break
    case 'REMOVE': 
      newState.splice(idx, 1 )
      action.setValue(action.list, newState)
      break
    
    default:
      throw new Error()
  }
  return newState
};

function FormEditDetails({escort}) {
  // console.log(escort)
  let router = useRouter()
  let { escortId, escortName, escortEmail } = useContext(EscortContext)
  
  const linksInitials = escort.links ? JSON.parse(JSON.stringify(escort.links)) : [{ linkMedia: '', linkUrl: ''}]
  const incallPricesInitials = escort.incallPrices && escort.incallPrices.length && JSON.parse(JSON.stringify(escort.incallPrices)) || [{time: '', price: '', includesInfo: ''}]
  const outcallPricesInitials = escort.outcallPrices && escort.outcallPrices.length && JSON.parse(JSON.stringify(escort.outcallPrices)) || [{time: '', price: '', includesInfo: ''}]

  const [ meetsWithInitials, setMeetsWithInitials ] = useState(meetsWithOptionsInitialState)
  const [ activitiesInitials, setActivitiesInitials ] = useState(escortActivitiesInitialState)
  const [links, setLinks] = useState(linksInitials)
  const [incallPricesState, dispatchIncall ] = useReducer( priceReducer, incallPricesInitials );
  const [outcallPricesState, dispatchOutcall ] = useReducer( priceReducer, outcallPricesInitials );
  const [displaySuburb, setDisplaySuburb ] = useState( escort.displaySuburb || false )
  
  const [ displayTellMore, setDisplayTellMore ] = useState(
    {
      specialCategoriesTellMore: false,
      questionsTellMore: false
    }
  )

  useEffect(() => {
    if (escort.meetsWith) {
      let meetsWithInitialsModified = {...meetsWithInitials}          // need to do the equivalent of .slice() else set... will not fire.
      escort.meetsWith.forEach(mw => {
      meetsWithInitialsModified[mw.meetsWith.name] = true
      })
      setMeetsWithInitials(meetsWithInitialsModified)
    }
    if (escort.activities) {
      let activitiesInitialsModified = {...activitiesInitials}
      escort.activities.forEach(act => {
        activitiesInitialsModified[act.activity.name] = true
      })
      setActivitiesInitials(activitiesInitialsModified)
    }

  }, [])

  const { register, handleSubmit, setValue, formState: { isDirty, dirtyFields }, getValues } = useForm({
    defaultValues: {
      activities: escortActivities.map((mwo) => (
        {[mwo.name]: activitiesInitials[mwo.name]}
      )),
      age: escort.age || '',
      answer1: escort.answer1 || '',
      answer2: escort.answer2 || '',
      answer3: escort.answer3 || '',
      basePrice: escort.baseprice,
      bodyShape: escort.bodyShape || '',
      braSize: escort.braSize || '',
      city: escort.city || '',
      contactInstructions: escort.contactInstructions || '',
      aboutMe: escort.aboutMe || '',
      displaySuburb: escort.displaySuburb,
      dressSize: escort.dressSize,
      drinker: escort.drinker,
      education: escort.education,
      ethnicity: escort.ethnicity,
      eyeColour: escort.eyeColour,
      favColour: escort.favColour,
      favCuisine: escort.favCuisine,
      hairColour: escort.hairColour,
      height: escort.height,
      incallPrices: incallPricesInitials,
      incalls: escort.incalls,
      languages: escort.languages,
      links: linksInitials,
      meetsWith: meetsWithOptions.map((mwo) => (
        {[mwo.name]: meetsWithInitials[mwo.name]}
      )),
      outcallPrices: outcallPricesInitials,
      outcalls: escort.outcalls,
      preferredContactMethod: escort.preferredContactMethod,
      priceInfo: escort.priceInfo,
      profileHeading: escort.profileHeading,
      name: escort.name,
      nationality: escort.nationality,
      pubicHair: escort.pubicHair,
      publicEmail: escort.publicEmail,
      publicPhone: escort.publicPhone,
      question1: escort.question1,
      question2: escort.question2,
      question3: escort.question3,
      shoeSize: escort.shoeSize,
      smoker: escort.smoker,
      specialCategory: escort.specialCategory,
      suburb: escort.suburb,
      whatsApp: escort.whatsApp
    }
  })

  const displaySuburbChangeHandler = (e) => {
    setDisplaySuburb(!displaySuburb)
  }

  const priceChangeHandler = event => {
    const list = event.target.id.substring(0, event.target.id.indexOf('['))
    const dispInfo = {
      type: 'CHANGE',
      value: event.target.value,
      id: event.target.id,
      list
    }
    list === 'incallPrices' ? dispatchIncall(dispInfo) : dispatchOutcall(dispInfo)
  };

  const priceRemoveHandler = (event) => {
    const list = event.target.id.substring(0, event.target.id.indexOf('['))
    const dispInfo = {
      type: 'REMOVE',
      id: event.target.id,
      setValue: setValue,
      list
    }
    list === 'incallPrices' ? dispatchIncall(dispInfo) : dispatchOutcall(dispInfo)
  };

  const priceAddHandler = (event) => {
    const list = event.target.id.substring(0, event.target.id.indexOf('['))
    const dispInfo = {
      type: 'ADD',
      id: event.target.id,
      setValue: setValue,
      list
    }
    list === 'incallPrices' ? dispatchIncall(dispInfo) : dispatchOutcall(dispInfo)
  };

  const handleAddLink = () => {
    let newLinks = links.concat({linkMedia: "", linkUrl: ""});
    setValue('links', newLinks)
    setLinks(newLinks);
  }
  
  const handleRemoveLink = (e) => {
    const removeIndex = e.target.attributes.idx.nodeValue
    let newLinks = JSON.parse(JSON.stringify(links))
    newLinks.splice(removeIndex, 1)
    setValue('links', newLinks)
    setLinks(newLinks);
  }

  const handleLinkMediaChange = (e) => {
    let index = e.target.attributes.idx.nodeValue
    let newLinks = links.slice()
    newLinks[index].linkMedia = e.target.value
    setLinks(newLinks)
  }

  const handleLinkUrlChange = (e) => {
    let index = e.target.attributes.idx.nodeValue
    let newLinks = links.slice()
    newLinks[index].linkUrl = e.target.value
    setLinks(newLinks)
  }

  const handleTellMeMore = (e) => {
    let tellMore = e.target.attributes.id.nodeValue
    let newDisplayTellMore = { ...displayTellMore }
    newDisplayTellMore[tellMore] = !newDisplayTellMore[tellMore]
    setDisplayTellMore(newDisplayTellMore) 
  }


  const onSubmit = async (formData) => {
    // console.log("********onsubmit triggered******")
    // console.log(formData)
    console.log("******** Dirties Above ******")
    console.log(isDirty)
    console.log(dirtyFields)

    
    let updateData = {}
    Object.keys(dirtyFields).forEach((key)=> {
      updateData[key] = formData[key]
    })

    isMeetsWithDirty(dirtyFields.meetsWith, formData.meetsWith, meetsWithInitials) && (updateData.meetsWith = formData.meetsWith)
    isActivitiesDirty(dirtyFields.activities, formData.activities, activitiesInitials) && (updateData.activities = formData.activities)
    isLinksDirty(dirtyFields.links, formData.links, linksInitials) && (updateData.links = formData.links)
    isPricesDirty(dirtyFields.incallPrices, formData.incallPrices, incallPricesInitials) && (updateData.incallPrices = formData.incallPrices)
    isPricesDirty(dirtyFields.outcallPrices, formData.outcallPrices, outcallPricesInitials) && (updateData.outcallPrices = formData.outcallPrices)
    updateData.links && (updateData.links = deleteIncompleteLinks(updateData.links))
    // do we need to do this? will invalidate any incomplete fields anyway... If yes need to add for prices also.
    updateData = modifyUnpairedQuestions(formData, updateData)

    console.log('*********** updateData **************')
    console.log(updateData)
    

    try {
      const result = await axios.patch(`/api/escorts/${escortId}`, { updateData, escortId })
    console.log("********result******")
    console.log(result)

    router.push(`/escort-profile/${escortId}`)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }

  return (
    <form id='details-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>  
      
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name"
        initialValue={escort.name}
        initialValid={true}
        name={register('name').name}
        formOnChange={register('name').onChange}
        formOnBlur={register('name').onBlur}
        inputRef={register('name').ref} 
      />

      <Input
        id="age"
        element="input"
        type="number"
        label="Age"
        validators={[VALIDATOR_MIN(18)]}
        errorText="Please enter a valid age"
        initialValue={escort.age}
        initialValid={true}
        name={register('age').name}
        formOnChange={register('age').onChange}
        formOnBlur={register('age').onBlur}
        inputRef={register('age').ref} 
      />

      <Input
        id="height"
        element="input"
        type="number"
        label="Height:"
        validators={[]}
        errorText="Please enter a valid height"
        initialValue={escort.height}
        initialValid={true}
        name={register('height').name}
        formOnChange={register('height').onChange}
        formOnBlur={register('height').onBlur}
        inputRef={register('height').ref} 
      />

      <Select
        id='bodyShape'
        label="Body Shape"
        options={bodyShape}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid hair colour"
        // initialValue={escort.bodyShape}
        // initialValid={true}
        name={register('bodyShape').name}
        formOnChange={register('bodyShape').onChange}
        formOnBlur={register('bodyShape').onBlur}
        inputRef={register('bodyShape').ref} 
      />  

      <Select
        id='hairColour'
        label="Hair Colour"
        options={hairColour}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid hair colour"
        initialValue={escort.hairColour}
        initialValid={true}
        name={register('hairColour').name}
        formOnChange={register('hairColour').onChange}
        formOnBlur={register('hairColour').onBlur}
        inputRef={register('hairColour').ref} 
      />

      <Select
        id='eyeColour'
        label="Eye Colour"
        options={eyeColour}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid eye colour"
        initialValue={escort.eyeColour}
        initialValid={true}
        name={register('eyeColour').name}
        formOnChange={register('eyeColour').onChange}
        formOnBlur={register('eyeColour').onBlur}
        inputRef={register('eyeColour').ref} 
      />

      <Select
        id='pubicHair'
        label="Pubic Hair"
        options={pubicHair}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid hair colour"
        initialValue={escort.pubicHair}
        initialValid={true}
        name={register('pubicHair').name}
        formOnChange={register('pubicHair').onChange}
        formOnBlur={register('pubicHair').onBlur}
        inputRef={register('pubicHair').ref} 
      />  

      <Select
        id='ethnicity'
        label="Ethnicity"
        options={ethnicity}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid ethnicity"
        initialValue={escort.ethnicity}
        initialValid={true}
        name={register('ethnicity').name}
        formOnChange={register('ethnicity').onChange}
        formOnBlur={register('ethnicity').onBlur}
        inputRef={register('ethnicity').ref} 
      />  

      <Input
        id="nationality"
        element="input"
        type="text"
        label="Nationality:"
        validators={[]}
        errorText="Please enter a valid Nationality"
        initialValue={escort.nationality}
        initialValid={true}
        name={register('nationality').name}
        formOnChange={register('nationality').onChange}
        formOnBlur={register('nationality').onBlur}
        inputRef={register('nationality').ref} 
      />

      <Input
        id="languages"
        element="input"
        type="text"
        label="Languages:"
        validators={[]}
        errorText="Please enter a valid Language"
        initialValue={escort.languages}
        initialValid={true}
        name={register('languages').name}
        formOnChange={register('languages').onChange}
        formOnBlur={register('languages').onBlur}
        inputRef={register('languages').ref} 
      />

      <Select
        id='education'
        label="Education"
        options={education}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid education"
        initialValue={escort.education}
        initialValid={true}
        name={register('education').name}
        formOnChange={register('education').onChange}
        formOnBlur={register('education').onBlur}
        inputRef={register('education').ref} 
      />  

      <Input
        id="dressSize"
        element="input"
        type="text"
        label="Dress Size:"
        validators={[]}
        errorText="Please enter a valid Dress Size"
        initialValue={escort.dressSize}
        initialValid={true}
        name={register('dressSize').name}
        formOnChange={register('dressSize').onChange}
        formOnBlur={register('dressSize').onBlur}
        inputRef={register('dressSize').ref} 
      />      

      <Input
        id="shoeSize"
        element="input"
        type="text"
        label="Shoe Size:"
        validators={[]}
        errorText="Please enter a valid Shoe Size"
        initialValue={escort.shoeSize}
        initialValid={true}
        name={register('shoeSize').name}
        formOnChange={register('shoeSize').onChange}
        formOnBlur={register('shoeSize').onBlur}
        inputRef={register('shoeSize').ref} 
      />  

      <Input
        id="braSize"
        element="input"
        type="text"
        label="Bra Size:"
        validators={[]}
        errorText="Please enter a valid Bra Size"
        initialValue={escort.braSize}
        initialValid={true}
        name={register('braSize').name}
        formOnChange={register('braSize').onChange}
        formOnBlur={register('braSize').onBlur}
        inputRef={register('braSize').ref} 
      />  

      <Input
        id="favColour"
        element="input"
        type="text"
        label="Favourite Colour:"
        validators={[]}
        errorText="Please enter a valid Favourite Colour"
        initialValue={escort.favColour}
        initialValid={true}
        name={register('favColour').name}
        formOnChange={register('favColour').onChange}
        formOnBlur={register('favColour').onBlur}
        inputRef={register('favColour').ref} 
      />  

      <Input
        id="favCuisine"
        element="input"
        type="text"
        label="Favourite Cuisine:"
        validators={[]}
        errorText="Please enter a valid Favourite Cuisine"
        initialValue={escort.favCuisine}
        initialValid={true}
        name={register('favCuisine').name}
        formOnChange={register('favCuisine').onChange}
        formOnBlur={register('favCuisine').onBlur}
        inputRef={register('favCuisine').ref} 
      />       


      <Select
        id='smoker'
        label="Do you smoke?"
        options={smoker}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your answer"
        initialValue={escort.smoker}
        initialValid={true}
        name={register('smoker').name}
        formOnChange={register('smoker').onChange}
        formOnBlur={register('smoker').onBlur}
        inputRef={register('smoker').ref} 
      />   

      <Select
        id='drinker'
        label="Would you be up for a drink with your clients?"
        options={drinker}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your answer"
        initialValue={escort.drinker}
        initialValid={true}
        name={register('drinker').name}
        formOnChange={register('drinker').onChange}
        formOnBlur={register('drinker').onBlur}
        inputRef={register('drinker').ref} 
      />   

 









      <p>*********************************************************************************************************************</p>



      {meetsWithOptions.map((mwo, idx) => (
        <div key={mwo.name}>
          <Checkbox
            id={mwo.name}
            label={mwo.title}
            initialValue={meetsWithInitials[mwo.name]}
            initialValid={true}
            name={register(`meetsWith[${idx}].${mwo.name}`).name}
            formOnChange={register(`meetsWith[${idx}].${mwo.name}`).onChange}
            formOnBlur={register(`meetsWith[${idx}].${mwo.name}`).onBlur}
            inputRef={register(`meetsWith[${idx}].${mwo.name}`).ref} 
            setValue={setValue}
          />
        </div>
      ))}

      <Checkbox
        id='incalls'
        label={'Do you do incalls?'}
        initialValue={escort.incalls || true}
        initialValid={true}
        name={register('incalls').name}
        formOnChange={register('incalls').onChange}
        formOnBlur={register('incalls').onBlur}
        inputRef={register('incalls').ref} 
        setValue={setValue}
      />

      <Checkbox
        id='outcalls'
        label={'Do you do outcalls?'}
        initialValue={escort.outcalls || true }
        initialValid={true}
        name={register('outcalls').name}
        formOnChange={register('outcalls').onChange}
        formOnBlur={register('outcalls').onBlur}
        inputRef={register('outcalls').ref} 
        setValue={setValue}
      />

      <p>Would you like to advertise your profile under one of the special categories?</p>
      <p>Note that this is only to help filter search results. You can do whatever you like.</p>
      <button id='specialCategoriesTellMore' type='button' onClick={handleTellMeMore}>Tell me more</button>
      <div className={displayTellMore.specialCategoriesTellMore ? '' : 'hidden'}>
        <div className='w-80 h-40 bg-[red]'>
            Tell More Modal
        </div>
      </div>

      <Select
        id='specialCategory'
        label="Special Category"
        options={specialCategory}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid hair colour"
        initialValue={escort.specialCategory}
        initialValid={true}
        name={register('specialCategory').name}
        formOnChange={register('specialCategory').onChange}
        formOnBlur={register('specialCategory').onBlur}
        inputRef={register('specialCategory').ref} 
      />

      {escortActivities.map((act, idx) => (
        <div key={act.name}>
          <Checkbox
            id={act.name}
            label={act.title}
            initialValue={activitiesInitials[act.name]}
            initialValid={true}
            name={register(`activities[${idx}].${act.name}`).name}
            formOnChange={register(`activities[${idx}].${act.name}`).onChange}
            formOnBlur={register(`activities[${idx}].${act.name}`).onBlur}
            inputRef={register(`activities[${idx}].${act.name}`).ref} 
            setValue={setValue}
          />
        </div>
      ))}

      <p>Our default pricing model is to offer flat cost for the first hour and then a price per hour follwing the first</p>
      <p>You can customise your pricing and add additional pricing models for different experiences</p>
      
      <div className=''>
        <div>
          <p>Incall</p>

          {incallPricesState.map((price, idx) => {
            return (
              <div key={idx}>
                <button id={`incallPrices[${idx}]`} type='button' onClick={priceAddHandler} >Add new price here...</button>

                <Price
                  id={`incallPrices[${idx}]`}
                  // initialValue={incallPricesInitials[idx]}
                  priceChangeHandler={priceChangeHandler}
                  priceRemoveHandler={priceRemoveHandler}
                  timeName={register(`incallPrices[${idx}].time`).name}
                  timeFormOnChange={register(`incallPrices[${idx}].time`).onChange}
                  timeFormOnBlur={register(`incallPrices[${idx}].time`).onBlur}
                  timeInputRef={register(`incallPrices[${idx}].time`).ref} 
                  priceName={register(`incallPrices[${idx}].price`).name}
                  priceFormOnChange={register(`incallPrices[${idx}].price`).onChange}
                  priceFormOnBlur={register(`incallPrices[${idx}].price`).onBlur}
                  priceInputRef={register(`incallPrices[${idx}].price`).ref} 
                  includesInfoName={register(`incallPrices[${idx}].includesInfo`).name}
                  includesInfoFormOnChange={register(`incallPrices[${idx}].includesInfo`).onChange}
                  includesInfoFormOnBlur={register(`incallPrices[${idx}].includesInfo`).onBlur}
                  includesInfoInputRef={register(`incallPrices[${idx}].includesInfo`).ref} 
                />   
                {(idx === incallPricesState.length - 1) ? <button id={`incallPrices[end]`} type='button' onClick={priceAddHandler} >Add new price here...</button> : ''}
              </div>
            )
          })}
          {!incallPricesState.length && <button id={`incallPrices[end]`} type='button' onClick={priceAddHandler} >Add new price here...</button>}

        </div>

        <div>
          <p>Outcall</p>
          
          {outcallPricesState.map((price, idx) => {
            return (
              <div key={idx}>
                <button id={`outcallPrices[${idx}]`} type='button' onClick={priceAddHandler} >Add new price here...</button>

                <Price
                  id={`outcallPrices[${idx}]`}
                  // initialValue={outcallPricesInitials[idx]}
                  priceChangeHandler={priceChangeHandler}
                  priceRemoveHandler={priceRemoveHandler}
                  timeName={register(`outcallPrices[${idx}].time`).name}
                  timeFormOnChange={register(`outcallPrices[${idx}].time`).onChange}
                  timeFormOnBlur={register(`outcallPrices[${idx}].time`).onBlur}
                  timeInputRef={register(`outcallPrices[${idx}].time`).ref} 
                  priceName={register(`outcallPrices[${idx}].price`).name}
                  priceFormOnChange={register(`outcallPrices[${idx}].price`).onChange}
                  priceFormOnBlur={register(`outcallPrices[${idx}].price`).onBlur}
                  priceInputRef={register(`outcallPrices[${idx}].price`).ref} 
                  includesInfoName={register(`outcallPrices[${idx}].includesInfo`).name}
                  includesInfoFormOnChange={register(`outcallPrices[${idx}].includesInfo`).onChange}
                  includesInfoFormOnBlur={register(`outcallPrices[${idx}].includesInfo`).onBlur}
                  includesInfoInputRef={register(`outcallPrices[${idx}].includesInfo`).ref} 
                />   
                {(idx === outcallPricesState.length - 1) ? <button id={`outcallPrices[end]`} type='button' onClick={priceAddHandler} >Add new price here...</button> : ''}
              </div>
            )
          })}
          {!outcallPricesState.length && <button id={`outcallPrices[end]`} type='button' onClick={priceAddHandler} >Add new price here...</button>}
        </div>

      </div>

      <Input
        id="basePrice"
        element="input"
        type="number"
        label="Base Price: This is the price that appears on the add and is used for filtering. It should match your cheapest single hour price..."
        validators={[]}
        errorText="Please enter a valid basePrice"
        initialValue={escort.basePrice}
        initialValid={true}
        name={register('basePrice').name}
        formOnChange={register('basePrice').onChange}
        formOnBlur={register('basePrice').onBlur}
        inputRef={register('basePrice').ref} 
      />

      <Input
        id="priceInfo"
        element="textarea"
        label="Additional Payment Instructions:"
        validators={[]}
        errorText="Please enter a valid phone number"
        initialValue={escort.priceInfo}
        initialValid={true}
        name={register('priceInfo').name}
        formOnChange={register('priceInfo').onChange}
        formOnBlur={register('priceInfo').onBlur}
        inputRef={register('priceInfo').ref} 
      />



<p>*********************************************************************************************************************</p>

      
      
      <Input
        id="city"
        element="input"
        type="text"
        label="City:"
        validators={[]}
        errorText="Please enter a valid City"
        initialValue={escort.city}
        initialValid={true}
        name={register('city').name}
        formOnChange={register('city').onChange}
        formOnBlur={register('city').onBlur}
        inputRef={register('city').ref} 
      />  

      {displaySuburb === true ? <p>We will only display city and suburb.</p> : <p>We will only display city</p>}
      <label className='form-label' htmlFor='displaySuburb'  >Display suburb</label>
      <input className='form-input'type='checkbox' {...register('displaySuburb')} onChange={displaySuburbChangeHandler} checked={displaySuburb} />

      
      <Input
        id="suburb"
        element="input"
        type="text"
        label="Suburb:"
        validators={[]}
        errorText="Please enter a valid Suburb"
        initialValue={escort.suburb}
        initialValid={true}
        name={register('suburb').name}
        formOnChange={register('suburb').onChange}
        formOnBlur={register('suburb').onBlur}
        inputRef={register('suburb').ref} 
      />  

      <Select
        id='preferredContactMethod'
        label="What is your preferred contact method?"
        options={contactMethod}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your answer"
        initialValue={escort.preferredContactMethod}
        initialValid={true}
        name={register('preferredContactMethod').name}
        formOnChange={register('preferredContactMethod').onChange}
        formOnBlur={register('preferredContactMethod').onBlur}
        inputRef={register('preferredContactMethod').ref} 
      />   

      <Input
        id="publicPhone"
        element="input"
        type="text"
        label="Public Phone number:"
        validators={[]}
        errorText="Please enter a valid phone number"
        initialValue={escort.publicPhone}
        initialValid={true}
        name={register('publicPhone').name}
        formOnChange={register('publicPhone').onChange}
        formOnBlur={register('publicPhone').onBlur}
        inputRef={register('publicPhone').ref} 
      />
      
      <Input
        id="whatsApp"
        element="input"
        type="text"
        label="WhatsApp:"
        validators={[]}
        errorText="Please enter a valid WhatsApp number"
        initialValue={escort.whatsApp}
        initialValid={true}
        name={register('whatsApp').name}
        formOnChange={register('whatsApp').onChange}
        formOnBlur={register('whatsApp').onBlur}
        inputRef={register('whatsApp').ref} 
      />

      <Input
        id="publicEmail"
        element="input"
        type="text"
        label="Public Email:"
        validators={[]}
        errorText="Please enter a valid email"
        initialValue={escort.publicEmail}
        initialValid={true}
        name={register('publicEmail').name}
        formOnChange={register('publicEmail').onChange}
        formOnBlur={register('publicEmail').onBlur}
        inputRef={register('publicEmail').ref} 
      />

      <Input
        id="contactInstructions"
        element="textarea"
        label="Additional Contact Instructions:"
        validators={[]}
        errorText="Please enter a valid phone number"
        initialValue={escort.contactInstructions}
        initialValid={true}
        name={register('contactInstructions').name}
        formOnChange={register('contactInstructions').onChange}
        formOnBlur={register('contactInstructions').onBlur}
        inputRef={register('contactInstructions').ref} 
      />

      <p>Links:</p>
      {links.map((link, idx) => (             
          // <div key={idx} className={link.linkMedia === 'removed' ? 'hidden' : ''}>
          <div key={idx} >
          
            <label className='form-label' htmlFor={`links[${idx}].linkMedia`} >Media</label>
            <select idx={idx} className={'form-input'} {...register(`links[${idx}].linkMedia`)} onChange={handleLinkMediaChange}  >      {/*  onChange={handleLinkMediaChange}  */} 
              {linkMedia.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
                ))}
            </select>
            <label className='form-label' htmlFor={`links[${idx}].linkUrl`}>Media</label>
            <input idx={idx} className='form-input' type="text" {...register(`links[${idx}].linkUrl`)} placeholder='eg ... ' onChange={handleLinkUrlChange}  />     {/*  onChange={handleLinkUrlChange}  */} 
            <button idx={idx} type='button' onClick={handleRemoveLink} >-</button>
          </div>            
      ))}
      
      <button type='button' onClick={handleAddLink} >+</button>

<p>*********************************************************************************************************************</p>

      <Input
        id="profileHeading"
        element="input"
        type="text"
        label="Profile Heading:"
        placeholder="Draw people in... (50 characters max)"
        validators={[]}
        errorText="Please enter a valid profileHeading"
        initialValue={escort.profileHeading}
        initialValid={true}
        name={register('profileHeading').name}
        formOnChange={register('profileHeading').onChange}
        formOnBlur={register('profileHeading').onBlur}
        inputRef={register('profileHeading').ref} 
      />
      
      <Input
        id="aboutMe"
        element="text-area"
        label="About You Section"
        placeholder='Write any other information which you wish to share about yourself...'
        validators={[]}
        errorText="Please enter a valid description"
        initialValue={escort.aboutMe}
        initialValid={true}
        name={register('aboutMe').name}
        formOnChange={register('aboutMe').onChange}
        formOnBlur={register('aboutMe').onBlur}
        inputRef={register('aboutMe').ref} 
      />


      <p>Pick three questions and give your answer</p>
      <button id='questionsTellMore' type='button' onClick={handleTellMeMore}>Tell me more</button>
          <div className={displayTellMore.questionsTellMore ? '' : 'hidden'}>
            <div className='w-80 h-40 bg-[red]'>
                Tell More Modal
            </div>
          </div>
      

      <Select
        id='question1'
        label="Question 1"
        options={questions}
        validators={[]}
        errorText="Please enter a valid hair colour"
        initialValue={escort.question1}
        initialValid={true}
        name={register('question1').name}
        formOnChange={register('question1').onChange}
        formOnBlur={register('question1').onBlur}
        inputRef={register('question1').ref} 
      />

      <Input
        id="answer1"
        element="input"
        type="text"
        label=""
        validators={[]}
        errorText="Please enter a valid answer1"
        initialValue={escort.answer1}
        initialValid={true}
        name={register('answer1').name}
        formOnChange={register('answer1').onChange}
        formOnBlur={register('answer1').onBlur}
        inputRef={register('answer1').ref} 
      />

      <Select
        id='question2'
        label="Question 2"
        options={questions}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid hair colour"
        initialValue={escort.question2}
        initialValid={true}
        name={register('question2').name}
        formOnChange={register('question2').onChange}
        formOnBlur={register('question2').onBlur}
        inputRef={register('question2').ref} 
      />  
      <Input
        id="answer2"
        element="input"
        type="text"
        label=""
        validators={[]}
        errorText="Please enter a valid answer2"
        initialValue={escort.answer2}
        initialValid={true}
        name={register('answer2').name}
        formOnChange={register('answer2').onChange}
        formOnBlur={register('answer2').onBlur}
        inputRef={register('answer2').ref} 
      />


      <Select
        id='question3'
        label="Question 3"
        options={questions}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid hair colour"
        initialValue={escort.question3}
        initialValid={true}
        name={register('question3').name}
        formOnChange={register('question3').onChange}
        formOnBlur={register('question3').onBlur}
        inputRef={register('question3').ref} 
      />  
      <Input
        id="answer3"
        element="input"
        type="text"
        label=""
        validators={[]}
        errorText="Please enter a valid answer3"
        initialValue={escort.answer3}
        initialValid={true}
        name={register('answer3').name}
        formOnChange={register('answer3').onChange}
        formOnBlur={register('answer3').onBlur}
        inputRef={register('answer3').ref} 
      />

      

      

      <button>Submit</button>
    </form>
  )
}

export default FormEditDetails





    // I dont know why the checkboxes are returning 'true' instead of true so this is a fix
    // This was only happening when defaultValues not given in useForm()
    // formData.meetsWith = formData.meetsWith.map((mw) => {
    //   let key = Object.keys(mw)
    //   if (mw[key] === 'true'){
    //     mw[key] = true
    //     return mw
    //   }
    //   else return mw
    // })

    // formData.activities = formData.activities.map((act) => {
    //   let key = Object.keys(act)
    //   if (act[key] === 'true'){
    //     act[key] = true
    //     return act
    //   }
    //   else return act
    // })
    