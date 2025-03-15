import React from 'react'

function Friend_card(props) {
  return (
    <>
        <div className='flex justify-between items-center w-full hover:bg-[rgba(255,255,255,0.7)] rounded p-2 '>
            <div className='rounded-full border-[1px] size-[50px]  bg-purple-700 relative'>
                <div className='absolute bottom-0 size-3 border-red-500 border-[4px] right-0 rounded-full'></div>
                <img src="" className='object-cover ' alt="" />

            </div>
            <div className='text-[14px]'>
                <h3 className=''>Vladmir poutine</h3>
                <p className='font-bold'>Opération cake 2....</p>
            </div>
            <div>
                <span className='text-[10px] text-slate-400'>20 hours ago</span>
            </div>
        </div>
    </>
  )
}

export default Friend_card