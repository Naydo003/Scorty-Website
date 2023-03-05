
import React, {useState, useContext} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { linkMedia, hairColour, eyeColour, bodyShape, pubicHair, ethnicity, education, meetsWithOptions, questions, specialCategory, escortActivities } from '../utils/escort-enumerables'
import { EscortContext } from '@/common/contexts/escort-context'
import { VALIDATOR_EMAIL } from '@/common/utilities/validators'
import Input from '@/common/components/FormElements/Input'

function FormAddDetails() {
  const [displaySuburb, setDisplaySuburb ] = useState(true)
  const [links, setLinks] = useState(
    [
      { media: "", url: "" }
    ]
  );
  const [ displayTellMore, setDisplayTellMore ] = useState(
    {
      specialCategoriesTellMore: false,
      questionsTellMore: false
    }
  )
  let router = useRouter()
  const { escortId, escortName, escortEmail } = useContext(EscortContext)
  const { register, handleSubmit, setValue } = useForm()




  const displaySuburbChangeHandler = (e) => {
    setDisplaySuburb(!displaySuburb)
  }

  const handleAddLink = () => {
    let newLinks = links.concat({media: "", url: ""});
    setLinks(newLinks);
  }

  const handleRemoveLink = (e) => {
    console.log(links)
    const removeIndex = e.target.attributes.idx.nodeValue
    console.log(removeIndex)
    let newLinks = links.slice()
    newLinks.splice(removeIndex, 1, { media: 'removed', url: 'removed' })
    console.log(newLinks)
    setLinks(newLinks);
    setValue(`links.link-${removeIndex}.media`, null)
    setValue(`links.link-${removeIndex}.url`, null)
  }

  const handleLinkMediaChange = (e) => {
    let index = e.target.attributes.idx.nodeValue
    let newLinks = links.slice()
    newLinks[index].media = e.target.value
    setLinks(newLinks)
  }

  const handleLinkUrlChange = (e) => {
    let index = e.target.attributes.idx.nodeValue
    let newLinks = links.slice()
    newLinks[index].url = e.target.value
    setLinks(newLinks)
  }

  const handleTellMeMore = (e) => {
    let tellMore = e.target.attributes.id.nodeValue

    let newDisplayTellMore = { ...displayTellMore }

    newDisplayTellMore[tellMore] = !newDisplayTellMore[tellMore]
    setDisplayTellMore(newDisplayTellMore)
    
  }

  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")

    // console.log(updateData)

    if (updateData.question1 && !updateData.answer1) {
      updateData.question1 = null
    }
    if (updateData.question2 && !updateData.answer2) {
      updateData.question2 = null
    }
    if (updateData.question3 && !updateData.answer3) {
      updateData.question3 = null
    }

    // Turn data object into array and filter out any empty, null, false or none values. Booleans have a default of false in our database.
    const dataArr = Object.entries(updateData);
    const filteredArr = dataArr.filter(function ([key, value]) {
      return value !== '' && value !== null && value !== false && value !== 'none';
    });
    updateData = Object.fromEntries(filteredArr);

    // loops through links object and deletes any that have empty or null values.
    if (updateData.links) {
      for (let link in updateData.links) {
        if ( updateData.links[link].media === '' || updateData.links[link].url === '' || updateData.links[link].media === null || updateData.links[link].url === null ) {
        delete updateData.links[link]
        }
      }
    }
    console.log(updateData)


    try {
      const result = await axios.patch('/api/escorts', { updateData, escortId })
    console.log("********result******")
    console.log(result)

    router.push(`/escort-profile/${escortId}`)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }

  return (
    <form id='details-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        
        
        
        <h3 className='heading mt-10'>Hello {escortName}</h3>
        <p className='primary-text mb-5'>Filling these in will help your item be found in users search results</p>
        
        <div className='mt-10'>
          <h1>About You</h1>
          <label className='form-label' htmlFor='age'>Age:</label>
          <input className='form-input' type="number" {...register('age')} placeholder='eg...'/> 
          <label className='form-label' htmlFor='height'>Height (cm):</label>
          <input className='form-input' type="text" {...register('height')} placeholder='eg...'/> 
          <div>
            <label className='form-label' htmlFor='bodyShape'>Body shape:</label>
            <select className={'form-input'} {...register('bodyShape')} >     
              {bodyShape.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='form-label' htmlFor='ethnicity'>What ethnicity do you identify as:</label>
            <select className={'form-input'} {...register('ethnicity')} >     
              {ethnicity.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='form-label' htmlFor='hairColour'>Hair Colour &#40;cm&#41;:</label>
            <select className={'form-input'} {...register('hairColour')} >     
              {hairColour.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='form-label' htmlFor='eyeColour'>Eye Colour:</label>
            <select className={'form-input'} {...register('eyeColour')} >     
              {eyeColour.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='form-label' htmlFor='pubicHair'>Pubic Hair:</label>
            <select className={'form-input'} {...register('pubicHair')} >     
              {pubicHair.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>


          <label className='form-label' htmlFor='nationality'>Nationality</label>
          <input className='form-input' type="text" {...register('nationality')} placeholder='eg...'/> 
          <label className='form-label' htmlFor='languages'>What languages do you speak?</label>
          <input className='form-input' type="text" {...register('languages')} placeholder='eg...'/> 
          <div>
            <label className='form-label' htmlFor='education'>Education:</label>
            <select className={'form-input'} {...register('education')} >     
              {education.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>
          <label className='form-label' htmlFor='dressSize'>Dress Size:</label>
          <input className='form-input' type="text" {...register('dressSize')} placeholder='eg...'/> 
          <label className='form-label' htmlFor='braSize'>Bra Size:</label>
          <input className='form-input' type="text" {...register('braSize')} placeholder='eg...'/> 
          <label className='form-label' htmlFor='shoeSize'>Shoe Size:</label>
          <input className='form-input' type="text" {...register('shoeSize')} placeholder='eg...'/> 
          <label className='form-label' htmlFor='favColour'>Favourite Colour:</label>
          <input className='form-input' type="text" {...register('favColour')} placeholder='eg...'/> 
          <label className='form-label' htmlFor='favCuisine'>Favourite Cuisine:</label>
          <input className='form-input' type="text" {...register('favCuisine')} placeholder='eg...'/> 

        </div>

        <div className='mt-10'>
          <h1>About Your Services</h1>
          
          <div>
            <p>Would you like to advertise your profile under one of the special categories?</p>
            <p>Note that this is only to help filter search results. You can do whatever you like.</p>
            <button id='specialCategoriesTellMore' type='button' onClick={handleTellMeMore}>Tell me more</button>
            <div className={displayTellMore.specialCategoriesTellMore ? '' : 'hidden'}>
              <div className='w-80 h-40 bg-[red]'>
                  Tell More Modal
              </div>
            </div>
            <label className='form-label' htmlFor='specialCategory'>I would like to advertise my services as:</label>
            <select className={'form-input'} {...register('specialCategory')} >     
              {specialCategory.map((m) => (
                <option key={m.name} value={m.name} >{m.title}</option>
              ))}
            </select>
          </div>
          <p>Who are you wanting to meet with?</p>
          {meetsWithOptions.map((mwo) => (
            <div key={mwo.name}>
              <label className='form-label' htmlFor={mwo.name}>{mwo.title}</label>
              <input className='form-input' type="checkbox" {...register(`meetsWith.${mwo.name}`)} /> 
            </div>
          ))}

          <p>What activities are you open to in the bedroom?</p>
          {escortActivities.map((activity) => (
            <div key={activity.name}>
              <label className='form-label' htmlFor={activity.name}>{activity.title}</label>
              <input className='form-input' type="checkbox" {...register(`activities.${activity.name}`)} /> 
            </div>
          ))}

        </div>

        <div>
          <h1>Contact Info</h1>
          <label className='form-label' htmlFor='workingAddress'>What is your working address?</label>
          <input className='form-input' type="text" {...register('workingAddress')} placeholder='eg ... ' />
          {displaySuburb === true ? <p>We will only display city and suburb.</p> : <p>We will only display city</p>}
          <label className='form-label' htmlFor='displaySuburb'  >Display suburb</label>
          <input className='form-input'type='checkbox' {...register('displaySuburb')} onChange={displaySuburbChangeHandler} checked={displaySuburb} />
          <label className='form-label' htmlFor='workEmail'>Work Email, That the customer see's: </label>
          <Input
            id="publicEmail"
            element="input"
            type="text"
            label="Work Email (That the customer see's):"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            initialValue={escortEmail}
            initialValid={true}
            name={register('publicEmail').name}
            formOnChange={register('publicEmail').onChange}
            formOnBlur={register('publicEmail').onBlur}
            inputRef={register('publicEmail').ref} 
          />

          <label className='form-label' htmlFor='publicPhone'>Work Phone Number, that the customer see's:</label>
          <input className='form-input' type="text" {...register('workPhone')} placeholder='eg ... ' />
          <label className='form-label' htmlFor='whatsApp'>Do you have a whatsApp that you would like to be contacted on?</label>
          <input className='form-input' type="text" {...register('whatsApp')} placeholder='eg ... ' />
          <p>Add any links to external website or media</p>
          
          {links.map((link, idx) => (             
              <div key={idx} className={link.media === 'removed' ? 'hidden' : ''}>
                <label className='form-label' htmlFor={`linkMedia-${idx}`} >Media</label>
                <select idx={idx} className={'form-input'} {...register(`links.link-${idx}.media`)} onChange={handleLinkMediaChange}  >      {/*  onChange={handleLinkMediaChange}  */} 
                  {linkMedia.map((m) => (
                    <option key={m.name} value={m.name} >{m.title}</option>
                    ))}
                </select>
                <label className='form-label' htmlFor={`linkUrl-${idx}`}>Media</label>
                <input idx={idx} className='form-input' type="text" {...register(`links.link-${idx}.url`)} placeholder='eg ... ' onChange={handleLinkUrlChange}  />     {/*  onChange={handleLinkUrlChange}  */} 
                <button idx={idx} type='button' onClick={handleRemoveLink} >-</button>
              </div>            
          ))}
          <button type='button' onClick={handleAddLink} >+</button>

        </div>

        <label className='form-label' htmlFor='description'>About You...</label>
        <textarea className='form-input min-h-[100px] align-text-top' {...register('description')} placeholder='Paragraph describing yourself and your services. ' rows='3' cols='1' wrap='hard' ></textarea>

        <p>Pick three questions and give your answer</p>
        <button id='questionsTellMore' type='button' onClick={handleTellMeMore}>Tell me more</button>
            <div className={displayTellMore.questionsTellMore ? '' : 'hidden'}>
              <div className='w-80 h-40 bg-[red]'>
                  Tell More Modal
              </div>
            </div>
        <div>
          <label className='form-label' htmlFor='question1'>Question:</label>
          <select className={'form-input'} {...register('question1')} >     
            {questions.map((q) => (
              <option key={q.name} value={q.name} >{q.title}</option>
            ))}
          </select>
          <input className='form-input min-h-[100px] align-text-top' type="text-area" {...register('answer1')} placeholder='Write your answer here... ' />
        </div>
        <div>
          <label className='form-label' htmlFor='question2'>Question:</label>
          <select className={'form-input'} {...register('question2')} >     
            {questions.map((q) => (
              <option key={q.name} value={q.name} >{q.title}</option>
            ))}
          </select>
          <input className='form-input min-h-[100px] align-text-top' type="text-area" {...register('answer2')} placeholder='Write your answer here... ' />
        </div>
        <div>
          <label className='form-label' htmlFor='question3'>Question:</label>
          <select className={'form-input'} {...register('question3')} >     
            {questions.map((q) => (
              <option key={q.name} value={q.name} >{q.title}</option>
            ))}
          </select>
          <input className='form-input min-h-[100px] align-text-top' type="text-area" {...register(`answer3`)} placeholder='Write your answer here... ' />
        </div>

        <button>Submit</button>

      </form>
  )
}

export default FormAddDetails