import React, { useState } from 'react';
import Phone from './Phone/Phone';
import Email from './Email/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
const StepPhoneEmail = ({ onNext }) => {
    const steps = {
        'Phone': Phone,
        'Email': Email,
    };
    const [type, setType] = useState('Phone');
    const Component = steps[type];
    return (
        <>
            <div className='flex justify-center text-center h-screen'>
                <div className='w-96 m-auto'>
                    <div className="button flex justify-end gap-2">
                        <span onClick={() => setType('Phone')}
                            className={`px-2 py-1  rounded-lg ${type === 'Phone' ? 'bg-blue-600' : 'bg-primary'}`}
                        ><SmartphoneIcon /></span>
                        <span onClick={() => setType('Email')}
                            className={`px-2 py-1  rounded-lg ${type === 'Email' ? 'bg-blue-600' : 'bg-primary'}`}
                        ><EmailIcon /></span>
                    </div>
                    <div className='bg-primary py-7 px-10 rounded-xl flex flex-col gap-5 mt-2'>
                        <Component onNext={onNext} />
                    </div>

                </div>
            </div>
        </>
    );
};

export default StepPhoneEmail;
