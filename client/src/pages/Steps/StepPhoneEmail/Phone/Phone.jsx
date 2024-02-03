import React, { useState } from 'react';
import TextInput from '../../../../components/TextInput/TextInput';
import { sendOtp } from '../../../../apiCalls/otp';
import { useDispatch, useSelector } from 'react-redux';
import { setOtp } from '../../../../redux/authSlice';
const Phone = ({ onNext }) => {
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const { data } = await sendOtp({ phone });
      console.log(data);
      if (data.success) {
        dispatch((setOtp({ phone: data.phone, hash: data.hash })));
      } else {
        throw new Error(data.message);
      }
      onNext();
    } catch (error) {

    }
  }
  return (
    <>
      <span className='text-xl'>Enter Your phone number</span>
      <TextInput onChange={(e) =>
        setPhone(e.target.value)

      } value={phone} />
      <button className='py-1 w-32 m-auto bg-blue-600 rounded-2xl'
        onClick={onSubmit}>Next</button>
      <small className='text-gray-600'> <span><small>by entering your number, ypu've agreeing to our Terms and Service and Privacy Policy.Thanks!</small></span></small>
    </>

  )
}

export default Phone
