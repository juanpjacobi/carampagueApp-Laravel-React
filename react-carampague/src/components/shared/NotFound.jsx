import React from 'react'

export const NotFound = ({message}) => {
    return (
        <div className="flex  flex-col items-center w-full text-center gap-5 p-2">
            <span className='text-sky-700 font-bold text-2xl'>{message}</span>
        </div>
      )
}
