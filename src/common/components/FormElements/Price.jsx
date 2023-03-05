import React from 'react'
import { timeframe } from '@/modules/escort/utils/escort-enumerables'
import Input from './Input'
import Select from './Select'

function Price( props ) {

  // console.log(props)
  // console.log(timeframe)
  const modTimeOnChange = (event) => {
    props.priceChangeHandler(event)
    props.timeFormOnChange(event)
  }

  const modPriceOnChange = (event) => {
    props.priceChangeHandler(event)
    props.priceFormOnChange(event)
  }

  const modIncludesInfoOnChange = (event) => {
    props.priceChangeHandler(event)
    props.includesInfoFormOnChange(event)
  }




  return (
    <div className='flex flec-row space-x-5'>
      <Select
        id={`${props.id}.time`}
        label=""
        options={timeframe}
        validators={[]}
        errorText="Please enter a select a timeframe"
        initialValue={props.initialValue && props.initialValue.time || null}
        initialValid={props.initialValue && true || null}
        name={props.timeName}
        formOnChange={modTimeOnChange}
        formOnBlur={props.timeFormOnBlur}
        inputRef={props.timeInputRef} 
      />

      <Input
        id={`${props.id}.price`}
        element="input"
        type="number"
        label=""
        validators={[]}
        errorText="Please enter a valid props.id"
        initialValue={props.initialValue && props.initialValue.price || null}
        initialValid={props.initialValue && true || null}
        name={props.priceName}
        formOnChange={modPriceOnChange}
        formOnBlur={props.priceFormOnBlur}
        inputRef={props.priceInputRef} 
      />
        <button id={props.id} type='button' onClick={props.priceRemoveHandler} >REMOVE</button>
      <Input
        id={`${props.id}.includesInfo`}
        element="input"
        type="text"
        label=""
        validators={[]}
        errorText="Please enter a valid phone number"
        initialValue={props.initialValue && props.initialValue.includesInfo || null}
        initialValid={props.initialValue && true || null}
        name={props.includesInfoName}
        formOnChange={modIncludesInfoOnChange}
        formOnBlur={props.includesInfoFormOnBlur}
        inputRef={props.includesInfoInputRef} 
      />
    </div>
  )
}

export default Price