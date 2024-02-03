import React from 'react';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicNoneIcon from '@mui/icons-material/MicNone';


const User = ({ Client, ind, provideRef, onClickhandleMute }) => {
    const borderColor = ['border-blue-400', 'border-yellow-400', , 'border-green-400', 'border-red-400'];
    return (
        <div key={ind} className='text-center relative'
            onClick={() => {
                onClickhandleMute(Client._id);

            }}>
            <img src={`/images/${Client?.avatar}`} alt="profile Photo"
                className={`w-16 h-16 rounded-full m-auto border-4  ${borderColor[ind]}`}
            />
            {

                Client.muted === true ?
                    <MicOffIcon className='absolute bottom-7 right-2 bg-black rounded-full' style={{ fontSize: '13px' }}
                    />
                    :
                    <MicNoneIcon className='absolute bottom-7 right-2 bg-black rounded-full' style={{ fontSize: '13px' }}
                    />
            }

            <h4 className='capitalize text-sm'>{Client.name}</h4>
            <audio src="" ref={(instance) => provideRef(instance, Client._id)}
                autoPlay
            ></audio>

        </div>
    )
}

export default User
