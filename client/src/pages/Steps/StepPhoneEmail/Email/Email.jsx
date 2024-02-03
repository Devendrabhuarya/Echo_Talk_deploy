import React, { useState } from 'react';
import TextInput from '../../../../components/TextInput/TextInput';
const Email = ({ onNext }) => {
  const [email, setemail] = useState();
  return (
    <>
      <span className='text-xl'>Enter Your Email</span>
      <TextInput onChange={(e) =>
        setemail(e.target.value)
      } value={email} />
      <button className='py-1 w-32 m-auto bg-blue-600 rounded-2xl'
        onClick={onNext}>Next</button>
      <small className='text-gray-600'> <span><small>by entering your number, ypu've agreeing to our Terms and Service and Privacy Policy.Thanks!</small></span></small>
    </>
  )
}

export default Email
