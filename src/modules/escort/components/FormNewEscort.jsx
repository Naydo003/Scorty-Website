import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { EscortContext } from '@/common/contexts/escort-context'

function NewEscortForm() {

  const { register, handleSubmit } = useForm()
  const { escortId, setEscortId, setEscortName, setEscortEmail } = useContext(EscortContext)
  let router = useRouter()

  const onSubmit = async (newEscortData) => {

    try {
      const { data } = await axios.post('/api/escorts', { newEscortData })      
      const newId = data.id
      if (!newId) {
        console.log("no itemId")
        return
      }

      setEscortId(newId)
      setEscortName(newEscortData.newName)
      setEscortEmail(newEscortData.newPrivateEmail)
      router.push(`/become-a-model/${newId}/add-details`)
    } catch (err){
      console.log(err)
    }                                        
  }

  return (
  
      <form id='new-item-form' onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        <label>Name</label>
        <input className='form-input' type="text" {...register('newName')} placeholder='Name' />
        <p>This does not have to be your real name.</p>
        <label>Email</label>
        <input className='form-input' type="text" {...register('newPrivateEmail')} placeholder='Email' />
        <p>This email is for us to contact you. It will never be shared with anyone else.</p>

        <button>Submit</button>
      </form>
  )
}

export default NewEscortForm