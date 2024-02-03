import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const navigate = useNavigate('');
    return (
        room && <div className="card w-64 bg-gray-600 p-3 rounded-lg mt-8 ml-10" style={{ background: '#1d1d1d' }}
            onClick={() => {
                navigate(`/room/${room.id}`)
            }}>
            <span className=' roomTopic capitalize'>{room.topic}</span>
            <div className="flex mt-2 px-2">
                <div className="images flex relative">

                    {
                        room?.speakers?.slice(0, 2).map((speaker, ind) => (
                            <img src={`/images/${speaker.avatar}`} alt=""
                                className={`w-10 h-10 rounded-full border-2 border-blue-700
                ${ind % 2 ? 'absolute top-4 left-3 border-2 border-green-700' : ''}`}
                            />
                        ))
                    }


                </div>
                <div className="names flex flex-col ml-auto px-2 ">
                    {
                        room?.speakers?.slice(0, 2).map((speaker, ind) => (
                            <small className={room.speakers.length === 1 ? 'm-auto speakerName' : "speakerName"}>
                                <span className='font-sans capitalize'>{speaker.name}</span>
                            </small>
                        ))
                    }
                </div>
            </div>
            <span className='flex justify-end text-center mt-2 '>
                <span style={{ fontSize: '12px' }}
                    className='flex justify-center text-center'>{room.totalClient} <PeopleIcon className='text-sm my-auto ml-1' style={{ fontSize: '100%' }} /></span>
            </span>
        </div>
    )
}

export default RoomCard
