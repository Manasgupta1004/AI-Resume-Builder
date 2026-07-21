import React from 'react'

const title = ({title, dscr}) => {
  return (
    <div className='text-center mt-6 text-slate-700'>
      <h2 className='text-3xl sm:text-4xl font-medium'>{title}</h2>
      <p className='max-sm max-w-2xl mt-4 text-slate-500'>{dscr}</p>
    </div>
  )
}

export default title
