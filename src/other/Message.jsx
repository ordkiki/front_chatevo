import React, { useState } from 'react';
import Friend_card from '../components/card/Friend_card';
import Sidebar from '../components/sidebar/Sidebar';

const Message = () => {

    return (
        <>
            <div className='p-4'>
                <div className='flex bg-slate-50'>

                    <Sidebar />
                    <div className='w-fit h-screen  p-4'>

                        {/* <Sidebar></Sidebar> */}

                        <h1 className='font-semibold text-2xl mb-4'>Message</h1>
                        <ul className='p-4 font-semibold w-screen flex justify-between lg:w-[18vw]  '>
                            <li><button>Tout</button></li>
                            <li><button>Archived</button></li>
                            <li><button>Starred</button></li>
                        </ul>
                        <h3 className='m-4 text-xl'>GROUPES</h3>
                        <div className='overflow-y-scroll mt-8 lg:w-[18vw] h-[20vh]'>
                            <Friend_card />
                            <Friend_card />
                            <Friend_card />
                        </div>
                        <h3 className='m-4'>PERSONNAL</h3>
                        <div className=' mt-8 lg:w-[18vw] h-[20vh]'>
                            <Friend_card />
                            <Friend_card />
                            <Friend_card />
                            <Friend_card />
                            <Friend_card />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Message;