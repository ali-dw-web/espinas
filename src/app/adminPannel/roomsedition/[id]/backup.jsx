'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function SpinasRoomCard({ id }) {
    const menu = useRef()
    const del = useRef()
    const blur = useRef()
    const warning = useRef()
    const router = useRouter()
    const input = useRef([])
    const loading = useRef()
    const error = useRef()
    const error2 = useRef()

    const [selected, setSelected] = useState([])
    useEffect(() => {
        fetch(`https://68dab56d23ebc87faa310681.mockapi.io/room/${id}`)
            .then(res => res.json())
            .then(val => {
                console.log(val);
                setSelected(val)
                if (loading.current) {
                    loading.current.style.display = 'none'
                }

            })
    }, [])
    const price = Number(selected.price).toLocaleString('fa-IR')
    function open() {
        console.log(menu.current);
        menu.current.style.transform = 'scale(1)'
        blur.current.style.display = 'block'
    }
    function close() {
        console.log(menu.current);
        menu.current.style.transform = 'scale(0)'
        blur.current.style.display = 'none'
    }
    function del1() {
        del.current.style.transform = 'scale(1)'
        blur.current.style.display = 'block'
    }
    function remove() {
        console.log(';zkdcmlskdslkdm');

        del.current.style.transform = 'scale(0)'
        blur.current.style.display = 'none'
    }
    function finalremove() {
        fetch(`https://68dab56d23ebc87faa310681.mockapi.io/room/${id}`, {
            method: 'DELETE'
        })
        warning.current.style.display = 'flex'
        del.current.style.transform = 'scale(0)'
        blur.current.style.display = 'none'
        setTimeout(() => {
            warning.current.style.display = 'none'
            router.push('../')
        }, 3000);


    }
    function blur1() {
        menu.current.style.transform = 'scale(0)'
        del.current.style.transform = 'scale(0)'
        blur.current.style.display = 'none'
    }
    function change(e) {
        let check = []

        let _name = input.current[0].value
        let _price = input.current[1].value
        let _img = input.current[2].value
        let _noOfPeople = input.current[3].value
        input.current.map((val) => {
            check.push(val.value)
        })
        const confirmation = check.some((s) => s == '')
        if (confirmation == true) {
            error.current.style.right = '10px'
            error.current.style.opacity = '1'
            setTimeout(() => {
                error.current.style.right = '-600px'
                error.current.style.opacity = '0'
            }, 3000)

        } else {
            fetch(`https://68dab56d23ebc87faa310681.mockapi.io/room/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: _name,
                    img: _img,
                    noOfPeople: _noOfPeople,
                    price: _price
                })
            })
                .then(res => {
                    if (res.ok) {
                        error2.current.style.right = '10px'
                        error2.current.style.opacity = '1'
                        setTimeout(() => {
                            error2.current.style.right = '-600px'
                            error2.current.style.opacity = '0'
                            window.location.reload()
                        }, 3000)
                    }
                })
        }

    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6 border flex-wrap">
            <div ref={error} className={" duration-500 opacity-0 bg-[#282828] mt-[180px] w-[280px] rounded-[8px] overflow-hidden h-[95px] border fixed  z-50 bottom-[10px] right-[-400px] border-[gray] mx-auto"}>
                <div className="w-[100%]  h-[25px]  flex justify-center items-center">
                    <div className="w-[15%] h-[100%]  flex justify-center items-center icofont-close-line text-[#9c9a9a]"></div>
                    <div className="w-[70%] h-[100%] flex justify-end items-center pt-1  text-[15px] text-[#e4e4e4] ">اخطار</div>
                    <div className="w-[15%] h-[100%]  flex justify-center items-center text-[#bd473d] icofont-close-circled"></div>
                </div>
                <div dir="rtl" className="h-[50px] w-[85%] mx-auto text-[12px] flex justify-center items-center text-[#b8b8b8] ">اطلاعات را به درستی تکمیل کنید</div>
                <div className="w-[100%] h-[4px] bg-[red] absolute bottom-0 left-0"></div>
            </div>
            <div ref={error2} className={" duration-500 opacity-0 bg-[#282828] mt-[180px] w-[280px] rounded-[8px] overflow-hidden h-[95px] border fixed  z-50 bottom-[10px] right-[-400px] border-[gray] mx-auto"}>
                <div className="w-[100%]  h-[25px]  flex justify-center items-center">
                    <div className="w-[15%] h-[100%]  flex justify-center items-center icofont-close-line text-[#9c9a9a]"></div>
                    <div className="w-[70%] h-[100%] flex justify-end items-center pt-1  text-[15px] text-[#e4e4e4] ">موفق</div>
                    <div className="w-[15%] h-[100%]  flex justify-center items-center text-[#04b304] icofont-close-circled"></div>
                </div>
                <div dir="rtl" className="h-[50px] w-[85%] mx-auto text-[12px] flex justify-center items-center text-[#b8b8b8] ">اطلاعات با موفقیت ویرایش شد</div>
                <div className="w-[100%] h-[4px] bg-[#03b303] absolute bottom-0 left-0"></div>
            </div>
            <div ref={loading} className="w-[100%] h-[100vh] bg-[white] flex top-0 left-0 justify-center items-center fixed z-40">
                <img className="w-[35px] h-[35px]" src="/images/icons8-loading.gif" alt="" />
            </div>
            <div ref={warning} className="hidden w-[90%] h-[50px] border fixed top-4 rounded-[4px] bg-[#039e0377]  justify-around items-center">
                <div className="w-[10%] h-[100%]  flex justify-center icofont-check-circled items-center text-[35px] text-[white]"></div>
                <div dir="rtl" className=" pr-6 w-[90%] h-[100%] flex justify-start items-center">گزینه با موفقیت از سایت حذف شد .درحال بازگشت به صفحه اصلی...</div>
            </div>
            <div onClick={blur1} ref={blur} className="hidden w-[100%] h-[100vh] fixed bg-[black]/40 z-[20] top-0"></div>
            <div
                ref={del}
                style={{ transform: "scale(0)" }}
                className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[350px] h-[150px] bg-[#1f1f1f] rounded-2xl border border-[#3a3a3a] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden z-60 transform transition-transform duration-300">

                <div className="w-full h-[40px] flex items-center px-3 border-b border-[#383838]">
                    <span className=" pr-3 flex-1 text-right text-[15px] text-white">
                        از حذف این مورد اطمینان دارید؟
                    </span>

                    <i className="icofont-close-circled text-[20px] text-[#ff4b4b] cursor-pointer"></i>
                </div>


                <div
                    dir="rtl"
                    className="w-[85%] mx-auto h-[70px] flex justify-around items-center mt-2"
                >

                    <div onClick={remove} className=" w-[90px] h-[45px] bg-[#2e2e2e] rounded-xl flex justify-center items-center text-[#d4d4d4] text-[14px]cursor-pointer transition-all duration-200 hover:bg-[#3a3a3a] hover:text-white active:scale-[0.9]">
                        خیر
                    </div>


                    <div onClick={finalremove} className=" w-[90px] h-[45px] bg-[#e04646] rounded-xl flex justify-center items-center text-white text-[14px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#ff5757] active:scale-[0.9]
      "
                    >
                        بله
                    </div>
                </div>


                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#ff3b3b]"></div>
            </div>

            <div style={{ transform: 'scale(0)' }} ref={menu} className="w-[360px] min-h-[460px] fixed z-30 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-5 duration-300   transition-all transform">

                <div onClick={close} className="w-[100%] icofont-close-line flex justify-end items-center "></div>
                <div className="w-full h-[55px] border-b flex justify-end items-center font-bold text-xl text-gray-800">
                    ویرایش اطلاعات
                </div>


                <div dir="rtl" className="w-full mt-6 flex flex-col gap-6">

                    <div className="flex flex-col w-full">
                        <label className="text-[15px] text-gray-600 pr-1">نام</label>
                        <input ref={(el) => { input.current[0] = el }}
                            placeholder="نام جدید را وارد کنید"
                            className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                            type="text"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-[15px] text-gray-600 pr-1">قیمت</label>
                        <input ref={(el) => { input.current[1] = el }}
                            placeholder="قیمت جدید را وارد کنید"
                            className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                            type="text"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-[15px] text-gray-600 pr-1">تصویر</label>
                        <input ref={(el) => { input.current[2] = el }}
                            placeholder="لینک تصویر را وارد کنید"
                            className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-[15px] text-gray-600 pr-1">ظرفیت</label>
                        <input ref={(el) => { input.current[3] = el }}
                            placeholder="میزان ظرفیت اتاق را وارد کنید "
                            className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                            type="text"
                        />
                    </div>

                </div>


                <div className="w-full flex justify-center mt-8">
                    <button onClick={() => change(event)} className="w-[85%] h-[45px] bg-blue-600 text-white rounded-xl text-[15px] font-semibold
        shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                        تایید
                    </button>
                </div>
            </div>


            <div className="w-[100%] h-[50px] border-b border-[#6d6c6ccc] flex justify-between items-center">
                <div className=" icofont-navigation-menu  w-[60px] h-[100%] flex justify-center items-center"></div>
                <div className=" icofont-ui-user  w-[60px] h-[100%] flex justify-center items-center"><span className="font-bold">Admin</span></div>
            </div>
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 p-6 transition-transform transform hover:-translate-y-1">

                <div className="flex-shrink-0">
                    <div className="relative w-44 h-28 rounded-lg overflow-hidden shadow-md">
                        <img
                            src={selected.img}
                            alt=''
                            className="w-full h-full"
                        />
                        <div className="absolute top-2 left-2 bg-black/40 text-white text-xs rounded-full px-3 py-1 backdrop-blur">

                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-800"></h3>
                            <p className="mt-1 text-sm text-slate-500">ظرفیت:{selected.noOfPeople} <span className="font-medium text-slate-700">نفر </span></p>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-slate-500">قیمت : {price}</div>
                            <div className="mt-1 text-lg font-bold text-sky-600">{selected.name}</div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <button onClick={del1} className="px-4 py-2 rounded-xl border border-[gray] text-black text-sm font-medium  hover:bg-[red] active:scale-[0.9] duration-150 bg-[#f72020e3]">حذف</button>
                        <button onClick={() => open()} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium hover:brightness-95 duration-150 active:scale-[0.9]">ویرایش</button>
                        <button className="ml-auto px-3 py-1 rounded-full text-xs bg-gray-100 text-slate-600">پنل اسپیناس</button>
                    </div>

                    <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 shadow-sm" aria-hidden />
                </div>
            </div>

        </div>

    );
}
