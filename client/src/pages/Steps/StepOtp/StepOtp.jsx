import React, { useState } from 'react';
import TextInput from '../../../components/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../../apiCalls/otp';
import { setUser } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const StepOtp = ({ onNext }) => {
    const [otp, setOtp] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate('/');
    const onSubmit = async () => {
        try {
            const { phone, hash } = auth.otp;
            if (!phone || !hash || !otp) return;
            const { data } = await verifyOtp({ phone, hash, otp });
            console.log(data);
            dispatch(setUser(data.user));
            navigate('/active');
            if (!data.success) {
                throw new Error(data.message);
            }
        } catch (error) {
            alert("Error : " +error.message );
        }
    }
    return (
        <>
            <div className='flex justify-center text-center h-screen'>
                <div className='w-96 m-auto'>

                    <div className='bg-primary py-7 px-10 rounded-xl flex flex-col gap-5 mt-2'>
                        <span className='text-xl'>Enter Your otp number</span>
                        <TextInput onChange={(e) =>
                            setOtp(e.target.value)
                        } value={otp} />
                        <button className='py-1 w-32 m-auto bg-blue-600 rounded-2xl'
                            onClick={onSubmit}
                        >Next</button>
                        <small className='text-gray-600'> <span><small>by entering your number, ypu've agreeing to our Terms and Service and Privacy Policy.Thanks!</small></span></small>
                    </div>

                </div>
            </div>
        </>
    );
};

export default StepOtp;
