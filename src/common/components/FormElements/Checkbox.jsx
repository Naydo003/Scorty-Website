import React, { useEffect, useState } from 'react';



const Input = props => {
  const [isChecked, setIsChecked] = useState(props.initialValue);

  useEffect(()=> {
    setIsChecked(props.initialValue)
    props.setValue(props.name, props.initialValue)
  }, [props.initialValue])


  const changeHandler = event => {
    props.formOnChange(event)
    // console.log(isChecked)
    // console.log(!isChecked)
    // props.setValue(props.name, !isChecked )
    setIsChecked(!isChecked)
  };


  return (
    <div className=''>
      <label className='form-label' htmlFor={props.id}>{props.label}</label>               {/*  htmlFor in jsx is same as for in standard html, keyword for was taken in js    */}
      
      <input 
        id={props.id}
        type='checkbox'
        className={'form-input'} 
        onChange={changeHandler}
        onBlur={props.formOnBlur}              // onBlur is opposite of focus. ie when clicked out of.
        // value={isChecked}
        name={props.name} 
        ref={props.inputRef}
        checked={isChecked}
      />     
      
    </div>
  );
};

export default Input;