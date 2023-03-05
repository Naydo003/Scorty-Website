import Input from '@/common/components/FormElements/Input'
import Select from '@/common/components/FormElements/Select'
import Checkbox from '@/common/components/FormElements/Checkbox'

import { bodyShape } from '@/modules/escort/utils/escort-enumerables'



import React from 'react'
import { useForm } from 'react-hook-form'

function SearchFilterPanel() {

  const { register, handleSubmit, setValue, formState: { isDirty, dirtyFields }, getValues } = useForm({
    defaultValues: {}
  })

  const onSubmit = async (formData) => {
    console.log(formData)
  }

  return (
    <div className='h-[200px] bg-lime-600'>
      <form id='search-form' className='' onSubmit={handleSubmit(onSubmit)}> 
        <div className='grid grid-cols-3 gap-5'>
          <div className='flex flex-col'>
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[]}
              errorText="Please enter a valid name"
              // initialValue={escort.name}
              // initialValid={true}
              name={register('name').name}
              formOnChange={register('name').onChange}
              formOnBlur={register('name').onBlur}
              inputRef={register('name').ref} 
            />

            <Input
              id="location"
              element="input"
              type="text"
              label="location"
              validators={[]}
              errorText="Please enter a valid name"
              // initialValue={escort.location}
              // initialValid={true}
              name={register('location').name}
              formOnChange={register('location').onChange}
              formOnBlur={register('location').onBlur}
              inputRef={register('location').ref} 
            />

          </div>
          <div className='flex flex-col'>
            <Input
              id="ageMax"
              element="input"
              type="number"
              label="Max Age"
              validators={[]}
              errorText="Please enter a valid age"
              // initialValue={escort.ageMax}
              // initialValid={true}
              name={register('ageMax').name}
              formOnChange={register('ageMax').onChange}
              formOnBlur={register('ageMax').onBlur}
              inputRef={register('ageMax').ref} 
            />

            <Input
              id="ageMin"
              element="input"
              type="number"
              label="Min Age"
              validators={[]}
              errorText="Please enter a valid age"
              // initialValue={escort.ageMin}
              // initialValid={true}
              name={register('ageMin').name}
              formOnChange={register('ageMin').onChange}
              formOnBlur={register('ageMin').onBlur}
              inputRef={register('ageMin').ref} 
            />

            <Select
              id='bodyShape'
              label="Body Shape"
              options={bodyShape}
              validators={[]}
              errorText="Please enter a valid hair colour"
              // initialValue={escort.bodyShape}
              // initialValid={true}
              name={register('bodyShape').name}
              formOnChange={register('bodyShape').onChange}
              formOnBlur={register('bodyShape').onBlur}
              inputRef={register('bodyShape').ref} 
            />  
          </div>
          <div className='flex flex-col'>
            <Checkbox
              id='incalls'
              label={'Do you do incalls?'}
              // initialValue={escort.incalls || true}
              // initialValid={true}
              name={register('incalls').name}
              formOnChange={register('incalls').onChange}
              formOnBlur={register('incalls').onBlur}
              inputRef={register('incalls').ref} 
              setValue={setValue}
            />

            <Checkbox
              id='outcalls'
              label={'Do you do outcalls?'}
              // initialValue={escort.outcalls || true }
              // initialValid={true}
              name={register('outcalls').name}
              formOnChange={register('outcalls').onChange}
              formOnBlur={register('outcalls').onBlur}
              inputRef={register('outcalls').ref} 
              setValue={setValue}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchFilterPanel