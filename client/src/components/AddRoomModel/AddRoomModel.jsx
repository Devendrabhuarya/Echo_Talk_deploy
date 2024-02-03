import React, { useState } from 'react';
import TextInput from '../TextInput/TextInput';
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';
import { createRoom as create } from '../../apiCalls/rooms';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';

const AddRoomModel = ({ onClose }) => {
    const classForTpe = 'flex flex-col px-3 py-2  rounded-lg text-center cursor-pointer';
    const [topic, setTopic] = useState('');
    const [roomType, setRoomType] = useState('open');
    const navigate = useNavigate('/');
    const createRoom = async () => {
        try {
            const { data } = await create({ topic, roomType });
            navigate(`/room/${data.room.id}`)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div
            className='fixed   h-screen w-screen top-0 left-0 flex justify-center text-center '
            style={{ background: 'rgb(0,0,0,0.5)' }}
        >

            <div className="header w-96 relative  m-auto mt-auto rounded-lg py-3 px-4  opacity-100
             " style={{ background: '#1d1d1d' }}>
                <span className='absolute top-0 right-1 cursor-pointer'
                    onClick={onClose}><CloseIcon /></span>
                <div className='flex-col text-start border-b-2 pb-6 relative'>

                    <span>Enter Topic to be disccused</span>
                    <TextInput className='w-full mt-3 rounded-md bg-gray-600'
                        onChange={(e) =>
                            setTopic(e.target.value)
                        } value={topic} />

                    <p className='mt-2'>Room Type</p>
                    <div className="roomType flex mt-5 justify-between">
                        <div className={classForTpe} style={{
                            background: `${roomType === 'open' ? '#262626' : ''}`
                        }}
                            onClick={() => setRoomType('open')}>
                            <PublicIcon style={{ fontSize: '50px', }} />
                            <span>Open</span>
                        </div>
                        <div className={classForTpe}
                            style={{
                                background: `${roomType === 'social' ? '#262626' : ''}`
                            }}

                            onClick={() => setRoomType('social')}>
                            <GroupIcon style={{ fontSize: '50px' }} />
                            <span>Social</span>
                        </div>
                        <div className={classForTpe}
                            style={{
                                background: `${roomType === 'lock' ? '#262626' : ''}`
                            }}

                            onClick={() => setRoomType('lock')}>
                            <LockIcon  style={{ fontSize: '50px' }} />
                            <span>Closed</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-4'>
                    <span className='mx-auto'>
                        start a room , open to everyone
                    </span>
                    <button className='py-1 w-32 m-auto mt-1 bg-blue-600 rounded-2xl'
                        onClick={createRoom}>Lets Go</button>
                </div>
            </div>

        </div >
    )
}

export default AddRoomModel