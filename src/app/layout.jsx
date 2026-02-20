'use client';
import Footer from './footer.jsx'
import { createContext, useState } from 'react';
import './globals.css'
import React from 'react'
import Header from './header.jsx'
import AOS from "aos";
import "aos/dist/aos.css";

export const myContext = React.createContext()
export default function Root({ children }) {
    
    const [hotelName, setHotelName] = useState('saadat')
    return (
        <>
            <html>
                <head>
                    <link rel="stylesheet" href="/icofont/icofont.min.css"></link>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap"></link>
                </head>
                <body  >
                    
                    <myContext.Provider value={{ hotelName, setHotelName }}>

                       <div className='w-[100%] h-[100%] bg-[white]'>
                         {children}
                       </div>

                    </myContext.Provider>
                    




                </body>
            </html>
        </>
    )
}