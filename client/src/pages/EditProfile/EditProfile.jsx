import React, { useState } from 'react';
import { editUserProfile } from '../../apiCalls/User';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [imageUrl, setFileUrl] = useState();
    const [image, setFile] = useState();
    const navigate = useNavigate('/');
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;
            const inputs = form.elements;
            const data = new FormData();
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                if (input.value !== '' && input.value !== undefined)
                    data.append(input.name, input.value);
            }
            data.append('image', image);
            const res = await editUserProfile(data);
            navigate('/rooms')
        } catch (error) {
            console.log(error);
        }
    };
    function handleChange(event) {
        setFile(event.target.files[0]);
        setFileUrl(URL.createObjectURL(event.target.files[0]));

    }
    return (
        <div class="container mx-auto px-4 py-8 bg-primary">
            <div class="flex flex-col items-center">
                <img class="w-32 h-32 rounded-full border-4 border-gray-300"
                    src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1696385989343-0df3db3c70c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"}
                    alt="Profile photo" />
                <h1 class="text-2xl font-bold mt-4">John Doe</h1>
                <p class="text-gray-600 text-sm">Web Developer</p>
                <div class="flex mt-4 space-x-4">
                    <a href="#" class="text-blue-500 hover:underline">Twitter</a>
                    <a href="#" class="text-blue-500 hover:underline">LinkedIn</a>
                    <a href="#" class="text-blue-500 hover:underline">GitHub</a>
                </div>
            </div>
            <form class="mt-8 max-w-md mx-auto" onSubmit={handleSubmit} >
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2">
                        <label for="name" class="block text-gray-700 text-sm font-medium">Name</label>
                        <input type="text" id="name" name="name"
                            class="bg-secondary mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="role" class="block text-gray-700 text-sm font-medium">Role</label>
                        <input type="text" id="role" name="role"
                            class="bg-secondary mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="photo" class="block text-gray-700 text-sm font-medium">Photo</label>
                        <input type="file" id="photo" name="photo" onChange={handleChange} accept="image/*"
                            class="bg-secondary mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                <div class="mt-4">
                    <label for="about" class="block text-gray-700 text-sm font-medium">About</label>
                    <textarea id="about" name="about" rows="4"
                        class="bg-secondary mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">Hello, I'm John Doe, a web developer based in New York. I love creating websites and apps using HTML, CSS, and JavaScript.</textarea>
                </div>
                <div class="mt-4 flex justify-end">
                    <button type="submit"
                        class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                    >Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
