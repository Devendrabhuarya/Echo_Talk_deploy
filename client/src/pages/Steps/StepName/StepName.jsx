import React, { useState } from 'react';
import TextInput from '../../../components/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../redux/activateSlice';

const StepName = ({ onNext }) => {
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.activate)
    const [userName, setUserName] = useState(name);
    const onSubmit = () => {
        if (!userName){
            alert('Please Enter Your Name');
            return;
        }
           
        dispatch(setName(userName));
        onNext();
    }
    console.log(name);
    return (
        <>
            <div>🤓 what is your name?</div>
            <TextInput onChange={(e) =>
                setUserName(e.target.value)
            } value={userName} />
            <small className='text-gray-700'>plese use real name at EchoTalk</small>
            <button className='py-1 w-32 m-auto bg-blue-600 rounded-2xl'
                onClick={onSubmit}>Next</button>
        </>
    );
};

export default StepName;
