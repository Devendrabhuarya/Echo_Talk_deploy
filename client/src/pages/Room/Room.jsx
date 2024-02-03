import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom } from '../../apiCalls/rooms';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useWebRTc } from '../../hooks/useWebRTC';
import { useSelector } from 'react-redux';
import User from '../Users/User';


const Room = () => {
    const { id: roomId } = useParams();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate('/');
    const [room, setRoom] = useState(null);
    const [isMute, setMute] = useState(true);
    const { clients, provideRef, handleMute } = useWebRTc(roomId, user);
    
    const onClickhandleMute = (clietId) => {
        if (clietId !== user?._id) {
            navigate(`/profile/${clietId}`, '_blank');
            return;
        }
        setMute(prev => !prev);
    }
    useEffect(() => {
        handleMute(isMute, user?._id);
    }, [isMute]);

    useEffect(() => {
    }, [clients])

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await getRoom(roomId);
                setRoom(data.room);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoom();
    }, [roomId]);
    const handleLeave = () => {
        navigate('/rooms');
    }
    const borderColor = ['border-blue-400', 'border-yellow-400', , 'border-green-400', 'border-red-400'];
    return (
        <div>
            <div className='px-5 py-3'>
                <div className='flex '>
                    <button onClick={handleLeave}>
                        <span className='my-auto text-xl border-b-2 border-blue-600 AllVoiceRoom'><KeyboardBackspaceIcon />All voice rooms</span>
                    </button>
                </div>
                <div className='bg-primary  rounded-lg px-8 py-6 mt-5'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl capitalize font-bold'>{room?.topic}</h1>
                        <button className='p-1 bg-secondary rounded-xl ml-auto mr-6' >🖐️</button>
                        <button className=' bg-secondary rounded-xl py-1 px-4'
                            onClick={handleLeave}>✌️ leave</button>
                    </div>
                    <div className="speakers flex flex-wrap gap-6  py-6 cursor-pointer">
                        {
                            clients?.map((Client, ind) => {
                                console.log(Client)
                                return (

                                    <User Client={Client} ind={ind}
                                        provideRef={provideRef}
                                        onClickhandleMute={onClickhandleMute}
                                    />
                                )
                            })
                        }
                    </div>
                    <h1 className='text-xl textSerifRoabot font-semibold'>Other in the room</h1>
                    <div className="speakers flex flex-wrap gap-6   py-6">
                        {
                            clients && clients.map((Client) => (

                                <div key={Client.id} className='text-center relative'>
                                    <img src={`/images/${Client?.avatar}`} alt="profile Photo"
                                        className='w-16 h-16 rounded-full m-auto border-4 border-yellow-400'
                                    />

                                    <h4 className='capitalize text-sm'>{Client.name}</h4>
                                    <audio src="" ref={(instance) => provideRef(instance, Client.id)}
                                        autoPlay
                                    ></audio>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Room