import React, { useEffect, useState } from 'react';
import img from '../../images/0bc09168376a31328a6924f003a5146e';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../apiCalls/User';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
    const { id: userId } = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate('/');
    const handleGetUser = async () => {
        try {
            const { data } = await getUser(userId);
            setUser(data.user);
        } catch (error) {

        }
    }
    useEffect(() => {
        handleGetUser();
    }, [userId]);
    return (
        user && <div class="relative container mx-auto px-6 flex items-center justify-between mt-11 border-2 border-gray-700 py-14 rounded-lg">

            <div class="flex-1 flex flex-col items-center">
                <img src={`/images/${user?.avatar}`} alt="Profile photo" class="w-32 h-32 rounded-full border-4 border-gray-200" />
                <h1 class="text-2xl font-bold mt-4">{user.name}</h1>
                <p class="text-gray-600 text-sm mt-2">{user.role}</p>
                {
                    user._id !== userId ?
                        <div class="mt-4 flex space-x-4">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Follow</button>
                            <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Message</button>
                        </div> :
                        <div class="mt-4 flex space-x-4">
                            <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                onClick={() => navigate('/edit-profile')}
                            >Edit Profile</button>
                        </div>

                }
            </div>
            <div class="flex-1 flex flex-col items-center">
                <div class="flex space-x-8 mt-8">

                    <div class="text-center">
                        <p class="text-2xl font-bold">345</p>
                        <p class="text-gray-600 text-sm">Followers</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold">67</p>
                        <p class="text-gray-600 text-sm">Following</p>
                    </div>
                </div>
                <div class="mt-8">
                    <h2 class="text-xl font-bold">About me</h2>
                    <p class="text-gray-600 text-sm mt-4">{user.about}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
