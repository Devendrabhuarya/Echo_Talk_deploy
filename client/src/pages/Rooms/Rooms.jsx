import React, { useState, useEffect } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PeopleIcon from '@mui/icons-material/People';
import RoomCard from '../../components/RoomCard/RoomCard';
import AddRoomModel from '../../components/AddRoomModel/AddRoomModel';
import { getAllRoom } from '../../apiCalls/rooms';
const Rooms = () => {
  const [showAddRoomModel, setShowAddRoomModel] = useState(false);
  const [serchInput, setSerchInput] = useState('');
  const [filterResult, setFilterResult] = useState([]);
  const [room, setRoom] = useState([]);
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getAllRoom();
      setRoom(data.allRoom);
    }
    fetchRoom();
  }, []);
  useEffect(() => {
    const filterSerchData = async () => {

      const filtered = await room.filter(obj => (obj.topic).toLowerCase().includes(serchInput.toLowerCase()));
      setFilterResult(filtered);

    }
    filterSerchData();
  }, [serchInput]);


  return (
    room && <>
      <div className='px-3 py-3'>
        <div className='flex gap-2  '>
          <span className='my-auto text-xl border-b-2 border-blue-600 AllVoiceRoom'>All voice rooms</span>
          <span className='my-auto'>
            <TextInput placeholder=' search..' className='ml-4 rounded-2xl bg-primary py-1 px-1'
              value={serchInput} onChange={(e) => setSerchInput(e.target.value)
              }
            />
          </span>
          <div className='ml-auto bg-green-600 px-3 rounded-2xl cursor-pointer flex gap-2 justify-center'
            onClick={() => setShowAddRoomModel(true)}
          >
            <RecordVoiceOverIcon className='text-sm' style={{ fontSize: '15px', margin: 'auto' }} />
            <span className='my-auto' >Start a room</span>
          </div>
        </div>
        <div className='flex flex-wrap ' >

          {
            filterResult.length === 0 ? room.map((room) => (
              <RoomCard room={room} key={room.id} />
            )) : filterResult.map((room) => (
              <RoomCard room={room} key={room.id} />
            ))
          }
        </div>
      </div >
      {showAddRoomModel && <AddRoomModel onClose={() => setShowAddRoomModel(false)} />
      }
    </>

  )
}

export default Rooms
