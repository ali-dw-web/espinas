'use client'
import React from 'react'
import { useRouter } from "next/navigation.js"


export default function Edition({ t, s }) {



    return (

        <>
            <RoomCard g={s} a={t.img} b={t.name} c={t.noOfPeople} d={t.price} />
        </>
    )

}
function RoomCard({ a, b, c, d, g }) {
    const id = g
    const img = a
    const name = b
    const noOfPeople = c
    const price = Number(d).toLocaleString('fa-IR')
    const router = useRouter()
    function edit() {
        g = g
        router.push(`/adminPannel/roomsedition/${g}`)

    }
    return (

        <>
            <article onClick={edit} className="max-w-3xl mx-auto mt-2">
                <a className="block" aria-labelledby={`room-${id}-title`}>
                    <div className="flex items-center gap-4 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-3 rtl">


                        <div className="flex-shrink-0">
                            <img
                                src={img}
                                alt={name}
                                className="w-40 h-28 rounded-lg"
                                loading="lazy"
                            />
                        </div>


                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3 id={`room-${id}-title`} className="text-lg font-semibold text-slate-800 truncate">{name}</h3>
                                <span className="text-sm text-slate-500">کد: {id}</span>
                            </div>

                            <p className="mt-1 text-sm text-slate-600">ظرفیت: <span className="font-medium text-slate-800">{noOfPeople} نفر</span></p>

                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                        <path d="M10 2a6 6 0 00-6 6v3a6 6 0 006 6 6 6 0 006-6V8a6 6 0 00-6-6z" />
                                    </svg>
                                    <span className="text-sm text-emerald-600 font-semibold">دسترسی سریع</span>
                                </div>


                                <div className="text-right">
                                    <div className="text-sm text-slate-500">قیمت</div>
                                    <div className="mt-0.5 text-lg font-bold text-rose-600">{price} <span className="text-sm font-normal">تومان</span></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </a>
            </article>
        </>
    )
}
