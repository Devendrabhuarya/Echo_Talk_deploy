import React from 'react'

const TextInput = (props) => {
    return (
        <div>
            <input className='rounded-lg bg-secondary py-1 px-1'  {...props} />
        </div>
    )
}

export default TextInput
