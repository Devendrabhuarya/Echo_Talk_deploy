import React from 'react'

const Loader = ({ text }) => {
    return (
        <div>
            <div className='flex justify-center text-center w-screen h-screen'>
                <div className="button flex justify-center gap-2 text-center">
                    <div className='bg-primary py-7 px-10 rounded-xl gap-5 m-auto'>
                        {text} wait bug 
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Loader
