'use client'
import { useEffect, useRef, useState } from "react"
import React from "react"
export default function Back({ r }) {
    const [data, setData] = useState()
    const loading  = useRef(null)
    useEffect(() => {
        fetch(`https://6905eef4ee3d0d14c1342d8b.mockapi.io/rooms/${r}`)
            .then(res => res.json())
            .then(val => {
                setData(val)
                if (loading.current) {
                    loading.current.style.display = 'none'
                }
               
                
                
                


            })
    }, [])

    return (
        <>
            <div className="w-full min-h-[100vh] bg-gray-100 flex items-center justify-center p-4">
                <div ref={loading} className="  w-[100%] h-[100%]  fixed top-0 right-0 bg-[white] flex justify-center items-center ">
                    <img className="w-[35px] h-[35px] " src='/images/icons8-loading.gif' alt="" />
                </div>
                <div className="w-full  max-w-2xl bg-white rounded-3xl shadow-xl p-6 space-y-5 border border-gray-200">
                    <div className="space-y-2 text-right">
                        <h2 className="text-xl font-bold">اطلاعات رزروکننده</h2>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <p>نام : {data?.voucher[0].name} </p>
                            <p>نام خانوادگی : {data?.voucher[0].lastName}</p>
                            <p>کد ملی : {data?.voucher[0].idNumber}</p>
                            <p>شماره همراه : {data?.voucher[0].mobile}</p>
                            <p className="col-span-2">کد پیگیری : {data?.voucher[0].trackingNumber}</p>
                        </div>
                    </div>

                    <hr className="border-gray-300" />
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-right">اتاق‌های سفارش داده شده</h2>

                        {
                            data?.voucher.map((val, i) => {
                                if (!(i == 0)) {
                                   return ( 
                                    <React.Fragment key={i}>
                                     <div className="p-4 rounded-2xl border border-gray-200 shadow-sm bg-gray-50 text-right space-y-2">
                                        <p>نام میهمان  : {val.guestName}</p>
                                        <p>نوع اتاق : {val.roomName}</p>
                                        <p>قیمت : {val.price}</p>
                                        <p>تاریخ : {val.time}</p>
                                        <p>بزرگسال : {val.adult} | خردسال : {val.teen} | کودک : {val.baby}</p>
                                    </div>
                                    </React.Fragment>
                                   )

                                }
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}