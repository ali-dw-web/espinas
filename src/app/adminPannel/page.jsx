'use client'
import React, { useEffect, useRef, useState } from "react"
import Chart from './chart.jsx'
import { useRouter } from "next/navigation.js"
import Edition from './roomsedition/roomedition.jsx'


export default function Admin() {
    const [page, setPage] = useState(1)
    const menu = useRef()
    const [orders, setOrders] = useState([])
    const list = useRef([])
    const router = useRouter()
    const empty = useRef(null)
    const [rooms, setRooms] = useState([])
    const blur = useRef()
    const menu2 = useRef()
    const input = useRef([])
    const loading = useRef()
    const warning = useRef()
    const error = useRef()
    const error1 = useRef()
    


    useEffect(() => {
        fetch('https://6905eef4ee3d0d14c1342d8b.mockapi.io/rooms')
            .then(res => res.json())
            .then(val => {
                setOrders(val)
                loading.current.style.display = ' none'
            })
    }, [])
    useEffect(() => {
        fetch('https://68dab56d23ebc87faa310681.mockapi.io/room')
            .then(res => res.json())
            .then(val => {
                setRooms(val)

            })
    }, [])
    let latest = 0
    latest = (orders.length) - 5
    const data1 = [
        { name: "فروردین", value: 30 },
        { name: "اردیبهشت", value: 28 },
        { name: "خرداد", value: 55 },
    ];

    const data2 = [
        { name: 'تیز', value: 10 },
        { name: 'مرداد', value: 7 },
        { name: 'شهریور', value: 70 },
    ];
    function openMenu() {
        console.log(menu.current);
        menu.current.style.left = '0'

    }
    function closeMenu() {
        console.log(menu.current);
        menu.current.style.left = '-500px'

    }
    function check(e) {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || [219, 220, 222, 186, 221, 188, 190, 191, 192, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 49].includes(event.keyCode)) {
            event.preventDefault()
        }
        let value = e.target.value
        console.log(value);




    }
    function search(e) {
        let value = e.target.value
        let _check = 0
        const status = []

        // console.log(value);
        if (value == '' || value == null) {
            list.current.map((val) => {
                val.style.display = 'flex'
            })
        } else {
            list.current.map((val) => {
                let idNumber = val.children[2].children[1].innerText.substring(0, value.length)
                let trackingNumber = val.children[4].children[1].innerText.substring(0, value.length)
                if (idNumber.indexOf(value) >= 0 || trackingNumber.indexOf(value) >= 0) {
                    val.style.display = 'flex'

                } else {
                    val.style.display = 'none'

                }

                status.push(val.style.display)



            })
            if (status.includes('flex') == false) {
                empty.current.style.display = 'flex'
            } else {
                empty.current.style.display = 'none'
            }
        }


    }
    function check2(e) {
        let num = e + 1
        console.log(e);

        router.push(`./adminPannel/${e}orders`)
    }
    function _add() {
        console.log(blur.current);
        menu2.current.style.transform = 'scale(1)'
        blur.current.style.display = 'block'

    }
    function close() {
        menu2.current.style.transform = 'scale(0)'
        blur.current.style.display = 'none'

    }
    function change() {
        let _name = input.current[0].value
        let _price = input.current[1].value
        let _img = input.current[2].value
        let _noOfPeople = input.current[3].value
        let empty = []
        input.current.map((val) => {
            console.log(val);
            empty.push(val.value)
            if (val.value == '') {
                val.style.border = '1px solid red'
            } else {
                val.style.border = '1px solid grey'
            }
        })
        console.log(empty);
        const confimation = empty.some((val) => val == '')
        if (confimation == true) {
            error.current.style.right = '10px'
            error.current.style.opacity = '1'
            setTimeout(() => {
                error.current.style.right = '-600px'
                error.current.style.opacity = '0'
            }, 3000);

        } else {
            fetch(`https://68dab56d23ebc87faa310681.mockapi.io/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: _name,
                    price: _price,
                    img: _img,
                    noOfPeople: _noOfPeople
                })
            })
            .then(res => {
                if (res.ok) {
                     error1.current.style.right = '10px'
            error1.current.style.opacity = '1'
            setTimeout(() => {
                error1.current.style.right = '-600px'
                error1.current.style.opacity = '0'
                window.location.reload()
            }, 3000);
                }
            })
           
           
        }




    }
    return (
        <>
            <div className="w-[100%] h-[auto] flex justify-center items-center text-[white]">

                <div ref={loading} className="w-[100%] h-[100vh] z-50 fixed top-0 right-0 bg-[white] flex justify-center items-center">
                    <img className="w-[35px] h-[35px]" src="/images/icons8-loading.gif" alt="" />
                </div>
                <div ref={menu} className="md:static z-30 fixed left-[-500px] top-0 duration-300 w-[280px] h-[100vh] bg-[#1E2430] ">
                    <div onClick={closeMenu} className=" md:hidden w-[100%] h-[40px]  flex justify-end items-center pr-3.5 text-[#c2bfbf] icofont-close-line"></div>
                    <div className=" w-[100%] h-[200px] flex justify-center items-center">
                        <img className="w-[88%] h-[90%]" src="images/admin-img.png" alt="" />
                    </div>
                    <div className="w-[100%] h-[50px] mt-1.5 flex justify-end items-center">
                        <div onClick={() => setPage(1)} style={page == 1 ? { background: '#5b6069' } : null} className=" flex justify-center duration-150 hover:bg-[#5b6069] items-center w-[87%]  h-[100%] rounded-bl-[10px] rounded-tl-[10px]">
                            <div style={page == 1 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[20%] h-[100%] text-[18px] flex justify-end items-center icofont-ui-user"></div>
                            <div style={page == 1 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[80%] h-[100%]  flex justify-start pl-3.5 items-center text-[17px] text-[#c9c6c6] cursor-pointer">Dashboard
                            </div>

                        </div>
                    </div>
                    <div className="w-[100%] h-[50px] mt-1.5 flex justify-end items-center">
                        <div onClick={() => setPage(2)} style={page == 2 ? { background: '#5b6069' } : null} className=" flex justify-center duration-150 hover:bg-[#5b6069] items-center w-[87%]  h-[100%] rounded-bl-[10px] rounded-tl-[10px]">
                            <div style={page == 2 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[20%] h-[100%] text-[18px] flex justify-end items-center icofont-ui-v-card"></div>
                            <div style={page == 2 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[80%] h-[100%]  flex justify-start pl-3.5 items-center text-[17px] text-[#c9c6c6] cursor-pointer">Reservations
                            </div>

                        </div>
                    </div>
                    <div className="w-[100%] h-[50px] mt-1.5 flex justify-end items-center">
                        <div onClick={() => setPage(3)} style={page == 3 ? { background: '#5b6069' } : null} className=" flex justify-center duration-150 hover:bg-[#5b6069] items-center w-[87%]  h-[100%] rounded-bl-[10px] rounded-tl-[10px]">
                            <div style={page == 3 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[20%] h-[100%] text-[18px] flex justify-end items-center icofont-bed"></div>
                            <div style={page == 3 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[80%] h-[100%]  flex justify-start pl-3.5 items-center text-[17px] text-[#c9c6c6] cursor-pointer">Rooms
                            </div>

                        </div>
                    </div>
                    <div className="w-[100%] h-[50px] mt-1.5 flex justify-end items-center">
                        <div onClick={() => setPage(4)} style={page == 4 ? { background: '#5b6069' } : null} className=" flex justify-center duration-150 hover:bg-[#5b6069] items-center w-[87%]  h-[100%] rounded-bl-[10px] rounded-tl-[10px]">
                            <div style={page == 4 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[20%] h-[100%] text-[18px] flex justify-end items-center icofont-ui-settings"></div>
                            <div style={page == 4 ? { color: 'white' } : { color: '#c9c6c6' }} className="w-[80%] h-[100%]  flex justify-start pl-3.5 items-center text-[17px] text-[#c9c6c6] cursor-pointer">Settings
                            </div>

                        </div>
                    </div>

                </div>



























                <div style={page == 1 ? { display: 'block' } : { display: 'none' }} className=" md:w-[82%] h-[100vh] text-[black] w-[100%] border border-[#000000] overflow-y-scroll bg-[#f8f8f8]">
                    <div className="w-[100%] h-[70px]  flex justify-center items-center mt-3">
                        <div onClick={openMenu} className="w-[10%] md:hidden h-[100%]  icofont-navigation-menu flex justify-center items-center text-[25px] text-[black]"></div>
                        <div className=" pl-2.5 md:w-[90%] w-[60%] h-[100%]  font-bold flex pr-3 justify-start items-center text-[20px]">DASHBOARD</div>
                        <div className="w-[20%] h-[100%]  flex justify-center items-center font-bold text-[15px]">
                            <div className="h-[20px] w-[20px]  mr-1.5 rounded-[50%] bg-[black] flex justify-center items-center icofont-ui-user text-[white] text-[13px]"></div>
                            <div className="h-[20px]   font-bold ">Admin</div>
                        </div>
                    </div>
                    <div className=" mx-auto w-[auto] flex justify-center items-center flex-wrap">
                        <Chart data1={data1} data2={data2} />
                    </div>
                    <div className="w-[100%]  flex justify-center items-center flex-wrap">
                        <div className=" shadow-[0_0px_5px_rgba(0,0,0,0.3)] md:w-[400px] w-[380px] h-[130px] border border-[#808080a1] rounded-[10px] mr-2 lg:mr-6 mt-6 bg-[white] flex justify-center items-center flex-wrap">
                            <div className="w-[100%] h-[80px] flex justify-center items-center  flex-wrap">
                                <div className="w-[50px] h-[50px] rounded-[5px] text-[black] icofont-ui-v-card text-[20px] bg-[#f3f3f3] border border-[gray] mr-1.5 flex justify-center items-center"></div>
                                <div className="w-[200px] h-[30px] rounded-[5px]  flex justify-start items-center font-bold text-2xl">150</div>
                                <div className="w-[100%] h-[20px] font-bold flex justify-center items-center pr-7">Reservations</div>
                            </div>
                        </div>
                        <div className=" shadow-[0_0px_5px_rgba(0,0,0,0.3)] md:w-[400px] w-[380px] h-[130px] border border-[#8080808f] rounded-[10px] mr-2 lg:mr-4 mt-6 bg-[white] flex justify-center items-center flex-wrap">
                            <div className="w-[100%] h-[80px] flex justify-center items-center  flex-wrap">
                                <div className="w-[50px] h-[50px] rounded-[5px] border-[gray] icofont-bed text-[22px] bg-[#f3f3f3] border mr-1.5 flex justify-center items-center"></div>
                                <div className="w-[200px] h-[30px] rounded-[5px]  flex justify-start items-center font-bold text-2xl">65</div>
                                <div className="w-[100%] h-[20px] font-bold flex justify-center items-center pr-7">Rooms</div>
                            </div>
                        </div>
                        <div className=" shadow-[0_0px_5px_rgba(0,0,0,0.3)] md:w-[400px] w-[380px] h-[130px] border border-[#808080ab] rounded-[10px] mr-2 lg:mr-6 mt-6 bg-[white] flex justify-center items-center flex-wrap">
                            <div className="w-[100%] h-[80px] flex justify-center items-center  flex-wrap">
                                <div className="w-[50px] h-[50px] rounded-[5px] border-[gray] icofont-id-card text-[22px] bg-[#f3f3f3] border mr-1.5 flex justify-center items-center"></div>
                                <div className="w-[200px] h-[30px] rounded-[5px]  flex justify-start items-center font-bold text-2xl">{orders.length}</div>
                                <div className="w-[100%] h-[20px] font-bold flex justify-center items-center pr-7">Bookings</div>
                            </div>
                        </div>
                        <div className=" shadow-[0_0px_5px_rgba(0,0,0,0.3)] md:w-[400px] w-[380px] h-[130px] border border-[#8080808a] rounded-[10px] mr-2 lg:mr-4 mt-6 bg-[white] flex justify-center items-center flex-wrap">
                            <div className="w-[100%] h-[80px] flex justify-center items-center  flex-wrap">
                                <div className="w-[50px] h-[50px] rounded-[5px] border-[#8080809f] icofont-exclamation-circle text-[22px] bg-[#f3f3f3] border mr-1.5 flex justify-center items-center"></div>
                                <div className="w-[200px] h-[30px] rounded-[5px] flex justify-start items-center font-bold text-2xl">30</div>
                                <div className="w-[100%] h-[20px] font-bold flex justify-center items-center pr-7">Reports</div>
                            </div>
                        </div>

                    </div>
                    <div className="md:w-[78%] w-[95%] mx-auto  mt-5 bg-[white] rounded-[10px]  shadow-[0_0px_5px_rgba(0,0,0,0.3)]">
                        <div className=" w-[100%] h-[50px]  flex justify-start items-center font-bold text-[20px] pl-2.5">Latest Bookings</div>
                        <div className="w-[100%] h-[50px] flex justify-around items-center">
                            <div className="w-[100px] h-[100%]  flex justify-center items-center font-bold text-[15px]">Booking ID</div>
                            <div className="w-[100px] h-[100%]  flex justify-center items-center font-bold text-[15px]">Customer</div>
                            <div className="w-[100px] h-[100%]  flex justify-center items-center font-bold text-[15px]">Mobile</div>
                            <div className="w-[100px] h-[100%]  flex justify-center items-center font-bold text-[15px]">Date</div>
                            <div className="w-[100px] h-[100%]  flex justify-center items-center font-bold text-[15px]">Status</div>
                        </div>
                        <div className="w-[100%] flex justify-center items-center mt-1.5 flex-wrap">{
                            orders && orders.map((val, i) => {
                                if (i >= latest) {
                                    return (
                                        <React.Fragment key={i}>
                                            <div
                                                className=" mt-4 w-[95%] h-[45px]  rounded-[10px] flex justify-around bg-[white] shadow-[0_0px_5px_rgba(0,0,0,0.3)] items-center ">
                                                <div className=" shadow-[0_0px_5px_rgba(0,0,0,0.2)] w-[90px] h-[85%] border border-[#8080806c] rounded-2xl flex justify-center items-center font-bold text-[11px]">{val.voucher[0].trackingNumber}</div>
                                                <div className="shadow-[0_0px_5px_rgba(0,0,0,0.2)] w-[90px] h-[85%] border border-[#8080806c] flex justify-center items-center font-bold text-[11px] rounded-2xl">{val.voucher[0].lastName}</div>
                                                <div className="shadow-[0_0px_5px_rgba(0,0,0,0.2)] w-[90px] h-[85%] border border-[#8080806c] flex justify-center items-center font-bold text-[11px] rounded-2xl">{val.voucher[0].mobile}</div>
                                                <div className="shadow-[0_0px_5px_rgba(0,0,0,0.2)] w-[90px] h-[85%] border border-[#8080806c] flex justify-center items-center font-bold text-[11px] rounded-2xl">{(val.voucher[1].time).substring(0, 10)}</div>
                                                <div className=" shadow-[0_0px_5px_rgba(0,0,0,0.2)] w-[90px] h-[85%] border border-[#8080806c] flex justify-center items-center font-bold text-[11px] rounded-2xl text-[#048f04]">Confirmed</div>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </div>
                        <br />
                    </div>
                    <br />

                </div>















































                <div style={page == 2 ? { display: 'block' } : { display: 'none' }} className="md:w-[82%] h-[100vh] w-[100%] text-[black] border overflow-y-scroll border-[#000000] bg-[#ffffff]">
                    <div className="w-[100%] h-[70px]  flex justify-center items-center mt-3 ">
                        <div onClick={openMenu} className="w-[10%] md:hidden h-[100%]  icofont-navigation-menu flex justify-center items-center text-[25px] text-[black]"></div>
                        <div className=" pl-2.5 md:w-[90%] w-[60%] h-[100%] text-[black]  font-bold flex pr-3 justify-start items-center text-[20px] ">Reservation</div>
                        <div className="w-[20%] h-[100%]  flex justify-center items-center font-bold text-[15px]">
                            <div className="h-[20px] w-[20px]  mr-1.5 rounded-[50%] bg-[#ffffff] flex justify-center items-center icofont-ui-user text-[black] text-[13px]"></div>
                            <div className="h-[20px] text-[black] font-bold ">Admin</div>
                        </div>
                    </div>
                    <div className="w-[100%] h-[100px] flex justify-center items-center">
                        <div className="lg:w-[40%] w-[98%] h-[50px] border bg-[#1e2430] flex justify-center items-center  shadow-[0_0px_5px_rgba(0,0,0,0.4)] border-[#3f3e3e] rounded-3xl overflow-hidden relative">
                            <input onChange={() => search(event)} onKeyDown={check} placeholder="Search" className=" pl-4 w-[100%] h-[100%] bg-[#e4e4e4] outline-0" type="text" />

                        </div>
                    </div>
                    <div className="w-[70%] h-[1px] mt-4 bg-[#9c9a9a] mx-auto"></div>
                    <div className="lg:w-[70%] w-[98%] min-h-[100px] mx-auto text-center text-[#000000] justify-center items-center  mt-5 flex flex-wrap ">
                        <div ref={empty} className="  w-[100%] h-[50px]  hidden justify-center items-center ">موردی یافت نشد </div>
                        {
                            orders && orders.map((val, i) => {
                                let s = i + 1
                                return (
                                    <React.Fragment key={i}>
                                        <div key={'r' + i} onClick={() => check2(s)} ref={(el) => { (el) ? list.current[i] = el : null }} dir="rtl" className="cursor-pointer hover:bg-[#99939357] w-[100%] h-[50px] mt-2.5 mx-auto rounded-2xl border border-gray-300 bg-white shadow-sm flex items-center justify-between px-4 hover:shadow-md transition-all duration-300">
                                            {
                                                val.voucher.map((val, i) => {
                                                    if (i == 0) {
                                                        return (
                                                            <React.Fragment key={i}>
                                                                <span className=" text-gray-700 text-sm font-medium">
                                                                    <span> شماره:</span> <span>{s}</span>
                                                                </span>

                                                                <span className="w-[1px] h-6 bg-gray-300"></span>

                                                                <span className=" text-gray-700 text-sm font-medium">
                                                                    <span> کد ملی:</span> <span>{val.idNumber}</span>
                                                                </span>

                                                                <span className=" w-[1px] h-6 bg-gray-300"></span>

                                                                <span className=" text-gray-700 text-sm font-medium">
                                                                    <span>کد پیگیری : </span> <span>{val.trackingNumber}</span>
                                                                </span>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
                <div style={page == 3 ? { display: 'block' } : { display: 'none' }} className="md:w-[82%] h-[100vh] text-[black]  w-[100%] border border-[#000000] flex-wrap overflow-y-scroll">
                    <div ref={error} className={" duration-500 opacity-0 bg-[#282828] mt-[180px] w-[280px] rounded-[8px] overflow-hidden h-[95px] border fixed  z-50 bottom-[10px] right-[-400px] border-[gray] mx-auto"}>
                        <div className="w-[100%]  h-[25px]  flex justify-center items-center">
                            <div className="w-[15%] h-[100%]  flex justify-center items-center icofont-close-line text-[#9c9a9a]"></div>
                            <div className="w-[70%] h-[100%] flex justify-end items-center pt-1  text-[15px] text-[#e4e4e4] ">اخطار</div>
                            <div className="w-[15%] h-[100%]  flex justify-center items-center text-[#bd473d] icofont-close-circled"></div>
                        </div>
                        <div dir="rtl" className="h-[50px] w-[85%] mx-auto text-[12px] flex justify-center items-center text-[#b8b8b8] ">اطلاعات را به درستی تکمیل کنید</div>
                        <div className="w-[100%] h-[4px] bg-[red] absolute bottom-0 left-0"></div>
                    </div>
                    <div ref={error1} className={" duration-500 opacity-0 bg-[#282828] mt-[180px] w-[280px] rounded-[8px] overflow-hidden h-[95px] border fixed  z-50 bottom-[10px] right-[-400px] border-[gray] mx-auto"}>
                        <div className="w-[100%]  h-[25px]  flex justify-center items-center">
                            <div className="w-[15%] h-[100%]  flex justify-center items-center icofont-close-line text-[#9c9a9a]"></div>
                            <div className="w-[70%] h-[100%] flex justify-end items-center pt-1  text-[15px] text-[#e4e4e4] ">موفق</div>
                            <div className="w-[15%] h-[100%]  flex justify-center items-center text-[#04cf15] icofont-close-circled"></div>
                        </div>
                        <div dir="rtl" className="h-[50px] w-[85%] mx-auto text-[12px] flex justify-center items-center text-[#b8b8b8] ">اتاق افزوده شد در حال رفرش...</div>
                        <div className="w-[100%] h-[4px] bg-[#02b90c] absolute bottom-0 left-0"></div>
                    </div>
                    <div ref={warning} className=" hidden pr-3.5 w-[60%] h-[50px] fixed top-7 left-[25%] bg-[#008000ab] justify-end items-center">
                        ... گزینه جدید با موفقیت افزوده شد . بارگیری دوباره
                    </div>
                    <div style={{ transform: 'scale(0)' }} ref={menu2} className="w-[360px] min-h-[460px] fixed z-30 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-5 duration-300   transition-all transform">

                        <div onClick={close} className="w-[100%] icofont-close-line flex justify-end items-center "></div>
                        <div className="w-full h-[55px] border-b flex justify-end items-center font-bold text-xl text-gray-800">
                            افزودن گزینه
                        </div>


                        <div dir="rtl" className="w-full mt-6 flex flex-col gap-6">

                            <div className="flex flex-col w-full">
                                <label className="text-[15px] text-gray-600 pr-1">نام</label>
                                <input ref={(el) => input.current[0] = el}
                                    placeholder="نام جدید را وارد کنید"
                                    className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                                    type="text"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-[15px] text-gray-600 pr-1">قیمت</label>
                                <input ref={(el) => input.current[1] = el}
                                    placeholder="قیمت جدید را وارد کنید"
                                    className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                                    type="text"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-[15px] text-gray-600 pr-1">تصویر</label>
                                <input ref={(el) => input.current[2] = el}
                                    placeholder="لینک تصویر را وارد کنید"
                                    className="outline-0 w-full h-[42px] border border-gray-300 rounded-xl px-3 text-[14px]
                focus:border-blue-500 focus:shadow-md transition-all"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-[15px] text-gray-600 pr-1">ظرفیت</label>
                                <input ref={(el) => input.current[3] = el}
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
                    <div ref={blur} className=" hidden w-[100%] h-[100vh] bg-[black]/55 fixed top-0"></div>
                    <div className="w-[100%] h-[70px]  flex justify-center items-center mt-3">
                        <div onClick={openMenu} className="w-[10%] md:hidden h-[100%]  icofont-navigation-menu flex justify-center items-center text-[25px] text-[black]"></div>
                        <div className=" pl-2.5 md:w-[90%] w-[60%] h-[100%]  font-bold flex pr-3 justify-start items-center text-[20px]">DASHBOARD</div>
                        <div className="w-[20%] h-[100%]  flex justify-center items-center font-bold text-[15px]">
                            <div className="h-[20px] w-[20px]  mr-1.5 rounded-[50%] bg-[black] flex justify-center items-center icofont-ui-user text-[white] text-[13px]"></div>
                            <div className="h-[20px]   font-bold ">Admin</div>
                        </div>
                    </div>
                    <div className="w-[100%] min-h-[100px] mt-2.5">
                        {
                            rooms?.map((val, i) => {
                                let s = val.id


                                return (
                                    <React.Fragment key={i}>
                                        <Edition t={val} s={s} />
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                    <br />
                    <div onClick={_add} className=" active:scale-[0.9] duration-200 cursor-pointer w-[200px] h-[70px]  bg-[#06a506e3] ml-[150px] rounded-2xl flex justify-center items-center">افزودن اتاق بیشتر <span className="icofont-plus"></span></div>
                    <br />

                </div>
                <div style={page == 4 ? { display: 'flex' } : { display: 'none' }} className="md:w-[82%] h-[100vh] text-[black] border w-[100%] justify-center items-center text-[15px] font-bold  border-[#000000]">
                    <span>DEVELOPING</span><img className="h-[25px]" src="/images/icons10-loading.gif" alt="" />
                </div>
            </div>
        </>
    )
}

