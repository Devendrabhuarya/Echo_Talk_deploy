import React, { useState } from 'react';
import StepName from '../Steps/StepName/StepName';
import StepAvatar from '../Steps/StepAvatar/StepAvatar';

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div className='flex justify-center text-center h-screen'>
      <div className='w-96 m-auto'>
        <div className='bg-primary py-10 px-10 rounded-xl flex flex-col gap-3 mt-2'>
          <Step onNext={onNext} />
        </div>
      </div>
    </div>);
}

export default Activate
