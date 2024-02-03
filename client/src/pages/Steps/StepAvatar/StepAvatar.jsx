import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../../redux/activateSlice';
import { activate } from '../../../apiCalls/activate';
import { setAuth } from '../../../redux/authSlice';
import Loader from '../../../components/shared/Loader/Loader';

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector(state => state.activate);
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1701009689243-0f7ed1a3c6fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8');
    const [loader, setLoader] = useState(false)
    function handleFileChange(e) {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
    const onSumit = async () => {
        setLoader(true);
        try {
            if (!image || !name) return;
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            const { data } = await activate(formData);
            dispatch(setAuth(data));

        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    if (loader) return <Loader text={"Activated ..."} />

    return (

        <>
            <div className='text-3xl'>okay, {name}!</div>
            <small className='text-gray-700 m-0'>how this photo ?</small>
            <label htmlFor="file">
                <img
                    className='w-28 h-28 rounded-full m-auto border-4 border-blue-400'
                    src={imageUrl} alt="" />
            </label>
            <label htmlFor="file" className="file-label text-blue-700"
            >
                <small> Choose different photo</small>
            </label>
            <input
                type="file"
                id="file"
                className="file-hidden hidden"
                onChange={handleFileChange}
            />

            <button className='py-1 w-32 m-auto bg-blue-600 rounded-2xl'
                onClick={onSumit}>Next</button>
        </>


    );
};

export default StepAvatar;
